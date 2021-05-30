sap.ui.define([
  "sap/ui/base/Object",
  "sap/ui/model/json/JSONModel",
  "sap/m/Dialog",
  "sap/m/VBox",
  "sap/m/Label",
  "sap/m/Button",
  "sap/m/Select",
  "sap/m/Switch",
  "sap/m/CheckBox",
  "sap/m/MessageStrip",
  "sap/m/MessageToast",
  "sap/m/Text",
  "sap/ui/core/Item",
  "sap/ui/layout/form/SimpleForm",
  "com/erpx/site/prulia/PRULIA/utils/Config",
  "com/erpx/site/prulia/PRULIA/utils/ErrorHandler",
  "com/erpx/site/prulia/PRULIA/utils/Login"
], function(Object, JSONModel, Dialog, VBox, Label, Button, Select, Switch, CheckBox, MessageStrip, MessageToast, Text, Item, SimpleForm, Config, ErrorHandler, Login) {
  "use strict";
  var oInstance;
  var oNews = Object.extend("com.erpx.site.prulia.PRULIA.utils.Training",{
    _eventModel: undefined,
    getModel: function(fnSuccess, fnError) {
      var that = this;
      return new Promise(
          function(resolve, reject) {
            if(that._eventModel !== undefined){
              resolve(that._eventModel)
            } else {
              that.updateTrainingModel(function(){
                resolve(that._eventModel)
              }, function(){
                reject()
              })
            }
          })
    },
    updateTrainingModel: function(fnSuccess, fnError){
      $.get(Config.serverURL+'/api/method/erpx_prulia.prulia_trainings.doctype.prulia_training.prulia_training.get_training_list_web', function(data, status, xhr){
          var oEventItem = [];
          if(data.message !== undefined){
            oEventItem = data.message;
          }
          this._manageTrainingImage(oEventItem);
          if(this._eventModel === undefined){
            this._eventModel = new JSONModel(oEventItem);
          } else {
            this._eventModel.setData(oEventItem);
          }

          fnSuccess(this._eventModel);
        }.bind(this)).fail(function(error) {
          ErrorHandler.handleAjaxError(error);
          fnError();
        }.bind(this));
    },

    _manageTrainingImage: function(aEvent){
      for(var i = 0; i < aEvent.length; i++){
          if(aEvent[i].event_image === undefined || aEvent[i].event_image === null){
            aEvent[i].event_image = 'css/images/PruliaImage.png';
          } else if(aEvent[i].event_image.indexOf("/files/") === 0){
            if(Config.serverURL === "http://127.0.0.1:8080"){
              aEvent[i].event_image = "http://127.0.0.1:8000" + aEvent[i].event_image;
            } else {
              aEvent[i].event_image = Config.serverURL + aEvent[i].event_image;
            }
          }

          aEvent[i].start_date_time = new Date(aEvent[i].start_date_time);
          aEvent[i].end_date_time = new Date(aEvent[i].end_date_time);
        }
    },

    openTrainingPreferenceDialog: function(oController, bCreate, oBindingObject, oMemberModel){
      var that = this;
      var oBindingModel = new JSONModel(oBindingObject);
      // var oMemberModel = Login.getMemberModel();
      if (!this.eventPrefDialog) {
        this.eventPrefDialog = new Dialog({
          title: bCreate ? "Register Training":"Update Training Preference",
          stretch: oController.getOwnerComponent().getModel("device").getProperty("/system/phone"),
          content: new VBox({
            items: [
               new MessageStrip("idAcknowledgeMsgStrip" , {
                 text:"Please kindly acknowledge the declaration by clicking the checkbox in the form",
                 enableFormattedText:true,
                 type: "Error",
                 showIcon: true,
                 visible: "{=${/showAcknowlegementError}?true:false}"
               }).addStyleClass("sapUiResponsiveMargin"),
              new SimpleForm({
                editable: true,
                layout:"ResponsiveGridLayout",
                content: [
                  new Label({
                    text: "Meal Option",
                    visible: "{=${/display_food_option} === 1}",
                  }),
                  new Select({
                    visible: "{=${/display_food_option} === 1}",
                    selectedKey: "{/meal_option}",
                    items:[
                      new Item({
                        key:"Non-Vegetarian",
                        text:"Non-Vegetarian"
                      }),
                      new Item({
                        key:"Vegetarian",
                        text:"Vegetarian"
                      })
                    ]
                  }),
                  new Label({
                    text: "Shirt Size",
                    visible: "{=${/display_shirt_option} === 1}"
                  }),
                  new Select({
                    selectedKey: "{/shirt_size}",
                    visible: "{=${/display_shirt_option} === 1}",
                    items:[
                      new Item({
                        key:"XS",
                        text:"Extra Small (XS)"
                      }),
                      new Item({
                        key:"S",
                        text:"Small (S)"
                      }),
                      new Item({
                        key:"M",
                        text:"Medium (M)"
                      }),
                      new Item({
                        key:"L",
                        text:"Large (L)"
                      }),
                      new Item({
                        key:"XL",
                        text:"Extra Large (XL)"
                      }),
                      new Item({
                        key:"XXL",
                        text:"Double Extra Large (XXL)"
                      }),
                      new Item({
                        key:"XXXL",
                        text:"Triple Extra Large (XXXL)"
                      })
                    ]
                  }),
                  new Label({
                    text: "Accomodation",
                    visible: "{=${/display_accomodation_option} === 1}"
                  }),
                  new Switch({
                    customTextOn:"Yes",
                    customTextOff:"No",
                    state: "{/accomodation}",
                    visible: "{=${/display_accomodation_option} === 1}"
                  }),

                ]
              }),
              new Text({
              	text:"I declare that the information given herein are correct to the best of my knowledge and belief.",
	        	visible: bCreate ? true:false
              }).addStyleClass("sapUiSmallMarginBeginEnd"),
              new Text({
              	text:"I agree to be govern by the rules and regulations of PRULIA as they now exist as they may hereafter be altered.",
	        	visible: bCreate ? true:false
              }).addStyleClass("sapUiSmallMarginBeginEnd"),
              new CheckBox("idAcknowledgementCheck", {
	          		selected:"{/acknowlegement}",
	          		visible: bCreate ? true:false,
	          		text: "I agree the statement above",
	        		errorState:"{=${/showAcknowlegementError}?'Error':'None'}",
	        		select: function(oEvent){
	        			if(oEvent.getParameter("selected") && oBindingModel.getProperty("/showAcknowlegementError")){
	        				oBindingModel.setProperty("/showAcknowlegementError", false);
	        			}
	        		}.bind(this)
	          })
            ]
          }),
          beginButton: new Button({
            text: bCreate ? 'Register' : "Update",
            press: function (oEvent) {
            	if(oBindingModel.getProperty("/acknowlegement") || !bCreate){
	              oController.getOwnerComponent().getModel("appParam").setProperty("/busy", true);
	              this.createAttendance(bCreate, this.eventPrefDialog.getModel(), oMemberModel).done(
	                  function(data, status, xhr){
	                    if(data.message.success === "success"){
                        if(data.message.training.training_with_fees){

                          if(data.message.payment_link){
                            window.location.href = data.message.payment_link;
                          } else {
                            MessageToast.show("Failed to initiate payment!");
                          }
                          
                        }
                        else{
                          MessageToast.show("Preferences was update successfully");
                        }
	                    } else {
	                      MessageToast.show("Whoops! Something went wrong!");
	                    }

	                  }
	              ).fail(
	                  function(error){
	                    ErrorHandler.handleAjaxError(error);
	                  }
	              ).always(function(){
	                this.updateTrainingModel(function(){
	                  oController.getOwnerComponent().getModel("appParam").setProperty("/busy", false);
	                }, function(){
	                  oController.getOwnerComponent().getModel("appParam").setProperty("/busy", false);
	                });
	              }.bind(this));
	              // this.login(
	              //   sap.ui.getCore().byId("memberLogin-Username").getValue(),
	              //   sap.ui.getCore().byId("memberLogin-Password").getValue(),
	              //   function(){
	              //     Training.getInstance().updateTrainingModel(function(){
	              //       MessageToast.show("Member successfully login");
	              //       oController.getOwnerComponent().getModel("appParam").setProperty("/busy", false);
	              //     }.bind(this),
	              //     function(){
	              //       oController.getOwnerComponent().getModel("appParam").setProperty("/busy", false);
	              //     }.bind(this))

	              //   }.bind(this), function(){
	              //     oController.getOwnerComponent().getModel("appParam").setProperty("/busy", false);
	              //   }.bind(this));
	              this.eventPrefDialog.close();
            	} else {
	            	oBindingModel.setProperty("/showAcknowlegementError", true);
	            }
              // MessageToast.show("User successful login");
            }.bind(this)
          }),
          endButton: new Button({
            text: 'Cancel',
            press: function () {
              this.eventPrefDialog.close();
            }.bind(this)
          }),
          afterClose: function(){
            this.eventPrefDialog.destroy();
            this.eventPrefDialog = undefined;
          }.bind(this)
        });
      }
      //to get access to the global model
      oController.getView().addDependent(this.eventPrefDialog);
      this.eventPrefDialog.setModel(oBindingModel);
      this.eventPrefDialog.open();
    },

    createAttendance: function(bCreate, oTrainingRegistration, oMemberModel) {
      if(bCreate){
        var oPostData = {
          "member": oMemberModel.getProperty("/name"),
          "member_name": oMemberModel.getProperty("/full_name"),
          "event": oTrainingRegistration.getProperty("/name"),
          "meal": oTrainingRegistration.getProperty("/meal_option"),
          "shirt": oTrainingRegistration.getProperty("/shirt_size"),
          "accomodation" : oTrainingRegistration.getProperty("/accomodation") === true ? "Yes" : "No"
        };
        return $.ajax({
          type: 'POST',
          url: Config.serverURL + '/api/method/erpx_prulia.prulia_trainings.doctype.prulia_training.prulia_training.add_attendance',
          data: JSON.stringify(oPostData),
          dataType: 'json',
          contentType: 'application/json'
        });
      } else {
        var oPostData = {
          "trainee_name": oTrainingRegistration.getProperty("/trainee_name"),
          "meal_option": oTrainingRegistration.getProperty("/meal_option"),
          "shirt_size": oTrainingRegistration.getProperty("/shirt_size"),
          "accomodation" : oTrainingRegistration.getProperty("/accomodation") === true ? "Yes" : "No"
        };
        return $.ajax({
          type: "POST",
          url: Config.serverURL+'/api/method/erpx_prulia.prulia_trainings.doctype.prulia_training.prulia_training.update_training_trainee',
          data: JSON.stringify(oPostData),
          dataType: 'json',
          contentType: 'application/json'
        }).error(function (e) {
          console.error(e);
        })

        // return $.post(Config.serverURL + '/api/method/erpx_prulia.prulia_events.doctype.prulia_event.prulia_event.update_training_trainee', JSON.stringify(oPostData));
      }


    },
    deleteTrainingRegistration: function(oTrainingRegistration, oMember){
      return $.ajax({
        type: "POST",
        url: Config.serverURL+'/api/method/erpx_prulia.prulia_trainings.doctype.prulia_training.prulia_training.del_attendance',
        data: JSON.stringify({member: oMember.getProperty("/name") , event: oTrainingRegistration.getObject().name}),
        dataType: 'json',
        contentType: 'application/json'
      });
    }
  });
  return {
        getInstance: function () {
            if (!oInstance) {
                oInstance = new oNews();
            }
            return oInstance;
        }
    };
});