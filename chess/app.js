var me = true ;
var chessBoard = [] ;
for (var i=0; i<15; i++) {
    chessBoard[i] = [] ;
    for (var j=0; j<15; j++) {
        chessBoard[i][j] = 0;
    }
}
var chess = document.getElementById("chess");
var context = chess.getContext("2d");
var img = new Image();
img.src = "bg.jpg";
img.onload= function(){
	context.drawImage(img,0,0,450,450);
	drawLine();
	

}
context.strokeStyle = "#000";//color of pen
function drawLine(){
for(var i=0; i<15; i++){
context.moveTo(15,15+i*30);
context.lineTo(435,15+i*30);
context.stroke();
context.moveTo(15+i*30,15);
context.lineTo(15+i*30,435);	context.stroke();
}
}
var oneStep = function (i, j, me){//i,j分别是在棋盘中的定位，me代表白棋还是黑棋
    context.beginPath() ;
    context.arc(15+i*30, 15+j*30, 13, 0, 2*Math.PI);//圆心会变的，半径改为13
    context.closePath() ;
    var gradient = context.createRadialGradient(15+i*30+2, 15+j*30-2, 15, 15+i*30, 15+j*30, 0);
    if(me){
        gradient.addColorStop(0, "#0a0a0a");
        gradient.addColorStop(1, "#636766");
    }else{
        gradient.addColorStop(0, "#D1D1D1");
        gradient.addColorStop(1, "#F9F9F9");
    }
    context.fillStyle = gradient ;
    context.fill();
}


chess.onclick = function (e){
    var x = e.offsetX ;
    var y = e.offsetY ;
    var i = Math.floor(x/30) ;
    var j = Math.floor(y/30) ;
    if(chessBoard[i][j] == 0){
        oneStep(i,j,me);
        if(me){
            chessBoard[i][j] = 1 ;
        }else{
            chessBoard[i][j] = 2 ;
        }
        me = !me ;  
	}
}
