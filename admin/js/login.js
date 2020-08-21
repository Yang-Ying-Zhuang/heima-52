$(function () {
  // 登录
  $(".input_sub").on("click", function () {
    // 收集数据
    //  $("form").serislize():它可以收集指定form表单中 拥有name属性的表单元素的value值,生成key=value&key=value
    // console.log($("form").serialize());

    $.ajax({
      type: "post",
      url: "http://localhost:8080/api/v1/admin/user/login",
      data: $("form").serialize(),
      dataType: "json",
      success: (res) => {
        //  console.log(res);
        if (res.code === 200) {
          $(".modal-body>p").text(res.msg)
          $('#myModal').modal('show')
          $('#myModal').on('hidden.bs.modal', function (e) {
            window.location.href = "./index.html"
          })
        } else {
          $(".modal-body>p").text(res.msg)
          $('#myModal').modal('show')
        }
      }
    })
    $(".btn-primary").on("click",function(){
      $('#myModal').modal('hide')
    })
  })

})