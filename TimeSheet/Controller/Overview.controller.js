sap.ui.define([
	'jquery.sap.global',
	'sap/ui/core/mvc/Controller',
	'sap/ui/model/json/JSONModel',
	'sap/m/MessagePopover',
	'sap/m/MessagePopoverItem',
], function(jQuery, Controller, JSONModel, MessagePopover, MessagePopoverItem) {
	"use strict";
	var PageController = Controller.extend("sap.ui.project.timeSheet.Controller.Overview", {

		onInit: function() {
			
			self = this;

			this.InitModels();

			// //	Routing
			// this.router = sap.ui.core.UIComponent.getRouterFor(this);
			// this.router.attachRoutePatternMatched(this.handleRouting, this);
		},

		InitModels: function( event ) {
			var LoginModel 		= new JSONModel([
				{	Username : "Samuel" , 	Password : "1234"	, Name : "Samuel" , FamilyName : "Boukhobza" , Mail : "samboukho@gmail.com"},
				{	Username : "Daniel" ,	Password : "5678"	, Name : "" , FamilyName : "" , Mail : ""},
				{	Username : "Mariana", 	Password : "9123"	, Name : "" , FamilyName : "" , Mail : ""},
				{	Username : "Erez"	,	Password : "4567"	, Name : "" , FamilyName : "" , Mail : ""}]
			);
			this.getView().setModel(LoginModel, "LoginModel");

			
		},

		onLoginPress: function( event ) {
			var login = this.getView().getModel("LoginModel").getData(),
				username = this.byId("usernameInput").getValue(),
				password = this.byId("passwordInput").getValue();

			for (var i = 0; i < login.length; i++) {
				if ( login[i].Username == username && login[i].Password == password ) {
					login[i].log = "true";
					this.getView().getModel( "userLog" ).setData( login[i] );
					var router 			= 	sap.ui.core.UIComponent.getRouterFor( this.getView() );
					router.navTo("Detail",{ "Article": username}, false);
				}
			}

		}


	});
});