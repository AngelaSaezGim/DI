
const { app, BrowserWindow, ipcMain, Menu} = require('electron');
const path = require('node:path');

let mainWindow;

/*CARGAR LA VENTANA*/
function createWindow() {
    mainWindow = new BrowserWindow({
        width: 900, // Tamaño de la ventana
        height: 900,
        webPreferences: {
            preload: path.join(__dirname, 'login/preload.js'), //CHARGE PRELOAD
        }
        ,show:false
    });

    mainWindow.loadFile(path.join(__dirname, 'login/index.html')); //Se carga ./login/index.html en la vista

    mainWindow.webContents.openDevTools();

    // Muestra la ventana cuando esté lista
    mainWindow.once('ready-to-show', () => {
        mainWindow.show();
    });

     // Maneja el cierre de la ventana
     mainWindow.on('closed', function () {
        mainWindow = null;
    });
    
}

/*MENU*/
const isMac = process.platform === 'darwin';

const menuTemplate = [
    {
        label: 'HerramientasDesarrolador',
        submenu: [
            {
                label: 'Toggle DevTools',
                click: () => {
                    mainWindow && mainWindow.webContents.toggleDevTools();
                }
            },
            { role: 'reload' }
        ]
    }
];

const menu = Menu.buildFromTemplate(menuTemplate);
Menu.setApplicationMenu(menu);

/*FIN MENU*/

/* CAMBIAR DE VISTA */
function changeView(file, preloadFile) {
    if (mainWindow) {
         // Ocultar la ventana antes de cerrarla
         mainWindow.hide();

        mainWindow.on('closed', () => {
            // Una vez cerrada la ventana, se crea una nueva - parametros login y register
            createNewWindow(file, preloadFile);
        });

        mainWindow.close(); // Cerrar ventana acual
    } else {
        // Si mainWindow no existe.. crear nueva ventana
        createNewWindow(file, preloadFile);
    }
}

function createNewWindow(file, preloadFile) {

    mainWindow = new BrowserWindow({
        width: 900,
        height: 900,
        webPreferences: {
            preload: path.join(__dirname, preloadFile) // Carga el preload para la nueva vista
        }
        ,show:false
    });

    mainWindow.loadFile(path.join(__dirname, file));

    mainWindow.webContents.openDevTools();

    // Muestra la ventana solo cuando esté lista
    mainWindow.once('ready-to-show', () => {
        mainWindow.show();
        //SI PASAMOS A LOGIN Y TENEMOS UN NOMBRE DE USUARIO (que establecimos en register) - Lo pasamos cuando esté lista
        if (file.includes('login') && registeredUsername) {
            mainWindow.webContents.send('setUsername', registeredUsername);
        }
    });

    mainWindow.on('closed', function () {
        mainWindow = null;
    });
}

//ipcMainOn -  comunicación entre el main y el renderer
ipcMain.on('goToRegister', () => {
    changeView('./register/index.html', './register/preload.js');
});

ipcMain.on('goToLogin', () => {
    changeView('./login/index.html', './login/preload.js');
});

/*MOSTRAR CONTRASEÑA - transmitiendo evento de mostrar u ocultar la contraseña.
/*1. recibo la solicitud showPassword (que me confirma si esta checkeado o no y mi input de contraseña)*/
ipcMain.on('showPassword', (event, { idPassword, isChecked }) => {
    // 2. Envio un mensaje al renderizador para ejecutar el código (Que viene de elementos propios del html)
    event.sender.send('executeShowPassword', { idPassword, isChecked });
});

/*MANEJAR REGISTRO USUARIO - USUARIO AL MAIN*/
let registeredUsername = ''; //SE CREA UN UN USUARIO TEMPORAL

ipcMain.on('registerUser', (event, { username }) => {
    console.log(`User registered: ${username}`);
    registeredUsername = username; // Se almacena temporalmente
    changeView('./login/index.html', './login/preload.js');
});

/* Inicia la app */
app.whenReady().then(createWindow);

/*cerrar ios*/
app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit();
});

//cierre de la aplicación
app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow(); 
    }
});