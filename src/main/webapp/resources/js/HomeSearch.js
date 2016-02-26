var HomeSearch = {
    listenerStarts: function () {
        console.log('Inside HomeSearch.listenerStarts() ======');
        var $form = $('#home-search-form');
        $form.on('submit', function (e) {
            e.preventDefault();
            var userInputTxt = $('#home_search_input').val().replace(/\s{2,}/g, ' ').trim();//去除多余空白符
            var globalInput = $('#global_search_input');
            var successCallback = function (data) {
                var statuscode = data['statuscode'];
                //（1）将data添加到sessionStorage.data
                Session.set('data', data);
                if (statuscode == 200) {
                    console.log('statuscode == 200');
                    //(2.a)调用Sidebar的render方法，生成sidebar
                    Sidebar.render(data['aggregation']);
                    //(2.b)调用List的render方法，生成搜索结果页面
                    List.render(data['data']);
                    //(3)将用户的搜索条件填充到全局搜索框
                    globalInput.val(userInputTxt);
                    //(4)跳转到list页面
                    $.fn.fullpage.silentMoveTo('se1');
                } else if (statuscode == 204) {
                    console.log('statuscode == 204');
                    noRelatedData(data);
                } else {
                    console.log('error');
                }
            };
            var errorCallback = function () {
                $.Showmsg("服务器开小差啦，请稍后再试！");
                setTimeout(function () {
                    $.Hidemsg();
                }, 3000);
            };
            var requestObj = {
                url: Constant.LIST_SEARCH_URL,
                success: successCallback,
                error: errorCallback,
                data: {
                    wd: userInputTxt,
                    page: 1
                }
            };

            if (userInputTxt == '')return;    //如果输入为空白，则留在当前页，不提交表单
            LoadData.post(requestObj);         //提交表单，搜索
        });
    }
};