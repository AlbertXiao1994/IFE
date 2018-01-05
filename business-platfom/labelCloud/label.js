// 初始化参数
var sphere = document.getElementsByClassName('sphere')[0]
var tagElts = document.getElementsByClassName('tag')
var fallLength = 500 // 眼睛到原点的距离
var tags = [] // 存放tag实例
var R = 220 // 球直径
var angleX = Math.PI / 300  // 绕X轴初始旋转角度
var angleY = Math.PI / 300  // 绕Y轴初始旋转角度
var SW = sphere.offsetWidth / 2  // 球的宽度
var SH = sphere.offsetHeight / 2  // 球的高度
var fontSize = 15 // 字体大小
var SX = sphere.offsetLeft + document.body.scrollLeft + document.documentElement.scrollLeft
var SY = sphere.offsetTop + document.body.scrollTop + document.documentElement.scrollTop

// 定义一个标签类
function Tag(elt, x, y, z) {
  this.elt = elt
  this.x = x
  this.y = y
  this.z = z
}

// 将标签移动到相应位置，以某一颜色、大小、透明度显示
Tag.prototype.display = function() {
  var scale = fallLength / (fallLength - this.z)
  var alpha = (this.z + R) / (2 * R)
  this.elt.style.fontSize = fontSize * scale + 'px'
  this.elt.style.opacity = alpha + 0.2
  this.elt.style.filter = "opacity = "+(alpha+0.2)*100+""
  this.elt.style.left = this.x - this.elt.offsetWidth / 2 + SW + 'px'
  this.elt.style.top = this.y - this.elt.offsetHeight / 2 + SH + 'px'
}

function init() {
  for (var i = 0, len = tagElts.length; i < len; i++ ) {
    var a, b
    var k = (2 * (i + 1) - 1) / len - 1
    var a = Math.acos(k)
    var b = a * Math.sqrt(len * Math.PI)
    var x = R * Math.sin(a) * Math.cos(b)
    var y = R * Math.sin(a) * Math.sin(b)
    var z = R * Math.cos(a)
    var tag = new Tag(tagElts[i], x, y, z)
    var r = parseInt(Math.random() * 255)
    var g = parseInt(Math.random() * 255)
    var b = parseInt(Math.random() * 255)
    tag.elt.style.color = "rgb(" + r + "," + g + "," + b + ")"
    tag.display()
    tags.push(tag)
  }
}

// 绕X轴旋转
function rotateX() {
  var sin = Math.sin(angleX)
  var cos = Math.cos(angleX)
  tags.forEach(function(tag) {
    var y1 = tag.y * cos - tag.z * sin
    var z1 = tag.y * sin + tag.z * cos
    tag.y = y1
    tag.z = z1
  })
}

// 绕Y轴旋转
function rotateY() {
  var sin = Math.sin(angleY)
  var cos = Math.cos(angleY)
  tags.forEach(function(tag) {
    var z1 = tag.z * cos - tag.x * sin
    var x1 = tag.z * sin + tag.x * cos
    tag.z = z1
    tag.x = x1
  })
}

function animation() {
  setInterval(function() {
    rotateX()
    rotateY()
    tags.forEach(function(tag) {
      tag = new Tag(tag.elt, tag.x, tag.y, tag.z)
      tag.display()
    })
  }, 50)
}

// 监听鼠标移动，将angleX、angleY重新赋值
sphere.addEventListener('mousemove', function(event) {
  var x = event.clientX - SW - SX;
  var y = event.clientY - SH - SY;
  angleY = x*0.0001;
  angleX = y*0.0001;
})

init()
animation()