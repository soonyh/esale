var SmartHome=function(){var e,a=1,t=!0,i=!1,n=function(){$("#nav>li>a").bind("click",function(){var e=$(this);a=$("#nav>li>a").index(this)+1,e.parent("li").addClass("active").siblings("li").removeClass("active"),$(e.data("target")).addClass("active").siblings(".tab-pane").removeClass("active"),r(a)})},r=function(e){var a={},t=['<button class="weui-btn weui-btn_plain-primary" onClick="SmartHome.prev()" id="btn-prev">上一步</button>','<button class="weui-btn weui-btn_primary" onClick="SmartHome.next()" id="btn-next" data-loading-text="下一步...">下一步</button>','<button class="weui-btn weui-btn_plain-primary" onClick="App.modal({url: App.modules.smartHome.receipt,data:\'\'})">回执</button>','<button class="weui-btn weui-btn_primary" onClick="">收费</button>'],n="";switch(e){case 1:a={url:App.modules.smartHome.taoCanLieBiao,container:"#tab1",reload:!1},n=t[1];break;case 2:a={url:App.modules.smartHome.kuanDaiXinXi,container:"#tab2",reload:!1},n=t[0]+t[1];break;case 3:a={url:App.modules.smartHome.keXuanBao,container:"#tab3",reload:!1},n=t[0]+t[1];break;case 4:a={url:App.modules.smartHome.dingDanXinXi,container:"#tab4",reload:!1},n=t[0]+t[1];break;case 5:a={url:App.modules.smartHome.shouYinTai,container:"#tab5",reload:!0},n=t[0]+t[2]+t[3]}App.includeHtml(a),$(".es-action-bar").html(n),i=!1},o=function(){return $("#nav>li").index($("#nav>li.active")[0])+1},s=function(a){if(1==+a){if(""==$("#tab1").find("form").serialize())return void App.toastr("未选择套餐","forbidden");e=$("#btn-next").button("loading"),$.ajax({url:App.urls.smartHome.submitTaoCan,async:!1,type:"post",dataType:"json",data:$.extend(!0,{},SmartHome.state,App.serialize($("#tab1").find("form").serialize()))}).done(function(a){App.checker(a.health)&&(SmartHome.state.token=a.data.token,e.button("reset"),i=!0)})}else if(2==+a){if($(":input[data-type]").each(function(){$(this).trigger("change")}),$(".has-error").size()>0)return void(t=!1);t=!0,$("#tab2").find(".form-group input").each(function(){return""==$(this).val()?(App.toastr($(this).attr("placeholder"),"forbidden"),t=!1,!1):void(t=!0)}),t&&(e=$("#btn-next").button("loading"),$.ajax({url:App.urls.smartHome.submitKuanDaiXinXi,async:!1,type:"post",dataType:"json",data:$.extend(!0,{},{token:SmartHome.state.token},App.serialize(decodeURIComponent($("#tab2").find("form").serialize())))}).done(function(a){App.checker(a.health)&&(SmartHome.state.token=a.data.token,e.button("reset"),i=!0,t=!1)}))}else if(3==+a){if(0==$("#container-keXuanBao-selected").children(".form-group").size()?(App.toastr("未选中","forbidden"),t=!1):$("#container-keXuanBao-selected").children(".form-group[data-config]").size()!=$("#container-keXuanBao-selected").children('.form-group:has(".circle-button")').size()?(App.toastr("参数未配置","forbidden"),t=!1):t=!0,t){e=$("#btn-next").button("loading");var n=[];$("#container-keXuanBao-selected").children(".form-group").each(function(){var e={};e.id=$(this).data("id"),$(this).data("config")&&(e.config=$(this).data("config")),n.push(e)}),$.ajax({url:App.urls.smartHome.submitKeXuanBao,async:!1,type:"post",dataType:"json",data:$.extend(!0,{},{token:SmartHome.state.token},{list:n})}).done(function(a){App.checker(a.health)&&(SmartHome.state.token=a.data.token,e.button("reset"),i=!0,t=!1)})}}else if(4==+a){if($(":input[data-type]").each(function(){$(this).trigger("change")}),$(".has-error").size()>0)return void(t=!1);if(t=!0,2!=$("#container-dingDanXinXi").find(".card-box > img").size())return App.toastr("经办人信息错误","forbidden"),void(t=!1);if(t=!0,$("#container-dingDanXinXi").find(".form-group input").filter(function(){return"remark"!=$(this).attr("name")}).each(function(){return""==$(this).val()?(App.toastr($(this).attr("placeholder"),"forbidden"),t=!1,!1):void(t=!0)}),t){e=$("#btn-next").button("loading");var n=App.serialize($("#container-dingDanXinXi").serialize());$("#container-dingDanXinXi").find(".card-box > img").each(function(){"avatar"==$(this).attr("name")&&(n.avatar=$(this).prop("src"))}),$.ajax({url:App.urls.smartHome.submitKeXuanBao,async:!1,type:"post",dataType:"json",data:$.extend(!0,{},{token:SmartHome.state.token},n)}).done(function(a){App.checker(a.health)&&(SmartHome.state.token=a.data.token,e.button("reset"),i=!0,t=!1)})}}else 5==+a&&(i=!0)};return{init:function(){n(),$("#nav>li>a").eq(0).click()},prev:function(){var e=1==o()?0:+a-2;$("#nav>li>a").eq(e).click()},next:function(){if(s(o()),i){var e=o()==$("#nav>li").size()?$("#nav>li").size():o();$("#nav>li>a").eq(e).click()}},state:{},camera:function(){var e=$("<img/>"),a=new FileReader,t=/^(?:image\/bmp|image\/cis\-cod|image\/gif|image\/ief|image\/jpeg|image\/jpeg|image\/jpeg|image\/pipeg|image\/png|image\/svg\+xml|image\/tiff|image\/x\-cmu\-raster|image\/x\-cmx|image\/x\-icon|image\/x\-portable\-anymap|image\/x\-portable\-bitmap|image\/x\-portable\-graymap|image\/x\-portable\-pixmap|image\/x\-rgb|image\/x\-xbitmap|image\/x\-xpixmap|image\/x\-xwindowdump)$/i;if(a.onload=function(a){e.prop("src",a.target.result),App.loader()},0!==document.getElementById("avatar").files.length){var i=document.getElementById("avatar").files[0];if(!t.test(i.type))return void App.toastr("只支持图片!");a.readAsDataURL(i),e[0].onload=function(){var a=e[0].width,t=e[0].height,i=document.createElement("canvas"),n=i.getContext("2d");i.width=a,i.height=t;var r=0,o=0,s=a,d=t,p=0,m=0,c=a,l=t;n.drawImage(e[0],r,o,s,d,p,m,c,l);var u=i.toDataURL("image/jpeg",.6);$("#sdf23sd").html($("<img />").prop({src:u,name:"avatar"}).css({width:"100%"})).css({lineHeight:0}),App.removeLoader()}}}}}();