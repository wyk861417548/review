#### 1.复制（js控制的禁用不能解除）
```
var style=document.createElement("style"); style.innerHTML='*{user-select: auto!important;}'; document.head.appendChild(style)
```
#### 2.excel随机数
```
=ROUND(RAND()*(99.99-98)+98,2)
```

#### 3.echart地图修改文字显示位置
```
在区域json文件下的properties属性下添加"cp":[119.772,30.6962], 修改地区名称显示位置
```

#### 4.手机console调试工具
```
<script src="https://cdn.bootcss.com/vConsole/3.3.0/vconsole.min.js"></script>
<script>
  var vConsole = new VConsole();
</script>
```