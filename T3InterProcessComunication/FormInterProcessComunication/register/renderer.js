document.addEventListener('DOMContentLoaded', () => {
    const loginButton = document.getElementById('btnSubmit')
    const passwordCheckbox = document.getElementById('checkRegisterUserPassword');

    //IGUAL QUE EN LOGIN
    // Evento para mostrar/ocultar la contraseña - ENVIAR ESTADO CHECKBOX A MAIN (renderer-main)
    passwordCheckbox.addEventListener('click', () => {
        const idPassword = 'registerUserPassword';
        const isChecked = passwordCheckbox.checked;

        // Enviar el estado del checkbox al preload
        window.miAPI.showPassword(idPassword, isChecked);
    });

    // Escucho el evento que muestra la contraseña - CAMBIO DESDE RENDERER (elementos de la vista) (main-renderer)
    window.miAPI.onExecuteShowPassword(({ idPassword, isChecked }) => {
        const passwordField = document.getElementById(idPassword);
        if (passwordField) {
            passwordField.type = isChecked ? 'text' : 'password';
        }
    });

    //1+2
    // Evento para cambiar a la vista de registro (de register a login + pasando usuario)
    loginButton.addEventListener('click', () => {
        const username = document.getElementById('registerUser').value;

        alert("User registered successfully: " + username);
        //2 COSAS;
        //Envio nombre usuario al main
        window.miAPI.sendUsernameToMain(username);
        //Pasamos a login
        window.miAPI.goToLogin()
    });

});