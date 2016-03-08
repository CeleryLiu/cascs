var HomeSearch = {
    _INPUT_SEL: (function () {
        return '#hsi';//short for home search input
    }()),
    _FORM_SEL: (function () {
        return '#home_search_form';
    }()),
    getValue: function () {
        //return $(this._FORM_SEL).find('input').val().replace(/\s{2,}/g, ' ').trim();
        var $input = $(this._INPUT_SEL), val = $input.val();
        if (val == "") {
            val = $input.attr('placeholder');
            $input.val(val)
        }
        return val;
        //return $(this._FORM_SEL).find('input').typeahead('val').replace(/\s{2,}/g, ' ').trim();
    },
    setValue: function (val) {
        //console.log('HomeSearch.setValue(), val:' + val);
        $(this._INPUT_SEL).val(val);
    },
    listen: function () {
        //console.log('HomeSearch.listen() ======');
        var $form = $(this._FORM_SEL);
        $form.on('submit', function (e) {
            e.preventDefault();
            var wd = HomeSearch.getValue();//去除多余空白符
            var successCallback = this.onSearchSucceed;
            var requestObj = {
                'url': Constant.LIST_SEARCH_URL,
                //'success': successCallback,
                'error': errorHandler,
                'data': {
                    'wd': wd,
                    'page': 1
                }
            };
            //(1)清空Pivot
            Pivot.init();
            //(2)为GlobalSearch赋值
            GlobalSearch.setValue(wd);
            //(3)提交表单，搜索
            LoadData.post(requestObj);
        });
    },
    onSearchSucceed: function (data) {
        var statuscode = data['statuscode'];
        if (statuscode == 200) {
            //console.log('Home search succeed. statuscode == 200', data);
            //(1)调用Sidebar的render方法，生成sidebar
            Sidebar.render(data);
            //(2)调用List的render方法，生成搜索结果页面
            List.render(data);
            //(3)跳转到list页面
            $.fn.fullpage.silentMoveTo('se2');
            //(4)当前页改为2
            currentPage = 2;
        } else if (statuscode == 204) {
            noDataHandler(data);
        } else {
            errorHandler();
        }
    }
};