var id = 0;
str = document.URL;
numero = str.split('?num=');
id = numero[1];
var firebaseConfig = {
    apiKey: "AIzaSyCCVtLOXmCSl-Q_hfovr4G6jkUT8nBgHx4",
    authDomain: "epa2020-cd664.firebaseapp.com",
    databaseURL: "https://epa2020-cd664.firebaseio.com",
    projectId: "epa2020-cd664",
    storageBucket: "epa2020-cd664.appspot.com",
    messagingSenderId: "672890467633",
    appId: "1:672890467633:web:3f1db173aff2ff5e2c6c10"
};
firebase.initializeApp(firebaseConfig);
var db = firebase.database();


document.querySelector('#fileup').addEventListener("change",function (e) {
    //here we take the file extension and set an array of valid extensions
    var res = $('#fileup').val();
    var arr = res.split("\\");
    var filename = arr.slice(-1)[0];
    filextension = filename.split(".");
    filext = "." + filextension.slice(-1)[0];
    valid = [".jpg", ".png", ".jpeg"];
    //if file is not valid we show the error icon, the red alert, and hide the submit button
    if (valid.indexOf(filext.toLowerCase()) == -1) {
        $(".imgupload").hide("slow");
        $(".imgupload.ok").hide("slow");
        $(".imgupload.stop").show("slow");

        $('#namefile').css({ "color": "red", "font-weight": 700 });
        $('#namefile').html("Fichier " + filename + " n'est pas valide!");

    } else {
        //if file is valid we show the green alert and show the valid submit
        $(".imgupload").hide("slow");
        $(".imgupload.stop").hide("slow");
        $(".imgupload.ok").show("slow");

        $('#namefile').css({ "color": "green", "font-weight": 700 });
        $('#namefile').html(filename);

        var userID = sessionStorage.getItem("id ");
        var file = e.target.files[0];
        var storageRef = firebase.storage().ref(id+"/"+userID);
        storageRef.put(file).then(function(snapshot) {
            db.ref('/profil/' + userID + '/liste-notifications/').child(id).remove();
            db.ref('/reunion/' + id + '/confirmation/pas_de_reponse/').child(userID).remove(); 
            db.ref('/reunion/' + id + '/confirmation/indisponible/' + userID).set(userID);
            setTimeout(function(){ document.location.href = "notification.html"; }, 3000);
        });
    }
});





