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
db.ref('/reunion/'+id).once("value").then( function(snapshot){
    if (snapshot.hasChild("ordre_du_jour_new")) {
        document.ordre_du_jour.contenu.value = snapshot.val().ordre_du_jour_new;
    }
    else{
        document.ordre_du_jour.contenu.value = snapshot.val().ordre_du_jour;
    }
});

function validate(){
    var contenu = document.ordre_du_jour.contenu.value;
    if (contenu == ""){
        alert("Veuillez remplir l'ordre du jour");
        return;
    }
    db.ref('/reunion/'+id+'/ordre_du_jour_new/').set(contenu);
    document.location.href="recapitulatif_modif.html?num="+id;
}

function annuler(){
    db.ref('/reunion/'+id).child('/nom_new/').remove();
    db.ref('/reunion/'+id).child('/lieu_new/').remove();
    db.ref('/reunion/'+id).child('/date_new/').remove();
    db.ref('/reunion/'+id).child('/heure_new/').remove();
    db.ref('/reunion/'+id).child('/liste_participants_new/').remove();
    db.ref('/reunion/'+id).child('/liste_convoques_new/').remove();
    db.ref('/reunion/'+id).child('/search_list_new/').remove();
    db.ref('/reunion/'+id).child('/liste_votants_new/').remove();
    db.ref('/reunion/'+id).child('/ordre_du_jour_new/').remove();
    document.location.href="gestion-reunion-specifique.html?num="+id;
}

function goback(){
    db.ref('/reunion/'+id).child('/ordre_du_jour_new/').remove();
    db.ref('/reunion/'+id).once("value", function(snapshot) {
        if ((snapshot.val().type=="age")||(snapshot.val().type=="ago")){
            document.location.href="liste_votants_modif.html?num="+id;
        }
        else{
            document.location.href="liste_participants_modif.html?num="+id;
        }
    })
}

