var booleanValue = false;
var db = firebase.database();
firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        // User is signed in.

        document.getElementById("login").style.display = "none";

        var user = firebase.auth().currentUser;

        if (user != null) {

            var uid = user.uid;

            db.ref('/profil/').once('value', function (snapshot) {
                snapshot.forEach(function (childSnapshot) {

                    if (childSnapshot.key == uid) {
                        sessionStorage.setItem("id ", childSnapshot.key);
                        sessionStorage.setItem("nom ", childSnapshot.val().nom);
                        sessionStorage.setItem("prenom ", childSnapshot.val().prenom);
                        sessionStorage.setItem("statut ", childSnapshot.val().statut);
                        sessionStorage.setItem("qualite ", childSnapshot.val().qualite);
                        booleanValue = true;
                        sessionStorage.setItem("trueORFalse ", booleanValue);
                        document.location.href = "index.html";
                    }
                })
            });
        }

    } else {
        // No user is signed in.

        document.getElementById("login").style.display = "block";

    }
});

function login() {

    var userEmail = document.getElementById("email_field").value;
    var userPass = document.getElementById("password_field").value;

    firebase.auth().signInWithEmailAndPassword(userEmail, userPass).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;

        window.alert("Error : " + errorMessage);

        // ...
    });

}

