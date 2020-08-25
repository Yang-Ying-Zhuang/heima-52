$(function () {
  
  let page = 1;  // 分页
  let perpage = 10;  //分页条

  function init() {
    $.ajax({
      type: "get",
      data: {
        page,
        perpage
      },
      url: BigNew.comment_search,
      dataType: "json",
      success: function (res) {
        // console.log(res);
        const str = template("tipm", res.data)
        $("tbody").html(str)
        setPage(res.data.totalPage)
      }
    })
  }
  init()


  // 分页插件
  function setPage(total) {
    $("#pagination").bootstrapPaginator({
        //设置版本号
        bootstrapMajorVersion: 3,
        // 显示第几页
        currentPage: page,
        // 设置控件显示的页码数
        numberOfPages:10,
        // 总页数
        totalPages: total,
        //当单击操作按钮的时候, 执行该函数, 调用ajax渲染页面
        onPageClicked: function (event,originalEvent,type,spage) {
            page = spage
            init()
        }
    })
}

// 请求地址：/admin/comment/pass
// 请求方式：post
// 请求参数：
//评论审核通过
$("tbody").on("click",".btn-success",function(){
   //获取自定义id
   const id = $(this).data().id
  //  console.log(id);
  $.ajax({
     type:"post",
     url:BigNew.comment_pass,
     data:{id},
     dataType:"json",
     success:function(res){
      //  console.log(res);
      if(res.code === 200){
        alert(res.msg)
        init()
      }
     }
  })

})

// #### 评论审核不通过
// 请求地址：/admin/comment/reject
// 请求方式：post
// 请求参数：
$("tbody").on("click",".btnWarning",function(){
  // 获取自定义id
    const id = $(this).data().id
    // console.log(id);
    $.ajax({
      type:"post",
      url:BigNew.comment_reject,
      data:{id},
      dataType:"json",
      success:function(res){
        // console.log(res);
        if(res.code === 200){
          alert(res.msg)
          init()
        }
      }
    })
})

// 删除评论
// 请求地址：/admin/comment/delete
// 请求方式：post
// 请求参数：
$("tbody").on("click",".btnDanger",function(){
  // 获取自定义属性
  const id = $(this).data().id
  // console.log(id);
  $.ajax({
    type:"post",
    url:BigNew.comment_delete,
    data:{id},
    dataType:"json",
    success:function(res){
      // console.log(res);
      if(res.code === 200){
        alert(res.msg)
        init()
      }
    }
  })

})

















})