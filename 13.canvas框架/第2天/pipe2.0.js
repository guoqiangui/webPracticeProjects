// 立即执行函数，为了不暴露过多的全局变量
(function (win) {
    // 封装一个将角度转换成弧度的方法
    function angleToRadian(angle) {
        return Math.PI / 180 * angle;
    }

    /**
     * 饼图的构造方法
     * @param ctx 画图的环境
     * @param x 圆心的x轴坐标
     * @param y 圆心的y轴坐标
     * @param r 半径
     * @param data 数据，数组类型，里面装的是单个数据对象
     * @constructor
     */
    function Pipe(ctx, x, y, r, data) {
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.r = r;
        this.data = data;

        // 饼图的颜色
        this.colors = [ 'orange', 'orchid', 'palegoldenrod', 'palegreen', 'paleturquoise', 'peru', 'pink' ];
    }

    Pipe.prototype = {
        constructor: Pipe,

        // 绘制饼图
        draw: function () {
            // 用来保存数据的总和
            var total = 0;
            // 求数据的总和
            this.data.forEach(function (obj) {
                total += obj.val;
            });
            console.log(total);

            // 保存this给回调函数内部使用
            var that = this;

            // 起始弧度
            var startRadian = 0;
            // 结束弧度
            var endRadian = 0;

            // 遍历数据
            this.data.forEach(function (obj, index, arr) {
                // 求数据所占的弧度
                var radian = (obj.val / total) * (Math.PI * 2);

                // 求结束弧度
                endRadian = startRadian + radian;

                // 绘制扇形
                that.ctx.beginPath();
                // 起点
                that.ctx.moveTo(that.x, that.y);
                // 圆弧
                that.ctx.arc(that.x, that.y, that.r, startRadian, endRadian);
                // 闭合路径
                that.ctx.closePath();

                // 设置填充样式
                that.ctx.fillStyle = that.colors[index];
                that.ctx.fill();

                // 绘制每一个扇形中间的线
                that.ctx.beginPath();
                // 得到圆上的点的坐标（画一下图就行了）
                // 求扇形中间线在圆上的弧度（相对于原点的水平向右）
                var lineRadian = startRadian + radian / 2;
                var pointX = that.x + (that.r + 20) * Math.cos(lineRadian);
                var pointY = that.y + (that.r + 20) * Math.sin(lineRadian);
                // 绘制线
                that.ctx.moveTo(that.x, that.y);
                that.ctx.lineTo(pointX, pointY);
                that.ctx.stroke();

                // 绘制文字
                // 如果是在左边的文字，修改对齐方式为水平向右对齐
                if(lineRadian >= (Math.PI / 2) && lineRadian <= (Math.PI * 3/2)) {
                    that.ctx.textAlign = "right";
                } else {
                    that.ctx.textAlign = "left";
                }
                that.ctx.fillText(obj.msg, pointX, pointY);

                // 更新起始弧度
                startRadian = endRadian;
            });
        }
    };

    // 测试
    // console.log(angleToRadian(180));

    // 暴露需要的变量给外面
    win.Pipe = Pipe;
})(window);