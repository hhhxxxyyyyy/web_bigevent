$(function() {
    var layer = layui.layer
  
    // 1.1 获取裁剪区域的 DOM 元素
    var $image = $('#image')
    // 1.2 配置选项
    const options = {
      // 纵横比
      aspectRatio: 1,
      // 指定预览区域
      preview: '.img-preview'
    }
  
    // 1.3 创建裁剪区域
    $image.cropper(options)

    $('#btnChooseImage').on('click',function(){
        $('#file').click()
    })

    //为file绑定change事件
    $('#file').on('change',function(e){
        let filelist = e.target.files
        if (filelist ==0){
            return layer.msg('请少爷选择图片！')
        }
        //拿到图片
        let file = e.target.files[0]
        //将文件转化为路径
        let imgURL = URL.createObjectURL(file)
        //重新初始化裁剪区域
        $image
            .cropper('destroy')
            .attr('src',imgURL)
            .cropper(options)
    })
    $('#btnUpload').on('click',function(){
        let dataURL = $image.cropper('getCroppedCanvas',{
             // 创建一个 Canvas 画布
            width:100,
            height:1000
        })
        .toDataURL('image/png') // 将 Canvas 画布上的内容，转化为 base64 格式的字符串
        // 2. 调用接口，把头像上传到服务器
        $.ajax({
            method:'POST',
            url:'/my/update/avater',
            data:{
                avatar: dataURL
            },
            success:function(res){
                if (res.status !==0){
                    return layer.msg('失败了')
                }
                layer.msg('更换头像成功了')
                window.parent.getUserInfo()
            }
        })
    })
})