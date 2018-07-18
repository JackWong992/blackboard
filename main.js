var yyy = document.getElementById('xxx')

/*使用JS获取页面的宽度和高度*/
var pageWidth = document.documentElement.clientWidth
var pageHeight = document.documentElement.clientHeight
yyy.width = pageWidth
yyy.height = pageHeight
window.onresize = function(){
  var pageWidth = document.documentElement.clientWidth
  var pageHeight = document.documentElement.clientHeight
  
  yyy.width = pageWidth
  yyy.height = pageHeight
}

var context = yyy.getContext('2d')
function drawCircle(x,y,radius){
  context.beginPath()
  context.arc(x,y,radius,0,Math.PI*2)
  context.fill()
}

var using = false
var lastPoint = {x: undefined, y: undefined}
yyy.onmousedown = function(aaa){    //按下状态
  var x = aaa.clientX
  var y = aaa.clientY
  using = true  
  if(eraserEnable){
    context.clearRect(x-5,y-5,10,10)
  }else{
    lastPoint = {x: x ,y: y}
    drawCircle(x,y,3)
  }
  
}

yyy.onmousemove = function(aaa){ //滑动状态
  var x = aaa.clientX
  var y = aaa.clientY
  if(eraserEnable){
    if(using){
      using = true
      context.clearRect(x-5,y-5,10,10)    
    }
  }else{
    if(using){
      var newPoint = {x: x, y: y}
      drawCircle(x,y,3)
      drawLine(lastPoint.x,lastPoint.y, newPoint.x, newPoint.y)
      lastPoint = newPoint
    }
  }
}

yyy.onmouseup = function(aaa){  //停止状态
  using = false
}

function drawLine(x1,y1,x2,y2){
  context.beginPath()
  context.moveTo(x1,y1)
  context.lineWidth = 6
  context.strokeStyle = '#fff';
  context.lineTo(x2,y2)
  context.stroke()
  context.closePath()
}


/** 橡皮擦 **/
var eraserEnable = false
eraser.onclick =  function (){
  eraserEnable  = true
  actions.className = 'actions x'
}
brush.onclick = function(){
  eraserEnable  = false
  actions.className = 'actions'
}