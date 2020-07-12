var id =0;
str = document.URL;
numero = str.split('?num=');
id = numero[1];
document.getElementById("num-reunion").innerHTML = "Confirmation pour la réunion " + id;
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
var reunionRef = db.ref('/reunion/'+id+ '/confirmation/');
reunionRef.once("value", function(snapshot) {
    snapshot.forEach(function(childSnapshot) {  
        var r = new Object();
        r.categorie = childSnapshot.key;
        r.nombre = childSnapshot.numChildren();
        read(r);
     });
  });

function read(r){
    var str="";
    str +=
    "<li class="+"cForumRow ipsDataItem ipsDataItem_responsivePhoto  ipsClearfix"+
    "data-forumID="+"23"+
    "><div class="+"ipsDataItem_main"+
    "><h2 class="+"ipsDataItem_title ipsType_large ipsType_break"+
    ">"
    +r.categorie+ " : " + r.nombre +
    "</h2></div>"+
    "<ul class="+
    "ipsDataItem_lastPoster ipsDataItem_withPhoto"+
    "><li class="+
    "ipsType_light"+
    "><a href="+
    "liste-confirmations-membres.html?num=" + id + "&cat=" + r.categorie +
    ">liste des membres</a></li></ul></li>"; 
    document.getElementById("list-notifications").innerHTML += str;
  }

  function goback(){
    document.location.href="gestion-reunion-specifique.html?num="+id;
}