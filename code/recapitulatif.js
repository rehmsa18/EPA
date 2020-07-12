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
        r.name = snapshot.val().nom;
        r.type = snapshot.val().type;
        r.date = snapshot.val().date;
        r.lieu = snapshot.val().lieu;
        r.heure = snapshot.val().heure;
        r.ordre_du_jour = snapshot.val().ordre_du_jour;
        write(r);
   
});
function loadMembers(){
    db.ref('/reunion/'+id).once("value").then( function(psnapshot){
        db.ref('/reunion/'+id+'/liste_participants/').once("value").then( function(snapshot){
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
            db.ref('/reunion/'+id+'/liste_votants/').once("value").then( function(snapshot){
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
// >>>>>>> 87294c2ad3ca8e570bfb56db9b0a2373d8207412
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

function annuler(){
    db.ref('/reunion/').child(id).remove();
    document.location.href="gestion-reunion.html";
}

function goback(){
    db.ref('/reunion/'+id).child('/ordre_du_jour/').remove();
    document.location.href="ordre_du_jour.html?num="+id;
}

function validate(){
    db.ref('/profil/').once("value").then( function(snapshot){
        snapshot.forEach(function(childSnapshot) {
            if (childSnapshot.val().statut=="secrétaire"){
                db.ref('/profil/'+childSnapshot.key+'/liste-secretaire/'+id).set(id);
            }
        })
        document.location.href="gestion-reunion.html";
    });   
}



