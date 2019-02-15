(function (win) {
    /*
    * 可以把创建对象的任务封装到一起，交给一个对象
    * constructor { Scene } 游戏场景
    * param { ctx: Context } 绘图环境
    * param { imgObj: Object } 创建角色所需的图像资源
    * */
    function GameScene(ctx, imgObj) {
        this.ctx = ctx;
        this.imgObj = imgObj;

        // 该游戏场景需要的所有角色
        this.roles = [];
        // 添加所有角色进数组
        this._initRoles();
    }

    GameScene.prototype = {
        constructor: GameScene,

        // 初始化方法，添加所有角色进数组
        _initRoles: function () {
            // 2个背景
            this.roles.push(getSky(this.ctx, this.imgObj.sky, 5));
            this.roles.push(getSky(this.ctx, this.imgObj.sky, 5));

            // 4条管道，可以用循环了
            for(var i=0; i<4; i++) {
                this.roles.push(getPipe(this.ctx, this.imgObj.pipeDown, this.imgObj.pipeUp, 150, this.imgObj.land.height, 5));
            }

            // 4个大地
            for(var i=0; i<4; i++) {
                this.roles.push(getLand(this.ctx, this.imgObj.land, 5));
            }

            // 1只鸟
            this.roles.push(getBird(this.ctx, this.imgObj.bird, 3, 1, 20, 20));
        },

        // 让所有角色开始表演，开始画
        draw: function () {
            // 上一次给管道添加的路径需要清除
            this.ctx.beginPath();

            this.roles.forEach(function (value, index, array) {
                value.draw();
                value.update();
            });
        }
    }

    // 工厂
    win.getGameScene = function (ctx, imgObj) {
        return new GameScene(ctx, imgObj);
    };
})(window);