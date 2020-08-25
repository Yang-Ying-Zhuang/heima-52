$(function () {

  let page = 1; // 当前第一页
  let perpage = 5; //每页显示条数

  //2. 文章类别管理
  function category() {
    $.ajax({
      type: "get",
      url: BigNew.category_list,
      // headers: {
      //   Authorization: localStorage.getItem("token-52")
      // },
      dataType: "json",
      success: (res) => {
        // console.log(res);
        if (res.code === 200) {
          const data = template("wenZhang", res)
          $("#selCategory").html(data)
        }
      }
    })
  }
  // 调用
  category();


  //2. #### 10、文章搜索 渲染
  // 请求地址：/admin/article/query
  // 请求方式：get
  function list() {
    $.ajax({
      type: "get",
      url: BigNew.article_query,
      data: {
        page, // 当前第一页
        perpage, //每页显示条数
        type: $("#selCategory").val(), //文章的分类，如果为空则查询所有分类
        state: $("#selStatus").val(), // 文章昨天如果如果为空则查询所有状态
      },
      dataType: "json",
      success: (res) => {
        //  console.log(res);
        if (res.code === 200) {
          const data = template("temp", res.data)
          $('tbody').html(data)
          // 调用函数的页码
          setPage(res.data.totalPage)
        }
      }
    })
  }
  list();

  //3.筛选事件
  $("#btnSearch").on("click", function (e) {
    // 阻止默认触发
    e.preventDefault();
    // console.log($("#selCategory").val());
    // console.log($("#selStatus").val());
    //重置页码
    page = 1
    // 调用
    list()
  })


  //4. 分页功能
  // * @param pageCurrent 当前所在页
  // * @param pageSum 总页数
  // * @param callback 调用ajax
  function setPage(total) {
    $(".pagination").bootstrapPaginator({
      //设置版本号
      bootstrapMajorVersion: 3,
      // 显示第几页
      currentPage: page,
      // 总页数
      totalPages: total,
      //当单击操作按钮的时候, 执行该函数, 调用ajax渲染页面
      onPageClicked: function (event, originalEvent, type, spage) {
        // 把当前点击的页码赋值给currentPage, 调用ajax,渲染页面
        //  console.log(spage);
        // 1.赋值全局的page
        // 2.让ajax重新发送请求更新
        page = spage;
        // 调用
        list()
      }
    })
  }


  // 添加样式
  // $("#release_btn").on("click",function(){
  //   // $():第一个参数;选择器，第二个参数，document,默认是当前窗口document
  //       $(".level02>li:eq(1)",window.parent.document).addClass("active").siblings().removeClass("active")
  // })



  // 删除文章
  $("tbody").on("click", ".deletedanger", function () {
    let id = $(this).data().id
    //  console.log(id);
    // 请求地址：/admin/article/delete
    // 请求方式：post
    // 请求参数：
    $.ajax({
      type: "post",
      url: BigNew.article_delete,
      data: {
        id
      },
      dataType: "json",
      success: function (res) {
        //  console.log(res);
        if (res.code === 204) {
          alert(res.msg);
          window.location.reload()
        }
      }
    })

  })























})