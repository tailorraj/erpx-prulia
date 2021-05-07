sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/format/DateFormat",
	"com/erpx/site/prulia/PRULIA/utils/Training",
	"com/erpx/site/prulia/PRULIA/utils/Config"
], function (Controller, DateFormat, Training, Config) {
	"use strict";

	return Controller.extend("com.erpx.site.prulia.PRULIA.controller.Training", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf com.erpx.site.prulia.PRULIA.view.News
		 */

		onInit: function () {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.getRoute("Training").attachPatternMatched(this._onObjectMatched, this);
		},
		_onObjectMatched: function (oEvent) {
			this.getOwnerComponent().getModel("appParam").setProperty("/showBack", true);
			this.getOwnerComponent().getModel("appParam").setProperty("/busy", true);
			Training.getInstance().getModel().then(
				function(oModel){
					this.getView().setModel(oModel,"Training");
					this.getOwnerComponent().getModel("appParam").setProperty("/busy", false);
				}.bind(this),
				function(error){
					this.getOwnerComponent().getModel("appParam").setProperty("/busy", false);
					console.log(error);
				}.bind(this)
			)
		},

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf com.erpx.site.prulia.PRULIA.view.News
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf com.erpx.site.prulia.PRULIA.view.News
		 */
		onAfterRendering: function() {
			this.removeUnpaids().done(
				function(data, status, xhr){
					console.log(data);
				}
			).fail(
				function(error){
					ErrorHandler.handleAjaxError(error);
				}
			);
		},

		removeUnpaids: function(){
			return $.ajax({
				type: "POST",
				url: Config.serverURL+'/api/method/erpx_prulia.prulia_trainings.doctype.prulia_training.prulia_training.remove_unpaid_trainees',
				data: JSON.stringify({}),
				dataType: 'json',
				contentType: 'application/json'
			});
		},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf com.erpx.site.prulia.PRULIA.view.News
		 */
		//	onExit: function() {
		//
		//	}

		handleTrainingTilePress: function(oEvent){
			var oEventTileObject = oEvent.getSource().getBindingContext("Training").getObject();
			sap.ui.core.UIComponent.getRouterFor(this).navTo("TrainingDetail", {
				trainingid: oEventTileObject.name
			});
		},

		eventDateFormatter: function(start_date, end_date){
			var oDateTimeFormat = DateFormat.getDateInstance({pattern : "dd MMM yyyy, h:mm a" });
			var oTimeFormat = DateFormat.getDateInstance({pattern : "h:mm a" });
			if(start_date.toDateString() === end_date.toDateString()){
				return oDateTimeFormat.format(start_date) + " - " + oTimeFormat.format(end_date);
			} else {
				return oDateTimeFormat.format(start_date) + " - " + oDateTimeFormat.format(end_date);
			}
		}
	});
});