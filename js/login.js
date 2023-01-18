function Login () {}

Login.prototype.init = function () {
    localStorage.setItem("username", "admin");
    localStorage.setItem("password", "admin");
    
    const loginBlockForm = document.getElementById("loginBlockForm");
    loginBlockForm.addEventListener("submit", this.validation);
    if(localStorage.getItem("token")) {
        window.location.href = "./resume.html";
    } else if(window.location.pathname !== "/" && window.location.pathname !== "/index.html" && !localStorage.getItem("token")) {
        window.location.href = "./";
    }
};
Login.prototype.validation = function (e) {
    e.preventDefault();
    let username = document.getElementsByName("username")[0].value;
    let password = document.getElementsByName("password")[0].value;
    if(username === localStorage.getItem("username") && password === localStorage.getItem("password")) {
        document.getElementById("login-message").innerHTML = "";
        localStorage.setItem("token", "xyz1234");
        window.location.href = "./resume.html";
    } else {
        document.getElementById("login-message").innerHTML = "<h1 class='login-block-error'>Print invalid User Name/ Password !!</h1>"
    }
    return false;
}

const login = new Login();
login.init();