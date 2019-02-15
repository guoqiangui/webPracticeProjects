/**
 *
 * @param ctx 画图环境
 * @param padding 坐标轴距离画布的上右下左边距
 * @param arrow 箭头的宽和高
 * @param data 折线图的数据
 * @constructor
 */
function Line(ctx, padding, arrow, data) {
    this.ctx = ctx;
    this.padding = padding;
    this.arrow = arrow;
    this.data = data;

    // 坐标轴上顶点坐标
    this.vertexTop = {
        x: this.padding.left,
        y: this.padding.top
    };

    // 坐标轴原点坐标
    this.origin = {
        x: this.padding.left,
        y: this.ctx.canvas.height - this.padding.bottom
    };

    // 坐标轴右顶点坐标
    this.vertexRight = {
        // 可以通过this.ctx.canvas属性获取canvas标签
        x: this.ctx.canvas.width - this.padding.right,
        y: this.ctx.canvas.height - this.padding.bottom
    };
}

Line.prototype = {
    // 指定构造函数
    constructor: Line,

    // 绘制完整的折线图
    draw: function () {
        this.drawCoord();
        this.drawArrow();
        this.drawLine();
    },

    // 绘制坐标轴
    drawCoord: function () {
        this.ctx.lineWidth = 2;

        // 绘制坐标轴
        this.ctx.moveTo(this.vertexTop.x, this.vertexTop.y);
        this.ctx.lineTo(this.origin.x, this.origin.y);
        this.ctx.lineTo(this.vertexRight.x, this.vertexRight.y);
        this.ctx.stroke();
    },

    // 绘制箭头
    drawArrow: function () {
        // 向上的箭头
        this.ctx.beginPath();
        this.ctx.moveTo(this.vertexTop.x, this.vertexTop.y);
        this.ctx.lineTo(this.vertexTop.x - this.arrow.width/2, this.vertexTop.y + this.arrow.height);
        this.ctx.lineTo(this.vertexTop.x, this.vertexTop.y + this.arrow.height/2);
        this.ctx.lineTo(this.vertexTop.x + this.arrow.width/2, this.vertexTop.y + this.arrow.height);
        this.ctx.closePath();
        this.ctx.fill();

        // 向右的箭头
        this.ctx.beginPath();
        this.ctx.moveTo(this.vertexRight.x, this.vertexRight.y);
        this.ctx.lineTo(this.vertexRight.x - this.arrow.height, this.vertexRight.y - this.arrow.width/2);
        this.ctx.lineTo(this.vertexRight.x - this.arrow.height/2, this.vertexRight.y);
        this.ctx.lineTo(this.vertexRight.x - this.arrow.height, this.vertexRight.y + this.arrow.width/2);
        this.ctx.closePath();
        this.ctx.fill();
    },
    
    // 画折线
    drawLine: function () {
        // 求坐标轴可显示数据的最大值
        var coordMaxX = this.ctx.canvas.width - this.padding.left - this.padding.right - this.arrow.height;
        var coordMaxY = this.ctx.canvas.height - this.padding.top - this.padding.bottom - this.arrow.width/2;

        // 计算缩放比例
        var ratioX = coordMaxX / this.data.length;
        var ratioY = coordMaxY / Math.max.apply(null, this.data);

        // 保存this给回调函数内部使用
        var that = this;
        // 画点
        this.data.forEach(function (val, index) {
            that.ctx.fillRect(that.origin.x + index * ratioX, that.origin.y - val * ratioY, 2, 2);
        });

        // 画折线
        this.ctx.beginPath();
        this.data.forEach(function (val, index) {
            // 可以不使用moveTo，第一个lineTo将作为起点
            that.ctx.lineTo(that.origin.x + index * ratioX + 1, that.origin.y - val * ratioY + 1);
        });
        this.ctx.stroke();
    }
};