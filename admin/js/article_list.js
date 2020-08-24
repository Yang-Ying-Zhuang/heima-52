$(function () {

  // #### 10、文章搜索
  // 请求地址：/admin/article/query
  // 请求方式：get
  function timp() {
     $.ajax({
       type:"get",
       url:BigNew.article_query,
       data:{},
       dataType:"json",
       success:(res)=>{
        //  console.log(res);
        if(res.code === 200){
          const data = template("timp",res.data)
          $('tbody').html(data)
        }
       }
     })
  }
  timp()


























})