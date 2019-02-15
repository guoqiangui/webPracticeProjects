//自己封装的方法

/**
 * 根据id获取节点
 * @param id
 * @returns {HTMLElement}
 */
function getNode(id) {
    return document.getElementById(id);
}

/**
 * 获取下一个兄弟元素节点
 * @param ele
 * @returns {Element | Node | SVGElementInstance | ActiveX.IXMLDOMNode | (() => (Node | null))}
 */
function getNextNode(ele) {
    return ele.nextElementSibling || ele.nextSibling;
}

/**
 * 获取上一个兄弟元素节点
 * @param ele
 * @returns {Element | ActiveX.IXMLDOMNode | Node | SVGElementInstance | (() => (Node | null))}
 */
function getPreviousNode(ele) {
    return ele.previousElementSibling || ele.previousSibling;
}

/**
 * 获取第一个子元素节点
 * @param ele
 * @returns {Element | (() => (Node | null)) | Node | SVGElementInstance | ActiveX.IXMLDOMNode}
 */
function getFirstChildNode(ele) {
    return ele.firstElementChild || ele.firstChild;
}

/**
 * 获取最后一个子元素节点
 * @param ele
 * @returns {Element | ActiveX.IXMLDOMNode | Node | SVGElementInstance | (() => (Node | null))}
 */
function getLastChildNode(ele) {
    return ele.lastElementChild || ele.lastChild;
}

/**
 * 获取指定兄弟节点
 * @param ele
 * @param index
 * @returns {Element}
 */
function getSibNodeOfIndex(ele, index) {
    return ele.parentNode.children[index];
}

/**
 * 获取所有兄弟节点（不包括自己）
 * @param ele
 * @returns {Array}
 */
function getAllSibNodes(ele) {
    var newArr = [];
    var arr = ele.parentNode.children;
    for(var i=0;i<arr.length;i++) {
        if(arr[i] != ele) {
            newArr.push(arr[i]);
        }
    }
    return newArr;
}


/**
 * 使盒子匀速运动，默认向右运动
 * @param ele 要移动的盒子
 * @param target 要移动到的目标left值
 */
function animate1(ele, target) {
    //要用定时器，先清除定时器
    clearInterval(ele.timer);
    //获取步长
    var speed = target > ele.offsetLeft ? 10 : -10;
    //将定时器作为盒子的属性
    ele.timer = setInterval(function () {
        //如果已经达到目标值，就清除定时器
        if(ele.offsetLeft == target) {
            clearInterval(ele.timer);
            return; //下面还有代码会执行，不跳出会有bug
        }
        //获取目标值与当前值的差
        var val = target - ele.offsetLeft;
        //如果差的绝对值小于步长，就令当前值等于目标值并清除定时器
        if(Math.abs(val) < speed) {
            ele.style.left = target;
            clearInterval(ele.timer);
            return; //下面还有代码会执行，不跳出会有bug
        }
        //移动
        ele.style.left = ele.offsetLeft + speed + "px";
        // console.log(ele.offsetLeft);
    }, 30);
}


/**
 * 缓动动画的完整封装，默认向右缓动
 * @param ele
 * @param target
 */
function animate2(ele, target) {
    clearInterval(ele.timer);
    ele.timer = setInterval(function () {
        //bug1：由于offsetLeft的值会四舍五入，所以每次left值都是196.4，定时器无法被清除
        //解决方法：将步长向上取整，在距离小于10的时候，步长稳定为1，这样肯定能到目标值
        //bug2：往左走不会走到目标值, 在还有9px的时候步长为-0.9，由于向上取整，步长为0，无法继续移动
        //解决方法：当步长为负数时，向下取整，正数向上取整
        //bug3：多次点击会出现bug
        //解决方法：要用定时器，先清定时器

        console.log(1);
        var step = (target - ele.offsetLeft) / 10;
        //将步长向上取整
        step = step>0 ? Math.ceil(step) : Math.floor(step);
        ele.style.left = ele.offsetLeft + step + "px";
        //如果距离比步长要小
        if(Math.abs(target - ele.offsetLeft) <= Math.abs(step)) {   //没有=的话点击两次会有bug
            //令当前值等于目标值
            ele.style.left = target;
            //清除定时器
            clearInterval(ele.timer);
        }
    }, 30);
}


/**
 * 利用json获取scrollTop和scrollLeft（处理了兼容问题）
 * @returns {{top: number, left: number}}
 */
function scroll() {
    return {
        "top": window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop,
        "left": window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft
    };
}
