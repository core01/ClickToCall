ClickToCall.page.Home = function (config) {
	config = config || {};
	Ext.applyIf(config, {
		components: [{
			xtype: 'clicktocall-panel-home', renderTo: 'clicktocall-panel-home-div'
		}]
	});
	ClickToCall.page.Home.superclass.constructor.call(this, config);
};
Ext.extend(ClickToCall.page.Home, MODx.Component);
Ext.reg('clicktocall-page-home', ClickToCall.page.Home);