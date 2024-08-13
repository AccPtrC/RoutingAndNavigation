sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "sap/ui/core/UIComponent",	
  "sap/ui/core/routing/History",
],
function (Controller, UIComponent, History) {
  "use strict";

  return Controller.extend("app.controller.Detail", {
      onInit: function () {
        const oRouter = UIComponent.getRouterFor(this);
        oRouter.getRoute("RouteDetail").attachPatternMatched(this._onObjectMatched, this);
      },

      //When triggered, puts passed parameters in Input fields
      //oEvent - Event instance 
      _onObjectMatched: function (oEvent) { 
        const sParam1 = oEvent.getParameter("arguments").Param1;
        const sParam2 = oEvent.getParameter("arguments").Param2;
        const oText1 = this.getView().byId("idInput1");        
        const oText2 = this.getView().byId("idInput2");
              
        oText1.setValue(sParam1);
        oText2.setValue(sParam2);
      },

      //When triggered, when back button is pressed.
      //Triggers navigation back to previous page. 
      onNavBack: function () { 
        const oHistory = History.getInstance();    
        const sPreviousHash = oHistory.getPreviousHash();
  
        if (sPreviousHash  && sPreviousHash !== undefined) {
          window.history.go(-1); 

        } else {
          const oRouter = UIComponent.getRouterFor(this); 
          oRouter.navTo("RouteNavigation");
        } 
      }

  });
});
