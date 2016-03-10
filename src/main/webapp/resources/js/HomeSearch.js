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
            var successCallback = List.onSearchSucceed;
            var requestObj = {
                'url': Constant.LIST_SEARCH_2_URL,
                'success': successCallback,
                'error': errorHandler,
                'data': {
                    'wd': wd,
                    'page': 1
                }
            };
            // (1)清空Pivot
            Pivot.init();
            // (2)为GlobalSearch赋值
            GlobalSearch.setValue(wd);
            // (3)将搜索条件添加到localStorage
            UserSearchHistory.addItem(wd);
            // (4)跳转到list页面
            $.fn.fullpage.silentMoveTo('se2');
            //(4)提交表单，搜索
            LoadData.post(requestObj);
        });
    }
};