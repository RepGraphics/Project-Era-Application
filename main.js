const { app, BrowserWindow, screen, nativeImage, Menu, Tray } = require('electron');
const path = require('path');

let mainWindow;
let tray;

function createMainWindow() {
  const { width, height } = screen.getPrimaryDisplay().workAreaSize;

  const iconPath = path.join(__dirname, './src/arkwhite.png');
  const icon = nativeImage.createFromPath(iconPath);

  mainWindow = new BrowserWindow({
    width,
    height,
	  frame: true,
    webPreferences: {
      nodeIntegration: true,
	    webgl: true
    },
	  icon: icon
  });

  mainWindow.loadURL('https://projectera.xyz');

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.on('ready', () => {
  const iconPath = path.join(__dirname, './src/arkwhite.png');
  const icon = nativeImage.createFromPath(iconPath);
  tray = new Tray(icon)

  const contextMenu = Menu.buildFromTemplate([
    { label: 'Discord', click: createDiscordWindow },
    { label: 'Patreon', click: createPatreonWindow },
    { label: 'PayPal', click: createPayPalWindow },
    { label: 'Home',
      click: () => {
        const url = 'https://projectera.xyz'; // Specify the URL to navigate to
        if (mainWindow !== null) {
          mainWindow.loadURL(url);
          mainWindow.show();
        }
      },
    },
    { label: 'Exit', click: exitApp, },
  ])

  tray.setToolTip('Project Era')
  tray.setContextMenu(contextMenu)

  createMainWindow();
  // Remove default menu
  Menu.setApplicationMenu(null);
});

function createPatreonWindow() {

  const iconPath = path.join(__dirname, './src/arkwhite.png');
  const icon = nativeImage.createFromPath(iconPath);

  const newWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      webgl: true
    },
    icon: icon
  });

  newWindow.loadURL('https://www.patreon.com/theprojectera');
}

function createPayPalWindow() {

  const iconPath = path.join(__dirname, './src/arkwhite.png');
  const icon = nativeImage.createFromPath(iconPath);

  const newWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      webgl: true
    },
    icon: icon
  });

  newWindow.loadURL('https://www.paypal.com/paypalme/repgraphics');
}

function createDiscordWindow() {

  const iconPath = path.join(__dirname, './src/arkwhite.png');
  const icon = nativeImage.createFromPath(iconPath);

  const newWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      webgl: true
    },
    icon: icon
  });

  newWindow.loadURL('https://discord.gg/GwJKw7KP9J');
}

function exitApp() {
  app.quit();
}

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createMainWindow();
  }
});
