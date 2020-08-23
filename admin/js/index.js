$(function () {
  // 获取用户数据
  $.ajax({
    type: "GET",
    url: BigNew.user_info,
    // 获取成功回调的函数
    success: (res) => {
      // console.log(res);
      if(res.code === 200){
        $(".user_info>img").attr("src",res.data.userPic)
        $('.user_info>p').text(res.data.nickname)
        $(".header_bar img").attr("src",res.data.userPic)
      }
    },
  })

  // 完成首页切换
  $(".level01").on("click",function(){
    // console.log(111);
    // 点击当前添加样式，让兄弟删除，不包括当前自己
    $(this).addClass("active").siblings().removeClass("active")
    // 判断点击当前的下面兄弟是否有这个类名
    if($(this).next().hasClass("level02")){
      // console.log(111);
      // level02类名切换
      $(".level02").slideToggle()
      //点击当前的图标切换
      $(this).find("b").toggleClass("rotate0")
    }else{
      // 如果判断错误，就让 level02元素闭合
      $(".level02").slideUp()
      // 让level01 后代元素 b 删除rotate0类
      $(".level01").find("b").removeClass("rotate0")
    }
  })
  // level02 后代元素添加样式
  $(".level02 > li").on("click",function(){
    // console.log(11);
     // 点击当前添加样式，让兄弟删除，不包括当前自己
    $(this).addClass("active").siblings().removeClass("active")
  })
 
  // 退出
  $(".logout").on("click",function(){
    // console.log(1);
     window.location = "./login.html"
     localStorage.removeItem("token-52")
  })

})