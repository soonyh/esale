var NetworkAdd=function(){var t,e=1,n=!0,a=!1,i=function(){$("#nav>li>a").bind("click",function(){var t=$(this);e=$("#nav>li>a").index(this)+1,t.parent("li").addClass("active").siblings("li").removeClass("active"),$(t.data("target")).addClass("active").siblings(".tab-pane").removeClass("active"),NetworkAdd.switchContent(e)})},o=function(){return $("#nav>li").index($("#nav>li.active")[0])+1},r=function(e){if(1==+e){if(""==$("#tab1").find("form").serialize())return void App.toastr("未选择套餐","forbidden");t=$("#btn-next").button("loading"),$.ajax({url:App.urls.networkAdd.submitTaoCan,async:!1,type:"post",contentType:"application/json; charset=UTF-8",dataType:"json",data:JSON.stringify($.extend(!0,{},NetworkAdd.state,App.serialize($("#tab1").find("form").serialize())))}).done(function(t){App.checker(t.health)&&(NetworkAdd.state.token=t.data.token,a=!0)}).always(function(){t.button("reset")})}else if(2==+e){if($("#tab2").find(".form-group input").each(function(){return""==$(this).val()?(App.toastr($(this).attr("placeholder"),"forbidden"),n=!1,!1):void(n=!0)}),n&&!$("#lskowel").hasClass("checked"))return n=!1,void App.toastr("宽带账号未校验","forbidden");n&&$("#lskowel").hasClass("checked")&&(n=!0);var i=App.serialize($("#tab2").find("form").serialize()),o=App.serialize2("#tab2");n&&(t=$("#btn-next").button("loading"),$.ajax({url:App.urls.networkAdd.submitKuanDaiXinXi,async:!1,type:"post",contentType:"application/json; charset=UTF-8",dataType:"json",data:JSON.stringify($.extend(!0,{},{token:NetworkAdd.state.token},i,o))}).done(function(t){App.checker(t.health)&&(NetworkAdd.state.token=t.data.token,a=!0,n=!1)}).always(function(){t.button("reset")}))}else if(3==+e){if(0==$("#container-keXuanBao-selected").children(".form-group").size()?(App.toastr("未选中","forbidden"),n=!1):$("#container-keXuanBao-selected").children(".form-group[data-config]").size()!=$("#container-keXuanBao-selected").children('.form-group:has(".circle-button")').size()?(App.toastr("参数未配置","forbidden"),n=!1):n=!0,n){t=$("#btn-next").button("loading");var o=[];$("#container-keXuanBao-selected").children(".form-group").each(function(){var t={};t.id=$(this).data("id"),$(this).data("config")&&(t.config=$(this).data("config")),o.push(t)}),$.ajax({url:App.urls.networkAdd.submitKeXuanBao,async:!1,type:"post",contentType:"application/json; charset=UTF-8",dataType:"json",data:JSON.stringify($.extend(!0,{},{token:NetworkAdd.state.token},{list:o}))}).done(function(t){App.checker(t.health)&&(NetworkAdd.state.token=t.data.token,a=!0,n=!1)}).always(function(){t.button("reset")})}}else if(4==+e){if($(":input[data-type]").each(function(){$(this).trigger("change")}),$(".has-error").size()>0)return void(n=!1);if(n=!0,2!=$("#container-dingDanXinXi").find(".card-box > img").size())return App.toastr("经办人信息错误","forbidden"),void(n=!1);if(n=!0,$("#container-dingDanXinXi").find(".form-group input").filter(function(){return"remark"!=$(this).attr("name")}).each(function(){return""==$(this).val()?(App.toastr($(this).attr("placeholder"),"forbidden"),n=!1,!1):void(n=!0)}),n){t=$("#btn-next").button("loading");var i=App.serialize(decodeURIComponent($("#container-dingDanXinXi").serialize())),o=App.serialize2("#tab4");$.ajax({url:App.urls.networkAdd.submitDingDanXinXi,async:!1,type:"post",contentType:"application/json; charset=UTF-8",dataType:"json",data:JSON.stringify($.extend(!0,{},{token:NetworkAdd.state.token},i,o))}).done(function(t){App.checker(t.health)&&(NetworkAdd.state.token=t.data.token,a=!0,n=!1)}).always(function(){t.button("reset")})}}else 5==+e&&(a=!0)};return{init:function(){i(),$("#nav>li>a").eq(0).click()},prev:function(){var t=1==o()?0:+e-2;$("#nav>li>a").eq(t).click()},next:function(){if(r(o()),a){var t=o()==$("#nav>li").size()?$("#nav>li").size():o();$("#nav>li>a").eq(t).click()}},charge:function(){void 0!=NetworkAdd.state.receipt&&0!=NetworkAdd.state.receipt||App.toastr("回执未提交","forbidden")},switchContent:function(t){var e={},n=['<button class="weui-btn weui-btn_plain-primary" onClick="NetworkAdd.prev()" id="btn-prev">上一步</button>','<button class="weui-btn weui-btn_primary" onClick="NetworkAdd.next()" id="btn-next" data-loading-text="下一步...">下一步</button>','<button class="weui-btn weui-btn_plain-primary" onClick="App.modal({url: App.modules.networkAdd.receipt,data:\'\',reload:false})">回执</button>','<button class="weui-btn weui-btn_primary" onClick="NetworkAdd.charge()">收费</button>'],i="";switch(t){case 1:e={url:App.modules.networkAdd.taoCanLieBiao,container:"#tab1",reload:!1},i=n[1];break;case 2:e={url:App.modules.networkAdd.kuanDaiXinXi,container:"#tab2",reload:!1},i=n[0]+n[1];break;case 3:e={url:App.modules.networkAdd.keXuanBao,container:"#tab3",reload:!1},i=n[0]+n[1];break;case 4:e={url:App.modules.networkAdd.dingDanXinXi,container:"#tab4",reload:!1},i=n[0]+n[1];break;case 5:e={url:App.modules.networkAdd.shouYinTai,container:"#tab5",reload:!0},i=n[0]+n[2]+n[3]}App.includeHtml(e),$(".es-action-bar").html(i),a=!1},refresh:function(t){$(".tab-pane.active").html(""),NetworkAdd.switchContent(t)},state:{token:""}}}();