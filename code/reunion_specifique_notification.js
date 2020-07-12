var id =0;
str = document.URL;
numero = str.split('?num=');
id = numero[1];
document.getElementById("num-reunion").innerHTML = "Informations réunion " + id;
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
var reunionRef = db.ref('/reunion/'+id);
infoReunion();

function infoReunion(){
  reunionRef.once("value").then(function(snapshot) {
    var type_name="";
    if (snapshot.val().type =="ago"){
        type_name="Assemblée Générale Ordinaire";
    }
    if (snapshot.val().type =="age"){
        type_name="Assemblée Générale Extraordinaire";
    }
    if (snapshot.val().type =="rca"){
        type_name="Réunion du Conseil d'Administration";
    }
    if (snapshot.val().type =="ri"){
        type_name="Réunion d'Instance";
    }
    
    table = "</br>"
        + "<p><strong>Nom : </strong>" + snapshot.val().nom + "</p>"
        + "<p><strong>Type : </strong>" + type_name + "</p>"
        + "<p><strong>Date : </strong>" + snapshot.val().date + " à "+ snapshot.val().heure + "h" + "</p>"
        + "<p><strong>Lieu : </strong>" + snapshot.val().lieu + "</p>"
        + "<p><strong>Ordre du jour : </strong>" + snapshot.val().ordre_du_jour + "</p>";
    
  document.getElementById("demo").innerHTML = table;
  });
}


function confirmer_presence(){
  document.location.href="confirmer-presence.html?num="+id;
}

function goback(){
  document.location.href="notification.html";
}

