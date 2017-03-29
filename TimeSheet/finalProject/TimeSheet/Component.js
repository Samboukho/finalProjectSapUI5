sap.ui.define([	'sap/ui/core/UIComponent',
				'sap/ui/model/json/JSONModel'],
	function(UIComponent, JSONModel) {
	// "use strict";

	return UIComponent.extend("sap.ui.project.timeSheet.Component", {
		metadata: {
			manifest: "json"
		},

	// 	refreshData: 			false,
	 
	// //	Application meta data
	// metadata: {
	// 	name:				"Time Sheet",
	// 	version:			"0.1",
	// 	includes:			[],
	// 	dependencies: {
	// 		libs:			["sap.m","sap.ui.commons","sap.ui.core"],
	// 		components:		[]
	// 	},
		
	// 	//	Root view definition
	// 	rootView:			"sap.ui.project.timeSheet.View.App",
		
	// 	//	Configuration
	// 	config: {
	// 		resourceBundle: "i18n/i18n.properties"
	// 	},
		
	// 	//	Routing
	// 	routing: {
	// 		config : {
	// 			viewType:		"XML",
	// 			targetControl:	"appTimeSheet",
	// 			targetAggregation:"pages",
	// 			clearTarget: 	false
	// 		},
	// 		routes: [{
	// 			pattern: 		"",
	// 			name:			"Overview",
	// 			view:			"sap.ui.project.timeSheet.View.Overview"
				
	//         },{
	//         	pattern:		"Detail/{Article}",
	//         	name:			"Detail",
	//         	view:			"sap.ui.project.timeSheet.View.Detail"
	//         },{
	//         	pattern:		"NouvelleRecette",
	//         	name:			"NewArticle",
	//         	view:			"sap.ui.project.timeSheet.View.Detail"
	//         }]
	// 	}
		
		
		init: function() {
		 	//	Init UI Component
		 	sap.ui.core.UIComponent.prototype.init.apply( this , arguments );
			
		 	// Router initialization
		 	this.getRouter().initialize();

		 	//	Article data
			this.setModel( new sap.ui.model.json.JSONModel() , "userLog" );
		 // 	var tabFileModel = new sap.ui.model.json.JSONModel( "Database=acsm_39d09936a556493;Data Source=ap-cdbr-azure-east-a.cloudapp.net;User Id=b0cf2c383873e1;Password=c23adc23" );
			// this.setModel( tabFileModel , "tableData" );

		 	// this.setModel( new JSONModel() , "https://schema.management.azure.com/schemas/2015-01-01/deploymentTemplate.json#" );
		},
				
		/**
		 * Destroy
		 */
		destroy: function() {
			if(this.routeHandler){
				this.routeHandler.destroy();
			}
			sap.ui.core.UIComponent.destroy.apply(this,arguments);
		}		
	});

	return Component;
});
