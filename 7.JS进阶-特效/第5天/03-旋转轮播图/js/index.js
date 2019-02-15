/*
需求：让图片具有旋转木马的特效
思路：
    1、每张图片的样式都存在一个数组arr中
    2、点击右箭头运动到下一张图片（当前图片样式给下一张图片，一直给下去）
        arr最后一个元素插入到第一个元素之前
    3、点击左箭头运动到上一张图片
        arr第一个元素插入到最后一个元素之后
 */

window.onload = function () {
    var slide = document.getElementById("slide");
    var liArr = document.getElementsByTagName("li");
    var arrow = document.getElementById("arrow");   //里面有两个箭头
    //用来解决机器的压力，必须等运动完成之后才可以点击
    var flag = true;

    //存储图片样式的数组，每个json代表一张图片
    var arr = [
        {   //  1
            width:400,
            top:70,
            left:50,
            opacity:20,
            zIndex:2
        },
        {  // 2
            width:600,
            top:120,
            left:0,
            opacity:80,
            zIndex:3
        },
        {   // 3
            width:800,
            top:100,
            left:200,
            opacity:100,
            zIndex:4
        },
        {  // 4
            width:600,
            top:120,
            left:600,
            opacity:80,
            zIndex:3
        },
        {   //5
            width:400,
            top:70,
            left:750,
            opacity:20,
            zIndex:2
        }
    ];

    //给每张图片添加样式
    for(var i=0;i<liArr.length;i++) {
        //赋值（为了打开网页的时候，图片是逐渐移到当前状态，用animate）
        animate(liArr[i], arr[i]);
    }

    //鼠标移到图片上逐渐出现箭头，移开箭头逐渐消失
    //不知道为什么绑定父盒子slide没问题，给每一张图片绑定会有bug
    slide.onmouseenter = function () {
        animate(arrow, {"opacity": 100});
    }
    slide.onmouseleave = function () {
        animate(arrow, {"opacity": 0});
    }

    // 2、点击右箭头运动到下一张图片（当前图片样式给下一张图片，一直给下去）
    //     arr最后一个元素插入到第一个元素之前
    arrow.children[1].onclick = function () {
        // //arr最后一个元素插入到第一个元素之前
        // var lastEle = arr.pop(); //先取出最后一个元素
        // arr.unshift(lastEle);    //插入到数组最前面
        //
        // //调整好数组的位置还要更新图片显示状态
        // for(var i=0;i<liArr.length;i++) {
        //     animate(liArr[i], arr[i]);
        // }

        //如果flag为true才可以运动
        if(flag) {
            flag = false;
            move(false);
        }
    }

    // 3、点击左箭头运动到上一张图片
    // arr第一个元素插入到最后一个元素之后
    arrow.children[0].onclick = function () {
        // var firstEle = arr.shift();
        // arr.push(firstEle);
        //
        // //调整好数组的位置还要更新图片显示状态
        // for(var i=0;i<liArr.length;i++) {
        //     animate(liArr[i], arr[i]);
        // }

        if(flag) {
            flag = false;
            move(true);
        }
    }

    //代码精简：上面的点击左右箭头代码类似，可以封装到一个方法中，用true表示往左，false表示往右
    function move(bool) {
        if(bool === true) {
            var firstEle = arr.shift();
            arr.push(firstEle);
        } else {
            var lastEle = arr.pop();
            arr.unshift(lastEle);
        }
        //调整好数组的位置还要更新图片显示状态
        for(var i=0;i<liArr.length;i++) {
            animate(liArr[i], arr[i], function () {
                //这个回调函数主要是为了运动结束后让flag变回true
                //恰好这个函数有这个运动结束后才执行的功能
                flag = true;
            });
        }
    }

}
