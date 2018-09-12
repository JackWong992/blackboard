# blackboard
* [使用原生JavaScript画出黑板](#使用原生的JavaScript写出黑板)
* [使用Canvas画出黑板](#使用Canvas画出黑板)
  * 使用Canvas画圆
  * 使用Canvas划线
* 添加黑板的功能
  * [加入黑板擦](#加入黑板擦)
  * [加入不同颜色的粉笔](#加入不同颜色的粉笔)
  * [加入保存，删除，清空功能](#加入保存，删除，清空功能)
  * [加入粉笔粗细功能](#加入粉笔粗细功能)
## 使用原生的JavaScript写出黑板
初步思路：获取三种状态下的情景<br>
1. 判断鼠标按下去的状态
```javascript
  document.onmousedown = function(x){
    console.log(x)
    //获取鼠标坐标对象(信息)
  }
```

2. 判断鼠标运动的状态
```javascript
  document.onmousemove = function(y){
    console.log(y)
  //获取鼠标滑动状态下的相关信息
  }
```
3. 判断鼠标停下的状态
```javascript
  document.onmouseup = function(z){
    console.log(z)
  //获取鼠标停止运动状态下的相关信息
  }
```
让鼠标画一个点<br>
```javascript
//父元素设置：position: relative;
  document.onmousedown = function(x){
   var row = x.clientX
   var col = x.clientY

   var smallCircle = document.creatElement('div')
   smallCircle.style = "width: 6px; height: 6px"+
         "background: black; border-radius: 3px"+ 
         "position: absolute; left:"+(row-3)+"px"+
         "top:"+(col-3)+"px"
  div.appenChild(smallCircle)
}
```

让鼠标划线<br>
```javascript
  document.onmousemove = function(x){
   var row = x.clientX
   var col = x.clientY

   var smallCircle = document.creatElement('div')
   smallCircle.style = "width: 6px; height: 6px"+
         "background: black; border-radius: 3px"+ 
         "position: absolute; left:"+(row-3)+"px"+
         "top:"+(col-3)+"px"
  div.appenChild(smallCircle)
}
```

然后出现了一个bug，只要滑动就会出现画线。需要引入一个判断变量`painting`,开始时默认为关闭状态，当画圆开始为开启状态，划线是做判断.
```javascript
  if painting = false
  div.onmousedown = function(){
    if(painting){
      //触发画画
    }else{
      //关闭状态
    }
  }
  div.onmousemove = function(){
    painting = true
  }
  div.onmouseup = function(){
    painting = false
  }
```
有两种情景开始判断是否为画画状态：<br>
1. 按下鼠标以后开始认定为画画状态<br>
2. 按下鼠标滑动开始认定为画画状态<br>
3. 松开鼠标判定为画画结束<br>

使用元素画画的缺点是浏览器不能快速的监听到你画画的状态，当你移动的速度过快的时候就无法描述你画出的画面。<br>
## 使用Canvas画出黑板
利用canvas的API实现上面的用原生JS画一个黑板，大致思路类似。<br>
canvas的简单API
```javascript
var canvas = document.getElementById('canvas')
var context = canvas.getContext('2d')
context.fllStyle = 'red'
context.fillRect(0,0,100,100)
//填充一个宽高为100，背景为红色的canvas图形。
//描边使用stroke ， 填充使用fill
```
 使用canvas画一个圆
```javascript
  <canvas id="xxx"></canvas>

  var yyy = document.getElementById('xxx')
  var context = yyy.getContent('2d')

  function drawCircle(x,y,radius){
    context.beginPath()
    context.arc(x,y,radius,0,Math.PI*2)
    context.fill
  }
  //知道位置，角度可以画圆
```
使用canvas画一个线
```javascript
  function drawLine(x1,y1,x2,y2){
    context.beginPath()
    context.moveTo(x1,y1) //划线的起始状态
    context.lineWdith = 5
    context.lineTo( x2,y2 )//划线的结束状态
    context.stroke()
    context.closePath()
  }
/*划线要记住两个状态，一个是起始点，一个是结束点
  起始点：开始默认为undefined，开始状态提供了x,y
  结束点：提供了x1,y1为结束状态
  开始点和结束点要实时更新：lastPoint = newPoint 
*/
```
画画状态：
```javascript
var painting = false
var lastPoint = {x:undefined,y:undefined}
//开始状态
yyy.onmousedown = function(aaa){
  painting = true
  var x =  aaa.clinetX
  var y =  aaa.clinetY
  drawCircle(x,y,1)
  lastPoint = {
    "x": x,
    "y": y
  }
}

//绘画状态
yyy.onmousemove = function(){
  if(painting){
    var x =  aaa.clinetX
    var y =  aaa.clinetY
    
    var newPoint = {"x":x, "y":y}
    drawCircle(x,y,1)
    drawLine(lastPoint.x,lastPoint.y,newPoint.x,newPoint.y )
    lastPoint = newPoint
  }else {}  
}

//停止状态
yyy.onmouseup = function(){
  painting = false  
}

//所以整个使用canvas就已经可以了； 
```
## 加入黑板擦
```javascript
<button id="eraser"></button>
黑板擦使用功能：
context.clearRect(x,y,10,10)
判断：
  if(usingEraser){
    context.clearRect(x,y,10,10)
  }else{
    uising = true
    //执行绘画...painting
  }

  var eraserEnabled = false
  eraser.onclick = function() {
    eraserEnabled = !eraserEnabled
  }
```
优化方案：
```javascript
  <div class="actions">
    <button id="eraser">橡皮擦</button>
    <button id="brush">画笔</button>
  </div>
//初始状态显示橡皮擦，隐藏画笔 #brush { display: none}
var  eraserEnable =false
eraser.onclick = function(){
  var  eraserEnable =true
  action.className = 'action x'
}
brush.onclick = function(){
  var  eraserEnable =false
  action.className = 'action'
}
//x 状态下是画笔显示，橡皮擦不显示
```
## 加入粉笔粗细功能
## 加入保存，删除，清空功能
## 加入不同颜色的粉笔















设置全屏canvas，要注意的是canvas的宽高是不能通过css设置的，有bug<br>
```javascript
  var pageWidth = document.documentElement.clientWidth
  //页面的宽
  var pageHeight = document.documentElement.clientHeight  
  //页面的高
  元素.width = pageWidth
  元素.hegiht = pageHeight

 当页面大小改变以后，宽高不变
 window.onresize = function(){
   var pageWidth = ....
   var pageHeight = ....
 } 
```
## 手机端运行
支持blackboard在手机端使用<br>
```
<meta name="viewport" content="width=device-width, user-scale=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
```
mouse事件在移动端并不是很适用，需要引入`ontouch`事件<br>
```
  开始状态：
  yyy.ontouchstart = function(aaa){
    console.log('start')
  }
  运动状态:
  yyy.ontouchmove = function(aaa){
    console.log('move')
  }
  停止状态:
  yyy.ontouchend = function(aaa){
    console.log('end')
  }
```
特性检测：<br>
检测设备是否支持触屏或者不支持触屏，不能简单的根据屏幕尺寸来判断设备是否支持触屏；特例：surface同时支持触屏和非触屏<br>
```
  if(document.body.ontouchstart !== undefined){
    //触屏设备
  }else{
    //非触屏设备
  }
```
移动设备兼容