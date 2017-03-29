jQuery.sap.declare( "XCUI.app.HomeScreen.util.Formatter" );

XCUI.app.ArtMgt.util.Formatter = {
	StatusColor:function( actual , expected){
		if( actual < expected){
			return "Error";
		}
		else{
			return "Success";
		}

	}

}