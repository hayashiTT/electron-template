
window.onload = () => {
    window.api.Ping({msg:"ping"})
}


// --------- ipc通信 ----------
// pingテスト受信
window.api.Pong((arg)=>{
    console.log(arg['msg'])
})