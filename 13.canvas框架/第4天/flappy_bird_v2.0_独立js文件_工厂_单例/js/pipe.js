(function (win) {
    /*
        * 管道的特点：
        * 1、成对出现，所以x轴可以共享，但是y轴不共享
        * 2、上下管道之间的路径固定，可以由用户指定
        * 3、管道的高度是随机生成的，随机生成上管道的高度，下管道就可以计算了
        * 4、当管道走出画布，从右边出来时，高度需要重新随机生成
        * */

    /*
    * constructor { Pipe } 管道
    * param { ctx: Context } 绘图环境
    * param { imgDown：Image } 口朝下的管道，在画布的上面
    * param { imgUp：Image } 口朝上的管道，在画布的下面
    * param { space：number } 上下管道的间距
    * param { landHeight：number } 大地的高度
    * param { speed：number } 速度
    * */
    function Pipe(ctx, imgDown, imgUp, space, landHeight, speed) {
        this.ctx = ctx;
        this.imgDown = imgDown;
        this.imgUp = imgUp;
        this.space = space;
        this.landHeight = landHeight;
        this.speed = speed;

        // 管道图片的宽高
        this.width = this.imgDown.width;
        this.height = this.imgDown.height;

        // 实例数量自增
        Pipe.len++;

        // 管道的x坐标
        this.x = 300 + (this.width * 4) * (Pipe.len - 1);
        // 上管道的y坐标
        this.pipeDownY;
        // 下管道的y坐标
        this.pipeUpY;

        // 初始化管道的高度数据
        this._init();
    }

// 实例数量
    Pipe.len = 0;

    Pipe.prototype = {
        constructor: Pipe,

        // 初始化管道的高度数据
        _init: function () {
            // 计算上下两根管道显示的高度的和
            var totalHeight = this.ctx.canvas.height - this.landHeight - this.space;
            // 每根管道显示的最小高度
            var minHeight = 50;
            // 上管道可显示高度的最大值（减去了上下管道最小值外的最大值）
            var maxHeight = totalHeight - minHeight * 2;
            // 根据可显示高度的最大值随机生成上管道的显示高度，注意不能小于最小高度
            var pipeDownHeight = Math.random() * maxHeight + minHeight;

            // 上管道的y坐标
            this.pipeDownY = pipeDownHeight - this.height;
            // 下管道的y坐标
            this.pipeUpY = pipeDownHeight + this.space;
        },

        draw: function () {
            // 画上管道
            this.ctx.drawImage(this.imgDown, this.x, this.pipeDownY, this.width, this.height);
            // 画下管道
            this.ctx.drawImage(this.imgUp, this.x, this.pipeUpY, this.width, this.height);
        },

        // 管道的下一帧数据
        update: function () {
            this.x -= this.speed;
            // 需要无缝滚动，当管道过了画布的时候拼接到最后
            if (this.x <= -this.width) {
                this.x += (this.width * 4) * Pipe.len;
                // 拼接后需要重新生成管道的高度
                this._init();
            }
        }
    };

    // 工厂
    win.getPipe = function (ctx, imgDown, imgUp, space, landHeight, speed) {
        return new Pipe(ctx, imgDown, imgUp, space, landHeight, speed);
    }
})(window);