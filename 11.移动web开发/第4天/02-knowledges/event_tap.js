/*
    手指点击事件
    参数1：要绑定事件的元素
    参数2：回调函数
 */
function event_tap(element, callBack) {
    // 是否拖动
    var isMove = false;
    // 开始点击的时间
    var startTime = 0;

    // 给元素绑定3个touch事件
    element.addEventListener("touchstart", function (event) {
        // Date.now() 返回当前系统时间的毫秒值
        // console.log(Date.now());
        // 记录开始点击的时间
        startTime = Date.now();
        // 修正isMove的值
        isMove = false;
    });

    element.addEventListener("touchmove", function (event) {
    //    如果手指有拖动，就不是点击
        isMove = true;
    });

    element.addEventListener("touchend", function (event) {
        //  如果手指有拖动
        if(isMove == true) {
            return;
        }

        // 记录点击持续时间
        var clickTime = Date.now() - startTime;
        // 如果小于250毫秒，是一次点击，大于就不算
        if(clickTime <= 250) {
            // 执行回调函数，并将事件参数传递过去
            callBack(event);
        }
    });


}