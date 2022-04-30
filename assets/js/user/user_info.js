$(function(){
    let form = layui.form
    form.verify({
        nickname:function(value){
            if(value.length >6){
                return '昵称长度必须在 1 ~ 6 个字符之间！'
            }
        }
    })
    initUserInfo()
    //初始化用户的基本信息
    function initUserInfo(){
        $.ajax({
            method:'POST',
            url:'/my/userinfo',
            success:function(res){
                if (res.status !==0){
                    return layer.msg('获取用户信息失败！')
                }
                //这里返回的数据有很多怎么对应是靠form里面的name匹配
                form.val('formUserInfo', res.data)
            }
        })
    }
    
})