// Initialize Firebase
var config = {
    apiKey: "AIzaSyBZxeldNDs0JLVabu-7gMpOFb1mpSVK2GM",
    authDomain: "train-app-17ee9.firebaseapp.com",
    databaseURL: "https://train-app-17ee9.firebaseio.com",
    projectId: "train-app-17ee9",
    storageBucket: "train-app-17ee9.appspot.com",
    messagingSenderId: "126620327183"
  };
  firebase.initializeApp(config);

  var database = firebase.database();
  var tableBody = $("#trainTable > tbody");

// BUTTON CLICK EVENT FOR ADDING NEW TRAIN TO THE DATABASE
$("#submit").on("click", function(){
	// prevent page reload when button is clicked
    event.preventDefault();

    // store user input
	var inputName = $("#inputName").val().trim(),
		inputDest = $("#inputDest").val().trim(),
		inputFirst = $("#inputFirst").val().trim(),
		inputFreq = $("#inputFreq").val().trim();

	// Creates local "temporary" object for holding train data
  	var newTrain = {
    	name: inputName,
    	dest: inputDest,
    	first: inputFirst,
    	freq: inputFreq
  	};

	 // Uploads train data to the database
	 database.ref().push(newTrain);

	 // Clears the form
	 $("#inputName").val("");
	 $("#inputDest").val("");
	 $("#inputFirst").val("");
	 $("#inputFreq").val("");

	 // Prevents moving to new page
	 return false;
});

// 3. Create Firebase event for adding train to the table
database.ref().on("child_added", function(childSnapshot, prevChildKey) {

	 // Store everything into a variable.
	 var name = childSnapshot.val().name;
	 var destination = childSnapshot.val().dest;
	 var first = childSnapshot.val().first;
	 var frequency = childSnapshot.val().freq;

//  MOMENT.JS TIME CONVERSIONS -----------------------------------------------------

     // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(first, "hh:mm").subtract(1, "years");

    // Current Time
    var currentTime = moment();

    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");

    // Time apart (remainder)
    var tRemainder = diffTime % frequency;

    // Minutes Until Next Train
    var minutesAway = frequency - tRemainder;

    // Next Train
    var nextArrival = moment().add(minutesAway, "minutes");

    var arrivalFormatted = moment(nextArrival).format("hh:mm");

    // display our data in the table - each train will take up a table row
	tableBody.append("<tr><td contentEditable>" + name + "</td><td>" + destination + "</td><td>" + frequency + 
	"</td><td>" + arrivalFormatted + "</td><td>" + minutesAway + "</td></tr>");
  });

