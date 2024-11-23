const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('miAPI', {
    //1
    //Exponer goToRegister en el renderer
    goToRegister: () => ipcRenderer.send('goToRegister'),
    
    //Exponer showpassword en el renderer (envia contraseña al main y el estado)
    showPassword: (idPassword, isChecked) => {
        ipcRenderer.send('showPassword', { idPassword, isChecked });
    },

     //password- exponer (enseña la contraseña si checkeo o no- (cambio type)
     onExecuteShowPassword: (callback) =>
        ipcRenderer.on('executeShowPassword', (event, data) => callback(data)),

    //2
    //user (exponer el recibir el nombre del register)
    onSetUsername: (callback) => 
        ipcRenderer.on('setUsername', (event, username) => callback(username)),

   

});