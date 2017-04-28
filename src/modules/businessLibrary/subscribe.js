var Subscribe = function() {
    var handleList = function() {
        App.template({
            url: App.urls.businessLibrary.orderLists,
            art: Subscribe.state.art,
            container: Subscribe.state.container,
            data: $.extend(true, {}, {
                draw: +Subscribe.state.draw
            }, {
                size: 10
            }),
            cb: function(data) {
                Subscribe.state.total = data.total;
                Subscribe.state.draw = +Subscribe.state.draw +1;
            }
        })
    }
    return {
        init: function() {
            handleList();
            // 监听滚动刷新
            $('.es-content').infinite(10).on("infinite", function() {
                //如果真正加载 则停止
                if (Subscribe.state.loading) return;
                //如果当前记录数目大于等于总的查询结果数，则返回
                if ($('#' + Subscribe.state.container).find('.sub-area').size() >= +Subscribe.state.total) {
                    $('#' + Subscribe.state.container).siblings('.noContent').show();
                    return
                }
                //塞入loading
                $('#' + Subscribe.state.container).siblings('.weui-loadmore').show();
                Subscribe.state.loading = true;
                App.template({
                    url: App.urls.businessLibrary.orderLists,
                    art: Subscribe.state.art,
                    container: Subscribe.state.container,
                    type: 'append',
                    data: $.extend(true, {}, {
                        draw: Subscribe.state.draw
                    }, {
                        size: 10
                    }),
                    cb: function() {
                        $('#' + Subscribe.state.container).siblings('.weui-loadmore').hide();
                        Subscribe.state.loading = false;
                        Subscribe.state.draw = +Subscribe.state.draw +1;
                    }
                })
            });
        },
        hold: function(el) {
            $.confirm("确定预占商机吗？", function() {
                var $other = $(el).closest('.other');
                $other.html('<a style="margin-top:0.5rem;" class="weui-btn weui-btn_mini weui-btn_default weui-btn_disabled" href="javascript:;">已预占</a>');
            }, function() {
                //点击取消后的回调函数
            });
        },
        //状态
        state: {
            token: '', //每次提交，都需要把上一次返回的token作为本次请求的入参
            draw: 0, //滚动加载了几次
            total: 0, //当前查询结果有多少条
            loading: false,
            container: 'container-subscribe',
            art: 'art-subscribe'
        },
    }
}()
