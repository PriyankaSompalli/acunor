
function signUp() {
    window.location.href = "signinpage.html";
    localStorage.setItem("userStatus", "signedUp");
}

function logIn() {
    window.location.href = "loginpage.html";
    localStorage.setItem("userStatus", "loggedIn");
}
document.getElementById("signUpBtn").addEventListener("click", signUp);
document.getElementById("logInBtn").addEventListener("click", logIn);
