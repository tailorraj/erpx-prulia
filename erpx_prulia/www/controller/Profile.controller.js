sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/ui/core/format/DateFormat",
	"sap/m/MessageToast",
	"sap/m/Dialog",
	"sap/ui/unified/FileUploader",
	"sap/m/Button",
	"sap/ui/core/ValueState",
	"com/erpx/site/prulia/PRULIA/utils/Login"
], function (Controller, JSONModel, DateFormat, MessageToast, Dialog, FileUploader, Button, ValueState, Login) {
	"use strict";

	return Controller.extend("com.erpx.site.prulia.PRULIA.controller.Profile", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf com.erpx.site.prulia.PRULIA.view.Profile
		 */
		onInit: function() {
			var oRouter;

			this.getView().setModel(new JSONModel({
				editPersonal: false
			}),"profileParam");

			oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.getRoute("Profile").attachPatternMatched(this._onObjectMatched, this);
		},
		_onObjectMatched: function (oEvent) {
			this.getView().bindElement({
				path: "/", 
				model: "member",
				events : {
					change: this._onBindingChange.bind(this),
				}
			});
		},
		_onBindingChange : function (oEvent) {
			// No data for the binding
			if (this.getView().getElementBinding("member").getModel().getProperty("/full_name") === undefined) {
				sap.ui.core.UIComponent.getRouterFor(this).getTargets().display("notFound");
			}
		},

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf com.erpx.site.prulia.PRULIA.view.Profile
		 */
		// onBeforeRendering: function() {
        //
		// },

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf com.erpx.site.prulia.PRULIA.view.Profile
		 */
		onAfterRendering: function() {
			this.getView().attachBrowserEvent('click', function (e) {
				var oTarget = e.target,
					$target,
					oDialog,
					oCancel,
					oUploader;

				if ($(oTarget).hasClass('sapMImg')) { //click on image
					$target = $(oTarget);
					oDialog = new Dialog();
					oDialog.setTitle('Upload image');

					oUploader = new FileUploader({
						maximumFileSize: 2,
						fileType: ['jpg', 'png', 'bmp', 'gif'],
						uploadOnChange: true,
						uploadStart: function (oEvent) {
							var oParams = oEvent.getParameters();

							console.log(oParams);
							oDialog.close();
                        },
						uploadComplete: function (oEvent) {
							//change profile picture
							var oParams = oEvent.getParameters();

							console.log(oParams);
						},
						fileSizeExceed: function () {
							MessageToast.show("File limit size is 2MB");
                        },
						typeMissmatch: function () {
							MessageToast.show("Invalid file type provided. Supported file type (jpg, png, bmp, gif)");
                        }
					}).addStyleClass('Uploader');

					oCancel = new Button({
						text: 'Cancel',
						press: function(){
							oDialog.close();
						}
					})

					oDialog.addContent(oUploader);
					oDialog.addButton(oCancel);
					oDialog.open();
				}
            });
		},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf com.erpx.site.prulia.PRULIA.view.Profile
		 */
		// onExit: function() {
        //
		// },

		changeEditMode: function(){
			var oModel = this.getView().getModel("profileParam");

			//reset model
			if (oModel.getProperty("/editPersonal")) {
				this.getView().getModel('member').setJSON(this._oUserJSON);
			}
			else {
				this._oUserJSON = this.getView().getModel('member').getJSON();
				this._oUserJSON = JSON.parse(JSON.stringify(this._oUserJSON));
			}

			oModel.setProperty("/editPersonal", !oModel.getProperty("/editPersonal"))
		},

		updateEventPref: function(){
			var oModel = this.getView().getModel("profileParam");

			this.getOwnerComponent().getModel("appParam").setProperty("/busy", true);

			Login.updateMemberDetails(function(){
				MessageToast.show("Perferences was update successfully");
				oModel.setProperty("/editPersonal", !oModel.getProperty("/editPersonal"))
				// this.changeEditMode();
				this.getOwnerComponent().getModel("appParam").setProperty("/busy", false);
			}.bind(this), function(){
				this.getOwnerComponent().getModel("appParam").setProperty("/busy", false);
			}.bind(this))
		},
		smartPartnerStatusFormatter: function(statusDate){
			var oDate,
				oDateTimeFormat;

			if(statusDate === undefined || statusDate === null){
				return "No Record Found"
			} else {
				oDate = new Date(statusDate);
				oDateTimeFormat = DateFormat.getDateInstance({pattern : "dd MMM yyyy" });

				return oDateTimeFormat.format(oDate);
			}
		},
		checkInput: function (oEvent) {
			var val = oEvent.getParameter("newValue").trim();

			if (!val) {
				oEvent.getSource().setValueState(ValueState.Error);
			}
			else { oEvent.getSource().setValueState(ValueState.None); }
        }
	});

});