$(document).ready(function () {
    // automatic toggling of main menu based on current url
    var path = window.location.pathname;
    pathComponents = path.split('/');
    
    switch(pathComponents[1]) {
    case "shipment":
	$('#shipment-toggle').dropdown('toggle');
	$('#shipment-'+pathComponents[2]+'-toggle').dropdown('toggle');
	break;
    case "purchase":
	$('#purchase-toggle').dropdown('toggle');
	break;
    case "qc":
	$('#qc-toggle').dropdown('toggle');
	break;
    case "accounts":
	$('#accounts-toggle').dropdown('toggle');
	break;
    case "db":
	$('#db-toggle').dropdown('toggle');
	break;
    case "user":
	$('#admin-toggle').dropdown('toggle');
	break;
    case "currency":
	$('#admin-toggle').dropdown('toggle');
	break;
    case "pricetier":
	$('#admin-toggle').dropdown('toggle');
	break;
    case "settings":
	$('#admin-toggle').dropdown('toggle');
	break;
    default:
	console.log("No menu item to toggle for this url.");
    }

});
