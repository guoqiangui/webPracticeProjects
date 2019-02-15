$(function () {
    /*
    需求：点击添加数据按钮，显示mask和对话框，点击对话框中的添加在表格中添加行
     */
    var addData = $("#j_btnAddData");   //添加数据按钮
    var mask = $("#j_mask");    //获取mask
    var formAdd = $("#j_formAdd");  //添加表单对话框
    var close = $("#j_hideFormAdd");;   //对话框右上角关闭
    var add = $("#j_btnAdd");   //对话框中的添加按钮
    var inpLession = $("#j_txtLesson"); //课程的输入框
    var inpSchool = $("#j_txtBelSch");  //所在学院的输入框
    var tbody = $("#j_tb");
    var gets = $("#j_tb .get"); //获取所有get

    //1、点击添加数据按钮，显示mask和对话框
    addData.click(function () {
        mask.show();
        formAdd.show();
    });
    //2、点击对话框右上角关闭，隐藏mask和对话框
    close.click(function () {
        mask.hide();
        formAdd.hide();
    });

    //3、点击对话框中的添加，获取里面input的value值，生成tr，添加到表格的tbody中
    add.click(function () {
        var lession = inpLession.val(); //val() 表示获取value值

        //如果val()为空，表示没有输入，提示输入
        if(lession === "") {
            alert("请输入课程名称");
            return; //不执行下面的代码
        }

        // console.log(lession);
        var school = inpSchool.val();
        //生成tr
        var newTr = $("<tr><td>"+ lession +"</td><td>"+ school +"</td><td><a href='javascrip:;' class='get'>GET</a></td></tr>");
        //添加到表格的tbody中
        tbody.append(newTr);

        //隐藏对话框和mask
        mask.hide();
        formAdd.hide();

        //解决再次打开的时候会显示以前输入的值
        //清空value中的值即可
        inpLession.val(""); //val()中传参数代表赋值

        //BUG: 新生成的tr没有事件绑定
        //解决：将新生成的tr绑定事件
        newTr.find("a").click(function () {
            $(this).parent().parent().remove();
        });
    });

    //4、点击每个tr中的GET删除当前行
    gets.click(function () {
        $(this).parent().parent().remove();
    });

});