
var config = {
  apiKey: "AIzaSyC-1n1UGNuQDeBaqQvD_k5jjZYoRi1ppMc",
  authDomain: "trainschedule-9f1b6.firebaseapp.com",
  databaseURL: "https://trainschedule-9f1b6.firebaseio.com",
  projectId: "trainschedule-9f1b6",
  storageBucket: "trainschedule-9f1b6.appspot.com",
  messagingSenderId: "41465855579"
};

firebase.initializeApp(config);

var trainSchedule = firebase.database();


$("#addButton").on("click", function() {

  var trainName = $("#trainName").val().trim();
  var destination = $("#destination").val().trim();
  var firstTrain = $("#firstTrain").val().trim();
  var frequency = $("#frequency").val().trim();

  var addTrain = {

    name: trainName,
    destination: destination,
    firstTrain: firstTrain,
    frequency: frequency
  };

  trainSchedule.ref().push(addTrain);

  alert("Your train has been added");


  $("#trainName").val("");
  $("#destination").val("");
  $("#firstTrain").val("");
  $("#frequency").val("");

  return false;
});

trainSchedule.ref().on("child_added", function(childSnapshot, prevChildKey) {

  var tName = childSnapshot.val().name;
  var tDestination = childSnapshot.val().destination;
  var tFrequency = childSnapshot.val().frequency;
  var tFirstTrain = childSnapshot.val().firstTrain;

  var timeArr = tFirstTrain.split(":");
  var trainTime = moment().hours(timeArr[0]).minutes(timeArr[1]);
  var maxMoment = moment.max(moment(), trainTime);
  var minutes;
  var arrival;

  if (maxMoment === trainTime) {
    arrival = trainTime.format("hh:mm A");
    minutes = trainTime.diff(moment(), "minutes");
  } else {

    var differenceTimes = moment().diff(trainTime, "minutes");
    var tRemainder = differenceTimes % tFrequency;
    minutes = tFrequency - tRemainder;
  
    arrival = moment().add(tMinutes, "m").format("hh:mm A");
  }

  $("#trainTgitable > tbody").append("<tr><td>" + tName + "</td><td>" + tDestination + "</td><td>" +
          tFrequency + "</td><td>" + arrival + "</td><td>" + minutes + "</td></tr>");
});

