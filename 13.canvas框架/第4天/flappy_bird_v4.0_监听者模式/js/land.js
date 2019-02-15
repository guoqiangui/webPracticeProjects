(function (win) {
    /*
       * constrcutor { Land } 大地
       * param { ctx: Context } 绘图环境
       * param { img: Image } 绘制的图像资源
       * param { speed: number } 速度
       * */
    function Land(ctx, img, speed) {
        this.ctx = ctx;
        this.img = img;
        this.speed = speed;

        // 实例个数自增
        Land.len++;

        // 绘制大地的坐标
        this.x = this.img.width * (Land.len - 1);
        this.y = this.ctx.canvas.height - this.img.height;
    }

// 大地实例个数
    Land.len = 0;

    Land.prototype = {
        constructor: Land,

        draw: function () {
            this.ctx.drawImage(this.img, this.x, this.y, this.img.width, this.img.height);
        },

        // 更新大地的下一帧数据
        update: function () {
            this.x -= this.speed;
            // 如果一张大地已经完全走出画布，那么将其拼接到最后，实现重复滚动
            if (this.x <= -this.img.width) {
                // this.x = this.img.width * (Land.len - 1); 这种方式如果刚好速度与宽度不成倍数的话，会在拼接后产生缝隙，直接在原来的基础上加就不会有缝隙了
                this.x += this.img.width * Land.len;
            }
        }
    };

    // 工厂模式
    win.getLand = function (ctx, img, speed) {
        return new Land(ctx, img, speed);
    };
})(window);