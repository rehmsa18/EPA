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
var reunionRef = db.ref('/reunion/'+id);
loadInfo();

function loadInfo(){
    reunionRef.once('value', snap =>{
        if (snap.hasChild("nom_new")) {
            document.info_reunion.name.value = snap.val().nom_new;
            document.info_reunion.place.value = snap.val().lieu_new;
            document.info_reunion.type.value = snap.val().type;
            document.info_reunion.date.value = snap.val().date_new;
            document.info_reunion.time.value = snap.val().heure_new;
          }
        else{
            document.info_reunion.name.value = snap.val().nom;
            document.info_reunion.place.value = snap.val().lieu;
            document.info_reunion.type.value = snap.val().type;
            document.info_reunion.date.value = snap.val().date;
            document.info_reunion.time.value = snap.val().heure;
        }
    });
}

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
        alert("Date valide");
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
        r.date=document.info_reunion.date.value;
        r.time=document.info_reunion.time.value;
        reunionRef.once('value', snap =>{
            db.ref('/reunion/' + id+'/nom_new/').set(r.name);
            db.ref('/reunion/' + id+'/lieu_new/').set(r.place);
            db.ref('/reunion/' + id+'/date_new/').set(r.date);
            db.ref('/reunion/' + id+'/heure_new/').set(r.time);
            reunionRef.limitToLast(1).once('child_added', snap =>{
                document.location.href="liste_participants_modif.html?num="+id;
            });
        });
    }
    else {
        alert("Veuillez remplir tous les champs");
    }
};

function annuler(){
    db.ref('/reunion/'+id).child('/nom_new/').remove();
    db.ref('/reunion/'+id).child('/lieu_new/').remove();
    db.ref('/reunion/'+id).child('/date_new/').remove();
    db.ref('/reunion/'+id).child('/heure_new/').remove();
    document.location.href="gestion-reunion-specifique.html?num="+id;
}

function goback(){
    db.ref('/reunion/'+id).child('/nom_new/').remove();
    db.ref('/reunion/'+id).child('/lieu_new/').remove();
    db.ref('/reunion/'+id).child('/date_new/').remove();
    db.ref('/reunion/'+id).child('/heure_new/').remove();
    document.location.href="gestion-reunion-specifique.html?num="+id;
}







