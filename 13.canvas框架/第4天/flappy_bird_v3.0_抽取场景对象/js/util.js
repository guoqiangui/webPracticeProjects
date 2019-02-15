var util = {
    /*
         * function { util } 加载图片资源
         * param { imgUrl: Object } 按照key，val形式存储要加载图片资源的url地址
         * param { fn: Function } 加载完毕之后，把资源传给这个回调
         * */
    // 用来储存加载好的图片资源（即img标签）
    loadImage: function (imgUrl, callback) {
        var imgObj = {};
        // 加载完毕的图片数量
        var loaded = 0;
        // 传入图片的数量
        var imgNum = 0;

        // 记录传入图片数量
        for (var key in imgUrl) {
            imgNum++;
        }

        for (var key in imgUrl) {
            // 新建一张图片，实际上是空的img标签
            var img = new Image();
            img.onload = function () {
                loaded++;

                // 判断已经加载图片数量是否已经达到了传入图片数量
                if (loaded >= imgNum) {
                    // 加载完毕将对象传入回调函数供用户使用
                    callback(imgObj);
                }
            };

            // 给src属性赋值最好在onload的后面，这样可以确保图片能出来，这样绑定的函数就不会失效
            img.src = imgUrl[key];
            // 将加载好的图片存入对象
            imgObj[key] = img;
        }
    }
};