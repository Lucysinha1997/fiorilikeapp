sap.ui.define([
    'emc/hr/payroll/controller/BaseController',
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
], function(Controller, Filter, FilterOperator){
    'use strict';
    return Controller.extend("emc.hr.payroll.controller.View1",{
        onInit: function(){
          this.Router =  this.getOwnerComponent().getRouter();
          this.Router.getRoute("detail").attachPatternMatched(this.herculis, this);

        },
        onAdd: function(){
            this.Router.navTo("add");
        },
        herculis: function(oEvent){
                
                      var sPath = this.extractPath(oEvent);
                      var oList = this.getView().byId("idLST");
                      var element = {};
                      if(oList.getItems().length > 0)
                        {   
                            for(let i = 0; i < oList.getItems().length; i++) {
                                element = oList.getItems()[i];
                                if (element.getBindingContextPath() === sPath){
                                    oList.setSelectedItem(element);
                                    break;

                                }
                            }
                    //   if(element){
                    //     oList.setSelectedItem(element);
                    //   }
                     }
                    
      
              },
        onNext: function(){
            //step1:get the parent control object-container for our view
            var oAppCon = this.getView().getParent();
            //step2:ask parent to nav to next view
            oAppCon.to("idView2");
        },
        onFruitSelect: function(oEvent){
            //step1:- get the router object
            //step2:-trigger the route
            var oSelectedItem = oEvent.getParameter("listItem");
            this.Router.navTo("detail",{
                fruitId: oSelectedItem.getBindingContextPath().split("/")[2]
            });
        },
        onNavnxet: function(oEvent){
            this.onNext();
        },
        onDelete: function(oEvent){

            //step1:find out which item was selected for deletion
            var oSeleted = oEvent.getParameter("listItem");
            //step2:Get list object
            var oList = oEvent.getSource();
            //step3:Remove the item from the list
            oList.removeItem(oSeleted);
        },
        onDeleteItems: function(oEvent){
            var oList = this.getView().byId("idLST");
            var aSelectedItems = oList.getSelectedItems();
            aSelectedItems.forEach(item =>{
                oList.removeItem(item);
            });

        },
        onSearch: function(oEvent){
            //step1:- what is that user type in search fiels
            var  sSearch = oEvent.getParameter("query");
            if(sSearch=== "" || sSearch === undefined){
                var  sSearch = oEvent.getParameter("newValue");

            }
            //step2:-construct the filter object wuth operand and operator
            var oFilter =  new Filter("CATEGORY", FilterOperator.Contains, sSearch);
            // var oFilter2 =  new Filter("taste", FilterOperator.Contains, sSearch);
            // var aFilter = [oFilter, oFilter2];
            // var oMaster = new Filter({
            //     filters: aFilter,
            //     and: false
            // });
            //step3:-get the object list
            var oList = this.getView().byId("idLST");            
            //step4:-inject the filter to the list
            oList.getBinding("items").filter(oFilter);


        },
        onItemClick: function(){
            //this:-is my current class object-which is our controller
            this.onNext();
        }
    });
});
