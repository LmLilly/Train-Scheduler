var database = firebase.database();

$(document).ready(function(){
  console.log("ready");

	$("#add-user").on("click", function() {
		console.log("click");

		event.preventDefault();

		var trainName = $("#name-input").val();
		var destination = $("#destination-input").val();
		var trainTime = $("#time-input").val();
		var frequency = $("#frequency-input").val();

		database.ref().push({
			"trainName": trainName,
			"destination": destination,
			"trainTime": trainTime,
			"frequency": frequency
			
		});
	});
});

database.ref().on("child_added", function(snapshot, prevChildKey){
		var newPost = snapshot.val();

		var trainName = newPost.trainName;
		var destination = newPost.destination;
		var trainTime = newPost.trainTime;
		var frequency = newPost.frequency;
		//var minutesAway = moment(nextArrival,'h:mm:ss a').fromNow();
		var minutesLeft = moment().diff(moment(trainTime, 'HH:mm'), "minutes");
		var lastArrival = minutesLeft % frequency; //minutes ago
		var minutesAway = frequency - lastArrival; //in minutes
		var nextTime = moment().add(minutesAway, "minutes");
		console.log('trainTime', trainTime);
		console.log('nextArrival', minutesAway);

		var trainName_td = $("<td>").text(trainName);
		var destination_td = $("<td>").text(destination);
		var trainTime_td = $("<td>").text(trainTime);
		var frequency_td = $("<td>").text(frequency);
		var minutesAway_td = $("<td>").text(minutesAway);

		var trains = $("<tr>").append(trainName_td)
									.append(destination_td)
									.append(frequency_td)
									.append(trainTime_td)
									.append(minutesAway_td);

		$("#trains > tbody").append(trains);
});

