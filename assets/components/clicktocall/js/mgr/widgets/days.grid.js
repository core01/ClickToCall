ClickToCall.grid.Days = function (config) {
	config = config || {};
	if (!config.id) {
		config.id = 'clicktocall-grid-days';
	}
	Ext.applyIf(config, {
		url: ClickToCall.config.connector_url,
		fields: this.getFields(config),
		columns: this.getColumns(config),
		tbar: this.getTopBar(config),
		sm: new Ext.grid.CheckboxSelectionModel(),
		baseParams: {
			action: 'mgr/day/getlist'
		},
		listeners: {
			rowDblClick: function (grid, rowIndex, e) {
				var row = grid.store.getAt(rowIndex);
				this.updateDay(grid, e, row);
			}
		},
		viewConfig: {
			forceFit: true,
			enableRowBody: true,
			autoFill: true,
			showPreview: true,
			scrollOffset: 0,
			getRowClass: function (rec, ri, p) {
				return !rec.data.active
					? 'clicktocall-grid-row-disabled'
					: '';
			}
		},
		paging: true,
		remoteSort: true,
		autoHeight: true,
        autosave: true,
        save_action: 'mgr/day/updatefromgrid'
	});
	ClickToCall.grid.Days.superclass.constructor.call(this, config);

	// Clear selection on grid refresh
	this.store.on('load', function () {
		if (this._getSelectedIds().length) {
			this.getSelectionModel().clearSelections();
		}
	}, this);
};
Ext.extend(ClickToCall.grid.Days, MODx.grid.Grid, {
	windows: {},

	getMenu: function (grid, rowIndex) {
		var ids = this._getSelectedIds();

		var row = grid.getStore().getAt(rowIndex);
		var menu = ClickToCall.utils.getMenu(row.data['actions'], this, ids);

		this.addContextMenuDay(menu);
	},

	createDay: function (btn, e) {
		var w = MODx.load({
			xtype: 'clicktocall-day-window-create',
			id: Ext.id(),
			listeners: {
				success: {
					fn: function () {
						this.refresh();
					}, scope: this
				}
			}
		});
		w.reset();
		w.setValues({active: true});
		w.show(e.target);
	},

	updateDay: function (btn, e, row) {
		if (typeof(row) != 'undefined') {
			this.menu.record = row.data;
		}
		else if (!this.menu.record) {
			return false;
		}
		var id = this.menu.record.id;

		MODx.Ajax.request({
			url: this.config.url,
			params: {
				action: 'mgr/day/get',
				id: id
			},
			listeners: {
				success: {
					fn: function (r) {
						var w = MODx.load({
							xtype: 'clicktocall-day-window-update',
							id: Ext.id(),
							record: r,
							listeners: {
								success: {
									fn: function () {
										this.refresh();
									}, scope: this
								}
							}
						});
						w.reset();
						w.setValues(r.object);
						w.show(e.target);
					}, scope: this
				}
			}
		});
	},

	getFields: function (config) {
		return ['id', 'weekday', 'start_time', 'end_time', 'work'];
	},

	getColumns: function (config) {
		return [{
			header: _('clicktocall_day_id'),
			dataIndex: 'id',
			sortable: true,
			width: 70
		}, {
			header: _('clicktocall_day_name'),
			dataIndex: 'weekday',
			sortable: true,
			width: 150,
		}, {
			header: _('clicktocall_day_start_time'),
			dataIndex: 'start_time',
            editor: {xtype: 'textarea'},
			sortable: true,
			width: 100,
		}, {
			header: _('clicktocall_day_end_time'),
			dataIndex: 'end_time',
            editor: {xtype: 'textarea'},
			sortable: true,
			width: 100,
		}
			, {
			header: _('clicktocall_day_active'),
			dataIndex: 'work',
			renderer: ClickToCall.utils.renderBoolean,
                editor: {xtype: 'combo-boolean', renderer: true},
			sortable: true,
			width: 100,
		}];
	},

	getTopBar: function (config) {
		return [];
	},

	onClick: function (e) {
		var elem = e.getTarget();
		if (elem.nodeName == 'BUTTON') {
			var row = this.getSelectionModel().getSelected();
			if (typeof(row) != 'undefined') {
				var action = elem.getAttribute('action');
				if (action == 'showMenu') {
					var ri = this.getStore().find('id', row.id);
					return this._showMenu(this, ri, e);
				}
				else if (typeof this[action] === 'function') {
					this.menu.record = row.data;
					return this[action](this, e);
				}
			}
		}
		return this.processEvent('click', e);
	},

	_getSelectedIds: function () {
		var ids = [];
		var selected = this.getSelectionModel().getSelections();

		for (var i in selected) {
			if (!selected.hasOwnProperty(i)) {
				continue;
			}
			ids.push(selected[i]['id']);
		}

		return ids;
	}


});
Ext.reg('clicktocall-grid-days', ClickToCall.grid.Days);