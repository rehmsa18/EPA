function logout(){
    booleanValue = false;
    sessionStorage.setItem("trueORFalse ", booleanValue);
    firebase.auth().signOut();
    document.getElementById("login_div").style.display = "inline-block";
    document.getElementById("user_div").style.display = "none";
    document.location.href = "index.html";
}

