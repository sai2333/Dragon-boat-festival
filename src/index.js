import './style.scss';

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


//获取class
const ele = function(e){
  return document.getElementsByClassName(e)[0];
}
//给元素赋予想要的类名，虽然es6有classList,但这里的话有时候想要去掉。
//rest参数,获取多余的参数，es6写法
// const addClass = function(...classnames){
//   let animtionClass = '';
//   for (let classname of classnames){
//     animtionClass += classname + ' ';
//   }
//   return animtionClass;
// }

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
ele('shengzi-1').onclick = function() {
  Time1.start(500,function(){
    ele('shengzi-1').className = 'shengzi-2';
  },'绳子2');
  Time1.start(800,function(){
    ele("shengzi-2").className = "shengzi-3";
  },'绳子3');
  Time1.start(1000, function () {
    ele("shengzi-3").className = "shengzi-4 shengzi-out";
    ele("zongzi").className = "zongzi-out zongzi";
  },'绳子4');
  Time1.start(1500,function() {
    ele('open-out').className ='open-in';
    ele('zongzirou').classList.add('zongzirou-in');
    ele('zuoye').classList.add('zuoye-in');
    ele("youye").classList.add("youye-in");
    ele('text-jx').classList.add('text-jx-in');
  },'粽子肉，文字，叶子显示');
  Time1.start(2100,function() {
    ele('bless').className = 'bless-in bless';
    ele("to").classList.add("caption-in");
    ele("msg").classList.add("caption-in");
    ele("form").classList.add("caption-in");
    ele("blessing").className = "blessing-rock blessing-in blessing";
  },'显示祝福语');
  Time1.start(3000,function() {
    ele('zuoye').className = 'zuoye-out zuoye';
    ele("youye").className = "youye-out youye";
    ele("diye").classList.add("diye-in");
  },'打开叶子，显示底叶');
  Time1.start(4000,function() {
    ele("zongzirou").className = "zongzirou-view-1 zongzirou zongzirou-in";
    ele('text-ry').className = 'text-ry-in text-ry ry-view-1';
    ele("text-jx").className = "text-jx-in text-jx jx-view-1";
  },'转动粽子肉1');
  Time1.start(4500, function () {
    ele("zongzirou").className = "zongzirou-view-2 zongzirou zongzirou-in";
    ele('text-ry').className = 'text-ry-in text-ry ry-view-2';
    ele("text-jx").className = "text-jx-in text-jx jx-view-2";
  }, '转动粽子肉2');
  Time1.start(5000, function () {
    ele("zongzirou").className = "zongzirou-view-3 zongzirou zongzirou-in";
    ele('text-ry').className = 'text-ry-in text-ry ry-view-3';
    ele("text-jx").className = "text-jx-in text-jx jx-view-3";
  }, '转动粽子肉3');
  Time1.start(5500, function() {
    ele("zongzirou").className = "zongzirou-view-4 zongzirou zongzirou-in";
      ele("text-ry").className = "text-ry-in text-ry";
      ele("text-jx").className = "text-jx-out text-jx";
    }, "转动粽子肉3");
}
