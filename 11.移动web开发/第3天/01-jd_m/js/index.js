window.onload = function () {
//    将所有内容都写进window.onload中不好，不利于维护，将各个功能封装成方法比较好
//    滚动时通栏逐渐变不透明
    headerScroll();

//    掌上秒杀部分倒计时
    countDown();

//    轮播图
    slideBanner();
}

// 滚动时通栏逐渐变不透明
function headerScroll() {
    /*
    *   思路：
    *       从完全透明开始，到移动了轮播图的高度后完全不透明
    *       透明的值是变化的，由页面被卷曲的高度与轮播图的高度相除得出的大于0小于等于1的数决定
    */
//    获取轮播图的高度
    var bannerHeight = document.querySelector(".jd_banner").offsetHeight;
    // console.log(bannerHeight);
//    获取通栏
    var jdHeader = document.querySelector(".jd_header");
//    先把通栏设置成透明
    jdHeader.style.backgroundColor = "rgba(201, 21, 35, 0)";

//    监听window的滚动事件（页面滚动时触发）
    window.onscroll = function () {
        // 不断获取页面被卷去的高度（兼容写法准没错）
        var scrTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
    //    将卷曲的高度与轮播图高度相除，得出透明的值
        var scale = scrTop / bannerHeight;
    //    修改通栏的透明度
        jdHeader.style.backgroundColor = "rgba(201, 21, 35, "+scale+")";
    }
}


// 掌上秒杀部分倒计时
function countDown() {
//    设定倒计时时间（秒） 这里取3小时
    var totalSeconds = 3*60*60;

//    利用定时器，每过一秒总时间就减少一秒
    var timeId = setInterval(function () {
        totalSeconds --;
        // 如果时间到了，就清除定时器
        if(totalSeconds <= 0) {
            clearInterval(timeId);
        }

        //    计算有多少小时，多少分钟，多少秒
        var hours = Math.floor(totalSeconds / 3600);
        var minutes = Math.floor(totalSeconds % 3600 / 60);
        var seconds = totalSeconds % 60;

    //    显示在页面中
        var lis = document.querySelectorAll(".main_content .content_top li");
    //    因为时、分、秒都显示成两个数字
    //    小时的十位
        lis[0].innerHTML = Math.floor(hours / 10);
    //    小时的个位
        lis[1].innerHTML = hours % 10;
    //    分钟的十位
        lis[3].innerHTML = Math.floor(minutes / 10);
    //    分钟的个位
        lis[4].innerHTML = minutes % 10;
        //    秒的十位
        lis[6].innerHTML = Math.floor(seconds / 10);
        //    秒的个位
        lis[7].innerHTML = seconds % 10;
    }, 1000);


}


// 轮播图
function slideBanner() {
    /*
        与之前有一点不同，运动利用css3
        思路：先易后难
            1、完成无过渡的自动轮播图
     */
//    获取一张轮播图的宽度
    var width = document.querySelector(".jd_banner").offsetWidth;
    // console.log(width);
    //获取图片的ul
    var imgUl = document.querySelector(".jd_banner .banner_images");
    // 获取小圆点
    var indexLiArr = document.querySelectorAll(".jd_banner .banner_index li");
    // 轮播图必不可少的索引
    var index = 1;

    // 用户触摸起始位置
    var startX = 0;
    // 用户拖动距离
    var moveX = 0;

    // 默认给用户看到的第一张图片其实是第二张
    imgUl.style.transform = "translateX("+(-1*width)+"px)";

    // 设置定时器，每隔一段时间切换一张图片（就移动一张图片的宽度）
    var timerId = setInterval(function () {
        // 索引加1
        index ++;
        // 添加过渡
        imgUl.style.transition = "all 1s";
    //    移动
        imgUl.style.transform = "translateX("+(-width*index)+"px)";
    }, 1500);
    
//        绑定过渡结束事件，用来对Index进行修正和小圆点的显示
    imgUl.addEventListener("webkitTransitionEnd", function () {
        console.log(111);
        // 播放到最后一张就跳到第二张
        if(index >= 9) {
            index = 1;
        //    关闭过渡
            imgUl.style.transition = "";
        //    瞬间改变ul的位置
            imgUl.style.transform = "translateX(" + (-index*width) + "px)";
        }
        // 播放到第一张就跳到倒数第二张
        if(index <=0) {
            index = 8;
            //    关闭过渡
            imgUl.style.transition = "";
            //    瞬间改变ul的位置
            imgUl.style.transform = "translateX(" + (-index*width) + "px)";
        }
        //    给小圆点添加样式
        //    先清除当前小圆点的类
        for(var i=0; i<indexLiArr.length; i++) {
            indexLiArr[i].className = "";
        }
        //    给对应的小圆点添加.current
        indexLiArr[index-1].className = "current";
    })

//    在轮播图上增加手势操作
    imgUl.addEventListener("touchstart", function (event) {
    //    用户开始触摸的时候，自动播放停止，即清除定时器
        clearInterval(timerId);
    //    关闭过渡
        imgUl.style.transition = "";

    //    记录触摸起始位置
        startX = event.touches[0].clientX;
    });
    imgUl.addEventListener("touchmove", function (event) {
    //    不断记录拖动距离
        moveX = event.touches[0].clientX - startX;

    //    让图片跟着用户动，不要漏了拖动前已经移动的距离
        imgUl.style.transform = "translateX("+ (-1*index*width + moveX) +"px)";

    });
    imgUl.addEventListener("touchend", function (event) {
        // 用户移动手指导致切换图片的水平距离
        var maxX = width / 2;
        // 根据移动距离与导致切换水平距离的比较决定是否进行吸附
        /*
            距离较小，不用考虑正负，ul直接回到原来位置
            距离较大，需要考虑正负，index 根据情况自增或自减
         */
        if(Math.abs(moveX) < maxX) {
            // 将 过渡效果开启，开启后借助过渡结束事件可以对小圆点进行更新，同时图片切换也会好看一点
            imgUl.style.transition = 'all .3s';
            // 吸附回去
            imgUl.style.transform = "translateX("+ (-1*index*width) +"px)";
        } else {
            // 如果往X轴正方向拖动，是上一张
            if(moveX > 0) {
                index --;
            } else {    // X轴负方向，是下一张
                index ++;
            }
            // 将 过渡效果开启，开启后借助过渡结束事件可以对小圆点进行更新，同时图片切换也会好看一点
            imgUl.style.transition = 'all .3s';
        //    吸附一整页
            imgUl.style.transform = "translateX("+ (-1*index*width) +"px)";
        }

        // 设置定时器，每隔一段时间切换一张图片（就移动一张图片的宽度）
        timerId = setInterval(function () {
            // 索引加1
            index ++;
            // 添加过渡
            imgUl.style.transition = "all 1s";
            //    移动
            imgUl.style.transform = "translateX("+(-width*index)+"px)";
        }, 1500);
    })
}