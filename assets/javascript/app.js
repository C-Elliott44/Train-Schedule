var config = {
    apiKey: "AIzaSyDSyLVugqvD8FnxtHsYrXOej7inSWHZqWw",
    authDomain: "train-schedule-1eecd.firebaseapp.com",
    databaseURL: "https://train-schedule-1eecd.firebaseio.com",
    projectId: "train-schedule-1eecd",
    storageBucket: "train-schedule-1eecd.appspot.com",
    messagingSenderId: "507396095929"
  };
firebase.initializeApp(config);

var database = firebase.database();

  $("#add-train").on("click", function() {
    event.preventDefault();
    
    trainName = $("#train-name").val().trim();
    destination = $("#destination").val().trim();
    firstTrainTime = $("#train-time").val().trim();
    trainFrequency = $("#frequency").val().trim();



    var firstTimeConverted = moment(firstTrainTime, "HH:mm").subtract(1, "years");
    console.log(firstTimeConverted);

    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    var tRemainder = diffTime % trainFrequency;
    console.log(tRemainder);


    var tMinutesTillTrain = trainFrequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

    var nextTrainPlz = moment(nextTrain).format("hh:mm");

      var users = {
      name: trainName,
      destination: destination,
      trainTime: firstTrainTime,
      frequency: trainFrequency,
      nextTrainPlz: nextTrainPlz,
      tMinutesTillTrain: tMinutesTillTrain,
    };

    database.ref().push(users);
  });

  database.ref().on("child_added", function(childSnapshot){
    //console.log(childSnapshot.val().name);
    //console.log(childSnapshot.val().destination);
    //console.log(childSnapshot.val().trainTime);
    //console.log(childSnapshot.val().frequency);

    $("#train-chart").append("<tr><td>" + childSnapshot.val().name + "</td><td>" + childSnapshot.val().destination + "</td><td>" + childSnapshot.val().frequency + "</td><td>" + childSnapshot.val().nextTrainPlz + "</td><td>" + childSnapshot.val().tMinutesTillTrain + "</td></tr>");

});