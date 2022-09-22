//javascript.js

const kmMsg= document.querySelector(".km");

var myLatLng = { lat: 38.3460, lng: -0.4907 };
var mapOptions = {
    center: myLatLng,
    zoom: 7,
    mapTypeId: google.maps.MapTypeId.ROADMAP

};

//create map
var map = new google.maps.Map(document.getElementById('googleMap'), mapOptions);

//create a DirectionsService object to use the route method and get a result for our request

var directionsService = new google.maps.DirectionsService();

//create a DirectionsRenderer object which we will use to display the route
var directionsDisplay = new google.maps.DirectionsRenderer();

//bind the DirectionsRenderer to the map
directionsDisplay.setMap(map);


//define calcRoute function
function calcRoute() {
    //create request
    var request = {
        origin: document.getElementById("from").value,
        destination: document.getElementById("to").value,
        travelMode: google.maps.TravelMode.DRIVING, //WALKING, BYCYCLING, TRANSIT
        unitSystem: google.maps.UnitSystem.METRIC
    }

    //pass the request to the route method
    directionsService.route(request, function (result, status) {
        if (status == google.maps.DirectionsStatus.OK) {

            //Get distance and time
            const output = document.querySelector('#output');


            // ==== main output =======
            output.innerHTML = "<div> The distance between " + document.getElementById("from").value.bold() + " & " + document.getElementById("to").value.bold() + " is " + result.routes[0].legs[0].distance.text.bold() + "." + "<br />Duration  : " + result.routes[0].legs[0].duration.text.bold() + ".</div>";

            const manResult= result.routes[0].legs[0].distance.text;
            kmMsg.innerHTML= manResult;

            //display route
            directionsDisplay.setDirections(result);
        } 
        else 
        {
            //delete route from map
            directionsDisplay.setDirections({ routes: [] });
            map.setCenter(myLatLng);


            //show error message
            output.innerHTML = "<div class='alert-danger'><i class='fas fa-exclamation-triangle'></i>There are no roads, Better to go through Plane.</div>";

        }
    });

}



//create autocomplete objects for all inputs
var options = {
    types: ['(cities)']
}

var input1 = document.getElementById("from");
var autocomplete1 = new google.maps.places.Autocomplete(input1, options);

var input2 = document.getElementById("to");
var autocomplete2 = new google.maps.places.Autocomplete(input2, options);
