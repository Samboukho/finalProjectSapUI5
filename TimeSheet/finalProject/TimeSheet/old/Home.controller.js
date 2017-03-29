sap.ui.define([
		'jquery.sap.global',
		'sap/ui/core/mvc/Controller',
		'sap/ui/model/json/JSONModel',
		'sap/m/MessagePopover',
		'sap/m/MessagePopoverItem',
], function(jQuery, Controller, JSONModel, MessagePopover, MessagePopoverItem) {
	"use strict";
	var PageController = Controller.extend("sap.ui.project.timeSheet.Controller.Home", {

	onInit: function () {
	    self = this;


		this.getView().addStyleClass("sapUiSizeCompact");
		this.getView().setModel( new JSONModel("Models/Model.json") , "List");
		this.getView().setModel( new JSONModel("Models/masterList.json") , "MasterList");
		this.getView().setModel( new JSONModel("Models/CompanyList.json") , "CompanyList");
		this.getView().setModel( new JSONModel("Models/StoresList.json") , "StoresList");
		this.getView().setModel( new JSONModel("Models/PeriodList.json") , "PeriodList");
		this.getView().setModel( new JSONModel("Models/eCommerceList.json") , "eCommerceList");
		this.getView().setModel( new JSONModel() , "CalendarList");
		// this.handleShowMaster();
		
		//Set date and clock on the unified shell
		var oLabel = this.getView().byId("oLabel"),
			result = this.GetClock();
	    
	    oLabel.setText(result);
	    
	    
	    setInterval(function() {
	      var result = self.GetClock();
	      oLabel.setText(result);
	    }, 60000);

		//	Routing
		this.router 	= sap.ui.core.UIComponent.getRouterFor( this );
		this.router.attachRoutePatternMatched( this.handleRouting , this );
	},
	
	/**
	 * Routing handler
	 * @param {jQuery.Event} event
	 * 
	 * @public
	 */
	handleRouting: function( event ) {
		var routeName	= event.getParameter( "name" ),
			masterList 	= this.byId( "masterList" ),
			menuList 	= this.getView().getModel( "MasterList" ),
			menu 		= {},
			items 		= masterList.getItems();

		jQuery.each( items , function( index , item ) {
			menu 		= menuList.getProperty( item.getBindingContextPath() );

			if( menu.id == routeName ) {
				masterList.setSelectedItem( item );
				return false;	
			}
		});

		// var navCon = self.byId( "NavContainer" );
		// navCon.to( "Page" )
		if( !this.getView().getModel( "userLog" ) ){
			var router 			= 	sap.ui.core.UIComponent.getRouterFor( this.getView() );
			router.navTo( "Page", false );
		}
	},

	handleLogoffPress:function(){
		window.history.go( -1 );
	},

	GetClock: function() {
      var tday = new Array("Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday");
      var tmonth = new Array("January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December");
      var d = new Date();
      var 	nday = d.getDay(),
      		nmonth = d.getMonth(),
	     	ndate = d.getDate(),
	     	nyear = d.getYear(),
	     	nhour = d.getHours(),
	     	nmin = d.getMinutes(),
	     	nsec = d.getSeconds();
     
      if (nyear < 1000){ 
      	nyear += 1900;
      }
      if (nmin <= 9) {
      	nmin = "0" + nmin;
      }
     
      
      
      var result = "" + tday[nday] + ", " + tmonth[nmonth] + " " + ndate + ", " + nyear + " " + nhour + ":" + nmin ;
      return result;
    },

	/**
	 * Navigation function on the other view page
	 * by press on the master view list
	 */
	NavToView: function( event ) {
		var listItem 	= event.getParameter( "listItem" ),
			menuList 	= this.getView().getModel( "MasterList" ),
			selMenu 	= menuList.getProperty( listItem.getBindingContextPath() ),
			navCon 		= this.byId( "NavContainer" );


			navCon.to( selMenu.id );


		// 	router 		= sap.ui.core.UIComponent.getRouterFor( this );

		// router.navTo( selMenu.id );
	},

	handleShowMaster:function(){
		var splitPage	= this.byId( "SplitPage" );
		if( splitPage.getProperty("showSecondaryContent") ){
			splitPage.setShowSecondaryContent( false );
		}
		else{
			splitPage.setShowSecondaryContent( true );
		}
	},

	changeToSingleSelectionMode: function () {
            var oCalendar = this.getView().byId("selectionCalendar");
            this._clearModel();
            oCalendar.unselectAllDates();
            oCalendar.setSelectionMode(sap.me.CalendarSelectionMode.SINGLE);
        },

        changeToRangeSelectionMode: function () {
            var oCalendar = this.getView().byId("selectionCalendar");
            this._clearModel();
            oCalendar.unselectAllDates();
            oCalendar.setSelectionMode(sap.me.CalendarSelectionMode.RANGE);
        },

        changeToMultiSelectionMode: function () {
            var oCalendar = this.getView().byId("selectionCalendar");
            this._clearModel();
            oCalendar.unselectAllDates();
            oCalendar.setSelectionMode(sap.me.CalendarSelectionMode.MULTIPLE);
        },

        onTapOnDate: function (oEvent) {
            sap.m.MessageToast.show("You tapped on " + oEvent.getParameters().date + " didSelect: " + oEvent.getParameters().didSelect);
            this._updateModel();
        },

        onChangeRange: function (oEvent) {
            sap.m.MessageToast.show("You selected a range of dates starting on: " + oEvent.getParameters().fromDate + " to: " + oEvent.getParameters().toDate);
            this._updateModel();
        },

        _updateModel: function () {
            var oCalendar = this.getView().byId("selectionCalendar");
            var aSelectedDates = oCalendar.getSelectedDates();
            var strDate;
            var oData = {selectedDates: []};
            if (aSelectedDates.length > 0) {
                for (var i = 0; i < aSelectedDates.length; i++) {
                    strDate = aSelectedDates[i];
                    oData.selectedDates.push({Date: strDate });
                    // Because of potential issues due to DST and the time in the night at which the change happens,
                    // the recommended way to instantiate a Date object is:
                    // var oDate = sap.me.Calendar.parseDate(strDate);
                    // Do not rely on anything lower than the day unit in this Date object.
                    // Hours, minutes, seconds, milliseconds must not be taken into account.

                    // Since you are reading this, the explanation why the hours must not be taken into account.
                    // Change your computer's time zone to Brasilia (UTC-3)
                    // Open your favorite browser and create a Date object for October 19th, 2014:
                    // var oTheDayBefore = new Date(2014, 9, 19);
                    // Display 'oTheDayBefore'.
                }
                this.getView().getModel( "CalendarList" ).setData(oData);
            } else {
                this._clearModel();
            }
        },

        _clearModel: function () {
            this.getView().getModel( "CalendarList" ).setData({selectedDates: []});
        }
});


	// return PageController;

});
