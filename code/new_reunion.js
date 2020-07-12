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

function checkDate() {
    var selectedDate = new Date(document.getElementById("date").value);
    var currentDate = new Date();
    if (document.info_reunion.type.value == ""){
        alert("Veuillez saisir le type de la réunion");
        document.info_reunion.date.value="";
        return;
    }
    if (document.info_reunion.type.value == "ago"){
        currentDate.setDate(currentDate.getDate() + 15);
    }
    if (document.info_reunion.type.value == "age"){
        currentDate.setDate(currentDate.getDate() + 15);
    }
    if (document.info_reunion.type.value == "rca"){
        currentDate.setDate(currentDate.getDate() + 15);
    }
    if (document.info_reunion.type.value == "ri"){
        currentDate.setDate(currentDate.getDate() + 15);
    }
    if (selectedDate>=currentDate){
        return;
    }
    alert("Date invalide");
    document.info_reunion.date.value="";
    return;   
}

function validate(){
    return (document.info_reunion.name.value!= "" &&
        document.info_reunion.place.value!="" &&
        document.info_reunion.type.value!="" &&
        document.info_reunion.date.value!="" &&
        document.info_reunion.time.value!="");
}

function saveInformations(){
    if (validate()==true){
        var r = new Object();
        r.name=document.info_reunion.name.value;
        r.place=document.info_reunion.place.value;
        r.type=document.info_reunion.type.value;
        r.date=document.info_reunion.date.value;
        r.time=document.info_reunion.time.value;
        var postreunion = {
            nom: r.name,
            lieu: r.place,
            type: r.type,
            date: r.date,
            heure: r.time    
        };
        reunionRef.once('value', snapshot =>{
            var newID=-1;
            snapshot.forEach(function(childSnapshot) {
                if (childSnapshot.key>newID){
                    newID=childSnapshot.key;
                }
            });
            newID++;
            db.ref('/reunion/' + newID).set(postreunion);
            reunionRef.limitToLast(1).once('child_added', snap =>{
                document.location.href="liste_participants.html?num="+newID;
            });
            return; 
        });
    }
    else {
        alert("Veuillez remplir tous les champs");
    }
};

function annuler(){
    document.location.href="gestion-reunion.html";
}

function goback(){
    document.location.href="gestion-reunion.html";
}







