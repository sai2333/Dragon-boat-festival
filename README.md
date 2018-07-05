# Dragon-boat-festival
端午节动画
1. 使用webpack自动构建工具
2. 使用sass编译css
3. 熟悉动画的各个属性，transform，transition，animation
4. 通过写好的动画类，然后通过js添加类名给需要的dom动画。
## (demo测试链接)[
## webpack
现在webpack还需要安装webpack-cli，一开始看的是旧教程，不过发布的时候，webpack有提示要安装，一般认真看还是知道的。后来我是通过webpack中文网来学习的。
1. npm init -y 初始化你的项目
2. npm install webpack webpack-cli --save-dev 安装webpack和脚手架
3. npm install --save-dev style-loader css-loader sass-loader node-sass file-loader 安装这些项目需要的依赖
4. npx webpack --config webpack.config.js （前提是自己写好配置）重新配置构建
一开始，创建个dist文件夹。把html文件放入里面。创建src文件夹，（这两个文件夹是一定需要的）src文件夹里面存放的js，（如果在没配置的情况下，js文件名必须是index.js）。把需要的图片资源也放在dist文件夹里面。
*webpack.config.js*文件有入口（entry），出口（output）。各种依赖的配置（module）。
```javascript
module: {
rules: [
{
test: /\.css$/,
use: [
'style-loader',
'css-loader'
]
},
{
test: /\.scss$/,
use:[
'style-loader',
'css-loader',
'sass-loader'
]
},
{
test:/\.(png|svg|jpg|gif)$/,
use:[
'file-loader'
]
}
]
}

```
​
一开始以为sass只需要css，style的loader还有sass就可以了。结果还要装node-sass。
最后配置好后，把需要编译的scss文件，导入到index.js里面。<br>
之后编译好的scss会出现head中的style标签中。
### webpack自动生成文件的问题
出口的（output）的fliename被我写死了，导致每次我要改出口后的js文件时呢。他都会自动生成多一个新的js文件。我还要手动去删除之前的js文件。真的麻烦。
### 安装HtmlWebpackPlugin
npm install --save-dev html-webpack-plugin
在使用html-webpack-plugin的时候就遇到个问题，生成新的index.html文件，虽然把我打包好的资源全部拿过去了，但原有的html（dom节点）没有被复制过去。
查了下官方文档找到了template属性，（模板）把之前的写好的html的路径写过来即可。还支持加载器（handlebars,ejs,undersore,html等）
另外还可以使用templateContent这个属性来写。
还有其它的配置项.
* filename： 生成的文件名
* title：html的title
* hash：是否为所有注入的静态资源添加webpack编译的唯一hash值。
还有很多……
### 图片的加载（现在js中加载，然后使用sass）
一开始导入图片后，在sass直接使用也是可以的。但是有18张png图片呢，蛋疼，难道要一个个import。我试着去看文档，但没什么发现，然后去搜索下，结果有人提出说写个图片集合，然后forEach下。嗯，确实是可以实现的呢。
```javascript
const files = [
"./img/bg.png",
"./img/caption.png",
"./img/leaf_expand.png",
"./img/leaf_left.png",
"./img/leaf_right.png",
"./img/line_1.png",
"./img/line_2.png",
"./img/line_3.png",
"./img/line_4.png",
"./img/t_haoyun.png",
"./img/t_jixiang,png",
"./img/t_ruyi.png",
"./img/t_xingfu.png",
"./img/zz.png",
"./img/zzr_1.png",
"./img/zzr_2.png",
"./img/zzr_3.png",
"./img/zzr_4.png"
];
files.forEach(function(name){
    __webpack_require__(1)("./" + name);
})
//如果不是需要在scss中引入图片，我不喜欢这样。
//实际上可以把图片放在网上
```
现在的目录是这样的
![P9LdRs.png](https://s1.ax1x.com/2018/06/24/P9LdRs.png)
原来图片即使在js中加载了，但是scss那边没用的话，webpack是不会进行打包的。只有在用到的时候才打包。
## 端午节动画
配置好了webpack后就开始写样式了。
1. 粽子开场动画一直在抖
2. 点击粽子的绳子会有另外的动画开始
3. 粽子的绳子解开（一共3次变化）
4. 粽子隐藏，然后粽子肉，文字出现。祝福语同时出现
5. 旋转粽子肉，同时粽子肉上面显示不同方向的文字。
主要复习的还是**css3动画**方面呢，js的话。在这里面使用的比较少。
### html结构
先把结构写出来吧，写个开场的背景还有粽子和粽子绳子的dom
![P9OKTU.png](https://s1.ax1x.com/2018/06/24/P9OKTU.png)
设置body的背景颜色，然后设置一个最小的宽度，因为我这里的图片是固定大小的。min-width和min-height。
然后把main设置为相对定位，其它元素都基于这个main来定位。
因为粽子的抖动需要整个抖动（包括绳子），所以我在粽子里面添加一个盒子。
把粽子盒子还有绳子调完位置后就可以使用动画了。
**给盒子添加动画。定义动画**
sass会自动帮我们加 前缀
```css
@-webkit-keyframes rock {
0%{transform: rotate(0deg)}
10%{transform: rotate(1deg)}
20%{transform: rotate(-1deg)}
30%{transform: rotate(2deg)}
40%{transform: rotate(-2deg)}
50%{transform: rotate(3deg)}
60%{transform: rotate(-3deg)}
70%{transform: rotate(4deg)}
80%{transform: rotate(-4deg)}
90%{transform: rotate(5deg)}
100%{transform: rotate(0deg)}
}
.zongzi-box-rock{
animation: rock 2s infinite;
}
```
emmm，ok了。接下来是解开绳子的动画了。需要onclick事件。
把4根绳子调成想要的状态。
```css
.shengzi-1{
position: absolute;
background: url(./img/line_1.png) no-repeat;
width: 218px;
height: 180px;
top:124px;
left: 10px;
}
.shengzi-2{
position: absolute;
background: url(./img/line_2.png) no-repeat;
width: 219px;
height: 159px;
top:159px;
left: 10px;
}
.shengzi-3{
position: absolute;
background: url(./img/line_3.png) no-repeat;
width: 264px;
height: 117px;
top:224px;
left: 10px;
}
.shengzi-4{
position: absolute;
background: url(./img/line_4.png) no-repeat;
width: 288px;
height: 56px;
top:279px;
left: 10px;
}

```
css部分的话就是调节各个dom元素的位置还有要变化的位置。写好这些类就可以了。就不记这些了。
## JS
解析下来编写**JS**部分。
js的话，我想要有个指定时间，指定函数（动画动作），然后 自动setTimeout的类（构造函数）。
例如：
```javascript
function Time(time,func,log){
    setTimeOut()=> {
        func();
        console.log(log);
}(time)......
}
```
关键的就是上面这些。
想到动画队列，所以可以把第一个参数改成动画队列，里面存储它的一整个需要的东西（时间，函数，日志）其它不要。
先写下，看下要怎么改吧。
*发现个有趣的事情，我把settimeout写在同一个对象的情况下，那么settimeout是相对时间来执行的。*这让我联想到settimeout和console.log的面试题。
竟然这样的话，那么就简单多啦。一个构造函数搞定。
```jacscript
//先写个开始动画的类
function TimeAxis(anim){
this.start = function(time,func,log){
setTimeout(() => {
func();
console.log(time + '毫秒=> ' + log);
}, time);
}
}
const Time1 = new TimeAxis();
Time1.start('2000',function(){
console.log('我执行了');
},'1 => 动画');
Time1.start('2000',function(){
console.log('我执行了第二条');
},'2 => 动画')
//console.log(）按着预期执行着
```
```javascript
const Time1 = new TimeAxis();
ele('shengzi-1').onclick = function() {
Time1.start(500,function(){
ele('shengzi-1').className = 'shengzi-2';
},'绳子2');
Time1.start(1000,function(){
ele("shengzi-2").className = "shengzi-3";
},'绳子3');
Time1.start(1500, function () {
ele("shengzi-3").className = "shengzi-4";
},'绳子4');
}
```
按着预期执行了。ele是获取元素的函数。
### 粽子肉出现，粽子肉文字出现，叶子的出现，祝福语出现，祝福语抖动一下
*css*还是一样调节位置就可以了。这里的话因为叶子的出现和消失需要有个过渡，（transtion设置应该就可以）
添加粽子肉和文字，祝福语，叶子（左，右，低）的结构
### 后面的html结构
```html
<div class="main">
<div class="zongzi-box">
<div class="zongzi"></div>
<div class="shengzi-1"></div>
<div class="zongzirou"></div>
<div class="text_ry"></div>
<div class="text_jx"></div>
<div class="zuoye"></div>
<div class="youye"></div>
<div class="youye"></div>
</div>
<div class="bless">
<div class="blessing"></div>
<div class="caption">
<div class="to">慕课网的小伙伴们：</div>
<div class="msg">在
端午节来临之际，小慕给大家送来心意了，祝大家好运，吉祥，幸福，快快乐乐每一天，慕课网永远和你相伴！

</div>
<div class="form">小慕</div>
</div>
</div>
</div>
```
给dom添加图片，调好位置
之后添加相应的过渡动画。（transform，transition）。嗯，大概就是这样……2333.
[![PPKb34.png](https://s1.ax1x.com/2018/06/26/PPKb34.png)](https://imgchr.com/i/PPKb34)
[![PPKHCF.png](https://s1.ax1x.com/2018/06/26/PPKHCF.png)](https://imgchr.com/i/PPKHCF)
主要的话就是一些细节，比如打开绳子后，绳子隐藏，然后粽子缩小，和透明化。粽子肉出现，左叶右叶都添加一个待会要绽放的动画。这些都需要给个过渡，如果只是给隐藏，会显得太过尴尬，不自然。
**transition:all 1s;**就可以很自然的过渡。
### 祝福语
祝福语的话出现在粽子的左侧，祝福语的图片会抖动一下。祝福语会以动画的形式缓慢出现。
祝福语出现的话，可以使用translate属性来隐藏起来，（配合父元素的overflow属性）这样的话就可以实现，图片先出现，然后呢，祝福语，缓慢的从左边出现，祝福语需要间隔出现，比如说，慕课网的小伙伴们，这句话最先出现，然后是第二句话，最后是最后一句话。它们不是一起出现的。这里的话需要transition-delay过渡等待。（也就是说可以设置在动画开始前需要等待的时间）。emmm……对，还有个祝福语的图片，出场后也需要动画抖动，不用无限抖动。
[![PP1tat.md.png](https://s1.ax1x.com/2018/06/26/PP1tat.md.png)](https://imgchr.com/i/PP1tat)
### 粽子肉上面的文字旋转动画
1.  一共有4个画面
2. 每个页面的文字位置也不同
3. 旋转方向是左方向
这样的话根据旋转的时候替换图片，然后替换文字。**先写好每个文字在每张图片里面的位置。**
还是老方法，一个个进行调节。要是电脑知道我的意思就好了……233.
[![PP82gU.png](https://s1.ax1x.com/2018/06/26/PP82gU.png)](https://imgchr.com/i/PP82gU)
[![PP8RvF.png](https://s1.ax1x.com/2018/06/26/PP8RvF.png)](https://imgchr.com/i/PP8RvF)
[![PP8g3T.png](https://s1.ax1x.com/2018/06/26/PP8g3T.png)](https://imgchr.com/i/PP8g3T)
最后一面的就只是显示如意。
```css
.ry-view-1{
left: 169px;
transform: scale(.4) rotate(-5deg);
}
.ry-view-2{
left: 24px;
transform: scale(.6) rotate(30deg);
}
.ry-view-3{
left: 126px;
transform: scale(.7) rotate(-30deg);
}
.jx-view-1{
left: 47px;
transform: scale(.7);
}
.jx-view-2{
left: 139px;
transform: scale(.5) rotate(-30deg);
}
.jx-view-3{
left: 12px;
transform: scale(.4) rotate(30deg);
}

```
上面是文字调节后的代码。
### 打开粽子的动画
解开绳子了，粽子肉当然就是主角啦。样式差不多了，觉得不好看以后再调吧。
之前写好了js的**时间**类，（括号笑），那么按顺序时间就可以编写每个需要的动画了。只要在特定的时间添加给指定元素给指定的类名就ok了。感觉有点水哈。不过目前只能这样啦。
刚想写js的代码，发现我的html结构不对，因为出场的时候是粽子，现在是粽子肉还在，所以在粽子肉，文字，叶子写多个盒子，叫open-out,之后换成open-in就可以显示粽子肉啦。
### 兼容性问题
页面写好后进行测试，发现2个问题。
1. ie和edeg浏览器出现父元素不能继承opacity属性。
2. 火狐和ie和edeg浏览器出现transition属性问题。（例如元素设置opacity为0的时候，如果设置transition属性的话，那么浏览器在刷新或刚打开的时候会出现元素，然后执行过渡动画）
第一个问题很好解决，需要隐藏的元素全部在设置就可以兼容了
第二个问题非常麻烦，一开始以为是前缀没写好，结果不是这个问题，我试着把代码转移到单文件，结果发现可以了。我以为是css问题。我设置了scss的编译效果，结果就算css格式一样也还是不行。奔溃啊。我就在想会不会是我其中哪个css出错了，可是没理由同样的代码在不同的环境就出现问题啊。我又试着写了个小测试。
![PkJjJA.png](https://s1.ax1x.com/2018/07/01/PkJjJA.png)
结果单文件测试没问题。用webpack打包还是不行。刷新页面还是会出现hello这个元素。只能求助别人了
上网查也查不到，群里问也没人知道……奔溃！！！
## 总结
webpack的坑其实还好，基本还是蛮容易找到的。- -最重要的是如果错了，出现error的话会有提醒，但是css就不一样了。蛋疼。
webpack的知识点主要是管理资源，和输出。可以自己定义输出口。还有个clear删除多余文件的插件没有使用。在输出中（output）还可以定义多文件输出的的。这个官网页也有说明。
css的话，在这里面调节各个图片比较枯燥一些。其它的话还行。
时间类，我觉得还可以再优化下，昨天看了javascript设计模式。觉得对象字面量模块化应该可以用在这里面。
sass,sass的嵌套真的非常非常强大。而且美观易读。它的变量对一些大点的项目，比如以前写的电商demo，如果用sass的话会非常爽。维护啊什么的会比较方便。目前想到的应用就是，例如特定的链接，nav-links，还有一些字体。就可以设置变量。然后一些绑定多个类的元素。比如说按钮啊，nav啊，都可以使用@mixin混合器来使用，这样可以大大减少代码。而那些物品菜单也可以使用继承。页头和页尾这些固定的css样式也可以使用sass的import来解决原生的import问题，真的特别好用，特别爽。

