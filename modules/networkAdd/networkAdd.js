var NetworkAdd = function() {
    //当前处于第几步
    var step = 1;
    //当前表单校验是否成功
    var validator = true;
    //在点击'下一步'时，根据该flag判断是否提交成功,只有true时才会切换到下一步的内容
    //在每次提交成功时，要主动设置为false
    var success = false;
    var $btnNext;
    var listenNavTabs = function() {
        $('#nav>li>a').bind('click', function() {
            var $a = $(this);
            step = $('#nav>li>a').index(this) + 1;
            $a.parent('li').addClass('active').siblings('li').removeClass('active');
            $($a.data('target')).addClass('active').siblings('.tab-pane').removeClass('active');
            //切换标签内容
            NetworkAdd.switchContent(step);
        })
    };
    //获取当前处于第几步
    //根据nav-tabs上a标签的active样式
    var getCurrentStep = function() {
        return $('#nav>li').index($('#nav>li.active')[0]) + 1;
    };
    //处理每次点击'下一步'的提交任务
    var handleSubmit = function(step) {
        if (+step == 1) {
            //校验表单
            if ($('#tab1').find('form').serialize() == '') {
                App.toastr('未选择套餐', 'forbidden');
                return
            }
            $btnNext = $('#btn-next').button('loading');
            //提交
            $.ajax({
                url: App.urls.networkAdd.submitTaoCan,
                async: false,
                type: 'post',
                contentType: 'application/json; charset=UTF-8',
                dataType: 'json',
                data: JSON.stringify($.extend(true, {}, NetworkAdd.state, App.serialize($('#tab1').find('form').serialize()))),
            }).done(function(data) {
                if (!App.checker(data.health)) {
                    return
                };
                NetworkAdd.state.token = data.data.token;
                success = true;
            }).always(function() {
                $btnNext.button('reset');
            })
        } else if (+step == 2) {
            //校验1: 判断表单是否有未填项
            $('#tab2').find('.form-group input').each(function() {
                if ($(this).val() == '') {
                    App.toastr($(this).attr('placeholder'), 'forbidden');
                    validator = false;
                    return false
                } else {
                    validator = true;
                }
            });
            //校验2：判断宽带账号和密码是否校验正确  
            if (validator && !$('#lskowel').hasClass('checked')) {
                validator = false;
                App.toastr('宽带账号未校验', 'forbidden');
                return
            } else if (validator && $('#lskowel').hasClass('checked')) {
                validator = true;
            }
            //拼数据
            var b = App.serialize($('#tab2').find('form').serialize());
            var d = App.serialize2('#tab2');
            if (validator) {
                $btnNext = $('#btn-next').button('loading');
                //提交
                $.ajax({
                    url: App.urls.networkAdd.submitKuanDaiXinXi,
                    async: false,
                    type: 'post',
                    contentType: 'application/json; charset=UTF-8',
                    dataType: 'json',
                    data: JSON.stringify($.extend(true, {}, {
                        token: NetworkAdd.state.token
                    }, b, d)),
                }).done(function(data) {
                    if (!App.checker(data.health)) {
                        return
                    };
                    NetworkAdd.state.token = data.data.token;
                    success = true;
                    validator = false;
                }).always(function() {
                    $btnNext.button('reset');
                })
            }
        } else if (+step == 3) {
            //校验表单
            //未选中或者选中项中存在未配置项目
            if ($('#container-keXuanBao-selected').children('.form-group').size() == 0) {
                App.toastr('未选中', 'forbidden');
                validator = false;
            } else if ($('#container-keXuanBao-selected').children('.form-group[data-config]').size() != $('#container-keXuanBao-selected').children('.form-group:has(".circle-button")').size()) {
                App.toastr('参数未配置', 'forbidden');
                validator = false;
            } else {
                validator = true;
            }
            //提交
            if (validator) {
                $btnNext = $('#btn-next').button('loading');
                //拼数据
                var d = []
                $('#container-keXuanBao-selected').children('.form-group').each(function() {
                    var o = {}
                    o['id'] = $(this).data('id')
                    if ($(this).data('config')) {
                        o['config'] = $(this).data('config');
                    }
                    d.push(o)
                });
                $.ajax({
                    url: App.urls.networkAdd.submitKeXuanBao,
                    async: false,
                    type: 'post',
                    contentType: 'application/json; charset=UTF-8',
                    dataType: 'json',
                    data: JSON.stringify($.extend(true, {}, {
                        token: NetworkAdd.state.token
                    }, {
                        list: d
                    })),
                }).done(function(data) {
                    if (!App.checker(data.health)) {
                        return
                    };
                    NetworkAdd.state.token = data.data.token;
                    success = true;
                    validator = false;
                }).always(function() {
                    $btnNext.button('reset');
                })
            }
        } else if (+step == 4) {
            //校验表单
            $(':input[data-type]').each(function() {
                $(this).trigger('change');
            });
            if ($('.has-error').size() > 0) {
                validator = false;
                return
            } else {
                validator = true;
            }
            if ($('#container-dingDanXinXi').find('.card-box > img').size() != 2) {
                App.toastr('经办人信息错误', 'forbidden');
                validator = false;
                return
            } else {
                validator = true;
            }
            //
            $('#container-dingDanXinXi').find('.form-group input').filter(function() {
                return $(this).attr('name') != 'remark'
            }).each(function() {
                if ($(this).val() == '') {
                    App.toastr($(this).attr('placeholder'), 'forbidden');
                    validator = false;
                    return false
                } else {
                    validator = true;
                }
            });
            //提交
            if (validator) {
                $btnNext = $('#btn-next').button('loading');
                //拼数据
                var b = App.serialize(decodeURIComponent($('#container-dingDanXinXi').serialize()));
                var d = App.serialize2('#tab4');
                // $('#container-dingDanXinXi').find('.card-box > img').each(function() {
                //     if ($(this).attr('name') == 'avatar') {
                //         b.avatar = $(this).prop('src');
                //     } else if ($(this).attr('name') == 'idCard') {
                //         b.idCard = $(this).prop('src');
                //     }
                // })
                $.ajax({
                    url: App.urls.networkAdd.submitDingDanXinXi,
                    async: false,
                    type: 'post',
                    contentType: 'application/json; charset=UTF-8',
                    dataType: 'json',
                    data: JSON.stringify($.extend(true, {}, {
                        token: NetworkAdd.state.token
                    }, b, d)),
                }).done(function(data) {
                    if (!App.checker(data.health)) {
                        return
                    };
                    NetworkAdd.state.token = data.data.token;
                    success = true;
                    validator = false;
                }).always(function() {
                    $btnNext.button('reset');
                })
            }
        } else if (+step == 5) {
            success = true;
        }
    };
    return {
        init: function() {
            listenNavTabs();
            //默认加载第一个标签页内容
            $('#nav>li>a').eq(0).click();
        },
        prev: function() {
            var prevIndex = getCurrentStep() == 1 ? 0 : +step - 2;
            $('#nav>li>a').eq(prevIndex).click();
        },
        next: function() {
            //先提交当前页的数据
            handleSubmit(getCurrentStep())
            if (success) {
                var nextIndex = getCurrentStep() == $('#nav>li').size() ? $('#nav>li').size() : getCurrentStep();
                $('#nav>li>a').eq(nextIndex).click();
            }
        },
        charge: function() {
            if (NetworkAdd.state.receipt == undefined || NetworkAdd.state.receipt == false) {
                App.toastr('回执未提交', 'forbidden');
            }
        },
        switchContent: function(step) {
            var options = {}; //存放App.includeHtml()的options选项
            var tmpl = ['<button class="weui-btn weui-btn_plain-primary" onClick="NetworkAdd.prev()" id="btn-prev">上一步</button>', '<button class="weui-btn weui-btn_primary" onClick="NetworkAdd.next()" id="btn-next" data-loading-text="下一步...">下一步</button>', '<button class="weui-btn weui-btn_plain-primary" onClick="App.modal({url: App.modules.networkAdd.receipt,data:\'\',reload:false})">回执</button>', '<button class="weui-btn weui-btn_primary" onClick="NetworkAdd.charge()">收费</button>']
            var str = ''; //存放action-bar的内容
            switch (step) {
                case 1:
                    options = {
                        url: App.modules.networkAdd.taoCanLieBiao,
                        container: '#tab1',
                        reload: false
                    };
                    str = tmpl[1];
                    break;
                case 2:
                    options = {
                        url: App.modules.networkAdd.kuanDaiXinXi,
                        container: '#tab2',
                        reload: false
                    };
                    str = tmpl[0] + tmpl[1];
                    break;
                case 3:
                    options = {
                        url: App.modules.networkAdd.keXuanBao,
                        container: '#tab3',
                        reload: false
                    };
                    str = tmpl[0] + tmpl[1];
                    break;
                case 4:
                    options = {
                        url: App.modules.networkAdd.dingDanXinXi,
                        container: '#tab4',
                        reload: false
                    };
                    str = tmpl[0] + tmpl[1];
                    break;
                case 5:
                    options = {
                        url: App.modules.networkAdd.shouYinTai,
                        container: '#tab5',
                        reload: true
                    };
                    str = tmpl[0] + tmpl[2] + tmpl[3];
                    break;
            }
            App.includeHtml(options);
            $('.es-action-bar').html(str);
            success = false;
        },
        refresh:function(step){
          $('.tab-pane.active').html('');
          NetworkAdd.switchContent(step);
        },
        //状态
        state: {
            token: '', //每次下一步(提交)，都需要把上一次返回的token作为本次请求的入参
        },
    }
}()
