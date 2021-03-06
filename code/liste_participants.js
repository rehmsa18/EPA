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
findParticipants(id);


function findParticipants(id){
    reunionRef.limitToLast(1).once("value").then( function(rsnapshot){
    if ((rsnapshot.val().type=="age")||(rsnapshot.val().type=="ago")){
        db.ref('/profil/').once("value").then( function(snapshot){
            snapshot.forEach(function(childSnapshot) {
                if (childSnapshot.val().qualite!="Membre honoraire"){
                    var pid = childSnapshot.key;
                    db.ref('/reunion/'+id+'/liste_participants/'+pid).set(pid);
                    db.ref('/reunion/'+id+'/liste_convoques/'+pid).set(pid);
                    var m = new Object();
                    m.fname = childSnapshot.val().nom;
                    m.lname = childSnapshot.val().prenom;
                    m.statut = childSnapshot.val().qualite;
                    m.id= pid;
                    load(m);
                }
                else{
                    var pid = childSnapshot.key;
                    db.ref('/reunion/'+id+'/search_list/'+pid).set(pid);
                }

            })
        });  
    }
    
    if ((rsnapshot.val().type=="rca")){
        db.ref('/profil/').once("value", function(snapshot) {
            snapshot.forEach(function(childSnapshot) {
                if (childSnapshot.val().qualite=="Membre De Bureau"||childSnapshot.val().qualite=="Membre Du CA"){
                    var pid = childSnapshot.key;
                    db.ref('/reunion/'+id+'/liste_participants/'+pid).set(pid);
                    db.ref('/reunion/'+id+'/liste_convoques/'+pid).set(pid);
                    var pid = childSnapshot.key;
                    db.ref('/reunion/'+id+'/liste_participants/'+pid).set(pid);
                    db.ref('/reunion/'+id+'/liste_convoques/'+pid).set(pid);
                    var m = new Object();
                    m.fname = childSnapshot.val().nom;
                    m.lname = childSnapshot.val().prenom;
                    m.statut = childSnapshot.val().qualite;
                    m.id= pid;
                    load(m);
                }
                else{
                    var pid = childSnapshot.key;
                    db.ref('/reunion/'+id+'/search_list/'+pid).set(pid);
                }
            })              
        });
    }
    if ((rsnapshot.val().type=="ri")){
        db.ref('/profil/').once("value", function(snapshot) {
            var count=0;
            snapshot.forEach(function(childSnapshot) {
                if (childSnapshot.val().qualite=="Membre De Bureau"){
                    var pid = childSnapshot.key;
                    db.ref('/reunion/'+id+'/liste_participants/'+pid).set(pid);
                    db.ref('/reunion/'+id+'/liste_convoques/'+pid).set(pid);
                    var pid = childSnapshot.key;
                    db.ref('/reunion/'+id+'/liste_participants/'+pid).set(pid);
                    db.ref('/reunion/'+id+'/liste_convoques/'+pid).set(pid);
                    var m = new Object();
                    m.fname = childSnapshot.val().nom;
                    m.lname = childSnapshot.val().prenom;
                    m.statut = childSnapshot.val().qualite;
                    m.id= pid;
                    load(m);
                }
                else{
                    var pid = childSnapshot.key;
                    db.ref('/reunion/'+id+'/search_list/'+pid).set(pid);
                }
            })               
        });
    }
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

function validate(){
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
        if(!inputElements[i].checked){
            member_id = inputElements[i].value;
            deletemember(member_id);;
        }
    }

    db.ref('/reunion/'+id).once("value", function(snapshot) {
        if ((snapshot.val().type=="age")||(snapshot.val().type=="ago")){
            document.location.href="liste_votants.html?num="+id;
        }
        else{
            document.location.href="ordre_du_jour.html?num="+id;
        }
    }) 
}

var searchList = document.getElementById('searchList');
const searchBar = document.getElementById('searchBar');
searchBar.addEventListener('keyup', (e) => {
    searchList.innerHTML = "";
    const searchString = e.target.value.toLowerCase();
    db.ref('/reunion/'+id+'/search_list/').once("value").then( function(snapshot){
        snapshot.forEach(function(childSnapshot) {
            db.ref('/profil/'+childSnapshot.val()).once("value").then( function(msnapshot){
                var m = new Object();
                m.lname = msnapshot.val().nom;
                m.fname = msnapshot.val().prenom;
                m.id = "'"+childSnapshot.val()+"'";
                if ( (m.lname.toLowerCase().includes(searchString) ||
                    m.fname.toLowerCase().includes(searchString))&&(searchString!="") ){
                    loadmember(m);
                }
            })
        })
    })
    searchList.innerHTML = "";
});

function deletemember(member_id){
    db.ref('/reunion/'+id+'/search_list/'+member_id).set(member_id);
    db.ref('/reunion/'+id).child('/liste_participants/' + member_id).remove();
    db.ref('/reunion/'+id).child('/liste_convoques/' + member_id).remove();
}

function loadmember(m){
    var htmlString ="";
    htmlString=
     `
        <p>
            <input type="button"  onclick="addmember(${m.id})"  value="+"/>
            ${m.lname} ${m.fname}
        </p>
    `;
    searchList.innerHTML += htmlString;
}

function addmember(num){
    db.ref('/reunion/'+id).child('/search_list/' + num).remove();
    db.ref('/reunion/'+id+'/liste_participants/'+num).set(num);
    db.ref('/reunion/'+id+'/liste_convoques/'+num).set(num);
    db.ref('/profil/'+num).once("value", function(snapshot) {
                var m = new Object();
                m.fname = snapshot.val().nom;
                m.lname = snapshot.val().prenom;
                m.statut = snapshot.val().qualite;
                m.id= num;
                load(m);

    });
    searchList.innerHTML = "";
    searchBar.value="";
}


function annuler(){
    db.ref('/reunion/').child(id).remove();
    document.location.href="gestion-reunion.html";
}

function goback(){
    db.ref('/reunion/'+id).child('/liste_participants/').remove();
    db.ref('/reunion/'+id).child('/liste_convoques/').remove();
    db.ref('/reunion/'+id).child('/search_list/').remove();
    db.ref('/reunion/').child(id).remove();
    document.location.href="new_reunion.html";
}