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

})