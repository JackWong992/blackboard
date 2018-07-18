# blackboard

## 使用cavas写出一个画板
初步思路：获取三种状态下的情景<br>
1. 判断鼠标按下去的状态
```
  document.onmousedown = function(x){
    console.log(x)
    //获取鼠标坐标对象(信息)
  }
```

2. 判断鼠标运动的状态
```
  document.onmousemove = function(y){
    console.log(y)
  //获取鼠标滑动状态下的相关信息
  }
```
3. 判断鼠标停下的状态
```
  document.onmouseup = function(z){
    console.log(z)
  //获取鼠标停止运动状态下的相关信息
  }
```
让鼠标打点<br>
```
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
打点成功！
打点结束开始划线<br>
```
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
划线成功<br>
但是这样的结果不会有停下的状态，而且划线的时候无法确定是按下画的线还是滑动画的线,所以要引入变量painting判断是否在画画
```
  if painting = false
  div.onmousedown = function(){
    painting = true
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

设置全屏canvas，要注意的是canvas的宽高是不能通过css设置的<br>
```
  var pageWidth = document.documentElement.clientWidth
  var pageHeight = document.documentElement.clientHeight  

  元素.width = pageWidth
  元素.hegiht = pageHeight
```