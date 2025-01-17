sap.ui.define([
    "sap/ui/core/format/NumberFormat"
], function(NumberFormat){
    'use restrict';
    return{
    formatCurrency : function(amount,currency){
        // "NumberFormat" required from module "sap/ui/core/format/NumberFormat"
                var oCurrencyFormat = NumberFormat.getCurrencyInstance();
                return oCurrencyFormat.format(amount, currency); // output: EUR 12,345.68
                //return oCurrencyFormat.format(amount, currency);

    }
}
});
