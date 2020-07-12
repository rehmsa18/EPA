var id = 0;
str = document.URL;
numero = str.split('?num=');
str2 = numero[1];
numero2 = str2.split('&cat=');
id = numero2[0]
cat = numero2[1]
document.getElementById("num-reunion").innerHTML = "Confirmation des " + cat + " pour la réunion " + id;
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
db.ref('/reunion/' + id + '/confirmation/' + cat).once("value").then(function (lsnapshot) {
  lsnapshot.forEach(function (lchildSnapshot) {
    db.ref('/profil/' + lchildSnapshot.key).once("value").then(function (rsnapshot) {
      var r = new Object();
      r.nom = rsnapshot.val().nom + " " + rsnapshot.val().prenom;
      r.id = rsnapshot.key;
      r.qualite = rsnapshot.val().qualite;
      if (cat == "indisponible" && (r.qualite == "Membre De Bureau" || r.qualite == "Membre Du CA")) {
        read_justificatif(r);
      } else {
        read(r);
      }
    })
  })
});

function read(r) {
  var str = "";
  str +=
    "<li class=" + "cForumRow ipsDataItem ipsDataItem_responsivePhoto  ipsClearfix" +
    "data-forumID=" + "23" +
    "><div class=" + "ipsDataItem_main" +
    "><h2 class=" + "ipsDataItem_title ipsType_large ipsType_break" +
    ">"
    + r.nom +
    "</h2></div></li>";
  document.getElementById("list-notifications").innerHTML += str;
}


function read_justificatif(r) {
  var storage = firebase.storage();
  storage.ref(id + "/" + r.id).getDownloadURL().then(function (url) {
    var str = "";
    str +=
    "<li class="+"cForumRow ipsDataItem ipsDataItem_responsivePhoto ipsClearfix"+
    "data-forumID="+"23"+
    "><div class="+"ipsDataItem_main"+
    " ><h2 class="+"ipsDataItem_title ipsType_large ipsType_break"+" >"
    +r.nom+
    "</h2></div>"+
    "<div class="+
    "ipsDataItem_lastPoster ipsDataItem_withPhoto"+
    "><div class="+
    "ipsType_light"+
    "><a href=" + url +" target="+"_blank+"+">Justificatif</a></div></div></div></li>";

    document.getElementById("list-notifications").innerHTML += str;
  });
}


function goback() {
  document.location.href = "liste-confirmations-categories.html?num=" + id;
}