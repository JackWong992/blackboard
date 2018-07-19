// document.body.ontouchstart = function(eee){
//   eee.preventDefault()
// }
var yyy = document.getElementById('xxx')
var lineWidth = 2
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

//特性检测
if(document.body.ontouchstart !== undefined){
  //触屏设备
  yyy.ontouchstart = function(aaa){
    var x = aaa.touches[0].clientX
    var y = aaa.touches[0].clientY
    using = true  
    if(eraserEnable){
      context.clearRect(x-5,y-5,10,10)
    }else{
      lastPoint = {x: x ,y: y}
      //drawCircle(x,y,3)
    }
  }

  yyy.ontouchmove = function(aaa){
    var x = aaa.touches[0].clientX
    var y = aaa.touches[0].clientY
    if(eraserEnable){
      if(using){
        using = true
        context.clearRect(x-5,y-5,10,10)    
      }
    }else{
      if(using){
        var newPoint = {x: x, y: y}
        //drawCircle(x,y,3)
        drawLine(lastPoint.x,lastPoint.y, newPoint.x, newPoint.y)
        lastPoint = newPoint
      }
    }
  }
  yyy.ontouchend = function(){
    using = false
  }
}else{
  //非触屏设备
  yyy.onmousedown = function(aaa){    //按下状态
    var x = aaa.clientX
    var y = aaa.clientY
    using = true  
    if(eraserEnable){
      context.clearRect(x-5,y-5,10,10)
    }else{
      lastPoint = {x: x ,y: y}
      //drawCircle(x,y,3)
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
       // drawCircle(x,y,3)
        drawLine(lastPoint.x,lastPoint.y, newPoint.x, newPoint.y)
        lastPoint = newPoint
      }
    }
  }
  
  yyy.onmouseup = function(aaa){  //停止状态
    using = false
  }
  
}

function drawLine(x1,y1,x2,y2){
  context.beginPath()
  context.moveTo(x1,y1)
  context.lineWidth = lineWidth  
  context.lineTo(x2,y2)
  context.stroke()
  context.closePath()
}


/** 橡皮擦 **/
var eraserEnable = false
pen.onclick = function(){
  eraserEnable = false
  pen.classList.add('active')
  eraser.classList.remove('active')
  clear.classList.remove('active')  
}
eraser.onclick = function(){
  eraserEnable=true
  eraser.classList.add('active')
  pen.classList.remove('active')
  clear.classList.remove('active')    
}
clear.onclick = function(){
  eraserEnable = true
  clear.classList.add('active')
  eraser.classList.remove('active')
  pen.classList.remove('active')
  context.clearRect(0,0,yyy.width,yyy.height)  
}

red.onclick = function(){
  context.strokeStyle = 'red';
  red.classList.add('active')
  yellow.classList.remove('active')
  blue.classList.remove('active')
}
yellow.onclick = function(){
  context.strokeStyle = 'yellow';
  yellow.classList.add('active')
  red.classList.remove('active') 
}
blue.onclick = function(){
  context.strokeStyle = 'blue'
  blue.classList.add('active')
  red.classList.remove('active')
  yellow.classList.remove('active') 
}

thin.onclick = function(){
  lineWidth =2
}
thick.onclick = function(){
  lineWidth =5
}
download.onclick = function(){
  download.classList.add('animated')
  download.classList.add('swing')
  var url = yyy.toDataURL('image/png')
  var userDownloadPic = document.createElement('a')
  document.body.appendChild(userDownloadPic)
  userDownloadPic.href = url
  userDownloadPic.download = 'picture'
  userDownloadPic.click()
}
