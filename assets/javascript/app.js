$(document).ready(function () {});


  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDOLbp71Nq2AYLA7xCdcxION0H4VJKQG8w",
    authDomain: "trainschedule-f60aa.firebaseapp.com",
    databaseURL: "https://trainschedule-f60aa.firebaseio.com",
    projectId: "trainschedule-f60aa",
    storageBucket: "trainschedule-f60aa.appspot.com",
    messagingSenderId: "552586333736"
  };
  firebase.initializeApp(config);

  // Create a variable to reference the database.
  var database = firebase.database();

  // Initial Values
  var trainName = "";
  var destination = "";
  var firstTrainTime = "";
  var frequency = 0;
  var nextArrival = "";

   // Capture Button Click
   $("#add-train").on("click", function(event) {
    event.preventDefault();

    // Grabbed values from text boxes
    trainName = $("#trainName").val().trim();
    destination = $("#destination").val().trim();
    firstTrainTime = $("#trainTime").val().trim();
    frequency = $("#frequency").val().trim();

     // Code for handling the push
     database.ref().push({
        trainName: trainName,
        destination: destination,
        firstTrainTime: firstTrainTime,
        frequency: frequency,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
      });

      //add the new data to the table on the page
      var newRow = $("<newRow>");
  
      var trainRow = $("<tr>");
      var EndRow = $("</tr>")
      
      var tn = $("<th scope='row'>").text(trainName);
      var td = $("<td>").text(destination);
      var tt = $("<td>").text(firstTrainTime);
      var tf = $("<td>").text(frequency);
      var na = $("<td>").text(nextArrival);
   
      $(".table").append(trainRow, tn, td, tf, na, EndRow );


    });

    // Firebase watcher 
    database.ref().orderByChild("dateAdded").on("child_added", function(snapshot) {
      // storing the snapshot.val() in a variable for convenience
      var ts = snapshot.val();

      // Console.loging the last entry
      console.log(ts.trainName);
      console.log(ts.destination);
      console.log(ts.firstTrainTime);
      console.log(ts.frequency);

      // Add inputed data to the table
      

      // Handle the errors
    }, function(errorObject) {
      console.log("Errors handled: " + errorObject.code);
    });


    


//     <tr>
//     <th scope="row">3</th>
//     <td>Larry</td>
//     <td>the Bird</td>
//     <td>@twitter</td>
//   </tr>