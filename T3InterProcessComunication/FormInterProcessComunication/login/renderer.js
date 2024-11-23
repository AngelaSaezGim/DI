document.addEventListener('DOMContentLoaded', () => {
    //Elementos a usar del HTML (seleccionados por id)
    const registerButton = document.getElementById('btnRegister');
    const passwordCheckbox = document.getElementById('checkUserPassword');
    const usernameInput = document.getElementById('loginUser'); 

    //1
    // Evento para cambiar a la vista de registro
    registerButton.addEventListener('click', () => {
        window.miAPI.goToRegister();
    });

    // Evento para mostrar/ocultar la contraseña - ESTADO (envio main cuando hago click en checkbox) 
    passwordCheckbox.addEventListener('click', () => {
        const idPassword = 'loginUserPassword';
        const isChecked = passwordCheckbox.checked;
        // Enviar el estado del checkbox al preload
        window.miAPI.showPassword(idPassword, isChecked);
    });

     // Escucho el evento que muestra la contraseña (main-renderer) (ESCUCHO ESTADO) - cambiado desde vista (elementos propios del renderer)
     window.miAPI.onExecuteShowPassword(({ idPassword, isChecked }) => {
        const passwordField = document.getElementById(idPassword);
        if (passwordField) {
            passwordField.type = isChecked ? 'text' : 'password';
        }
    });

    //2
    // Escuchar evento que establece el nombre de usuario (que viene de register)
    window.miAPI.onSetUsername((username) => {
        usernameInput.value = username; 
    });
});