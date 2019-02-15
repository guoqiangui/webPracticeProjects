(function (win) {
    /*
         * 绘制背景
         * construcotor { Sky } 背景构造函数
         * parasm { ctx: Context } 绘制环境
         * parasm { img: Image } 背景图像
         * parasm { speed: number } 背景速度
         * */
    function Sky(ctx, img, speed) {
        this.ctx = ctx;
        this.img = img;
        this.speed = speed;

        // 每创建一个实例，实例个数自增
        Sky.len++;

        // 图片的原点坐标，根据实例个数改变
        this.x = img.width * (Sky.len - 1);
        this.y = 0;
    }

// 背景的实例个数
    Sky.len = 0;

    Sky.prototype = {
        constructor: Sky,

        // 绘制背景
        draw: function () {
            this.ctx.drawImage(this.img, this.x, this.y, this.img.width, this.img.height);
        },

        // 下一次绘制图片，更新数据
        update: function () {
            // x轴改变
            this.x -= this.speed;
            // 判断是否走完一张，走完了就移动到另一张后面
            if (this.x <= -this.img.width) {
                this.x = (Sky.len - 1) * this.img.width;
            }
        }
    };

    // 工厂
    win.getSky = function (ctx, img, speed) {
        return new Sky(ctx, img, speed);
    };
})(window);