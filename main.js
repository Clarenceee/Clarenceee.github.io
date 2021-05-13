var mqtt;
var reconnectTimeout = 2000;
var host="outstanding-engineer.cloudmqtt.com";
var port=443;
var now = new Date();
var acc_start = now.getTime();
var dt_orient = 0;
//var acl = new Accelerometer({frequency:60});
var driver_id = -1;
var corr  = 0;
console.log(window.navigator);
var location_array = [0,0];
var mqtt_username = "allusernames";
var mqtt_user_data = "user_data"
var user_data = 0;
// Create a client instance
var client = new Paho.MQTT.Client(host, port,"client_id");
var found = 0;
var user_list = 0;
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
///////need to identify driver, make connection with mqtt
// connect the client
client.connect(options);

// called when the client connects
function onConnect() {
// Once a connection has been made, make a subscription and send a message.
	console.log("onConnect");
	client.subscribe(mqtt_username);
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
function compareName (name)
{
	console.log(name)
	user_enter_name = document.getElementById("name").value;
	if (user_enter_name == name && name != "")
	{
		found = 1;
	}
}
// called when a message arrives
function onMessageArrived(message) {
	if (message.destinationName == mqtt_username)
	{
		if (message.payloadString != "")
		{
			user_list = message.payloadString.split(",");
		}
		console.log(user_list);
		//console.log("onMessageArrived:"+ found);
	}
	
}
function checkUser()
{
	found = 0;
	if (user_list != 0)
	{
		user_list.forEach(compareName);
	}
	if (found == 0)
	{
		alert("Your parcel is not delivered today. Please make sure user's name entered is correct :)");
	}
	else
	{
		window.location.href = "display.html?username=" + user_enter_name;
	}
	console.log("found " + found);
	console.log(user_list);
}
