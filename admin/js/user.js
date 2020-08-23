$(function () {

  // 请求地址：/admin/user/detail
  // 请求方式：get
  // 请求参数：无
  $.ajax({
    type: "get",
    // url: "http://localhost:8080/api/v1/admin/user/detail",
    url: BigNew.user_detail,
    headers: {
      Authorization: localStorage.getItem("token-52")
    },
    dataType: "json",
    success: (res) => {
      //  console.log(res);
      if (res.code === 200) {
        $("#inputEmail1").val(res.data.username)
        $("#inputEmail2").val(res.data.nickname)
        $(".user_pic").attr("src", res.data.userPic)
        $('#inputEmail3').val(res.data.email)
        $("#inputEmail4").val(res.data.password)
      }
    },
    // 捕获错误
    // error: function (err) {
    //   // console.log(err);
    //   if (err.statusText === "Forbidden") {
    //     alert("未登录，请登录")
    //     location.href = "./login.html"
    //   }
    // }
  })

  //1.给file表单元素注册onchange事件
  $("#exampleInputFile").on("change", function () {
    //1.2 获取用户选择的图片
    let img = this.files[0];
    //  console.log(img)
    //1.3 将文件转为src路径
    let url = window.URL.createObjectURL(img);
    //  console.log(url);
    //1.4 将url路径赋值给img标签的src
    $(".user_pic").attr("src", url);
  })

  // 个人信息的编辑
  // 4、编辑用户信息
  // 请求地址：/admin/user/edit
  // 请求方式：post
  // 请求数据：使用formData提交

  // 修改
  $(".btn-edit").on("click", function () {
    let data = $("#form")[0]
    let formdata = new FormData(data)
    $.ajax({
      type: "POST",
      // url: "http://localhost:8080/api/v1/admin/user/edit",
      url:BigNew.user_edit,
      data: formdata,
      processData: false,
      contentType: false,
      headers: {
        Authorization: localStorage.getItem("token-52")
      },
      dataType: "json",
      success: function (res) {
        // console.log(res);
        if (res.code === 200) {
          alert("修改成功")
          //页面刷新
          // window.location.reload()
          window.parent.location.href = "./index.html"
        }
      },
      // 捕获错误
      // error: function (err) {
      //   // console.log(err);
      //   if (err.statusText === "Forbidden") {
      //     alert("未登录，请登录")
      //     location.href = "./login.html"
      //   }
      // }
    })
  })


})