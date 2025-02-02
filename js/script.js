document.addEventListener("DOMContentLoaded", function () {
    let loginBtn = document.getElementById("loginBtn");

    if (loginBtn) {
        loginBtn.addEventListener("click", function (event) {
            event.preventDefault();
            loginUser();
        });
    }

});

function loginUser() {
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    if (username === "" || password === "") {
        alert("Por favor, complete todos los campos.");
        return;
    }

    // Cifrar la contraseña en el cliente
    //let hashedPassword = CryptoJS.SHA256(password).toString(CryptoJS.enc.Base64);

    let formData = new FormData();
    formData.append("username", username);
    formData.append("password", password);

    fetch("../php/login.php", {
        method: "POST",
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === 'success') {
            alert("Inicio de sesión exitoso.");
            window.location.href = "../html/home.html";
        } else {
            alert(data.message);
        }
    })
    .catch(error => {
        console.error("Error en la solicitud:", error);
    });
}

