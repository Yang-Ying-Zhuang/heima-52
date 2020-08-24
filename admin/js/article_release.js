$(function () {

  //2. 文章类别管理
  function category() {
    $.ajax({
      type: "get",
      url: BigNew.category_list,
      // headers: {
      //   Authorization: localStorage.getItem("token-52")
      // },
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


  // 日期插件
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

  // 富文本框
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

  // 获取表单元素
  $(".btn-release").on("click", function () {
    // 获取所有 name 属性的值
    let data = $("#form")[0]
    // console.log(data);
    let dataform = new FormData(data)
    // console.log(...dataform);
    // 获取富文本框的属性的值
    //  console.log(tinymce.activeEditor.getContent());
    // 把content参数附加append再dataform里面
    dataform.append("content", tinymce.activeEditor.getContent())
    dataform.append("state", "已发布")
    // console.log(...dataform);
    $.ajax({
      type: "post",
      url: BigNew.article_publish,
      data: dataform,
      processData: false, // 因为jQ默认响应头为true,要设置为false,所有我们不需要进行编码
      contentType: false, // 让jQ不要设置请求
      dataType: "json",
      success: function (res) {
        // console.log(res);
        alert(res.msg)
        window.location.href = "./article_list.html"
      }
    })

  })

  // 保存草稿
  $(".btn-draft").on("click", function () {
    let data = $("#form")[0]
    let id = new FormData(data);
    id.append("content", tinymce.activeEditor.getContent())
    id.append("state", "草稿")
    $.ajax({
      type: "post",
      url: BigNew.article_publish,
      data: id,
      processData: false, // 因为jQ默认响应头为true,要设置为false,所有我们不需要进行编码
      contentType: false, // 让jQ不要设置请求
      dataType: "json",
      success: function (res) {
        // console.log(res);
        alert("保存成功")
        window.location.href = "./article_list.html"
      }
    })
  })














})