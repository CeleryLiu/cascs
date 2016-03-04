var HomeSearch = {
    _INPUT_SEL: (function () {
        return '#home_search_input';
    }()),
    _FORM_SEL: (function () {
        return '#home_search_form';
    }()),
    getValue: function () {
        return $(this._INPUT_SEL).val().replace(/\s{2,}/g, ' ').trim();
    },
    setValue: function (val) {
        console.log('HomeSearch.setValue(), val:' + val);
        $(this._INPUT_SEL).val(val);
    },
    listen: function () {
        console.log('HomeSearch.listen() ======');
        var $form = $(this._FORM_SEL);
        $form.on('submit', function (e) {
            e.preventDefault();
            var userInputTxt = HomeSearch.getValue();//去除多余空白符
            var successCallback = function (data) {
                var statuscode = data['statuscode'];
                //（1）将data添加到sessionStorage.data
                Session.set('data', data);
                if (statuscode == 200) {
                    console.log('Home search succeed. statuscode == 200', data);
                    //(2.a)调用Sidebar的render方法，生成sidebar
                    Sidebar.render(data);
                    //(2.b)调用List的render方法，生成搜索结果页面
                    List.render(data);
                    //(3)将用户的搜索条件填充到全局搜索框
                    GlobalSearch.setValue(userInputTxt);
                    //(4)跳转到list页面
                    $.fn.fullpage.silentMoveTo('se2');
                } else if (statuscode == 204) {
                    noDataHandler();
                } else {
                    errorHandler();
                }
            };
            var requestObj = {
                'url': Constant.LIST_SEARCH_URL,
                'success': successCallback,
                'error': errorHandler,
                'data': {
                    'wd': userInputTxt,
                    'page': 1
                }
            };
            if (userInputTxt == '')return;    //如果输入为空白，则留在当前页，不提交表单
            //(1)清空Pivot
            Pivot.init();
            //(2)搜索
            LoadData.post(requestObj);         //提交表单，搜索
        });
    },
    onSearchSucceed: function (data) {
        var statuscode = data['statuscode'];
        //（1）将data添加到sessionStorage.data
        Session.set('data', data);
        if (statuscode == 200) {
            console.log('Home search succeed. statuscode == 200', data);
            //(2.a)调用Sidebar的render方法，生成sidebar
            Sidebar.render(data);
            //(2.b)调用List的render方法，生成搜索结果页面
            List.render(data);
            //(3)将用户的搜索条件填充到全局搜索框
            GlobalSearch.setValue(HomeSearch.getValue());
            //(4)跳转到list页面
            $.fn.fullpage.silentMoveTo('se2');
        } else if (statuscode == 204) {
            noDataHandler();
        } else {
            errorHandler();
        }
    }
};