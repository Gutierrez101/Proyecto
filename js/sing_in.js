document.addEventListener("DOMContentLoaded", function () {
    let createUserForm = document.getElementById("createUserForm");
    let errorMessage = document.getElementById("error-message");

    createUserForm.addEventListener("submit", function (event) {
        event.preventDefault();  // Evitar el envío del formulario por defecto

        let username = document.getElementById("username").value.trim();
        let password = document.getElementById("password").value.trim();

        // Validación simple de campos vacíos
        if (username === "" || password === "") {
            errorMessage.textContent = "Por favor, complete todos los campos.";
            return;
        }

        let formData = new FormData(createUserForm);

        fetch("../php/create_user.php", {
            method: "POST",
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert(data.message);
                window.location.href = "../html/home.html";  // Redirigir a la página de login después de crear el usuario
            } else {
                errorMessage.textContent = data.message;  // Mostrar el mensaje de error
            }
        })
        .catch(error => {
            console.error("Error en la solicitud:", error);
        });
    });
});
