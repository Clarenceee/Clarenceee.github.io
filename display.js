var mqtt;
var reconnectTimeout = 2000;
var host="outstanding-engineer.cloudmqtt.com";
var port=443;
//var acl = new Accelerometer({frequency:60});
var location_array = [0,0];
var mqtt_user_data = "user_data"
var user_data = 0;
// Create a client instance
var client = new Paho.MQTT.Client(host, port,"client_id_receiver");
var found = 0;
var user_list = 0;
var queryString = decodeURIComponent(window.location.search);
queryString = queryString.substring(1);
var queries = queryString.split("=");
var username = queries[1];
console.log(username);
//Example client = new Paho.MQTT.Client("m11.cloudmqtt.com", 32903, "web_" + parseInt(Math.random() * 100, 10));
// set callback handlers
client.onConnectionLost = onConnectionLost;
client.onMessageArrived = onMessageArrived;
var options = {
useSSL: true,
userName: "odzguzja",
password: "XIC7binxmQ8e",
onSuccess:onConnect,
onFailure:doFail
}

// connect the client
client.connect(options);
function dataProcessing(user_data)
{
	var mqtt_name = user_data.driver_user_name;
	var latitude = user_data.latitude;
	var longitude = user_data.longitude;
	var eta = user_data.eta;
	var line = user_data.line;
	var dest_lat = user_data.dest_lat;
	var dest_long = user_data.dest_long;
	var line_obj = [];
	if (mqtt_name == username)
	{
		const image = "https://img.icons8.com/android/24/000000/car.png";
		const dest_image = "https://img.icons8.com/android/24/000000/home.png";
		var mapProp= {
			  center:new google.maps.LatLng(latitude,longitude),
			  zoom:15,
			};
		
		var map = new google.maps.Map(document.getElementById("googleMap"),mapProp);
		var markerOptions = {
			position: new google.maps.LatLng(latitude,longitude),
			icon: image,
			map: map
		}
		var myMarker = new google.maps.Marker(markerOptions);
		var dest_markerOptions = {
			position: new google.maps.LatLng(dest_lat,dest_long),
			icon: dest_image,
			map: map
		}
		line.forEach(function (val) {
			line_obj.push({lat: val[0], lng: val[1]});
		});
			
		var dest_marker = new google.maps.Marker(dest_markerOptions);
		var path = new google.maps.Polyline({
			path:line_obj,
			strokeColor: '#FF0000',
			strokeWeight: 2
		});
		path.setMap(map);
		document.getElementById("eta").innerHTML = "Your parcel will arrive at: " + eta;
		// set up connection between html and node red
	}
}
// called when the client connects
function onConnect() {
// Once a connection has been made, make a subscription and send a message.
	console.log("onConnect");
	client.subscribe(mqtt_user_data);
	setInterval(requestData(username),1000);
}

function doFail(e){
console.log(e);
}

// called when the client loses its connection
function onConnectionLost(responseObject) {
if (responseObject.errorCode !== 0) {
  console.log("onConnectionLost:"+responseObject.errorMessage);
  }
}
function requestData (username)
{
	var user_correct_name = new Paho.MQTT.Message(username);
	user_correct_name.destinationName = "user_correct_name";
	client.send(user_correct_name);
}
// called when a message arrives
function onMessageArrived(message) {
	if (message.destinationName == mqtt_user_data)
	{
		//user_data = message.payloadString.split(",");
		user_data = JSON.parse(message.payloadString);
		console.log(user_data);
		dataProcessing(user_data);
	}	
	console.log("Something's here");
}
