
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
               db.ref('/profil/' + userID).once("value").then(function (childSnapshot) {
        db.ref('/profil/' + userID + '/liste-notifications/').once("value").then(function (ssnapshot) {
            ssnapshot.forEach(function (schildSnapshot) {
                db.ref('/reunion/' + schildSnapshot.key).once("value").then(function (srsnapshot) {
                    var r = new Object(reunion);
                    r.name = srsnapshot.val().nom;
                    r.date = srsnapshot.val().date;
                    r.num = srsnapshot.key;
                    write(r);
                })
            })
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
  "reunion_specifique_notification.html?num="+ r.num +
  ">Détails</a></div></div></div><div class="+
  "ipsDataItem_lastPoster ipsDataItem_withPhoto>Confirmation de présence</div></li>";
  document.getElementById("list-notifications").innerHTML += str;
}



// window.onload=displayNotificationsIcon();

// function displayNotificationsIcon()
// {
//     //First get the list-secretaire and list-notification attributes to get their size            
//     var ref = firebase.database().ref("/profil/"+userID);
//     ref.once("value")
//       .then(function(snapshot) {
//         var ns = snapshot.child("liste-secretaire").numChildren(); 
//         var nn = snapshot.child("liste-notifications").numChildren();
//         if (ns>0)
//         {
//           var adminButton = document.querySelector("#administration");
//           var adminIcon = document.createElement("span");
//           var adminNumber = document.createTextNode(ns); //To replace with size of the list-secretaire
          
//           adminIcon.style.backgroundColor = '#ea2c58';
//           adminIcon.style.color = "white";
//           adminIcon.style.borderRadius = "50%";
//           adminIcon.style.display = "inline-block";
//           adminIcon.style.width = "25px";
//           adminIcon.style.textAlign = "center";
//           adminIcon.style.position = "relative";
//           adminIcon.style.right = "1px";
//           adminIcon.style.top = "-12px";
//           adminIcon.appendChild(adminNumber);
//           adminButton.insertBefore(adminIcon, adminButton.lastChild);
//         }
         
//         if (nn>0)
//         {
//           var notifButton = document.getElementById("li2");
//           var notifIcon = document.createElement("span");
//           var notifNumber = document.createTextNode(nn); //To replace with size of the list-notification
     
//           // notifIcon.class = "notif-number";

//           notifIcon.style.backgroundColor = '#ea2c58';
//           notifIcon.style.color = "white";
//           notifIcon.style.borderRadius = "50%";
//           notifIcon.style.display = "inline-block";
//           notifIcon.style.width = "25px";
//           notifIcon.style.textAlign = "center";
//           notifIcon.style.position = "relative";
//           notifIcon.style.right = "1px";
//           notifIcon.style.top = "-12px";
//           notifIcon.appendChild(notifNumber);
//           notifButton.appendChild(notifIcon);
//         }
//       }); 
// }








