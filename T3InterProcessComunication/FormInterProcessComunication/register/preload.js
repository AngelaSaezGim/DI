const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('miAPI', {
    //1
    //Exponer gotologin
    goToLogin: () => ipcRenderer.send('goToLogin'),

    //Exponer showpassword
    showPassword: (idPassword, isChecked) => {
        ipcRenderer.send('showPassword', { idPassword, isChecked });
    },

    //password- exponer (enseña la contraseña si checkeo o no- (cambio type)
    onExecuteShowPassword: (callback) =>
        ipcRenderer.on('executeShowPassword', (event, data) => callback(data)),

    //2
    //exponer enviar el nombre de usuario al proceso principal (main)
    sendUsernameToMain: (username) => {
        ipcRenderer.send('registerUser', { username });
    }

});