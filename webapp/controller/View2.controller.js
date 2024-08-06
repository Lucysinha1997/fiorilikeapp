sap.ui.define([
    'emc/hr/payroll/controller/BaseController',
    "sap/ui/core/Fragment",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    'sap/m/MessageBox',
    'sap/m/MessageToast',
    'sap/m/MessageStrip'
], function(Controller, Fragment, Filter, FilterOperator, MessageBox, MessageToast, MessageStrip){
    'use strict';
    return Controller.extend("emc.hr.payroll.controller.View2",{
        onInit: function(){
            //step1:-get the router object.
            this.oRouter = this.getOwnerComponent().getRouter();
            this.oRouter.getRoute("detail").attachPatternMatched(this.herculis, this);
            //
        },
        onLinkPress: function(oEvent){
            var sText = oEvent.getSource().getText();
            sText = 'https://google.com?q=' + sText;
            window.open(sText);

        },
        oCityPopup: null,
        oSupplierPopup: null,
        onSearchPopup : function(oEvent){
            //step1: get the search string
            var sVal = oEvent.getParameter("value");
            var oBinding = oEvent.getParameter("itemsBinding");
            //step2: get the popup object itself
            //step3: prepare filter
            var oFilter = new Filter("name", FilterOperator.Contains, sVal);
            //step4: pass filter to popup items bindnig
            oBinding.filter(oFilter);


        },
        handleConfirm: function(status){
            if(status === "OK"){
//              alert("this functionality is under construction");
                MessageToast.show(this.readMessage("XMSG_ORDERL" ,"90099"));

            }else{

            }
        },
        onOrder: function(params){
            MessageBox.confirm(this.readMessage("XMSG_CONFIRM"),{
                title: 'Confirmation',
                onClose: this.handleConfirm.bind(this)
            });

        },
        onConfirm: function(oEvent){
            var sId = oEvent.getSource().getId();
            if(sId.indexOf("city") !== -1){
                //step1:Read the value which was selected in the popup
            var oSelectedItem = oEvent.getParameter("selectedItem");
            var sText = oSelectedItem.getLabel();
            //step2: we have to put that value to the field inside the table
            //step3:
            this.selectedField.setValue(sText);

            }else{
                //1.get the table object
                var oTable = this.getView().byId("idTab");
                //2.read multi select item
                var aSelectedItems = oEvent.getParameter("selectedItems");
                //3.construct filter
                var aFilters = [];
                for(let index = 0; index < aSelectedItems.length; index++){
                    const element = aSelectedItems[index];
                    const sText =  element.getLabel();
                    aFilters.push(new Filter('name',FilterOperator.EQ, sText));
                }
              
 //               alert("this functionality is under construction");
            }
            var oFilter = new Filter({
                filters: aFilters,
                and : false
            });
            oTable.getBinding("items").filter(oFilter);
    
            
        },
  
        onF4Help: function(oEvent){
           // alert("this functionality is under construction");
           //
           this.selectedField = oEvent.getSource();
           var that = this;
           //new sap.m.SelectDialog
           if(!this.oCityPopup){
            Fragment.load({
            name:"emc.hr.payroll.fragments.popup",
            type: "XML",
            id: 'city',
            controller: this //controller access is provided to the popup
           })
           //Asynchronous- call back and promises
           .then(function(oPopup){
            //assign the object created by system to our global variable
            that.oCityPopup = oPopup;
            that.getView().addDependent(that.oCityPopup);
            that.oCityPopup.setTitle("Select city");
            that.oCityPopup.bindAggregation("items",{
                path: '/cities',
                template: new sap.m.DisplayListItem({
                    label:'{name}',
                    value: '{famousFor}'
                })
            });
            //change the title
            that.oCityPopup.setMultiSelect(false);
            that.oCityPopup.open();
           });

        }else{
            this.oCityPopup.open();
        }
    },
        onFilter: function(oEvent){
           // alert("this functionality is under construction");
           if(!this.oSupplierPopup){
           var that = this;
           Fragment.load({
            name:"emc.hr.payroll.fragments.popup",
            type: "XML",
            id: 'supplier',
            controller: this //controller access is provided to the popup
           })
           //Asynchronous- call back and promises
           .then(function(oSupplier){
            that.oSupplierPopup = oSupplier;
            that.oSupplierPopup.setTitle("Select Supplier");
            //provinding access of the immune system to parasite using wbc(who already have access to the resource)
            that.getView().addDependent(that.oSupplierPopup);
            that.oSupplierPopup.bindAggregation("items",{
                path: '/supplier',
                template: new sap.m.DisplayListItem({
                    label: '{name}',
                    value: '{city}'
                })
            });
            that.oSupplierPopup.open();
           });
        }else{
            this.oSupplierPopup.open();
        }
        },
        herculis: function(oEvent){
      //      debugger;
                // var fruitId = oEvent.getParameter("arguments").fruitId;
                // var sPath = '/fruits/' + fruitId;
                var sPath = this.extractPath(oEvent);
                this.getView().bindElement({
                    path: sPath,
                    parameteres:{
                        expand: 'To_Supplier'
                    }
                });//BINDING WITH FRUITS

        },
        onBack: function(){
            this.getView().getParent().to("idView1");
        }
    });
});