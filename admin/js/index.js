$(function () {
  // 获取用户数据
  $.ajax({
    type: "GET",
    url: "http://localhost:8080/api/v1/admin/user/info",
    headers: {
      Authorization: localStorage.getItem("token-52")
    },
    // 获取成功回调的函数
    success: (res) => {
      // console.log(res);
      if(res.code === 200){
        $(".user_info>img").attr("src",res.data.userPic)
        $('.user_info>p').text(res.data.nickname)
      }
    },
    // 捕获错误
    error:function(err){
      // console.log(err);
      if(err.statusText === "Forbidden"){
        alert("未登录，请登录")
        location.href = "./login.html"
      }
    }
  })

  // 完成首页切换
  $(".level01").on("click",function(){
    $(this).addClass("active").siblings().removeClass("active")
    if($(this).next().hasClass("level02")){
      $(".level02").slideToggle()
      $(this).find("b").toggleClass("rotate0")
    }else{
      $(".level02").slideUp()
      $(".level01").find("b").removeClass("rotate0")
      $(".level02>li").removeClass("active")
    }
  })
  // 单机子项菜单，切换样式
  $(".level02 > li").on("click",function(){
    $(this).addClass("active").siblings().removeClass("active")
  })
 

})