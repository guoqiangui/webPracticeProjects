// config用来储存信息，包括tab栏菜单id、tab栏内容id、是否自动播放
// {tabMain: id, tabMenu: id, auto: true}
function Tab(config) {
    this.tabMenus = null;
    this.tabMains = null;
    if(config) {
        this._init(config);
    }
}

Tab.prototype = {
    constructor: Tab,
    // 初始化工作
    _init: function (config) {
        this.initElements(config);
        this.initEvent();

        if(config.auto) {
            this.autoPlay();
        }
    },
    // 初始化元素
    initElements: function (config) {
        // 根据config里面的id给对象的属性赋值
        var tabMenu = document.getElementById(config.tabMenu);
        var tabMain = document.getElementById(config.tabMain);

        // 将后代元素赋值给Tab对象的属性
        this.tabMenus = tabMenu.children;
        this.tabMains = tabMain.children;
    },
    // 初始化事件，即点击事件
    initEvent: function() {
        // 绑定事件
        for(var i=0; i<this.tabMenus.length; i++) {
            var li = this.tabMenus[i];
            // 记录菜单的索引
            li.index = i;
            // 储存this给li绑定的事件使用
            var that = this;
            li.onclick = function () {
                // 调用change方法
                that.change(this);
            };
        }
    },
    // 切换，传入tab栏菜单的某一项
    change: function (tabMenu) {
        // 排他思想
        for(var i=0; i<this.tabMenus.length; i++) {
            // 让所有的li都不激活
            var li = this.tabMenus[i];
            li.className = "tab-item";

            // 隐藏所有内容
            var div = this.tabMains[i];
            div.className = "main";
        }
        // 激活当前li
        tabMenu.className += " active";
        // 显示当前li对应的内容
        this.tabMains[tabMenu.index].className += " selected";
    },
    // 自动播放
    autoPlay: function () {
        var index = 0;
        // 将this保存，给回调函数使用
        var that = this;
        setInterval(function () {
            index ++;
            if(index >= that.tabMenus.length) {
                index = 0;
            }
            // 调用change方法
            that.change(that.tabMenus[index]);
        }, 2000);
    }
};