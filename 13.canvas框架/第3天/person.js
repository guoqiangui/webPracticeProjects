/*
            * constructor { Person } 人构造函数
            * param { ctx: Context } 绘制环境
            * param { img: Image } 绘制的图像
            * param { widthFrame: number } 图像一排有多少个人
            * param { heightFrame: number } 图像一列有多少个人
            * param { x: number } 指定人物绘制的x轴坐标
            * param { y: number } 指定人物绘制的y轴坐标
            * param { renderWidth: number } 人物绘制时的宽
            * param { renderHeight: number } 人物绘制时的高
            * */
function Person(ctx, img, widthFrame, heightFrame, x, y, renderWidth, renderHeight) {
    this.ctx = ctx;
    this.img = img;
    this.widthFrame = widthFrame;
    this.heightFrame = heightFrame;
    this.x = x;
    this.y = y;
    this.renderWidth = renderWidth;
    this.renderHeight = renderHeight;

    // 求一个人的宽和高
    this.width = this.img.width / this.widthFrame;
    this.height = this.img.height / this.heightFrame;

    // 当前帧
    this.currentFrame = 0;
    // 当前方向
    this.direction = 0;
}

Person.prototype = {
    constructor: Person,

    // 改进，对象里面的draw方法改成只画一次，给用户决定怎么变化
    draw: function () {
        this.ctx.drawImage(this.img,
            this.currentFrame * this.width, this.direction * this.height, this.width, this.height,
            this.x, this.y, this.renderWidth, this.renderHeight);
    },

    // 绑定监听键盘事件
    bind: function () {
        // 保存this
        var that = this;

        document.addEventListener("keydown", function (event) {
            // 根据按下的方向键改变方向
            switch (event.keyCode) {
                // 按了上方向键
                case 38:
                    that.direction = 3;
                    break;
                // 按了右方向键
                case 39:
                    that.direction = 2;
                    break;
                // 按了下方向键
                case 40:
                    that.direction = 0;
                    break;
                // 按了左方向键
                case 37:
                    that.direction = 1;
                    break;
            }
        });
    },

    // 更新人物的移动
    update: function () {
        switch (this.direction) {
            // 下
            case 0:
                this.y += 5;
                // 如果超过了画布，就从另一边出来
                if(this.y >= this.ctx.canvas.height) {
                    this.y = - this.height;
                }
                break;
            // 左
            case 1:
                this.x -= 5;
                // 如果超过了画布，就从另一边出来
                if(this.x <= - this.width) {
                    this.x = this.ctx.canvas.width;
                }
                break;
            // 右
            case 2:
                this.x += 5;

                if(this.x >= this.ctx.canvas.width) {
                    this.x = -this.width;
                }
                break;
            // 上
            case 3:
                this.y -= 5;

                if(this.y <= -this.height) {
                    this.y = this.ctx.canvas.height;
                }
                break;
        }
    }
};