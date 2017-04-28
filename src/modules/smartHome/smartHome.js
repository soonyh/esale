var SmartHome = function() {
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
        var tmpl = ['<button class="weui-btn weui-btn_plain-primary" onClick="SmartHome.prev()" id="btn-prev">上一步</button>', '<button class="weui-btn weui-btn_primary" onClick="SmartHome.next()" id="btn-next" data-loading-text="下一步...">下一步</button>', '<button class="weui-btn weui-btn_plain-primary" onClick="App.modal({url: App.modules.smartHome.receipt,data:\'\'})">回执</button>', '<button class="weui-btn weui-btn_primary" onClick="">收费</button>']
        var str = ''; //存放action-bar的内容
        switch (step) {
            case 1:
                options = {
                    url: App.modules.smartHome.taoCanLieBiao,
                    container: '#tab1',
                    reload: false
                };
                str = tmpl[1];
                break;
            case 2:
                options = {
                    url: App.modules.smartHome.kuanDaiXinXi,
                    container: '#tab2',
                    reload: false
                };
                str = tmpl[0] + tmpl[1];
                break;
            case 3:
                options = {
                    url: App.modules.smartHome.keXuanBao,
                    container: '#tab3',
                    reload: false
                };
                str = tmpl[0] + tmpl[1];
                break;
            case 4:
                options = {
                    url: App.modules.smartHome.dingDanXinXi,
                    container: '#tab4',
                    reload: false
                };
                str = tmpl[0] + tmpl[1];
                break;
            case 5:
                options = {
                    url: App.modules.smartHome.shouYinTai,
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
                url: App.urls.smartHome.submitTaoCan,
                async: false,
                type: 'post',
                dataType: 'json',
                data: $.extend(true, {}, SmartHome.state, App.serialize($('#tab1').find('form').serialize())),
            }).done(function(data) {
                if (!App.checker(data.health)) {
                    return
                };
                SmartHome.state.token = data.data.token;
                $btnNext.button('reset');
                success = true;
            })
        } else if (+step == 2) {
            //校验表单1
            $(':input[data-type]').each(function() {
                $(this).trigger('change');
            });
            if ($('.has-error').size() > 0) {
                validator = false;
                return
            } else {
                validator = true;
            }
            //校验表单2
            $('#tab2').find('.form-group input').each(function() {
                if ($(this).val() == '') {
                    App.toastr($(this).attr('placeholder'), 'forbidden');
                    validator = false;
                    return false
                } else {
                    validator = true;
                }
            })
            if (validator) {
                $btnNext = $('#btn-next').button('loading');
                //提交
                $.ajax({
                    url: App.urls.smartHome.submitKuanDaiXinXi,
                    async: false,
                    type: 'post',
                    dataType: 'json',
                    data: $.extend(true, {}, {
                        token: SmartHome.state.token
                    }, App.serialize(decodeURIComponent($('#tab2').find('form').serialize()))),
                }).done(function(data) {
                    if (!App.checker(data.health)) {
                        return
                    };
                    SmartHome.state.token = data.data.token;
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
                    url: App.urls.smartHome.submitKeXuanBao,
                    async: false,
                    type: 'post',
                    dataType: 'json',
                    data: $.extend(true, {}, {
                        token: SmartHome.state.token
                    }, {
                        list: d
                    }),
                }).done(function(data) {
                    if (!App.checker(data.health)) {
                        return
                    };
                    SmartHome.state.token = data.data.token;
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
                var d = App.serialize($('#container-dingDanXinXi').serialize());
                $('#container-dingDanXinXi').find('.card-box > img').each(function() {
                    if ($(this).attr('name') == 'avatar') {
                        d.avatar = $(this).prop('src');
                    }
                })
                $.ajax({
                    url: App.urls.smartHome.submitKeXuanBao,
                    async: false,
                    type: 'post',
                    dataType: 'json',
                    data: $.extend(true, {}, {
                        token: SmartHome.state.token
                    }, d),
                }).done(function(data) {
                    if (!App.checker(data.health)) {
                        return
                    };
                    SmartHome.state.token = data.data.token;
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
        state: {},
        camera: function() {
            var $img = $('<img/>');
            var oFReader = new FileReader(),
                rFilter = /^(?:image\/bmp|image\/cis\-cod|image\/gif|image\/ief|image\/jpeg|image\/jpeg|image\/jpeg|image\/pipeg|image\/png|image\/svg\+xml|image\/tiff|image\/x\-cmu\-raster|image\/x\-cmx|image\/x\-icon|image\/x\-portable\-anymap|image\/x\-portable\-bitmap|image\/x\-portable\-graymap|image\/x\-portable\-pixmap|image\/x\-rgb|image\/x\-xbitmap|image\/x\-xpixmap|image\/x\-xwindowdump)$/i;
            oFReader.onload = function(oFREvent) {
                $img.prop('src', oFREvent.target.result);
                App.loader();
            };
            if (document.getElementById("avatar").files.length === 0) {
                return;
            }
            var oFile = document.getElementById("avatar").files[0];
            if (!rFilter.test(oFile.type)) {
                App.toastr("只支持图片!");
                return;
            }
            oFReader.readAsDataURL(oFile);
            //压缩图片品质到60
            $img[0].onload = function() {
                var width = $img[0].width;
                var height = $img[0].height;
                var canvas = document.createElement('canvas');
                var context = canvas.getContext('2d');
                canvas.width = width;
                canvas.height = height;
                var sx = 0;
                var sy = 0;
                var sWidth = width;
                var sHeight = height;
                var dx = 0;
                var dy = 0;
                var dWidth = width;
                var dHeight = height;
                context.drawImage($img[0], sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
                var dataUrl = canvas.toDataURL('image/jpeg', 0.6); //品质0-1
                $('#sdf23sd').html($('<img />').prop({
                    'src': dataUrl,
                    'name': 'avatar'
                }).css({
                    'width': '100%'
                })).css({
                    'lineHeight': 0
                })
                App.removeLoader();
            };
        },
    }
}()
