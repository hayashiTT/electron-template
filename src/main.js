// アプリケーション作成用のモジュールを読み込み
const { app, BrowserWindow ,ipcMain } = require("electron");
const path = require("path");

// メインウィンドウ
let mainWindow;

const createWindow = () => {
  // メインウィンドウを作成
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      // プリロードスクリプトは、レンダラープロセスが読み込まれる前に実行され、
      // レンダラーのグローバル（window や document など）と Node.js 環境の両方にアクセスできる。
      preload: path.resolve(`${__dirname}/preload.js`),
    },
  });

  // メインウィンドウに表示するURLを指定
  // （今回はmain.jsと同じディレクトリのindex.html）
  mainWindow.loadFile(path.resolve(`${__dirname}/index.html`));

  // デベロッパーツールの起動
  mainWindow.webContents.openDevTools();

  // メインウィンドウが閉じられたときの処理
  mainWindow.on("closed", () => {
    mainWindow = null;
  });
};

//  初期化が完了した時の処理
app.whenReady().then(() => {
  createWindow();

  // アプリケーションがアクティブになった時の処理(Macだと、Dockがクリックされた時）
  app.on("activate", () => {
    // メインウィンドウが消えている場合は再度メインウィンドウを作成する
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// 全てのウィンドウが閉じたときの処理
app.on("window-all-closed", () => {
  // macOSのとき以外はアプリケーションを終了
  if (process.platform !== "darwin") {
    app.quit();
  }
});


// --------- ipc通信 ----------

// pingテスト
ipcMain.on("ipc-ping",(event,args)=>{
    console.log(args['msg']);
    mainWindow.webContents.send('ipc-pong', {msg:"pong"});
})