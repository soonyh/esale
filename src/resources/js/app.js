/*!========================================================================
 * 工具函数
 * Author:soon
 * ======================================================================== */
var App = function() {
    var globalSet = function() {
        $(document).ajaxError(function(event, xhr, settings, thrownError) {
            App.removeLoader();
            App.toastr(thrownError, 'forbidden');
        });
        $.ajaxSetup({
            timeout: '20000'
        });
        //toastr停留时间
        $.toast.prototype.defaults.duration = 1000;
    };
    /**
     * 说明
     * 对input[data-toggle="select"]或input[data-toggle="select-popup"]进行初始化
     * 会在input后面生成一个 <div class="input-label">***</div>  用来显示displayValue
     * 并把input元素透明，盖在div.input-label之上
     *
     * 如果input无value属性或value值为空，则displayValue等于input的placeholder
     * 如果input有值且不为空，会遍历data-options数组，找到对应项的label
     */
    var initSelect = function() {
        //获取所有没有初始化过的select对象
        var $select = $('body').find('input[data-toggle="select"],input[data-toggle="select-popup"]').filter(function(index) {
            return $(this).next('.input-label').size() > 0 ? false : true;
        });
        $select.each(function() {
            var $input = $(this);
            var options = eval($input.data('options'));
            var $label = $('<div class="input-label"/>');
            var value = $input.val() != '' ? $input.val() : '';
            var displayValue;
            //无默认值
            if (value == '') {
                $input.hide().after($label.html($input.attr('placeholder')));
            } else {
                $.each(options, function(index, item) {
                    if (String(item.value) == String(value)) {
                        displayValue = item.label;
                        return false;
                    }
                })
                $input.hide().after($label.addClass('color-green').html(displayValue));
            }
        })
    };
    /**
     * 获取指定范围内的input序列化值
     *
     * 主要针对自定义的select元素，形式如下：
     * <input class="form-control" type="text" name="payType"
     *        data-toggle="select"
     *        placeholder="付费状态"
     *        data-options="[{label:'预付费',value:1,select,true},{label:'未付费',value:2}]"
     *  />
     * <div class="input-label">预付费</div>
     *
     * @param  {String} scope 符合CSS规范的selector,如：'#container'
     * @return {Object}       返回序列化后的对象,如：{payType:{label:'预付费',value:'1'}}
     */
    var serialize2 = function(scope) {
        var o = {};
        $(scope).find(':input').filter(function(index) {
            return $(this).next('.input-label').size() > 0 ? true : false;
        }).each(function() {
            var key = $(this).prop('name');
            var value = $(this).val();
            var label = $(this).next('.input-label').html();
            o[key] = {
                label: label,
                value: value
            }
        })
        return o;
    };
    /**
     * 监听所有input[data-toggle="select"]，当点击时启动picker插件
     * 用法:
     * <div class="form-group">
     *   <div class="icon-label"><i class="iconfont icon-cuxiao"></i>
     *   </div>
     *   <div class="wrapper">
     *    <input class="form-control" type="text" name="payType"
     *        data-toggle="select"
     *        placeholder="付费状态"
     *        data-options="[{label:'预付费',value:1,select,true},{label:'未付费',value:2}]"
     *    />
     *     <div class="other"><i class="iconfont icon-xiangyou1"></i>
     *     </div>
     *   </div>
     * </div>
     * 说明：
     * data-toggle="select"      必填  启动的钩子
     * value                     选填  允许不写或为空，
     *                                 若有值，表示设置默认选中项，
     *                                 且该值必须是options数组中某一项的value
     * data-options=""           必填  数组字符串值，如："[{label:'a',value:1},{label:'b',value:2,select:true}]"
     *                                 select:true 表示默认选中项
     * placeholder="付费状态"    必填  用于picker的标题和displayValue
     * 注明：
     * 配合APP.initSelect方法完成初始化，即展示display value,具体说明见该方法
     */
    var watchSelect = function() {
        $('body').on('click', 'input[data-toggle="select"]', function() {
            var $this = $(this);
            var arr = eval($this.data('options'));
            var values = [];
            var displayValues = [];
            $.each(arr, function(key, val) {
                displayValues.push(val.label)
                values.push(val.value)
            });
            $this.picker({
                title: $this.attr('placeholder'),
                cols: [{
                    textAlign: 'center',
                    values: values,
                    displayValues: displayValues
                }],
                onChange: function(a, b, c) {
                    $(a.input).siblings('.input-label').html(c).addClass('color-green')
                },
                onClose: function() {
                    $('#picker-mask').remove();
                    //修复picker的bug：popup出现时内容回本顶上去
                    $('.es-content').removeAttr('style');
                }
            });
            $this.picker('open');
            //添加遮罩
            $('body').append('<div id="picker-mask" class="weui-mask weui-mask--visible" style="z-index:900;"></div>');
        })
    };
    return {
        init: function() {
            globalSet();
            watchSelect();
            App.validator();
        },
        /**
         * 显示Loading效果
         *
         * 控制loader策略
         * 通常都需要手动开启和手动关闭，但是对APP封装的3个方法做了便捷处理
         *
         * 1、针对`App.includeHtml()` 和 `App.modal()`
         * 关于开启：
         *     调用这2个方法时会自动开启loaer
         * 关于关闭：
         *     返回异常：status='error'时会自动关闭loading效果
         *     返回成功：需手动关闭loading效果。分两种情况，如果插入的代码片段初始化时
         *         无异步操作，则应立即手动关闭 `App.removeLoader()`;
         *         有异步操作，则应在异步的成功回调里 `App.removeLoader()`
         *          ps：调用App.template()的异步操作，不需要手动关闭，因为方法体内有
         * 注： 不在 includeHtml和modal方法体内，status='success'时自动关闭的原因是
         * 这2个方法都是异步载入代码片段，status='success'只表示html代码骨架加载完毕
         * 并不表示里面的所有异步操作完毕
         *
         * 2、针对App.template()
         * 关于开启：
         *     不会开启loading效果，因为该方法只是对异步和模板解析的二次封装，通常是依附
         *     在某个组件内的，并不是正在的开始时刻
         * 关于关闭：
         *     自动关闭loading，不管是异常还是正常返回
         */
        loader: function() {
            $('body').append('<div id="loader"><div class="ball-scale-multiple"><div></div><div></div><div></div></div></div>')
        },
        //异步结束后，清除loading，每次需手动调用方法
        removeLoader: function() {
            $('#loader').remove();
        },
        /**
         * 对jquery-weui的$.toptip进一步封装
         * @message  [string]  提示消息
         */
        toptip: function(message) {
            $.toptip(message, 'error');
        },
        /**
         * 对jquery-weui的$.toastr进一步封装
         * @message  [string]  提示消息
         * @type     [string]  提示类型 'forbidden|cancel|text'
         */
        toastr: function(message, type) {
            if (type == undefined) {
                $.toast(message);
            } else {
                $.toast(message, type);
            }
        },
        /**
         * [checker description]
         * @param  {[object]} health [顶级health对象]
         * @param  {[boolen]} isToastr [是否弹窗]
         * @return {[boolen]} [code=1表示成功，返回true,继续执行外部的代码
         * code=其他，表示失败，读取error.message并toastr]
         */
        checker: function(health, isToastr) {
            var isToastr = isToastr || true,
                _toastr = function() {
                    if (isToastr) {
                        App.toptip(health.message);
                    }
                };
            switch (+health.code) {
                case 0:
                    console.warn('返回的数据，校验成功');
                    return true;
                default:
                    _toastr();
                    console.warn('返回的数据，校验失败');
                    return false;
                    break;
            }
        },
        getUniqueID: function(prefix) {
            return prefix + '_' + Math.floor(Math.random() * (new Date()).getTime());
        },
        /**
         * 依赖于jquery-weui的$.popup和$.toastr组件
         * 说明：
         * 通过传入的组件地址，异步加载弹窗
         *     注：其实也是Html片段与includeHtml的区别是不需要指定片段的容器，
         *         默认是塞到</body>之前。
         * 自动生成一个带特定属性data-role="pie"的容器，用来包裹该html片段
         * 同时该容器带自带data-url属性，把url当作标识，用以判断是否加载过该片段
         * 可以给该PIE容器传参（对象类型）,$(PIE).data('mailbox',data)
         * 组件内的脚本可以用.closest()方法追溯到该Pie容器,并提取传入的数据
         *     提取方法：$(container).data('mailbox')
         *
         * 调用方法：
         * App.modal({url:'',data:{}})
         *
         * options:
         * @url:  [必选] [string] 组件的url地址
         * @reload:  [选填] [boolean] 表示是否允许重新拉取，默认值是true
         * @data: [选填] [Object] 传给组件的数据，以'mainbox'保存在容器上
         */
        modal: function(options) {
            var _getAbsoluteUrl = function(url) {
                var link = document.createElement('a');
                link.setAttribute('href', url);
                var absoluteUrl = link.href;
                link = null;
                return absoluteUrl;
            };
            /**
             * loader z-index:3000;
             * toastr z-index:2000;
             * picker z-index:1000;
             * toptip z-index:100;
             * modal  z-index:9; 激活的是99
             */
            var _resetIndex = function() {
                $('div[id^="modal_"]').each(function(n) {
                    $(this).css('zIndex', 9 + (+n))
                })
            };
            var options = $.extend(true, {}, options);
            var id = App.getUniqueID('modal');
            var tmpl = ['', '<div class="weui-popup__overlay"></div>', '<div class="weui-popup__modal">', '</div>'];
            options.reload = options.reload != undefined ? options.reload : true;
            if (options.url) {
                //如果不允许重新加载，则停止允许
                if (!options.reload && $('div[data-url="' + _getAbsoluteUrl(options.url) + '"]').size() > 0) {
                    _resetIndex();
                    $('div[data-url="' + _getAbsoluteUrl(options.url) + '"]').popup().css('zIndex', 99);
                    return
                }
                App.loader();
                tmpl[0] = '<div id="' + id + '" data-url="' + _getAbsoluteUrl(options.url) + '" class="weui-popup__container" data-role="pie">';
                $('body').append(tmpl[0] + tmpl[1] + tmpl[2] + tmpl[3] + tmpl[3]);
                $('#' + id).find('.weui-popup__modal').load(options.url, function(response, status, xhr) {
                    if (status == 'success') {
                        $(this).find('.modal-header').append('<i class="iconfont icon-close pull-right text-middle" onclick="var $popup = $(this).closest(\'.weui-popup__container\'); $.closePopup($popup, ' + options.reload + ');$popup.css(\'zIndex\',0);"></i>')
                        _resetIndex();
                        $('#' + id).popup().css('zIndex', 99);
                    } else if (status == 'error') {
                        App.removeLoader();
                    }
                });
            } else {
                App.toastr('请求地址异常', 'forbidden');
            }
            var data = (options.data ? options.data : [])
            console.warn('[modal] body内注入一个pie，pie上保存有数据：%s', JSON.stringify(data));
            $('#' + id).data('mailbox', data);
            //给Pie容器赋值一个close方法，用于关闭modal
            var close = function() {
                var $popup = $(this);
                //$.closePopup(container.remove) remove为true表示关闭modal同时删除modal
                $.closePopup($popup, options.reload);
                $popup.css('zIndex', 0);
            }
            var _close = $.proxy(close, $('#' + id));
            $('#' + id).data('close', _close);
        },
        /**
         * 说明：
         * 通过传入的容器id和组件地址，异步加载Html片段。
         * 自动生成一个带特定属性data-role="pie"的容器，用来包裹该html片段
         * 可以给该PIE容器传参（对象类型）,$(PIE).data('mailbox',data)
         * 组件内的脚本可以用.closest()方法追溯到该Pie容器,并提取传入的数据
         * 另外，会根据PIE容器上的reload属性值，决定多次调用时是否重新请求代码片段
         *
         * 调用方法：
         * App.includeHtml({url:'',container:'',data:{}})
         *
         * Options:
         * @url:       [必选] [string] 组件的url地址
         * @container: [必选] [string] selector,load的内容所存放的容器比如：'#con' 或者'.content .tab'
         * @data:      [选填] [Object] 传给组件的数据，以'mainbox'保存在容器上
         * @type       [string]    [选填] 填充方式'append|prepend|html'，不填默认是'html'
         * @reload:    [选填] [boolen] 表示是否允许重新拉取，默认值是true
         * @cb:        [选填] [function] 表示该组件初始化成功时的回调方法
         */
        includeHtml: function(options) {
            var options = $.extend(true, {}, options);
            var $div = $('<div/>').attr({
                'data-role': 'pie'
            });
            if (options.url && options.container) {
                var $container = $(options.container);
                //过滤：如果不允许重载且该组件已经重载过，则停止异步操作  
                options.reload = options.reload != undefined ? options.reload : true;
                if (!options.reload && $container.children('div[data-role="pie"]').size() > 0) {
                    return
                }
                App.loader();
                $.ajax({
                    url: options.url,
                    type: 'get',
                    dataType: 'html',
                    data: {},
                }).done(function(response, status, xhr) {
                    if (status == 'success') {
                        options.type = options.type ? options.type : 'html';
                        if (options.type == 'prepend') {
                            $container.prepend($div.html(response));
                        } else if (options.type == 'append') {
                            $container.append($div.html(response));
                        } else if (options.type == 'html') {
                            $container.html($div.html(response));
                        }
                        if (options.cb) {
                            options.cb();
                        }
                    } else if (status == 'error') {
                        App.removeLoader();
                    }
                })
            } else {
                App.toastr('请求地址异常', 'forbidden');
            }
            var data = (options.data ? options.data : {})
            console.warn('[includeHtml]：' + options.container + '内注入一个pie，pie容器上保存有数据:' + JSON.stringify(data));
            $div.data('mailbox', data);
        },
        /**
         * artTemplate的template()进一步封装
         * 调用方法 App.template({url:'',art:'',container:'',cb:'',data:{}})
         *
         * options
         * @url        [string]    [必填] 请求json数据的地址
         * @art        [string]    [必填] 模板的ID
         * @container  [string]    [必填] 容器id（不带#号）
         * @type       [string]    [选填] 填充方式'append|prepend|html'，不填默认是'html'
         * @cb         [Function]  [选填] 成功的回调函数
         * @fail       [Function]  [选填] 错误的回调函数
         * @data       [object]    [选填] 传参
         */
        template: function(options) {
            var options = $.extend(true, {}, options);
            if (options.url) {
                $.ajax({
                    url: options.url,
                    type: 'post',
                    contentType: 'application/json; charset=UTF-8',
                    dataType: 'json',
                    data: JSON.stringify(options.data ? options.data : {}),
                }).done(function(data) {
                    if (!App.checker(data.health)) {
                        return
                    };
                    var html = template(options.art, data);
                    options.type = options.type ? options.type : 'html';
                    if (options.type == 'prepend') {
                        $('#' + options.container).prepend(html).data('cb', data);
                    } else if (options.type == 'append') {
                        $('#' + options.container).append(html).data('cb', data);
                    } else if (options.type == 'html') {
                        $('#' + options.container).html(html).data('cb', data);
                    }
                    if (options.cb) {
                        options.cb.call(this, data);
                    }
                }).always(function() {
                    App.removeLoader();
                }).fail(function() {
                    if (options.fail) {
                        options.fail.call(this);
                    }
                });
            } else {
                App.removeLoader();
                App.toastr('请求地址异常', 'forbidden');
            }
        },
        /**
         * 表单校验
         * 在input失焦点的时候 即时校验。
         * 校验失败会在.form-group元素上添加'.has-error'样式
         *
         * //html
         * <input data-type="+n" data-help="设备串码错误" type="text" name="onu" required/>
         * 注：input标签必须被.form-group包裹
         *
         * data-type
         *    后面的value表示校验类型，目前支持的校验类型有
         *    "string"                  特殊字符
         *    "number"                  所有数字
         *    "+n"                      正整数
         *    "+floatPointerNumber"     正浮点数
         *    "url"                     url
         *    "boardbandAccount"        数字、字母、特殊符号都行，不超过20位就可以
         *    "boardbandPassword"       8位，如果月份或者日期小于10，用0补齐，eg:20170418
         *    "chinese"                 中文
         *
         * data-help
         *    表示错误时的提示message 可以不填，不填则提示默认信息
         *
         * required
         *    如果input包含required 表示为必填项，即不能为空，否则允许为空
         */
        validator: function() {
            var errorHandler = function(element, message) {
                var $formGroup = $(element).closest('.form-group');
                if (!$formGroup.hasClass('has-error')) {
                    $formGroup.addClass('has-error');
                    App.toastr(message, 'forbidden')
                } else {
                    App.toastr(message, 'forbidden')
                }
            };
            var successHandler = function(element) {
                if (!$(element).closest('.form-group').hasClass('has-error')) {
                    return
                }
                $(element).closest('.form-group').removeClass('has-error');
            };
            $('body').on('change blur', ':input[data-type]', function() {
                var $input = $(this);
                var type = $input.attr('data-type');
                if ($input.val() == '' && $input.attr('required') == undefined) {
                    successHandler(this);
                    return;
                }
                if ($input.val() == '' && $input.attr('required')) {
                    methods.required(this);
                    return;
                }
                switch (type) {
                    case 'string':
                        methods.checkString(this);
                        break;
                    case 'number':
                        methods.checkNumber(this);
                        break;
                    case 'required':
                        methods.required(this);
                        break;
                    case '+n':
                        methods.plusInteger(this);
                        break;
                    case 'boardbandPassword':
                        methods.boardbandPassword(this);
                        break;
                    case 'boardbandAccount':
                        methods.boardbandAccount(this);
                        break;
                    case '+n8':
                        methods.plusInteger8(this);
                        break;
                    case '+floatPointerNumber':
                        methods.checkFloatPointerNumber(this);
                        break;
                    case 'url':
                        methods.checkUrl(this);
                        break;
                    case 'chinese':
                        methods.checkChinese(this);
                        break;
                }
            });
            var methods = {
                //校验特殊字符
                checkString: function(element) {
                    var value = $(element).val();
                    var isString = !/[`~!@#\$%\^\&\*\(\)\+<>\?:"\{\}\\\/;'\[\]]/im.test(value);
                    if (isString) {
                        successHandler(element);
                    } else {
                        errorHandler(element, $(element).data('help') ? $(element).data('help') : '包含特殊字符')
                    }
                },
                checkUrl: function(element) {
                    var value = $(element).val();
                    var isUrl = /^(f|ht){1}(tp|tps):\/\/([\w-]+\.)+[\w-]+(\/[\w- .\?%&=]*)?/.test(value);
                    if (isUrl) {
                        successHandler(element);
                    } else {
                        errorHandler(element, 'Format error. Please enter a url')
                    }
                },
                checkNumber: function(element) {
                    var value = $(element).val();
                    var isNumber = /^-?(?:\d+|\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(value);
                    if (isNumber) {
                        successHandler(element);
                    } else {
                        errorHandler(element, $(element).data('help') ? $(element).data('help') : '请输入数字')
                    }
                },
                required: function(element) {
                    var value = $(element).val();
                    if (value != '') {
                        successHandler(element);
                    } else {
                        errorHandler(element, $(element).data('help') ? $(element).data('help') : '不能为空')
                    }
                },
                checkChinese: function(element) {
                    var value = decodeURIComponent($(element).val());
                    var isChinese = /[\u4e00-\u9fa5]/.test(value);
                    if (isChinese) {
                        successHandler(element);
                    } else {
                        errorHandler(element, $(element).data('help') ? $(element).data('help') : '请输入中文')
                    }
                },
                boardbandPassword: function(element) {
                    if (/^\d\d{7}$/.test($(element).val())) {
                        successHandler(element);
                    } else {
                        errorHandler(element, $(element).data('help') ? $(element).data('help') : '8位数字')
                    }
                },
                boardbandAccount: function(element) {
                    if (/^[\w\W][\w\W]{1,19}$/.test($(element).val())) {
                        successHandler(element);
                    } else {
                        errorHandler(element, $(element).data('help') ? $(element).data('help') : '小于20位的任意字符')
                    }
                },
                plusInteger: function(element) {
                    if (/^[0-9]\d*$/.test($(element).val())) {
                        successHandler(element);
                    } else {
                        errorHandler(element, $(element).data('help') ? $(element).data('help') : '请输入正整数')
                    }
                },
                plusInteger8: function(element) {
                    if (/^[0-9]\d{7}$/.test($(element).val())) {
                        successHandler(element);
                    } else {
                        errorHandler(element, $(element).data('help') ? $(element).data('help') : '请输入8位数字')
                    }
                },
                //正整数或者正浮点数
                checkFloatPointerNumber: function(element) {
                    if (/^[0-9]\d*(.\d+)?$/.test($(element).val())) {
                        successHandler(element);
                    } else {
                        errorHandler(element, $(element).data('help') ? $(element).data('help') : '正整数或者正浮点数')
                    }
                }
            };
            return {
                successHandler: successHandler,
                errorHandler: errorHandler
            }
        },
        getURLParameter: function(paramName) {
            var searchString = window.location.search.substring(1),
                i, val, params = searchString.split("&");
            for (i = 0; i < params.length; i++) {
                val = params[i].split("=");
                if (val[0] == paramName) {
                    return unescape(val[1]);
                }
            }
            return null;
        },
        /**
         * 取.serialize()序列化后里面某个key对应的value
         * @param  {[type]} str       [序列化后的整个字符串]
         * @param  {[type]} paramName [key名]
         * @return {[type]}           [返回值]
         */
        getParameter: function(str, paramName) {
            var searchString = str,
                i, val, params = searchString.split("&");
            for (i = 0; i < params.length; i++) {
                val = params[i].split("=");
                if (val[0] == paramName) {
                    return unescape(val[1]);
                }
            }
            return null;
        },
        // "a=2&b=3&c=4" 序列化成 {a:2,b:3,c:4}
        serialize: function(str) {
            //修复 jquery.serialize() 会把空格转成'+'的坑
            var str = str.replace(/\+/g, " ");
            var obj = {};
            var params = str.split('&');
            for (var i = 0; i < params.length; i++) {
                var val = params[i].split("=");
                //多选的select，在jquery.serialize()的时候名称都是相同的，如右：rules=1&rules=3
                //这个时候需要把值以数组的形式保存，如右：rules：[1,3]
                if (obj[val[0]]) {
                    var arr = [];
                    arr.push(obj[val[0]]); //读取已存在的，保存到临时数组
                    arr.push(unescape(val[1]));
                    obj[val[0]] = arr;
                } else {
                    obj[val[0]] = unescape(val[1])
                }
            }
            return obj
        },
        initSelect: initSelect,
        serialize2: serialize2
    }
}();
