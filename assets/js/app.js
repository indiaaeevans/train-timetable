// Initialize Firebas
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

// BUTTON CLICK EVENT FOR ADDING NEW TRAIN TO THE TABLE
$("#submit").on("click", function(){
	// prevent page reload when button is clicked
    event.preventDefault();

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

	 // Clears all of the text-boxes
	 $("#inputName").val("");
	 $("#inputDest").val("");
	 $("#inputFirst").val("");
	 $("#inputFreq").val("");

	 // Prevents moving to new page
	 return false;
});

// 3. Create Firebase event for adding train to the database
// and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot, prevChildKey) {

  	// console.log(childSnapshot.val());

	 // Store everything into a variable.
	 var name = childSnapshot.val().name;
	 var destination = childSnapshot.val().dest;
	 var first = childSnapshot.val().first;
	 var frequency = childSnapshot.val().freq;

//  MOMENT.JS TIME CONVERSIONS -----------------------------------------------------

     // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(first, "hh:mm").subtract(1, "years");
    console.log(firstTimeConverted);

    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var tRemainder = diffTime % frequency;
    console.log(tRemainder);

    // Minutes Until Next Train
    var minutesAway = frequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + minutesAway);

    // Next Train
    var nextArrival = moment().add(minutesAway, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextArrival).format("hh:mm"));

    var arrivalFormatted = moment(nextArrival).format("hh:mm");

	tableBody.append("<tr><td>" + name + "</td><td>" + destination + "</td><td>" + frequency + 
	"</td><td>" + arrivalFormatted + "</td><td>" + minutesAway + "</td></tr>");
  });

$("tr").onmouseover = function() 
{
    this.style.backgroundColor = "blue";
}