fetch("../php/sesiones.php")
    .then(response => response.json())
    .then(data => {
        console.log(data); // Verificar qué se recibe del servidor

        const btnIngresar = document.getElementById("bt-ingresar");
        const contenedorUsuario = document.getElementById("usuario-container");

        if (data.logged_in) {
            // Ocultar botón de ingresar y mostrar usuario y botón de salir
            btnIngresar.style.display = "none";
            contenedorUsuario.innerHTML = `
                <p>Usuario: ${data.username}</p>
                <button id="btn-salir" class="btn_salir">Salir</button>
            `;

            // Agregar evento al botón de salir
            document.getElementById("btn-salir").addEventListener("click", function () {
                fetch("../php/logout.php")
                    .then(response => response.json())
                    .then(() => {
                        location.reload(); // Recargar la página al cerrar sesión
                    })
                    .catch(error => console.error("Error al cerrar sesión:", error));
            });

        } else {
            // Mostrar botón de ingresar y ocultar usuario
            btnIngresar.style.display = "block";
            contenedorUsuario.innerHTML = "";
        }
    })
    .catch(error => console.error("Error al verificar la sesión:", error));
