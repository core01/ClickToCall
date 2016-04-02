ClickToCall.panel.Home = function (config) {
    config = config || {};
    Ext.apply(config, {
        baseCls: 'modx-formpanel',
        layout: 'anchor',
        /*
         stateful: true,
         stateId: 'clicktocall-panel-home',
         stateEvents: ['tabchange'],
         getState:function() {return {activeTab:this.items.indexOf(this.getActiveTab())};},
         */
        hideMode: 'offsets',
        items: [{
            html: '<h2>' + _('clicktocall') + '</h2>',
            cls: '',
            style: {margin: '15px 0'}
        }, {
            xtype: 'modx-tabs',
            defaults: {border: false, autoHeight: true},
            border: true,
            hideMode: 'offsets',
            items: [{
                title: _('clicktocall_days_title'),
                layout: 'anchor',
                items: [{
                    html: _('clicktocall_intro_msg'),
                    cls: 'panel-desc',
                }, {
                    xtype: 'clicktocall-grid-days',
                    cls: 'main-wrapper',
                }]
            }]
        }]
    });
    ClickToCall.panel.Home.superclass.constructor.call(this, config);
};
Ext.extend(ClickToCall.panel.Home, MODx.Panel);
Ext.reg('clicktocall-panel-home', ClickToCall.panel.Home);
