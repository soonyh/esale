var NewFusion = function() {
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
            switchContent(step);
        })
    };
    var switchContent = function(step) {
        var options = {}; //存放App.includeHtml()的options选项
        var tmpl = ['<button class="weui-btn weui-btn_plain-primary" onClick="NewFusion.prev()" id="btn-prev">上一步</button>', '<button class="weui-btn weui-btn_primary" onClick="NewFusion.next()" id="btn-next" data-loading-text="下一步...">下一步</button>', '<button class="weui-btn weui-btn_plain-primary" onClick="App.modal({url: App.modules.newFusion.receipt,data:\'\'})">回执</button>', '<button class="weui-btn weui-btn_primary" onClick="NewFusion.charge()">收费</button>']
        var str = ''; //存放action-bar的内容
        switch (step) {
            case 1:
                options = {
                    url: App.modules.newFusion.taoCanLieBiao,
                    container: '#tab1',
                    reload: false
                };
                str = tmpl[1];
                break;
            case 2:
                options = {
                    url: App.modules.newFusion.selectProduct,
                    container: '#tab2',
                    reload: false
                };
                str = tmpl[0] + tmpl[1];
                break;
            case 3:
                options = {
                    url: App.modules.newFusion.xinXiTianXie,
                    container: '#tab3',
                    reload: false
                };
                str = tmpl[0] + tmpl[1];
                break;
            case 4:
                options = {
                    url: App.modules.newFusion.dingDanXinXi,
                    container: '#tab4',
                    reload: false
                };
                str = tmpl[0] + tmpl[1];
                break;
            case 5:
                options = {
                    url: App.modules.newFusion.shouYinTai,
                    container: '#tab5',
                    reload: true
                };
                str = tmpl[0] + tmpl[2] + tmpl[3];
                break;
        }
        App.includeHtml(options);
        $('.es-action-bar').html(str);
        success = false;
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
                url: App.urls.newFusion.submitTaoCan,
                async: false,
                type: 'post',
                dataType: 'json',
                data: JSON.stringify(App.serialize($('#tab1').find('form').serialize())),
            }).done(function(data) {
                if (!App.checker(data.health)) {
                    return
                };
                NewFusion.state.token = data.data.token;
                NewFusion.state.roles = $('#tab1').find(':input:checked').data('roles');
                $btnNext.button('reset');
                success = true;
            })
        } else if (+step == 2) {
            //根据选中套餐带过来的max和min属性，
            //判断[已有]和[新装]的数量是否满足max和min
            $('#tab2').find('.page-part').each(function() {
                var title = $(this).find('.input-label[data-role="title"]').html();
                var max = +$(this).data('max');
                var min = +$(this).data('min');
                var oldCheck = +$(this).find('.sub-area').find('input:checked').size();
                var newCheck = +$(this).find('.spinbox').spinbox('value');
                if (oldCheck + newCheck > max) {
                    App.toastr(title+'个数不能大于' + max, 'forbidden');
                     validator = false;
                     return false;
                } else if(oldCheck + newCheck < min){                    
                    App.toastr(title+'个数不能小于' + min, 'forbidden');
                     validator = false;
                     return false;
                } else {
                    validator = true;
                }                
            });
            if (validator) {
                $btnNext = $('#btn-next').button('loading');
                //拼数据
                //依赖
                var o = {token: NewFusion.state.token}
                $('#tab2').find('.page-part').each(function(){
                    var data = App.serialize($(this).find(':input').serialize());
                    switch(+$(this).data('role')){
                        case 1:
                        o.mobile = data;
                        break;
                        case 2:
                        o.boardband = data;
                        break;
                        case 3:
                        o.tianYiGaoQin = data;
                        break;
                    }
                })
                //提交
                $.ajax({
                    url: App.urls.newFusion.submitSelectProduct,
                    async: false,
                    type: 'post',
                    dataType: 'json',
                    data: JSON.stringify(o),
                }).done(function(data) {
                    if (!App.checker(data.health)) {
                        return
                    };
                    NewFusion.state.token = data.data.token;
                    $btnNext.button('reset');
                    success = true;
                    validator = false;
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
                    url: App.urls.newFusion.submitKeXuanBao,
                    async: false,
                    type: 'post',
                    dataType: 'json',
                    data: JSON.stringify($.extend(true, {}, {
                        token: NewFusion.state.token
                    }, {
                        list: d
                    })),
                }).done(function(data) {
                    if (!App.checker(data.health)) {
                        return
                    };
                    NewFusion.state.token = data.data.token;
                    $btnNext.button('reset');
                    success = true;
                    validator = false;
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
                var d = App.serialize(decodeURIComponent($('#container-dingDanXinXi').serialize()));
                $('#container-dingDanXinXi').find('.card-box > img').each(function() {
                    if ($(this).attr('name') == 'avatar') {
                        d.avatar = $(this).prop('src');
                    }
                })
                $.ajax({
                    url: App.urls.newFusion.submitDingDanXinXi,
                    async: false,
                    type: 'post',
                    dataType: 'json',
                    data: JSON.stringify($.extend(true, {}, {
                        token: NewFusion.state.token
                    }, d)),
                }).done(function(data) {
                    if (!App.checker(data.health)) {
                        return
                    };
                    NewFusion.state.token = data.data.token;
                    $btnNext.button('reset');
                    success = true;
                    validator = false;
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
            if (NewFusion.state.receipt == undefined || NewFusion.state.receipt == false) {
                App.toastr('回执未提交', 'forbidden');
            }
        },
        //状态
        state: {
            token: '', //每次下一步(提交)，都需要把上一次返回的token作为本次请求的入参
            roles: null //保存选中的套餐roles属性，在选择销售品时有用
        },
    }
}()
