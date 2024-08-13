sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/UIComponent",	
    "sap/m/MessageBox",
    "sap/ui/model/json/JSONModel"
],
function (Controller, UIComponent, MessageBox, JSONModel) {
    "use strict";

    return Controller.extend("app.controller.Navigation", {
        onInit: function () {
            this.getView().setModel(new JSONModel({
                Value1: null,
                Value2: null,
                ValueState1: "None",
                ValueState2: "None",
                editable: true,
                required: true,
            }), "ViewModel");
        },

        //Triggered whenever an Input has been changed
        //oEvent - Event instance
        onInputChange: function (oEvent) {
            const oInput = oEvent.getSource(),
                sText = oInput.getValue();

            if (sText.length === 0) {                
               oInput.setValueState("Error");                
            } else {                
                oInput.setValueState("None");                
            }                
        },

        //Triggered when the button is pressed
        onPress: function () {
            const oView = this.getView(),                
                oResourceBundle = oView.getModel("i18n").getResourceBundle(),
                /*oInput1 = oView.byId("idInput1"),
                oInput2 = oView.byId("idInput2")*/
                oValue1 = oView.getModel("ViewModel").getProperty("/Value1"),
                oValue2 = oView.getModel("ViewModel").getProperty("/Value2"),
                oValueState1 = oView.getModel("ViewModel").getProperty("/ValueState1"),
                oValueState2 = oView.getModel("ViewModel").getProperty("/ValueState2");
                
            //Check if Input fields have values                
            this.fnCheckFields(oValue1, oValue2);
                
            //Send error message if at least one of the input fields have error. Navigate if none have errors.                 
            if (oValueState1 === "Error" || oValueState2 === "Error") {                
                MessageBox.error(oResourceBundle.getText("ErrorMessage"));
            } else {                
                this.fnNavigateToDetailPage(oValue1, oValue2);                
            }                
        },

        //Checks if values in Input fields are valid
        //oInput1 - Input object
        //oInput2 - 2nd Input Object
        fnCheckFields: function(oValue1, oValue2) {
            const oView = this.getView();
            /*const sData1 = oInput1.getValue(),                
                sData2 = oInput2.getValue();*/
                
            //Check if Input fields have values 
            if (!oValue1) { 
                oView.getModel("ViewModel").setProperty("/ValueState1", "Error");
            } else {                    
                oView.getModel("ViewModel").setProperty("/ValueState1", "None");
            }

            if (!oValue2) { 
                oView.getModel("ViewModel").setProperty("/ValueState2", "Error");
            } else {
                oView.getModel("ViewModel").setProperty("/ValueState2", "None");
            }                
        },

        //Triggers navigation and passes parameters 
        //sData1 - 1st parameter passed for navigation
        //sData2 - 2nd parameter passed for navigation
        fnNavigateToDetailPage: function (sData1, sData2) {
            const oRouter = UIComponent.getRouterFor(this);
                
            oRouter.navTo("RouteDetail", {
                Param1: sData1, 
                Param2: sData2                
            });                
        },

        onOpenDialog: function () {
            if (!this.oDialog) {
                this.oDialog = this.loadFragment({
                    name: "app.fragment.Dialog"
                });
            }
            this.oDialog.then(function (oDialog){ 
                oDialog.open();

                const oModel = this.getView().getModel("ViewModel");
                oModel.setProperty("/Value3", null);
            }.bind(this));
        },

        onClose: function () {
            this.getView().byId("idDialog").close();
        },

        onPressGetSum: function() {
            const oModel = this.getView().getModel("ViewModel"),
                oResourceBundle = this.getView().getModel("i18n").getResourceBundle(),
                oValue1 = oModel.getProperty("/Value1"),
                oValue2 = oModel.getProperty("/Value2");

            if (isNaN(oValue1) ||  isNaN(oValue2)) {
                MessageBox.error(oResourceBundle.getText("calcError"));
            } else {
                oModel.setProperty("/Value3", Number(oValue1) + Number(oValue2));
            }
            
        }
    });
});
