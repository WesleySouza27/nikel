const myModal = new bootstrap.Modal("#register-Modal");
let logged = sessionStorage.getItem("logged");
const  session = localStorage.getItem("session");

checkeLogged();

//CRIAR LOGIN
document.getElementById("login-form").addEventListener("submit", function(e) {
    e.preventDefault();

    const email = document.getElementById("email-input").value;
    const password = document.getElementById("password-input").value;
    const checkSession = document.getElementById("session-check").checked;

    const account = getaAccount(email);
    if(!account) {
        alert("Opps! verifique o usuario ou a senha");
        return;
    }

   if(account) {
        if(account.password !== password) {
           alert("Opps! verifique o usuario ou a senha");
           return;
        }

        saveSession(email, checkSession);

        window.location.href = "home.html";
    }
});

// CRIAR CONTA
document.getElementById("creat-form").addEventListener("submit", function(e) {
    e.preventDefault();

    const email = document.getElementById("email-creat-input").value;
    const password = document.getElementById("password-creat-input").value;
    const confirmPassword = document.getElementById("confirm-password-input").value;
    const errorMessage = document.getElementById("error-message");

    if(email.length < 5) {
        alert("Preencha o campo com um e-mail válido");
        return;
    }
    if(password.length < 4) {
        alert("Preencha a senha com no mínimo 4 digitos");
        return;
    }
    if (password !== confirmPassword) {
        errorMessage.textContent = "As senhas não coincidem. Por favor, tente novamente.";
        return;
    }

    saveAccount({
        login: email,
        password: password,
        transactions: [],
    });

    myModal.hide();

    alert("Conta cria da com sucesso!");

    e.target.reset();
    errorMessage.textContent = "";
})

function checkeLogged() {
    if(session) {
        sessionStorage.setItem("logged", session);
        logged = session
    }

    if(logged) {
        saveSession(logged, session);

        window.location.href = "home.html";
    }
}

function saveAccount(data) {
    localStorage.setItem(data.login, JSON.stringify(data));
}

function saveSession(data, saveSession) {
    if(saveSession) {
        localStorage.setItem("session", data);
    }
    sessionStorage.setItem("logged", data);
}

function getaAccount(key) {
    const account = localStorage.getItem(key);

    if(account) {
        return JSON.parse(account);
    }

    return "";

}