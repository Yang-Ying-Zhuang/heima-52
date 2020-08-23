$(function () {

  function templa() {
    $.ajax({
      type: "get",
      // url: "http://localhost:8080/api/v1/admin/category/list",
      url: BigNew.category_list,
      headers: {
        Authorization: localStorage.getItem("token-52")
      },
      dataType: "json",
      success: (res) => {
        // console.log(res);
        if (res.code === 200) {
          const data = template("temp", res)
          $("tbody").html(data)
        }
      }
    })
  }
  // 调用
  templa();

  $("#xinzengfenlei").on("click", function () {
    $('#myModal').modal('show')
  })

  // ####
  // 6、 新增文章类别
  // 请求地址： /admin/category/add
  // 请求方式： post
  // 请求参数：
  $(".btn-primary").on("click", function () {
    // console.log($('form').serialize());
    $.ajax({
      type: "post",
      url:BigNew.category_add,
      data: $('form').serialize(),
      dataType: "json",
      success: function (res) {
        // console.log(res);
        if(res.code === 201){
          alert(res.msg)
          templa()
        }
      },
    })
  })
})