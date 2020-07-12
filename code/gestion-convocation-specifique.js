var id =0;
str = document.URL;
numero = str.split('?num=');
id = numero[1];
document.getElementById("num-reunion").innerHTML = "Informations réunion " + id;


var reunion ={
    id:0,
    name:"",
    place:"",
    type:"",
    date:"",
    time:"",
    ordre_du_jour:"",
    list_participant:"",
    liste_votant:""
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
var reunionRef = db.ref('/reunion/'+id) 

reunionRef.once("value").then(function(snapshot) {
        var r = new Object(reunion);
        r.name = snapshot.val().nom;
        r.type = snapshot.val().type;
        r.date = snapshot.val().date;
        r.lieu = snapshot.val().lieu;
        r.heure = snapshot.val().heure;
        r.ordre_du_jour = snapshot.val().ordre_du_jour;
        r.liste_participants = snapshot.val().liste_participants;
        write(r);
   
});

function loadParticipants(){
    db.ref('/reunion/'+id).once("value").then( function(psnapshot){
        db.ref('/reunion/'+id+'/liste_participants/').once("value").then( function(snapshot){
            snapshot.forEach(function(childSnapshot) {
                db.ref('/profil/'+childSnapshot.val()).once("value").then( function(msnapshot){
                        var m = new Object();
                        m.fname = msnapshot.val().nom;
                        m.lname = msnapshot.val().prenom;
                        m.statut = msnapshot.val().qualite;
                        m.id= childSnapshot.val();
                        load(m);
                })
            })
        });
    });
}
loadParticipants();

function write(r){
    var str="";
// <<<<<<< HEAD
//     str +="<div>"+
//     "<div>Nom : "+r.name+"</div>"+"<div>Type de réunion : "+r.type+"</div>"+"<div>Date : "+r.date+" à "+r.heure+ " h"+"</div>"+"<div>Lieu : "+r.lieu+"</div> <div>Ordre du jour : "+r.ordre_du_jour+"</div>"; 
// =======
    var type_name="";
    if (r.type =="ago"){
        type_name="Assemblée Générale Ordinaire";
    }
    if (r.type =="age"){
        type_name="Assemblée Générale Extraordinaire";
    }
    if (r.type =="rca"){
        type_name="Réunion du Conseil d'Administration";
    }
    if (r.type =="ri"){
        type_name="Réunion d'Instance";
    }
    str += "</br>"
    + "<p><strong>Nom : </strong>" + r.name + "</p>"
    + "<p><strong>Type : </strong>" + type_name + "</p>"
    + "<p><strong>Date : </strong>" + r.date +  " à "+r.heure+ "h</p>"
    + "<p><strong>Lieu : </strong>" + r.lieu + "</p>"
    + "<p><strong>Ordre du jour : </strong>" + r.ordre_du_jour + "</p>"
// >>>>>>> 87294c2ad3ca8e570bfb56db9b0a2373d8207412
    document.getElementById("list-reunions").innerHTML += str;

    var list_contender = document.createElement('ul');
    list_contender.id='list_contender';
    list_contender.className="list-group";

    var list_title = document.createElement('li');
    list_title.className="list-group-item";
    list_title.style.backgroundColor='#ea2c58';
    list_title.style.color="white";

    var list_title_text = document.createTextNode("Liste des participants");
    list_title.appendChild(list_title_text);
    list_contender.appendChild(list_title);

    document.getElementById("list-reunions").appendChild(list_contender);

}

function load(m){ 

    var list_element = document.createElement('li');

    var list_element_text = document.createTextNode(m.fname+"  "+m.lname+" | "+m.statut);

    list_element.className="list-group-item";

    list_element.appendChild(list_element_text);

    list_contender.appendChild(list_element);
 
}

function liste_confirmation(){
    document.location.href="liste-confirmations-categories.html?num="+id;
}

function goback(){
    document.location.href="gestion-convocation.html";
}

function convoquer(){
    document.location.href="transmission-convoc.html?num="+id;   
}

function modifier(){
    document.location.href="info_reunion_modif.html?num="+id;   
}



