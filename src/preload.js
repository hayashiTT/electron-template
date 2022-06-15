const { contextBridge, ipcRenderer, ipcMain} = require("electron");

contextBridge.exposeInMainWorld(
  "api",{
    // render -> main 
    Ping:(arg) =>{
      ipcRenderer.send('ipc-ping', arg)
    },
    // main -> render
    Pong:(listener)=>{
      ipcRenderer.on('ipc-pong',(event, arg)=>{
        listener(arg)
      })
    }
  }
)