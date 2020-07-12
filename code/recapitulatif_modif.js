var id =0;
str = document.URL;
numero = str.split('?num=');
id = numero[1];
document.getElementById("num-reunion").innerHTML = "Récapitulatif ";

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
        var r = new Object();
        r.name = snapshot.val().nom_new;
        r.type = snapshot.val().type;
        r.date = snapshot.val().date_new;
        r.lieu = snapshot.val().lieu_new;
        r.heure = snapshot.val().heure_new;
        r.ordre_du_jour = snapshot.val().ordre_du_jour_new;
        write(r);
   
});
function loadMembers(){
    db.ref('/reunion/'+id).once("value").then( function(psnapshot){
        db.ref('/reunion/'+id+'/liste_participants_new/').once("value").then( function(snapshot){
            snapshot.forEach(function(childSnapshot) {
                db.ref('/profil/'+childSnapshot.val()).once("value").then( function(msnapshot){
                        var m = new Object();
                        m.fname = msnapshot.val().nom;
                        m.lname = msnapshot.val().prenom;
                        m.statut = msnapshot.val().qualite;
                        m.id= childSnapshot.val();
                        loadParticipant(m);
                })
            })
        });
        if (psnapshot.val().type=="ago"||psnapshot.val().type=="age") {
            document.getElementById("votants").style.display = "inline-block";
            document.getElementById("votants").innerHTML +=`    
                        <option value="">Liste des votants</option>  
                        `;
            db.ref('/reunion/'+id+'/liste_votants_new/').once("value").then( function(snapshot){
                snapshot.forEach(function(childSnapshot) {
                    db.ref('/profil/'+childSnapshot.val()).once("value").then( function(msnapshot){
                        var m = new Object();
                        m.fname = msnapshot.val().nom;
                        m.lname = msnapshot.val().prenom;
                        m.statut = msnapshot.val().qualite;
                        m.id= childSnapshot.val();
                        loadVotant(m);
                    })
                })
            });
        } 
    });
}

function write(r){
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
    var str="";
    str += "</br>"
    + "<p><strong>Nom : </strong>" + r.name + "</p>"
    + "<p><strong>Type : </strong>" + type_name + "</p>"
    + "<p><strong>Date : </strong>" + r.date +  " à "+r.heure+ "h</p>"
    + "<p><strong>Lieu : </strong>" + r.lieu + "</p>"
    + "<p><strong>Ordre du jour : </strong>" + r.ordre_du_jour + "</p>"
    document.getElementById("list-reunions").innerHTML += str;
    loadMembers();
}

function loadParticipant(m){
    var str="";
    str+=`
            <option value="">${m.fname}  ${m.lname} | ${m.statut}</option>
            `;
    document.getElementById("participants").innerHTML += str; 

}

function loadVotant(m){
    var str="";
    str+=`
            <option value="">${m.fname}  ${m.lname} | ${m.statut}</option>
            `;
    document.getElementById("votants").innerHTML += str; 
}

function goback(){
    document.location.href="ordre_du_jour_modif.html?num="+id;
}
function validate(){
    db.ref('/reunion/'+id).once("value").then( function(fsnapshot){
        db.ref('/reunion/'+id+'/nom/').set(fsnapshot.val().nom_new);
        db.ref('/reunion/'+id+'/lieu/').set(fsnapshot.val().lieu_new);
        db.ref('/reunion/'+id+'/date/').set(fsnapshot.val().date_new);
        db.ref('/reunion/'+id+'/heure/').set(fsnapshot.val().heure_new);
        db.ref('/reunion/'+id+'/liste_participants/').set(fsnapshot.val().liste_participants_new);
        if (!fsnapshot.hasChild("liste_convoques")) {
            db.ref('/reunion/'+id +'/liste_convoques/'+'0').set(0);
        }
        db.ref('/reunion/'+id +'/liste_convoques/').set(fsnapshot.val().liste_participants_new);
        if (fsnapshot.hasChild("search_list_new")) {
            db.ref('/reunion/'+id+'/search_list/').set(fsnapshot.val().search_list_new);
        }
        if (fsnapshot.hasChild("liste_votants_new")) {
            db.ref('/reunion/'+id+'/liste_votants/').set(fsnapshot.val().liste_votants_new);
        }
        db.ref('/reunion/'+id+'/ordre_du_jour/').set(fsnapshot.val().ordre_du_jour_new);
    
        db.ref('/reunion/'+id).child('/nom_new/').remove();
        db.ref('/reunion/'+id).child('/lieu_new/').remove();
        db.ref('/reunion/'+id).child('/date_new/').remove();
        db.ref('/reunion/'+id).child('/heure_new/').remove();
        db.ref('/reunion/'+id).child('/liste_participants_new/').remove();
        db.ref('/reunion/'+id).child('/liste_convoques_new/').remove();
        db.ref('/reunion/'+id).child('/search_list_new/').remove();
        db.ref('/reunion/'+id).child('/liste_votants_new/').remove();
        db.ref('/reunion/'+id).child('/ordre_du_jour_new/').remove();
        db.ref('/reunion/'+id).child('/confirmation/').remove();
        db.ref('/profil/').once("value").then(function (snapshot) {
            snapshot.forEach(function (childSnapshot) {
                db.ref('/profil/' + childSnapshot.key).child('/liste-convocations/' + id).remove();
                db.ref('/profil/' + childSnapshot.key).child('/liste-notifications/' + id).remove();
                db.ref('/profil/' + childSnapshot.key).child('/liste-secretaire/' + id).remove();
            })
            db.ref('/profil/').once("value").then( function(Ssnapshot){
                Ssnapshot.forEach(function(SchildSnapshot) {
                    if (SchildSnapshot.val().statut=="secrétaire"){
                        db.ref('/profil/'+SchildSnapshot.key+'/liste-secretaire/'+id).set(id);
                    }
                })
                document.location.href="gestion-reunion-specifique.html?num="+id;
            });
        });
    });
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



