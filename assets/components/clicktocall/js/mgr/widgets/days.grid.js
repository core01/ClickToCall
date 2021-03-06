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
        viewConfig: {
            forceFit: true,
            enableRowBody: true,
            autoFill: true,
            showPreview: true,
            scrollOffset: 0
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

    getFields: function (config) {
        return ['id', 'weekday', 'start_time', 'end_time', 'work'];
    },

    getColumns: function (config) {
        return [{
            header: _('clicktocall_day_id'),
            dataIndex: 'id',
            sortable: false,
            width: 70
        }, {
            header: _('clicktocall_day_name'),
            dataIndex: 'weekday',
            sortable: false,
            width: 150,
        }, {
            header: _('clicktocall_day_start_time'),
            dataIndex: 'start_time',
            editor: {xtype: 'textfield'},
            sortable: false,
            width: 100,
        }, {
            header: _('clicktocall_day_end_time'),
            dataIndex: 'end_time',
            editor: {xtype: 'textfield'},
            sortable: false,
            width: 100,
        }
            , {
                header: _('clicktocall_day_active'),
                dataIndex: 'work',
                renderer: ClickToCall.utils.renderBoolean,
                editor: {xtype: 'combo-boolean'},
                sortable: false,
                width: 100,
            }];
    },

    getTopBar: function (config) {
        return [];
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
