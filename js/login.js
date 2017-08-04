$(document).ready(function(){
    var user = false; //用户名默认值
    var pass = false; //密码默认值

    $("#user_span").click(function(){
        $("#user").focus();
        $("#user_span").hide();
    })
    $("#pass_span").click(function(){
        $("#pass").focus();
        $("#pass_span").hide();
    })
    $("#user").focus(function(){
        $("#user_span").hide();
    })
    $("#pass").focus(function(){
        $("#pass_span").hide();
    })

    //用户名框失去焦点事件
    $("#user").blur(function(){
        if($("#user").val() == ""){
            $("#user_span").show();
            $("#user_p").text("请输入用户名!").css("color","#ff6700");
            user = false;
        }else if($("#user").val().length<6 || $("#user").val().length>18){
            $("#user_p").text("用户名位数需要6-18之间!").css("color","#ff6700");
            user = false;
        }else{
            user = true;
        }
    })

    //用户名框中的值发生改变时
    $("#user").keyup(function(){
        var pattern = /^[a-zA-Z]+\d*/;
        if($("#user").val().length == 0){
            $("#user_p").text("请输入用户名!").css("color","#ff6700");
            user = false;
        }else if(!pattern.exec($("#user").val())){
            $("#user_p").text("用户名格式错误，需以一个字母开头").css("color","#ff6700");
        }else{
            $("#user_p").text("");
        }
    })

    //密码框失去焦点事件
    $("#pass").blur(function(){
        if($("#pass").val() == ""){
            $("#pass_span").show();
            $("#pass_p").text("请输入密码!").css("color","#ff6700");
            pass = false;
        }else if($("#pass").val().length<6 || $("#user").val().length>18){
            $("#pass_p").text("密码位数需要6-18之间!").css("color","#ff6700");
            pass = false;
        }else{
            pass = true;
        }
    })

    //密码框中的值发生改变时
    $("#pass").keyup(function(){
        if($("#pass").val().length == 0){
            $("#pass_p").text("请输入密码!").css("color","#ff6700");
            pass = false;
        }else{
            $("#pass_p").text("");
        }
    })


    //表单提交事件
    $("form").submit(function(e){
        if(user && pass){
            return true;
        }else{
            e.preventDefault(); //阻止表单提交
            $('input').blur(); //触发脚本中的blur事件
            // $("input").trigger('blur');
        }
    });

});