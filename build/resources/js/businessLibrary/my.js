var My=function(){var t=function(){App.template({url:App.urls.businessLibrary.myLists,art:My.state.art,container:My.state.container,data:$.extend(!0,{},{draw:My.state.draw},{size:10}),cb:function(t){My.state.total=t.total,My.state.draw=+My.state.draw+1}})};return{init:function(){App.loader(),t(),$(".es-content").infinite(10).on("infinite",function(){if(!My.state.loading){if($("#"+My.state.container).find(".sub-area").size()>=+My.state.total)return void $("#"+My.state.container).siblings(".noContent").show();$("#"+My.state.container).siblings(".weui-loadmore").show(),My.state.loading=!0,App.template({url:App.urls.businessLibrary.myLists,art:My.state.art,container:My.state.container,type:"append",data:$.extend(!0,{},{draw:My.state.draw},{size:10}),cb:function(){$("#"+My.state.container).siblings(".weui-loadmore").hide(),My.state.loading=!1,My.state.draw=+My.state.draw+1}})}})},hold:function(t){$.confirm("确定预占商机吗？",function(){var a=$(t).closest(".other");a.html('<a class="weui-btn weui-btn_mini weui-btn_default weui-btn_disabled" href="javascript:;">已预占</a>')},function(){})},state:{token:"",draw:1,total:0,loading:!1,container:"container-my",art:"art-my"}}}();