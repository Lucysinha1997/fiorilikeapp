sap.ui.define([
    'sap/ui/core/mvc/Controller',
    "sap/m/MessageBox",
    "sap/m/MessageToast",
    "sap/ui/model/json/JSONModel"

], function(Controller, MessageBox, MessageToast, JSONModel){
    'use strict';
    return Controller.extend("emc.hr.payroll.controller.Add",{
        onInit: function(){
            this.oModel = new JSONModel();
            this.oModel.setData({
                    "productData": {

                    "PRODUCT_ID" : "HT-1000",
                    "TYPE_CODE" : "PR",
                    "CATEGORY" : "Notebooks",
                    "NAME" : "<enter name>",
                    "DESCRIPTION" : "<enter description>",
                    "SUPPLIER_ID" : "0100000046",
                    "SUPPLIER_NAME" : "SAP",
                    "TAX_TARIF_CODE" : "1 ",
                    "MEASURE_UNIT" : "EA",
                    "DIM_UNIT" : "CM",
                    "PRICE" : "956",
                    "CURRENCY_CODE" : "EUR",

                }
            });
            this.getView().setModel(this.oModel, "viewModel");

        },
        onMostExp:function(){
            var that = this;
            //step1: get the odata model object
            var oDataModel = this.getView().getModel();
            //step2: send the call function
            oDataModel.callFunction("/GetMostExpensiveProduct",{
                urlParameters:{
                    "I_CATEGORY" : "Servers"
                },
                success: function(data){
                     //step3:- success response set data on screeen by local model
                     that.oModel.setProperty("/productData", data);

                }
            })
         


        },
        onDelete: function(oEvent){
            // for update call oDataModel.update("/Entity",data);
            var oDataModel = this.getView().getModel();
            oDataModel.remove("/ProductSet('" + this.getView().byId("name").getValue()+"')",{
                success: function(){
                    MessageToast.show("Product is now deleted");
                }
            });

        },
        onUpdate:function(){

        },
        onEnter:function(){
            var that = this;
         //step1: read the product id from screen
         var sText =  oEvent.getSource().getValue();
         //step2: get the odata model object
         var oDataModel = this.getView().getModel();
         //step3: fire the read call
         oDataModel.read("/ProductSet('" + sText +"')",{
             //step4: handle sucess -set data to our local model
             success: function(data){
                this.oModel.setProperty("/productData",payload);
             },
             error: function(oError){
                debugger;
             }

         });
        

        },
        onClear:function(){
            var payload =  this.oModel.getProperty("/productData");
            payload.PRODUCT_ID = "";
            payload.SUPPLIER_ID = "";
            payload.PRICE = "";
            payload.CURRENCY_CODE = "USD";
            payload.NAME = "",
            payload.DESCRIPTION = "";
            this.oModel.getProperty("/productData",payload);


        },
        onSave:function(){
           // MessageBox.confirm("This functionality is under construction");
           //step1:- prepre the payload
           var payload = this.oModel.getProperty("/productData");
           //step2:- get the odata model to communicate with Backend;
           var oDataModel =  this.getView().getModel();
           //step3:- fire the POST call on entity set with payload.
           oDataModel.create("/ProductSet",payload,{
            success: function(data){
                //call back for positive response
                MessageToast.show("The product was created successfully");

            },
            error: function(oError){
                //call back for negative response
                MessageBox.error("An internal erorr occured");

            }

           });

        }

    });

});