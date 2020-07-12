
var reunion ={
    id:0,
    name:"",
    place:"",
    type:"",
    date:"",
    time:""
};
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
var reunionRef = db.ref('/reunion/');
var userID = sessionStorage.getItem("id ");
function loadReunions(){  
                db.ref('/profil/'+userID+'/liste-convocations/').once("value").then( function(lsnapshot){
                    lsnapshot.forEach(function(lchildSnapshot) {
                        db.ref('/reunion/'+lchildSnapshot.key).once("value").then( function(rsnapshot){
                            var r = new Object(reunion);
                            r.name = rsnapshot.val().nom;
                            r.date = rsnapshot.val().date;
                            r.num = rsnapshot.key;
                            write(r);
                        })
                    })
                });          
/*db.ref('/profil/').once("value").then( function(snapshot){
    snapshot.forEach(function(childSnapshot) {
        if(childSnapshot.val().ID_user==userID){
            keyUser=childSnapshot.key;
            db.ref('/profil/'+childSnapshot.key+'/liste-convocations/').once("value").then( function(lsnapshot){
                lsnapshot.forEach(function(lchildSnapshot) {
                    db.ref('/reunion/'+lchildSnapshot.key).once("value").then( function(rsnapshot){
                        var r = new Object(reunion);
                        r.name = rsnapshot.val().nom;
                        r.date = rsnapshot.val().date;
                        r.num = rsnapshot.key;
                        write(r);
                    })
                })
            });
            if(childSnapshot.val().statut=="secrétaire"){
                db.ref('/profil/'+childSnapshot.key+'/liste-secretaire/').once("value").then( function(ssnapshot){
                    ssnapshot.forEach(function(schildSnapshot) {
                        db.ref('/reunion/'+schildSnapshot.key).once("value").then( function(srsnapshot){
                            var r = new Object(reunion);
                            r.name = srsnapshot.val().nom;
                            r.date = srsnapshot.val().date;
                            r.num = srsnapshot.key;
                            write(r);
                        })
                    })
                });
            }
        }
    })
});*/
}

window.onload=loadReunions();

function write(r){
    var str="";
    str +=
    "<li class="+"cForumRow ipsDataItem ipsDataItem_responsivePhoto ipsClearfix"+
    "data-forumID="+"23"+
    "><div class="+"ipsDataItem_main"+
    " ><h2 class="+"ipsDataItem_title ipsType_large ipsType_break"+" >"
    +r.name+
    "</h2></div>"+
    "<div class="+
    "ipsDataItem_lastPoster ipsDataItem_withPhoto"+
    "><div class="+
    "ipsType_light"+
    ">"
    +r.date+
    "</div></div><div class="+
    "ipsDataItem_lastPoster ipsDataItem_withPhoto"+
    "><div class="+
    "ipsType_light"+
    "><a href="+
    "reunion_specifique.html?num="+ r.num +
    ">Détails</a></div></div></div><div class="+
    "ipsDataItem_lastPoster ipsDataItem_withPhoto></div></li>";
    document.getElementById("list-reunions").innerHTML += str;
}








