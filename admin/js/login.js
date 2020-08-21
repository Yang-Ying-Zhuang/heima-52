$(function () {
  // 登录
  $(".input_sub").on("click", function () {
    // 收集数据
    //  $("form").serislize():它可以收集指定form表单中 拥有name属性的表单元素的value值,生成key=value&key=value
    // console.log($("form").serialize());
  
    $.ajax({
      type: "post",
      url: "http://localhost:8080/api/v1/admin/user/login",
      data: $(".login_form").serialize(),
      headers:token,
      success: (res) => {
         console.log(res);
        if (res.code === 200) {
          alert("登录成功")
            // localStorage.setItem("heima52",JSON.stringify("token"))
          window.location.href = "./index.html"

        }
      },
      dataType: "json"

    })
  })
})