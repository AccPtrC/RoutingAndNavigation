sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/UIComponent",	
    "sap/m/MessageBox"
],
function (Controller, UIComponent, MessageBox) {
    "use strict";

    return Controller.extend("app.controller.Navigation", {
        onInit: function () {

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
                oInput1 = oView.byId("idInput1"),
                oInput2 = oView.byId("idInput2");
                
            //Check if Input fields have values                
            this.fnCheckFields(oInput1, oInput2);
                
            //Send error message if at least one of the input fields have error. Navigate if none have errors.                 
            if (oInput1.getValueState() === "Error" || oInput2.getValueState() === "Error") {                
                MessageBox.error(oResourceBundle.getText("ErrorMessage"));
            } else {                
                this.fnNavigateToDetailPage(oInput1.getValue(), oInput2.getValue());                
            }                
        },

        //Checks if values in Input fields are valid
        //oInput1 - Input object
        //oInput2 - 2nd Input Object
        fnCheckFields: function(oInput1, oInput2) {
            const sData1 = oInput1.getValue(),                
                sData2 = oInput2.getValue();
                
            //Check if Input fields have values 
            if (!sData1) { 
                oInput1.setValueState("Error");
            } else {                    
                oInput1.setValueState("None");
            }

            if (!sData2) { 
                oInput2.setValueState("Error");
            } else {
                oInput2.setValueState("None");
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
        }
    });
});
