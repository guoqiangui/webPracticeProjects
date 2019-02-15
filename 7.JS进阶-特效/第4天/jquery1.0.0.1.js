/**
 * 获取浏览器可视区域（页面可视区域）的宽高
 * @returns {{width: number, height: number}}
 */
function client() {
    if(window.innerWidth !== undefined) {
        return {
            "width": window.innerWidth,
            "height": window.innerHeight
        };
    } else if(document.compatMode === "CSS1Compat") {
        return {
            "width": document.documentElement.clientWidth,
            "height": document.documentElement.clientHeight
        };
    } else {
        return {
            "width": document.body.clientWidth,
            "height": document.body.clientHeight
        };
    }
}

/**
 * 显示元素
 * @param ele
 */
function show(ele) {
    ele.style.display = "block";
}

/**
 * 隐藏元素
 * @param ele
 */
function hide(ele) {
    ele.style.display = "none";
}

/**
 * 获取元素任意形式样式的兼容写法
 * @param ele
 * @param attr  css属性
 * @returns {*}
 */
function getStyle(ele, attr) {
    if(window.getComputedStyle) {
        return window.getComputedStyle(ele, null)[attr];
    }
    return ele.currentStyle[attr];
}

/**
 * 缓动动画封装
 * @param ele
 * @param json 要改动元素的css属性作为json的属性，值作为json的值
 * @param fun
 */
function animate(ele, json, fn) {
    //要用定时器，先清定时器
    clearInterval(ele.timer);
    ele.timer = setInterval(function () {
        var flag = true;    //开闭原则

        //遍历json
        for(var key in json) {
            //利用之前封装的获取任意形式属性值方法，返回的是10px形式的string，需要转成数字
            //parseInt()刚好可以忽略后面的字符串，只得到数字
            var leader = parseInt(getStyle(ele, key));

            var step = (json[key] - leader) / 10;  //计算步长
            step = step>0 ? Math.ceil(step) : Math.floor(step); //对步长进行加工
            leader = leader + step; //当前值变动
            ele.style[key] = leader + "px";    //改变

            //清除定时器
            //因为这里没有小数，可以直接判断leader与目标值是否相等，不等就不能清除定时器
            if(json[key] !== leader) {
                flag = false;
            }
        }

        //只有所有的属性变动完成才能清除定时器
        if(flag) {
            clearInterval(ele.timer);

            //第一个函数已经结束，可以执行回调函数了
            //如果传入了回调函数，才执行
            if(fn) {
                fn();
            }
        }
    }, 30);
}