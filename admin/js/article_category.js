$(function () {

  // 渲染编辑用户信息
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
    $(".modal-title").text("新增分类")
    $(".primary").text("新增")
    $("#name").val("")
    $("#slug").val("")
    $('#myModal').modal('show')

  })

  // ####
  // 6、 新增文章类别
  // 请求地址： /admin/category/add
  // 请求方式： post
  // 请求参数：
  $(".primary").on("click", function () {
    // console.log($(this).text());
    let id = $(this).attr("id")
    if ($(this).text() == "新增") {
      // console.log($('form').serialize());
      $.ajax({
        type: "post",
        url: BigNew.category_add,
        data: $('form').serialize(),
        dataType: "json",
        success: function (res) {
          // console.log(res);
          if (res.code === 201) {
            alert(res.msg)
            templa()
            $('#myModal').modal('hide')
          }
        },
      })
    } else {
      // console.log(11);
      $.ajax({
        type: "post",
        url: BigNew.category_edit,
        data: $('form').serialize() + "&id=" + id,
        dataType: "json",
        success: function (res) {
          console.log(res);
          if (res.code === 200) {
            alert(res.msg)
            templa()
          }
        },
      })
    }



  })

  // 编辑
  $("tbody").on("click", ".compile", function () {
    //  console.log(11);

    // data.attr("编辑")
    $(".modal-title").text("编辑分类")
    $(".primary").text("编辑")
    // 调用模态框
    $('#myModal').modal('show')
    // 获取自定义属性
    let obj = $(this).data()
    // console.log(obj);
    $("#name").val(obj.name)
    $("#slug").val(obj.slug)
    // 将id存储在某个 以后取值方便的位置
    $(".primary").attr("id", obj.id)

  })

  // 删除
  // 请求地址： / admin / category / delete
  // 请求方式： post
  // 请求参数：

  $("tbody").on("click", ".danger", function () {
    // console.log(11);
    // 获取自定义属性id
    let id = $(this).data()
    //  console.log(id);
    $.ajax({
      type: "post",
      url: BigNew.category_delete,
      data: id,
      dataType: "json",
      success: (res) => {
        // console.log(res);
        if(confirm("确定删除吗")){
          templa()
        }
      }
    })
  })


})