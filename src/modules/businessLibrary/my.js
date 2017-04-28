var My = function() {
    var handleList = function() {
        App.template({
            url: App.urls.businessLibrary.myLists,
            art: My.state.art,
            container: My.state.container,
            data: $.extend(true, {}, {
                draw: My.state.draw
            }, {
                size: 10
            }),
            cb: function(data) {
                My.state.total = data.total;
                My.state.draw = +My.state.draw +1;
            }
        })
    }
    return {
        init: function() {
            App.loader();
            handleList();
            // 监听滚动刷新
            $('.es-content').infinite(10).on("infinite", function() {
                //如果真正加载 则停止
                if (My.state.loading) return;
                //如果当前记录数目大于等于总的查询结果数，则返回
                if ($('#' + My.state.container).find('.sub-area').size() >= +My.state.total) {
                    $('#' + My.state.container).siblings('.noContent').show();
                    return
                }
                //塞入loading
                $('#' + My.state.container).siblings('.weui-loadmore').show();
                My.state.loading = true;
                App.template({
                    url: App.urls.businessLibrary.myLists,
                    art: My.state.art,
                    container: My.state.container,
                    type: 'append',
                    data: $.extend(true, {}, {
                        draw: My.state.draw
                    }, {
                        size: 10
                    }),
                    cb: function() {
                        $('#' + My.state.container).siblings('.weui-loadmore').hide();
                        My.state.loading = false;
                        My.state.draw = +My.state.draw +1;
                    }
                })
            });
        },
        hold: function(el) {
            $.confirm("确定预占商机吗？", function() {
                var $other = $(el).closest('.other');
                $other.html('<a class="weui-btn weui-btn_mini weui-btn_default weui-btn_disabled" href="javascript:;">已预占</a>');
            }, function() {
                //点击取消后的回调函数
            });
        },
        //状态
        state: {
            token: '', //每次提交，都需要把上一次返回的token作为本次请求的入参
            draw: 1, //滚动加载了几次
            total: 0, //当前查询结果有多少条
            loading: false,
            container: 'container-my',
            art: 'art-my'
        },
    }
}()
