sap.ui.define([
    'sap/ui/core/mvc/Controller',
    'emc/hr/payroll/util/formatter'
], function(Controller, Formatter){
    'use restrict';
    return Controller.extend("emc.hr.payroll.controller.BaseController",{
        formatter: Formatter,
        extractPath: function(oEvent){
            var fruitId = oEvent.getParameter("arguments").fruitId;
            return '/fruits/' + fruitId;
        },

        readMessage: function(key, param1){
            var oResourceModel = this.getOwnerComponent().getModel("i18n");
            var oResourceBundle = oResourceModel.getResourceBundle();
            return oResourceBundle.getText(key,param1);
        }

    });
});