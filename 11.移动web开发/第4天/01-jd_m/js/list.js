window.onload = function () {
    // 左侧效果
    leftScroll();
    
//    右侧效果（和左侧一样）
    rightScroll();
};


// 左侧效果
function leftScroll() {
//    获取必要的元素
//    左侧ul
    var ul = document.querySelector(".main_left ul");
//    ul的父盒子
    var parent = ul.parentNode;
    // 获取顶部栏的高度
    var headerHeight = document.querySelector(".header").offsetHeight;

    // 开始触摸时手指的位置
    var startY = 0;
    // 手指拖动的距离
    var moveY = 0;
    // 距离初始触摸位置的值
    var distanceY = 0;

    // 可被吸附的距离
    var delayDistance = 100;

    /*
        因为拖动是往y轴负方向拖动的，所以拖动的值为负值，越拖值越小
     */
    // 移动的最大值
    var maxDistance = 0 + delayDistance;
    // 移动的最小值
    var minDistance = parent.offsetHeight - ul.offsetHeight - headerHeight - delayDistance;

    // 重构代码，将经常用到的代码进行封装
    // 添加过渡
    var startTransition = function () {
        ul.style.transition = "all 0.3s";
    }
    // 清除过渡
    var endTransition = function () {
        ul.style.transition = "";
    }
    // 移动
    var setTransform = function (distance) {
        ul.style.transform = "translateY(" + distance + "px)";
    }

    /*
        1、先实现ul跟随手指的拖动而移动的效果
        2、对ul移动的范围进行限制
        3、小bug修复：最后一个看不到，给移动的最小值再减去header的高度
        4、实现吸附效果：加大移动的范围，手指松开后弹回原来限制的范围
     */
//    给ul绑定3个touch事件
    ul.addEventListener("touchstart", function (event) {
    //    记录开始触摸的位置
        startY = event.touches[0].clientY;
    //    清除过渡
        endTransition();
    });

    ul.addEventListener("touchmove", function (event) {
        // 不断记录拖动的距离
        moveY = event.touches[0].clientY - startY;

    //    对移动的值进行修正
        if((distanceY + moveY) > maxDistance) {
            // 固定在最大值点
            setTransform(maxDistance);
        } else if((distanceY + moveY) < minDistance) {
            // 固定在最小值点
            // ul.style.transform = "translateY(" + minDistance + "px)";
            setTransform(minDistance);
        } else {
            //    ul跟随移动（别把像素漏了）
            // ul.style.transform = "translateY(" + (distanceY + moveY) + "px)";
            setTransform(distanceY + moveY);
        }
    });

    ul.addEventListener("touchend", function (event) {
    //    手指离开记录距离初始触摸位置的距离
        distanceY += moveY;
    //    手指离开后，判断是否能吸附，能就进行吸附
        if(distanceY > (maxDistance - delayDistance)) {
            distanceY = maxDistance - delayDistance;
        } else if(distanceY < (minDistance + delayDistance)) {
            distanceY = minDistance + delayDistance;
        }
        // 添加过渡
        startTransition();
        // 移到初始限定的位置
        // ul.style.transform = "translateY(" + distanceY + "px)";
        setTransform(distanceY);
    });


    // 第二大逻辑，左侧点击效果
    /*
        1、因为移动端的click事件有200ms延迟，为了用户体验，利用touch事件封装一个tap点击事件
        2、给li绑定tap事件，给当前li添加.current类
        3、ul移动到相应位置，使被点击的li置顶
        4、对ul移动的距离进行限制，不能无限置顶
     */
//     获取必要的元素
//    获取所有li
    var liArr = document.querySelectorAll(".main_left ul li");
    // 获取单个li的高度
    var liHeight = document.querySelector(".main_left ul li").offsetHeight;

    // 遍历li
    for(var i=0 ; i<liArr.length ; i++) {
        //    给所有的li绑定一个自定义属性：索引
        liArr[i].dataset["index"] = i+"";
    }

    //    给ul元素绑定tap事件，通过event.target可以获取触发事件的元素（冒泡）
    event_tap(ul, function (event) {
        // console.log(event);
        //    event.target可以获取触发事件的元素，这里是li里的a
        //     console.log(event.target);

        //    排他思想
        for(var i=0 ; i<liArr.length ; i++) {
            liArr[i].classList.remove("current");
        }
        //    给当前li添加current类
        var currLi = event.target.parentNode;
        currLi.classList.add("current");

        // this输出的是window
        // console.log(this);
        // console.log(event.target.parentNode);
        //    获取当前li索引
        var index = currLi.dataset["index"];
        // 移动距离
        var moveDistance = -1*index*liHeight;
        // 对移动距离进行修正
        if(moveDistance < (minDistance + delayDistance)) {
            moveDistance = minDistance + delayDistance;
        }
        // 更新距离
        distanceY = moveDistance;
        //    移动
        setTransform(distanceY);
    });
}



// 右侧效果
function rightScroll() {
    //    获取必要的元素
//    右侧区域盒子
    var mainRight = document.querySelector(".main_right");
//    右侧区域盒子的父盒子
    var parent = mainRight.parentNode;
    // 获取header的高度
    var headerHeight = document.querySelector(".header").offsetHeight;

    // 开始触摸时手指的位置
    var startY = 0;
    // 手指拖动的距离
    var moveY = 0;
    // 距离初始触摸位置的值
    var distanceY = 0;

    // 可被吸附的距离
    var delayDistance = 100;

    /*
        因为拖动是往y轴负方向拖动的，所以拖动的值为负值，越拖值越小
     */
    // 移动的最大值
    var maxDistance = 0 + delayDistance;
    // 移动的最小值
    var minDistance = parent.offsetHeight - mainRight.offsetHeight - delayDistance - headerHeight;

    // 重构代码，将经常用到的代码进行封装
    // 添加过渡
    var startTransition = function () {
        mainRight.style.transition = "all 0.3s";
    }
    // 清除过渡
    var endTransition = function () {
        mainRight.style.transition = "";
    }
    // 移动
    var setTransform = function (distance) {
        mainRight.style.transform = "translateY(" + distance + "px)";
    }

    /*
        1、先实现mainRight跟随手指的拖动而移动的效果
        2、对mainRight移动的范围进行限制
        3、实现吸附效果：加大移动的范围，手指松开后弹回原来限制的范围
        4、小bug修复：最后一个看不到，给移动的最小值再减去header的高度
     */
//    给mainRight绑定3个touch事件
    mainRight.addEventListener("touchstart", function (event) {
        //    记录开始触摸的位置
        startY = event.touches[0].clientY;
        //    清除过渡
        endTransition();
    });

    mainRight.addEventListener("touchmove", function (event) {
        // 不断记录拖动的距离
        moveY = event.touches[0].clientY - startY;

        //    对移动的值进行修正
        if((distanceY + moveY) > maxDistance) {
            // 固定在最大值点
            setTransform(maxDistance);
        } else if((distanceY + moveY) < minDistance) {
            // 固定在最小值点
            setTransform(minDistance);
        } else {
            //    ul跟随移动（别把像素漏了）
            setTransform(distanceY + moveY);
        }
    });

    mainRight.addEventListener("touchend", function (event) {
        //    手指离开记录距离初始触摸位置的距离
        distanceY += moveY;
        //    手指离开后，判断是否能吸附，能就进行吸附
        if(distanceY > (maxDistance - delayDistance)) {
            distanceY = maxDistance - delayDistance;
        } else if(distanceY < (minDistance + delayDistance)) {
            distanceY = minDistance + delayDistance;
        }
        // 添加过渡
        startTransition();
        // 移到初始限定的位置
        setTransform(distanceY);
    });
}



