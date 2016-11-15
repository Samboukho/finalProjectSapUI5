sap.ui.define([	'sap/ui/core/UIComponent',
				'sap/ui/model/json/JSONModel'],
	function(UIComponent, JSONModel) {
	"use strict";

	var Component = UIComponent.extend("sap.ui.project.timeSheet.Component", {

		metadata : {
			rootView : "sap.ui.project.timeSheet.View.App",
			dependencies : {
				libs : [
					"sap.m","sap.ui.commons","sap.ui.core"
				]
			},//	Configuration
		config: {
			resourceBundle: "i18n/i18n.properties"
		},
		
		//	Routing
		routing: {
			config : {
				routerClass 		: 	"sap.m.routing.Router",
				viewType			:	"XML",
				viewPath			:	"sap.ui.project.timeSheet.View",
				targetControl		:	"appTimeSheet",
				targetAggregation	: 	"pages",
				clearTarget			: 	false
			},
			routes: [{
				pattern: 		"Page",
				name:			"Page",
				view:			"Page"
				
	        },{
	        	pattern:		"",
	        	name:			"Home",
	        	view:			"Home"
	        },{
	        	pattern:		"Menu",
	        	name:			"Menu",
	        	view:			"Menu"
	        },{
	        	pattern:		"Calendar",
	        	name:			"Calendar",
	        	view:			"Calendar"
	        }]
			// config : {
			// 	sample : {
			// 		stretch : true,
			// 		files : [
			// 			"Page.view.xml",
			// 			"Page.controller.js"
			// 		]
			// 	}
			// },

			// //	Routing
			// routing: {
			// 	config : {
			// 		"routerClass": 		"sap.m.routing.Router",
			// 		viewType:			"XML",
			// 		viewPath:			"sap.ui.project.timeSheet.View",
			// 		controlAggregation: "pages",
			// 		clearTarget: 		false
			// 	},
			// 		// controlId:			"NavContainer",
			// 	routes: [{
			// 		pattern: 		"",
			// 		name:			"Page",
			// 		target: 		["page"]					
		 //        },{
			// 		pattern: 		"FD",
			// 		name:			"FinancialDashboard",
			// 		target: 		["fd"]					
		 //        },{
			// 		pattern: 		"RgR",
			// 		name:			"RevenueGrowthRate",
			// 		target: 		["rgr"]					
		 //        },{
			// 		pattern: 		"STD",
			// 		name:			"StoreDashboard",
			// 		target: 		["std"]					
		 //        },{
			// 		pattern: 		"SD",
			// 		name:			"SalesDashboard",
			// 		target: 		["sd"]					
		 //        },{
			// 		pattern: 		"InvD",
			// 		name:			"InventoryDashboard",
			// 		target: 		["invd"]					
		 //        },{
			// 		pattern: 		"HRD",
			// 		name:			"HRDashboard",
			// 		target: 		["hrd"]					
		 //        },{
			// 		pattern: 		"ECD",
			// 		name:			"ECommerceDashboard",
			// 		target: 		["ecd"]					
		 //        }],
		 //        targets: {
	  //               "home": {
	  //                   "viewName": "Page",
	  //                   "viewId":   "page"
	  //               },
	  //               "fd": {
	  //                   "viewName": "FinancialDashboard",
	  //                   "viewId":   "fd"
	  //               },
	  //               "rgr": {
	  //                   "viewName": "RevenueGrowthRate",
	  //                   "viewId":   "rgr"
	  //               },
	  //               "std": {
	  //                   "viewName": "StoreDashboard",
	  //                   "viewId":   "std"
	  //               },
	  //               "sd": {
	  //                   "viewName": "SalesDashboard",
	  //                   "viewId":   "sd"
	  //               },
	  //               "invd": {
	  //                   "viewName": "InventoryDashboard",
	  //                   "viewId":   "invd"
	  //               },
	  //               "hrd": {
	  //                   "viewName": "HRDashboard",
	  //                   "viewId":   "hrd"
	  //               },
	  //               "ecd": {
	  //                   "viewName": "ECommerceDashboard",
	  //                   "viewId":   "ecd"
	  //               }
	  //           }
			}			
		},
		
		init: function() {
		 	//	Init UI Component
		 	sap.ui.core.UIComponent.prototype.init.apply( this , arguments );
			
		 	// Router initialization
		 	this.getRouter().initialize();

		 	this.setModel( new JSONModel() , "userLog" );
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
