$(function () {

   // 文章类别管理
   function templa() {
    $.ajax({
      type: "get",
      url: BigNew.category_list,
      headers: {
        Authorization: localStorage.getItem("token-52")
      },
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
  templa();


  // #### 10、文章搜索
  // 请求地址：/admin/article/query
  // 请求方式：get
  function timp() {
     $.ajax({
       type:"get",
       url:BigNew.article_query,
       data:{
        // perpage:10,
       },
       dataType:"json",
       success:(res)=>{
        //  console.log(res);
        if(res.code === 200){
          const data = template("temp",res.data)
          $('tbody').html(data)
        }
       }
     })
  }
  timp()


























})