(function (win) {
    /*
    * constrcutor { OverScene } 游戏结束场景
    * param { ctx: Context } 绘图环境
    * */
    function OverScene(ctx) {
        this.ctx = ctx;
    }
// 绘制游戏结束场景
    OverScene.prototype.draw = function () {
        // 为了防止影响全局状态，所以先save再restore
        this.ctx.save();

        this.ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
        this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

        // 画Game Over文字
        this.ctx.font = "50px 微软雅黑";
        this.ctx.fillStyle = "red";
        // 文字居中
        this.ctx.textAlign = "center";
        this.ctx.textBaseline = "middle";
        this.ctx.fillText("Game Over!!!", this.ctx.canvas.width / 2, this.ctx.canvas.height / 2);

        this.ctx.restore();
    };

// 工厂
    win.getOverScene = function (ctx) {
        return new OverScene(ctx);
    }
})(window);