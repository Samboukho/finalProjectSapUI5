jQuery.sap.require( "sap/ui/model/Filter" );
jQuery.sap.require( "sap/ui/model/FilterOperator" );
jQuery.sap.require( "jquery.sap.resources" );
jQuery.sap.require( "sap/ui/Device" );
jQuery.sap.require( "sap/m/MessageBox" );
jQuery.sap.require( "sap/m/SplitContainer" );
jQuery.sap.declare(	"com.ODataFileUploader.Component");
jQuery.sap.require("sap.ui.unified.FileUploader");
jQuery.sap.require( "sap/m/MessageToast" );
jQuery.sap.require( "sap/m/StandardListItem" );
// jQuery.sap.require(	"XCUI/app/catalogMat/util/Formatter" );

sap.ui.controller(  "sap.ui.project.timeSheet.Controller.Detail", {
	/**
	* Called when a controller is instantiated and its View controls (if available) are already created.
	* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
	* @memberOf test.detail
	*/
	onInit: function() {
		this.getView().addStyleClass( "sapUiSizeCompact" );

		// var webSocket = new WebSocket('ws://localhost:8080/fd6/websocket');
		// webSocket.onerror = function(event) {
		// 	onError(event)
		//   };
		// webSocket.onopen = function(event) {
		// 	onOpen(event)
		//   };
		// webSocket.onmessage = function(event) {
		// 	onMessage(event)
		// };
		
		thisDetail	= this;
		
		thisDetail.InitModels();
		//	Routing
		this.router 	= sap.ui.core.UIComponent.getRouterFor(this);
		this.router.attachRoutePatternMatched( this.handleRouting , this);

		this.getView().addStyleClass("sapUiSizeCompact");
		this.getView().setModel( new sap.ui.model.json.JSONModel("Models/Model.json") , "List");
		this.getView().setModel( new sap.ui.model.json.JSONModel("Models/masterList.json") , "MasterList");
		this.getView().setModel( new sap.ui.model.json.JSONModel("Models/CompanyList.json") , "CompanyList");
		this.getView().setModel( new sap.ui.model.json.JSONModel("Models/StoresList.json") , "StoresList");
		this.getView().setModel( new sap.ui.model.json.JSONModel("Models/PeriodList.json") , "PeriodList");
		this.getView().setModel( new sap.ui.model.json.JSONModel("Models/ProjectWeek.json") , "ProjectWeek");
		this.getView().setModel( new sap.ui.model.json.JSONModel() , "CalendarList");
		this.getView().setModel( new sap.ui.model.json.JSONModel() , "MainData");
		// this.handleShowMaster();
		
		//Set date and clock on the unified shell
		var oLabel = this.getView().byId("oLabel"),
			result = this.GetClock();
	    
	    oLabel.setText(result);
	    
	    
	    setInterval(function() {
	      var result = thisDetail.GetClock();
	      oLabel.setText(result);
	    }, 60000);
	},
	InitModels: function(){

		

		// Model for edition article
		this.getView().setModel( new sap.ui.model.json.JSONModel({	EditOn 		:	false,
																	delete 		: 	"Delete" }), "Edit" );
		


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
        },

	handleRouting: function( event ){
		// thisDetail.getView().rerender();
		pageName 		= event.getParameter( "name" );

		

		// thisDetail.byId( "iconTabDetail" ).setSelectedKey( "infoGeneralTab" );
	},

	onEdit: function ( event ) {
		var OEdit 			= 	thisDetail.getView().getModel( "Edit" ).getProperty( "/EditOn" );
		thisDetail.getView().getModel( "Edit" ).setProperty( "/EditOn" , !OEdit );
	},

	handleNavButtonPress: function(){
		if( thisDetail.getView().getModel( "Edit" ).getProperty( "/EditOn" ) ){
			thisDetail.onEdit();
		}
		window.history.go( -1 );	
	},
	HandleFilePress: function( event ){
		if( !thisDetail._FilesUploadSourcing ){
			thisDetail._FilesUploadSourcing = sap.ui.xmlfragment( "XCUI.app.catalogMat.Fragment.FileTabPopUp", thisDetail);
			thisDetail.getView().addDependent(thisDetail._FilesUploadSourcing);
		}
	 	thisDetail._FilesUploadSourcing.open();
	},
	onCloseFileSourcing: function( event ){
		thisDetail._FilesUploadSourcing.close();
	},
	fullScreen:function(){
		if( thisDetail.byId( "SplitPage" ).getShowSecondaryContent() ){
			thisDetail.byId( "SplitPage" ).setShowSecondaryContent( false );
			thisDetail.byId( "fullScreenId" ).setIcon( "sap-icon://exit-full-screen" );
		}
		else{
			thisDetail.byId( "SplitPage" ).setShowSecondaryContent( true );
			thisDetail.byId( "fullScreenId" ).setIcon( "sap-icon://full-screen" );
		}
	},
	exitFullScreen:function(){
		thisDetail.byId( "SplitPage" ).setShowSecondaryContent( true );
		thisDetail.byId( "expandableButton" ).setVisible( true );
		thisDetail.byId( "collapseButton" ).setVisible( false );
	},
	NavToView:function( event ){
		var navcon		= this.getView().byId("navCon"),
			path 		= event.getParameter("listItem").getBindingContext( "MasterList" ).getPath(),
			pageNumber	= this.getView().getModel( "MasterList" ).getProperty( path ).PageNumber;
		
		navcon.to(navcon.getPages()[pageNumber]);
	},
	formatDate:function( date ){
		if( date.length < 2 ){
			date = "0" + date;
		}
		return date;
	},
	toDateString:function( date ){
		var mounth		=	this.formatDate( date.getMonth() + 1 + "" ),
			day			=	this.formatDate( date.getDate() + "" );
		return date.getFullYear() + mounth + day;	
	},
	handleCalendarSelect:function( event ){
		var source	=	event.getSource(),
			date 	=	this.toDateString( source.getSelectedDates()[0].getStartDate() ),
			binding	=	source.getParent().getAggregation("content")[1].getBinding("items"),
			filter	=	[ new sap.ui.model.Filter( "Date" , sap.ui.model.FilterOperator.EQ , date ) ];
		binding.filter( filter );
	},
	onWeekChange:function( event ){
		var source 	= 	event.getSource(),
			sDate	=	source.getStartDate(),
			filter	=	[],
			binding	=	source.getParent().getAggregation("content")[1].getBinding("items"),
			begin	=	null,
			end		=	null;
		sDate.setDate( sDate.getDate() - 1 );	
		begin	=	this.toDateString( sDate );	
		sDate.setDate( sDate.getDate() + 7 );	
		end 	=	this.toDateString( sDate ),
		filter.push( new sap.ui.model.Filter( "Date" , sap.ui.model.FilterOperator.BT , begin, end ) );
		binding.filter( filter );
	}

});