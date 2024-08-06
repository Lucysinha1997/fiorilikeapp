sap.ui.define([
    'sap/ui/core/UIComponent'
], function(UIComponent){
    'use restrict';
    return UIComponent.extend("emc.hr.payroll.Component",{
        metadata: {
            manifest: "json"
        },
        init: function(){
            //this line will call the base class constructor
            UIComponent.prototype.init.apply(this);
            //step1:-Inside the manifest.json file add -rootView ,routing section
            //step2:get the router object
            var oRouter = this.getRouter();
            //step 3:-Initialize the router
            oRouter.initialize();

            //   //step1:-insdie the manifest.json file add -rootview,routing
            // //step2:-get tj=he roter object
            // this.Router = this.getOwnerComponent();
            // //step3:-initialize the router
            // oRouter.initialize();


        }
   


        // createContent: function(){
        //     var oView = sap.ui.view({
        //         viewName: "emc.hr.payroll.view.App",
        //         id: "idAppView",
        //         type: "XML"
        //     });
        //     //step1:-create view1 object
        //     var oView1 = sap.ui.view({
        //         viewName: "emc.hr.payroll.view.View1",
        //         id: "idView1",
        //         type: "XML"
        //     });

        //     //step2:-create view2 object
        //     var oView2 = sap.ui.view({
        //         viewName: "emc.hr.payroll.view.View2",
        //         id: "idView2",
        //         type: "XML"
        //     });
        //     //step3:-get the app controller object from app.view.xml
        //     var oAppCon = oView.byId("appCon");
        //     //step4:-inject the view1 and view2 inside the container
        //     oAppCon.addMasterPage(oView1).addDetailPage(oView2);
        //     return oView;

        // }
    });
});