var ClickToCall = function (config) {
	config = config || {};
	ClickToCall.superclass.constructor.call(this, config);
};
Ext.extend(ClickToCall, Ext.Component, {
	page: {}, window: {}, grid: {}, tree: {}, panel: {}, combo: {}, config: {}, view: {}, utils: {}
});
Ext.reg('clicktocall', ClickToCall);

ClickToCall = new ClickToCall();