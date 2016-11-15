
sap.ui.define([
		'jquery.sap.global',
		'sap/ui/core/mvc/Controller',
		'sap/ui/model/json/JSONModel',
		'sap/m/MessagePopover',
		'sap/m/MessagePopoverItem'
	], function(jQuery, Controller, JSONModel, MessagePopover, MessagePopoverItem) {
	"use strict";
	sap.ui.controller("sap.ui.project.timeSheet.Controller.Menu", {

		onInit: function () {
			this.getView().addStyleClass("sapUiSizeCompact");
			
			this.getView().setModel( new JSONModel("Models/Model.json") , "List");
		}
	})
});
