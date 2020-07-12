var login = sessionStorage.getItem("trueORFalse ");

if (login == "false" || login == null) {
    document.getElementById("user_div").style.display = "none";
    document.getElementById("li1").style.display = "none";
    document.getElementById("li2").style.display = "none";
    document.getElementById("administration").style.display = "none";
    document.getElementById("reunion").style.display = "none"; 
    document.getElementById("convocation").style.display = "none";    
    document.getElementById("finance").style.display = "none";  
}

if (login == "true") {
    var nom = sessionStorage.getItem("nom ");
    var prenom = sessionStorage.getItem("prenom ");
    var statut = sessionStorage.getItem("statut ");

    document.getElementById("administration").style.display = "none";
    document.getElementById("reunion").style.display = "none"; 
    document.getElementById("convocation").style.display = "none";    
    document.getElementById("finance").style.display = "none";

    if(statut== "présidente"){
        document.getElementById("administration").style.display = "inline-block";
        document.getElementById("reunion").style.display = "inline-block";       
    }
    else if(statut== "secrétaire"){
        document.getElementById("administration").style.display = "inline-block";
        document.getElementById("reunion").style.display = "inline-block";
        document.getElementById("convocation").style.display = "inline-block";   
    }
    else if(statut== "trésorière"){
        document.getElementById("administration").style.display = "inline-block";
        document.getElementById("finance").style.display = "inline-block";   
    }

    document.getElementById("li1").style.display = "inline-block";
    document.getElementById("li2").style.display = "inline-block";

    document.getElementById("user_div").style.display = "inline-block";
    document.getElementById("login_div").style.display = "none";

    document.getElementById("nom").innerHTML = prenom + " " + nom;
}



