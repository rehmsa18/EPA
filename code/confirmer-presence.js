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

function Message() {

  var selectedOption;
  document.getElementsByName("presence").forEach(function (elm) {
    if (elm.checked) {
      selectedOption = elm.value;
    }
  })
  
  var qualite = sessionStorage.getItem("qualite ");
  if(selectedOption=="indisponible" && (qualite =="Membre De Bureau" || qualite =="Membre Du CA") ){
    document.location.href = "justification_absence.html?num=" + id;
  }
  else{
    var userID = sessionStorage.getItem("id ");
    db.ref('/profil/' + userID + '/liste-notifications/').child(id).remove();
    db.ref('/reunion/' + id + '/confirmation/pas_de_reponse/').child(userID).remove(); 
    db.ref('/reunion/' + id + '/confirmation/' + selectedOption + '/' + userID).set(userID);
    document.location.href = "notification.html";
  }

}



