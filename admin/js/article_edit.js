$(function () {

  //2. 上传文件预览
  // 获取inputCover元素，给change加事件
  $("#inputCover").on("change", function () {
    // console.log(this.files[0]);
    // 获取this.files的0个索引
    const file = this.files[0]
    //  console.log(file);
    // 使用createObjectURL方法
    const img = URL.createObjectURL(file)
    // console.log(img);
    // console.log(img);
    // 添加img图片
    $(".article_cover").attr("src", img)
  })

  //3. 文章类别管理
  function category() {
    $.ajax({
      type: "get",
      url: BigNew.category_list,
      dataType: "json",
      success: function (res) {
        // console.log(res);
        if (res.code === 200) {
          const data = template("wenZhang", res)
          $(".category").html(data)
        }
      }
    })
  }
  // 调用
  category();

  // 4.日期插件
  $(function () {
    //或者为这样的
    jeDate("#indate", {
      format: "YYYY-MM-DD",
      theme: {
        bgcolor: "#D91600",
        pnColor: "#FF6653"
      },
      isTime: false,
      minDate: "2014-09-19"
    })
  });

  //5. 富文本框
  tinymce.init({
    selector: '#mytextarea',
    language: 'zh_CN',
    // directionality: 'ltl',
    // browser_spellcheck: true,
    // contextmenu: false,
    plugins: [
      "advlist autolink lists link image charmap print preview anchor",
      "searchreplace visualblocks code fullscreen",
      "insertdatetime media table contextmenu paste imagetools wordcount",
      "code"
    ],
    toolbar: "insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image | code",
  });

  // 1.获取页面传递id
  const url = window.location.search
  const id = url.split("=")[1]
  // console.log(id);
  // 请求地址：/admin/article/search
  // 请求方式：get
  // 请求参数：
  $.ajax({
    type: "get",
    url: BigNew.article_search,
    data: {
      id
    },
    dataType: "json",
    success: function (res) {
      //  console.log(res);
      if (res.code === 200) {
        $("#inputTitle").val(res.data.title)
        $(".article_cover").attr("src", res.data.cover)
        $(".category").val(res.data.categoryId)
        $("#indate").val(res.data.date)
        $("#mytextarea").val(res.data.content)

      }
    }
  })

  //6. 文章编辑
  $(".btn-success").on("click", function () {
    // console.log($('form').serialize());
    const data = $("#form")[0]
    const dataform = new FormData(data)
    //  console.log(...dataform);
    dataform.append("content", tinymce.activeEditor.getContent()),
      dataform.append("state", "已发布")
    dataform.append("id", id)
    // 文章编辑
    // 请求地址：/admin/article/edit
    // 请求方式：post
    // 请求参数：
    $.ajax({
      type: "post",
      url: BigNew.article_edit,
      data: dataform,
      dataType: "json",
      processData: false, // 因为jQ默认响应头为true,要设置为false,所有我们不需要进行编码
      contentType: false, // 让jQ不要设置请求
      success: function (res) {
        //  console.log(res);
        if (res.code === 200) {
          alert(res.msg)
          window.location.href = "./article_list.html"
        }
      }
    })
  })

  //7. 草稿
  $(".btn-default").on("click", function () {
    // console.log($('form').serialize());
    const data = $("#form")[0]
    const dataform = new FormData(data)
    //  console.log(...dataform);
    dataform.append("content", tinymce.activeEditor.getContent()),
    dataform.append("state", "草稿")
    dataform.append("id", id)
    // 文章编辑
    // 请求地址：/admin/article/edit
    // 请求方式：post
    // 请求参数：
    $.ajax({
      type: "post",
      url: BigNew.article_edit,
      data: dataform,
      dataType: "json",
      processData: false, // 因为jQ默认响应头为true,要设置为false,所有我们不需要进行编码
      contentType: false, // 让jQ不要设置请求
      success: function (res) {
        // console.log(res);
        if(res.code === 200){
          alert(res.msg)
          window.location.href = "./article_list.html"
        }
      }
    })
  })


  //8. 封装
  // function opt(state) {
  //   // console.log($('form').serialize());
  //   const data = $("#form")[0]
  //   const dataform = new FormData(data)
  //   //  console.log(...dataform);
  //   dataform.append("content", tinymce.activeEditor.getContent()),
  //     dataform.append("state", "已发布")
  //   dataform.append("id", id)
  //   // 文章编辑
  //   // 请求地址：/admin/article/edit
  //   // 请求方式：post
  //   // 请求参数：
  //   $.ajax({
  //     type: "post",
  //     url: BigNew.article_edit,
  //     data: dataform,
  //     dataType: "json",
  //     processData: false, // 因为jQ默认响应头为true,要设置为false,所有我们不需要进行编码
  //     contentType: false, // 让jQ不要设置请求
  //     success: function (res) {
  //       //  console.log(res);
  //       if (res.code === 200) {
  //         alert(res.msg)
  //         window.location.href = "./article_list.html"
  //       }
  //     }
  //   })
  // }
  // //6. 发布
  // $(".btn-success").on("click", function () {   
  //    opt("已发布")
  // })
  // //7. 草稿
  // $(".btn-default").on("click", function () {
  //   opt("草稿")
  // })









})