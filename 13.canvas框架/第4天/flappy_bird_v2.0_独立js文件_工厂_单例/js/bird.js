(function (win) {
    /*
        * constructor { Bird } 鸟构造函数
        * param { ctx: Context } 绘图环境
        * param { img: Image } 鸟图
        * param { widthFrame: number } 一排的帧数
        * param { heightFrame: number } 一列的帧数
        * param { x: number } 鸟的起始x轴坐标
        * param { y: number } 鸟的起始y轴坐标
        * */
    function Bird(ctx, img, widthFrame, heightFrame, x, y) {
        this.ctx = ctx;
        this.img = img;
        this.widthFrame = widthFrame;
        this.heightFrame = heightFrame;
        this.x = x;
        this.y = y;

        // 鸟的宽和高
        this.width = this.img.width / this.widthFrame;
        this.height = this.img.height / this.heightFrame;

        // 当前帧
        this.currentFrame = 0;

        // 鸟的下坠速度
        this.speed = 5;
        // 加速度
        this.aSpeed = 0.5;

        // 绑定事件
        this._bind();
    }

    Bird.prototype = {
        constructor: Bird,

        // 画一只鸟
        draw: function () {
            // 鸟倾斜的基础弧度（5度）
            var baseRadian = Math.PI / 180 * 5;

            // 根据速度算出鸟倾斜的弧度
            var totalRadian = baseRadian * this.speed;
            // 限制不超过正负45度
            if (totalRadian > Math.PI / 4) {
                totalRadian = Math.PI / 4;
            } else if (totalRadian < -Math.PI / 4) {
                totalRadian = -Math.PI / 4;
            }

            // 保存当前状态
            this.ctx.save();

            // 先将坐标移到小鸟的中心点
            this.ctx.translate(this.x + this.width / 2, this.y + this.height / 2);
            // 再旋转坐标轴
            this.ctx.rotate(totalRadian);
            // 小鸟的坐标在旋转后变成负的小鸟的宽度的一半和负的高度的一半
            this.ctx.drawImage(this.img,
                this.currentFrame * this.width, 0, this.width, this.height,
                -this.width / 2, -this.height / 2, this.width, this.height
            );

            // 画完之后，回滚，不回滚整个游戏的坐标就乱了
            this.ctx.restore();
        },

        // 鸟的下一帧
        update: function () {
            this.currentFrame++;
            // 判断帧数是否超过总帧数，超过了就回到第一帧
            if (this.currentFrame >= this.widthFrame) {
                this.currentFrame = 0;
            }

            // 鸟默认会自动下坠
            this.y += this.speed;
            // 加速度是加在速度上的
            this.speed += this.aSpeed;
        },

        // 绑定鼠标点击事件
        _bind: function () {
            // 保存this
            var that = this;
            // 给画布绑定
            this.ctx.canvas.addEventListener("click", function () {
                // 将速度立刻变成-5，小鸟就会向上移动，由于有加速度，小鸟会逐渐变慢，停止后开始逐渐加速下降
                that.speed = -5;
            });
        }
    };

    // 用来储存已经创建好的鸟实例
    var bird = null;

    // 仅需暴露工厂函数即可
    // 工厂模式
    win.getBird = function (ctx, img, widthFrame, heightFrame, x, y) {
        // 单例模式（因为整个游戏只需要一个鸟实例）
        // 需要true才会进去，null表示false，只需取反就可以进去了
        if (!bird) {
            bird = new Bird(ctx, img, widthFrame, heightFrame, x, y);
        }
        return bird;
    };
})(window);