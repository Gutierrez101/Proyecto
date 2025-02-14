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
        Swal.fire({
            icon: "warning",
            title: "Campos incompletos",
            text: "Por favor, complete todos los campos.",
            confirmButtonColor: "#3085d6"
        });
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
            Swal.fire({
                icon: "success",
                title: 'Bienvenido, Usuario',
                text: "Inicio de sesion exitoso.",
                confirmButtonColor: "#28a745",
                timer: 2000,
                showConfirmButton: false
            }).then(() => {
                window.location.href = "../html/home.html";
            });
        } else {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: data.message,
                confirmButtonColor: "#d33"
            });
        }
    })
    .catch(error => {
        console.error("Error en la solicitud:", error);
        Swal.fire({
            icon: "error",
            title: "Error de conexion",
            text: "No se pudo conectar con el servidor.",
            confirmButtonColor: "#d33"
        });
    });
}

