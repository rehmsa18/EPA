
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
loadVotants();
function loadVotants(){
    db.ref('/reunion/'+id+'/liste_votants_new/').once("value").then( function(snapshot){
        snapshot.forEach(function(childSnapshot) {
            db.ref('/profil/'+childSnapshot.val()).once("value").then( function(msnapshot){
                var m = new Object();
                m.fname = msnapshot.val().nom;
                m.lname = msnapshot.val().prenom;
                m.statut = msnapshot.val().qualite;
                m.id= childSnapshot.val();
                m.cotis = parseInt(msnapshot.val().cotis);
                load(m);
            })
        })
    });
}

function load(m){
    str="";
        var cotisation="";
        var checked_state="checked";
        if(m.cotis){
            cotisation="Cotisation à jour";
        }
        else{
            cotisation=`
            <div style='color:red'>
            Cotisation non réglée
            </div>
            `;
            checked_state="unchecked";
        }

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
        "</div></div>"+
        "<div class="+
        "ipsDataItem_main"+
        "><div class="+
        "ipsType_light"+
        ">"
        +
        cotisation
        +
        "</div></div>"+
        "<ul class="+
        "ipsDataItem_lastPoster ipsDataItem_withPhoto>"+
        "<li class="+
        "ipsType_light>"+
        "<input type="+"'checkbox' "+" name="+"'participate'"+"value="+"'"+m.id+"'"+checked_state+"></input>"
        +"</li></ul></li>";
    document.getElementById("list-reunions").innerHTML += str;  
}

function validate(){
    var member_id = null; 
    var inputElements = document.getElementsByName('participate');
    //first checked if almost one checked
    var count=0;
    for(var i=0; i<inputElements.length; ++i){
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
        if(!inputElements[i].checked){
            member_id = inputElements[i].value;
            deletemember(member_id);;
        }
    }
    document.location.href="ordre_du_jour_modif.html?num="+id;
}

function deletemember(member_id){
    db.ref('/reunion/'+id).child('/liste_votants_new/' + member_id).remove();
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
    document.location.href="gestion-reunion-specifique.html?num="+id;
}

function goback(){
    db.ref('/reunion/'+id).child('/liste_votants_new/').remove();
    document.location.href="liste_participants_modif.html?num="+id;
}

