sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function (Controller) {
	"use strict";

	return Controller.extend("com.erpx.site.prulia.PRULIA.controller.Books", {
		onInit: function () {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.getRoute("Books").attachPatternMatched(this._onObjectMatched, this);
		},
		_onObjectMatched: function (oEvent) {
			this.getOwnerComponent().getModel("appParam").setProperty("/showBack", true);
		},
		toggleMap: function (oEvent) {
			var showMap = this.getOwnerComponent().getModel("appParam").getProperty("/showMap");

			this.getOwnerComponent().getModel("appParam").setProperty("/showMap", !showMap);
        }
	});
});