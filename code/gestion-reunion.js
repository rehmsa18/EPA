
var reunion = {
    id: 0,
    name: "",
    place: "",
    type: "",
    date: "",
    time: ""
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

var statut = sessionStorage.getItem("statut ");

if(statut== "présidente"){
    document.getElementById("creer-reunion").style.display = "inline-block";
}
else{
    document.getElementById("creer-reunion").style.display = "none";
}

var db = firebase.database();
var reunionRef = db.ref('/reunion/');
function loadReunions() {
    reunionRef.once("value", function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
            var r = new Object(reunion);
            r.name = childSnapshot.val().nom;
            r.date = childSnapshot.val().date;
            r.num = childSnapshot.key;
            write(r);
        });
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

window.onload = loadReunions();

function write(r) {
    var str = "";
    str +=
        "<li class=" + "cForumRow ipsDataItem ipsDataItem_responsivePhoto ipsClearfix" +
        "data-forumID=" + "23" +
        "><div class=" + "ipsDataItem_main" +
        " ><h2 class=" + "ipsDataItem_title ipsType_large ipsType_break" + " >"
        + r.name +
        "</h2></div>" +
        "<div class=" +
        "ipsDataItem_lastPoster ipsDataItem_withPhoto" +
        "><div class=" +
        "ipsType_light" +
        ">"
        + r.date +
        "</div></div><div class=" +
        "ipsDataItem_lastPoster ipsDataItem_withPhoto" +
        "><div class=" +
        "ipsType_light" +
        "><a href=" +
        "gestion-reunion-specifique.html?num=" + r.num +
        ">Détails</a></div></div></div><div class=" +
        "ipsDataItem_lastPoster ipsDataItem_withPhoto" +
        "><div class=" +
        "ipsType_light>" +
        `<input type="button" onclick="supprimer(${r.num})" style="width: 30px; color: red; font-size: 60px  text-align: center;" value="x"/></div></div></li>`;
    document.getElementById("list-reunions").innerHTML += str;
}

function supprimer(id) {
    document.getElementById("list-reunions").innerHTML = "";
    db.ref('/reunion/').child(id).remove();
    db.ref('/profil/').once("value").then(function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
            db.ref('/profil/' + childSnapshot.key).child('/liste-convocations/' + id).remove();
            db.ref('/profil/' + childSnapshot.key).child('/liste-notifications/' + id).remove();
            db.ref('/profil/' + childSnapshot.key).child('/liste-secretaire/' + id).remove();
        })
        loadReunions();
    })
}









