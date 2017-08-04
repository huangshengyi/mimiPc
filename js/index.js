window.onload = function() {
    //获取相关元素
    //导航栏区域
    var header_navLi = document.getElementById('header_navUl').children;
    var item_children = document.getElementById('item_children').children;
    //小米明星单品区域
    var start_ul = document.getElementById('start_ul');
    var buttonArr = document.getElementById('star_button').children;
    //轮播图区域
    var banner = document.getElementById('banner');
    var ul = banner.children[0]; //图片ul
    var fistUlLi = ul.children[0]; //获取第一张图片
    ul.appendChild(fistUlLi.cloneNode(true)); //复制第一张图片放到最后面
    var ulLiArr = ul.children;
    var ol = banner.children[1]; //索引ol
    var direction = banner.lastElementChild || banner.lastChild;
    var spanArr = direction.children; //左右按钮
    var imgWidth = banner.offsetWidth; //获取图片的盒子宽度
    //列表导航栏要显示的产品框区域
    var list_nav_ul = document.getElementById('list_nav_ul');
    var product_list = document.getElementById('product_list');


    //创建对象
    var animation = new Animation();
    //导航栏区域
    animation.navShow(header_navLi, item_children);
    //小米明星单品动画区域
    animation.start(start_ul, buttonArr);
    //轮播图区域
    animation.carousel(banner, imgWidth, ul, ulLiArr, ol, spanArr);
    //列表导航栏要显示的产品框区域
    animation.list_product_nav(list_nav_ul, product_list);

}


//定义构造函数
function Animation(){

}
//给构造函数和原型添加extend方法
Animation.extend = Animation.prototype.extend  = function(obj){
    for(var key in obj){
        //判断对象中是否存在该属性
        if( obj.hasOwnProperty(key) ){
            this[key] = obj[key];
        }
    }
}
//原型方法
Animation.prototype.extend({
    starInit:function(start_ul, buttonArr){
        this.len = buttonArr.length; //明星切换按钮
        this.arr = [0,-1226]; //明星滑动的位置
        this.index = 0; //标识索引
        this.buttonArr = buttonArr;
        this.startUl = start_ul; //要滑动的对象
    },

    //导航栏鼠标滑过显示
    navShow:function(header_navLi, item_children){
        for(var i=0,len=header_navLi.length-2;i<len;i++){
            header_navLi[i].index = i;
            header_navLi[i].onmouseenter = function(){
                var self = this;

                //每切换一个li清除所有
                for(var j=0,len=header_navLi.length-2;j<len;j++){
                    item_children[j].style.display = "none";
                }

                item_children[this.index].style.display = "block";
                item_children[this.index].parentNode.style.cssText = "height:230px;border-top:1px solid #dddddd;border-bottom:1px solid #dddddd;box-shadow: 0 1px 1px 1px #f2f2f2;"
                //让产品待会再出来
                setTimeout(function(){
                    item_children[self.index].children[0].style.display = "block";
                },250)
            }

            header_navLi[i].onmouseleave = function(){
                var self = this.index;
                //鼠标滑出导航后，由大盒子来进行关闭
                this.parentNode.parentNode.parentNode.parentNode.onmouseleave = function(){
                    item_children[self].style.display = "none";
                    item_children[self].parentNode.style.cssText = "height:0px;";
                    item_children[self].children[0].style.display = "none";
                }
            }
        }
    },

    //小米明星单品
    start:function(start_ul, buttonArr){
        //初始化数据
        this.starInit(start_ul, buttonArr);
        //把当前的this赋值给self
        var self = this;

        for(var i=0; i<this.len; i++){
            //鼠标滑过
            this.buttonArr[i].onmouseenter = function(){
                this.className = "current";
                //根据offsetLeft值，取消按钮的颜色
                if(self.startUl.offsetLeft == 0){
                    self.buttonArr[1].className = "";
                }else{
                    self.buttonArr[0].className = "";
                }
            }
            //鼠标滑出,清空颜色
            this.buttonArr[i].onmouseleave = function(){
                for(var j=0; j<self.len; j++){
                    self.buttonArr[j].className = "";
                }
            }
        }

        //点击左右按钮切换
        this.buttonArr[0].onclick = function(){
            Animation.slowAnimation(self.startUl, self.arr[1]);
        }
        this.buttonArr[1].onclick = function(){
            Animation.slowAnimation(self.startUl, self.arr[0]);
        }

        //定时器执行动画
        setInterval(function(){
            if(self.index%2==0){
                Animation.slowAnimation(self.startUl, self.arr[0]);
            }else{
                Animation.slowAnimation(self.startUl, self.arr[1]);
            }
            self.index++;
        },8600);
    },

    //轮播图出口方法
    carousel:function(banner, imgWidth, ul, ulLiArr, ol, spanArr){
        var timer,key=0,square=0,num=ulLiArr.length,bool=true,count;

        //根据图片的张数，动态创建索引li
        for(var i=0,len=num-1; i<len; i++){
            var olLi = document.createElement('li');
            ol.appendChild(olLi);
        }
        //给第一个索引li添加默认的样式
        olLiArr = ol.children;
        olLiArr[0].className = "current";
        var olLiLength = olLiArr.length;

        //鼠标点击索引li切换轮播图
        for(var i=0; i<olLiLength; i++){
            olLiArr[i].index = i; //自定义索引
            olLiArr[i].onmouseenter = function(){
                for(var j=0; j<olLiLength; j++){
                    olLiArr[j].className = "";
                }
                this.className = "current";
            }

            //鼠标滑出索引li，恢复到原来停留的位置
            olLiArr[i].onmouseleave = function(){
                for(var j=0; j<olLiLength; j++){
                    olLiArr[j].className = "";
                }
                //鼠标滑出ol范围时，恢复状态
                this.parentNode.onmouseleave = function(){
                    olLiArr[count].className = "current";
                }
            }

            olLiArr[i].onclick = function(){
                for(var j=0; j<olLiLength; j++){
                    olLiArr[j].className = "";
                }
                ul.style.left = -this.index*imgWidth + "px";
                key = square = this.index;
                count = this.index; //单击时改变当前索引li 的状态
                this.className = "current";
            }
        }

        //鼠标放上去清除定时器，移开则开启定时器
        banner.onmouseenter = function(){
            // console.log('索引li为：' + square);
            count = square; //记录下鼠标滑入时，索引li 的状态
            clearInterval(timer);
        }
        banner.onmouseleave = function(){
            timer = setInterval(function(){
                autoplay_r();
            },3000);
        }

        //点击左右两侧按钮切换图片
        spanArr[0].onclick = function(){
            if(bool){
                bool = false;
                antoplay_l(function(){
                    bool = true;
                })
            }
        }
        spanArr[1].onclick = function(){
            if(bool){
                bool = false;
                autoplay_r(function(){
                    bool = true;
                });
            }
        }


        //定时器自动执行轮播图
        timer = setInterval(function(){
            autoplay_r();
        },3000);

        //轮播图的方法(向右走)
        function autoplay_r(param){
            key++;
            if(key>num-1){
                ul.style.left = 0;
                key = 1;
            }
            Animation.slowAnimation(ul, -key*imgWidth, param);

            square++;
            if(square>num-2){
                square = 0;
            }
            for(var i=0,len=num-1;i<len;i++){
                olLiArr[i].className = "";
            }
            olLiArr[square].className = "current";
        }
        //轮播图的方法(向左走)
        function antoplay_l(param){
            key--;
            if(key<0){
                ul.style.left = (num-1)*-imgWidth + "px";
                key = num-2;
            }
            Animation.slowAnimation(ul, -key*imgWidth, param);

            square--;
            if(square<0){
                square = num-2;
            }
            for(var i=0,len=num-1;i<len;i++){
                olLiArr[i].className = "";
            }
            olLiArr[square].className = "current";
        }

    },

    //列表导航栏要显示的产品框
    list_product_nav:function(list_nav_ul, product_list){
        var navLiArr = list_nav_ul.children; //列表导航的所有li
        var listUlArr = product_list.children; //要显示的产品框中的所有ul
        for(var i=0,len=navLiArr.length; i<len; i++){
            navLiArr[i].index = i; //自定义索引index
            navLiArr[i].onmouseenter = function(){
                for(var j=0,len=listUlArr.length; j<len; j++){
                    listUlArr[j].style.display = "none";
                }
                listUlArr[this.index].style.display = "block";
            }
            navLiArr[i].onmouseleave = function(){
                //找到包住列表导航栏和产品列表的最大盒子，使用事件
                listUlArr[this.index].parentNode.parentNode.onmouseleave = function(){
                    for(var j=0,len=listUlArr.length; j<len; j++){
                        listUlArr[j].style.display = "none";
                    }
                }
            }
        }
    }
});

//静态方法
Animation.extend({
    //兼容性获取样式的方法
    getStyle:function(ele, attr){
        if(window.getComputedStyle){
            return window.getComputedStyle(ele,null)[attr];
        }
        return ele.currentStyle[attr];
    },

    //动画方法
    slowAnimation:function(ele, target, fn){
        clearInterval(ele.timer);
        ele.timer = setInterval(function () {
            var step = (target - ele.offsetLeft)/10;
            step = step>0 ? Math.ceil(step) : Math.floor(step);
            ele.style.left = ele.offsetLeft + step + "px";

            if( Math.abs(target - ele.offsetLeft) <= Math.abs(step) ) {
                ele.style.left = target + "px";
                clearInterval(ele.timer);
                if(fn !==undefined){
                    fn();
                }
            }
        },30);
    }
})