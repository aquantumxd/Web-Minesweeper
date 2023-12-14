const path = require('path')
const url = require('url')
const {app, BrowserWindow} = require('electron')

const createWindow = () => {
    const win = new BrowserWindow({
      width: 1000,
      height: 1000
    })
  
    win.loadURL(url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file:',
        slashes: true
    }))

    //win.webContents.openDevTools()
}

app.whenReady().then(() => {
    createWindow()
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})
