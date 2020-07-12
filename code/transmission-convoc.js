var id =0;
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
loadParticipants();

function loadParticipants(){    
        db.ref('/reunion/'+id+'/liste_convoques/').once("value").then( function(snapshot){
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
}

function load(m){
    str="";
    str +=
        "<li class="+"cForumRow ipsDataItem ipsDataItem_responsivePhoto  ipsClearfix"+
        "data-forumID="+"23"+
        "><div class="+"ipsDataItem_main"+
        "><h2 class="+"ipsDataItem_title ipsType_large ipsType_break"+
        ">"
        +m.fname+
        "</h2></div>"+
        "<div class="+"ipsDataItem_main"+
        "><h2 class="+"ipsDataItem_title ipsType_large ipsType_break"+
        ">"
        +m.lname+
        "</h2></div>"+
        "<div class="+
        "ipsDataItem_main"+
        "><div class="+
        "ipsType_light"+
        ">"
        +m.statut+
        "</div></div><ul class="+
        "ipsDataItem_lastPoster ipsDataItem_withPhoto>"+
        "<li class="+
        "ipsType_light>"+
        "<input type="+"'checkbox' "+" name="+"'participate'"+"value="+"'"+m.id+"'"+" checked></input>"
        +"</li></ul></li>";
    document.getElementById("list-reunions").innerHTML += str;  
}

function transmit(){
    var member_id = null; 
    var inputElements = document.getElementsByName('participate'); 
    //first checked if almost one checked
    var count=0;
    for(var i=0; i<inputElements.length; i++){
        if(inputElements[i].checked){
           count++;
           break;
        }
    }
    if (count == 0){
        alert("Veuillez sélectionner au moins un membre");
        return;
    } 
    for(var i=0; i<inputElements.length; i++){
        if(inputElements[i].checked){
            member_id = inputElements[i].value;
            db.ref('/reunion/' + id + '/liste_convoques/').child(member_id).remove();
            db.ref('/profil/'+member_id+'/liste-notifications/'+id).set(id);
            db.ref('/profil/'+member_id+'/liste-convocations/'+id).set(id);
            db.ref('/reunion/' + id + '/confirmation/pas_de_reponse/' + member_id).set(member_id);     
        }
    }
    db.ref('/reunion/'+id).once("value", function(snapshot) {
        var userID = sessionStorage.getItem("id ");
        if (!snapshot.hasChild("liste_convoques")){
            db.ref('/profil/' + userID + '/liste-secretaire/').child(id).remove();
        }
        document.location.href="gestion-convocation.html";
    });
}

function goback(){
    document.location.href="gestion-convocation-specifique.html?num="+id;
}