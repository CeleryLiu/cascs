/* ----------------------------- Advanced Search 精确搜索 - ----------------------------- */
//var advancedSearchURL = 'api/advancedSearch';
var AdvSearch = {
    form: $('#advs'),
    wrapper: $('#advs_wrapper'),
    listen: function () {
        //advanced search link
        $('.advs-link').on('click', function (e) {
            e.preventDefault();
            var $advsWrapper = $('#advs_wrapper').toggleClass('active');
            /*var dirIndicator = $('.advs-link-main').find('span');
             if ($advsWrapper.hasClass('active')) {
             dirIndicator.removeClass('fa fa-caret-right').addClass('fa fa-caret-left');
             } else {
             dirIndicator.removeClass('fa fa-caret-left').addClass('fa fa-caret-right');
             }*/
        });

        //advanced search form controls.close
        $('.close-advs').on('click', function () {
            AdvSearch.hide();
        });

        //advanced search form controls.reset
        $('.reset-advs').on('click', function () {
            document.getElementById("advs").reset();
        });

        //date default value
        $('#time_to').val(new Date().toDateInputValue());

        //advanced search form
        $('#advs').on('submit', function (e) {
            e.preventDefault();
            AdvSearch.search(this);
        });
    },
    show: function () {
        //console.log("FUNCTION CALL: AdvSearch.show");
        this.wrapper.addClass('active');
        /*$('.advs-link-main').find('span')
         .removeClass('fa fa-caret-left')
         .addClass('fa fa-caret-right');*/
    },
    hide: function () {
        //console.log("FUNCTION CALL: AdvSearch.hide");
        this.wrapper.removeClass('active');
        /*$('.advs-link-main').find('span')
         .removeClass('fa fa-caret-right')
         .addClass('fa fa-caret-left');*/
    },
    search: function (form) {
        //console.log("FUNCTION CALL: AdvSearch.search");
        if (!form) {
            form = this.form;
        }
        //show loading--------------------待开发
        var noInputTag = true;
        var getCriteria = function () {
            var criteria = {}, ipSegment = '', timeSegment = '',
                inputs = $(form).find('fieldset').find('input');

            for (var i = 0; i < inputs.length; i++) {
                var key = inputs[i].id, values = $(inputs[i]).val().replace(/\s+/g, " ");//所有空白符都替换为一个空格

                var timestamp = (Date.parse(new Date($(inputs[i]).val()))) / 1000;
                if (key.indexOf('time_') >= 0) {
                    timeSegment += timestamp + '-';
                    continue;
                }

                if (key.indexOf("ip_") >= 0) {
                    ipSegment += $(inputs[i]).val() + '-';
                    continue;
                }

                //set 查询条件
                criteria[key] = values;

                /*//set sessionStorage checked
                 if (values != '' && (key == 'country' || key == 'city' || key == 'port' || key == 'os' || key == 'vul' || key == 'device_service' || key == 'device_type')) {
                 var valueArr = values.split(' ');
                 for (var j = 0; j < valueArr.length; j++) {
                 MySessionStorage.set('checked', valueArr[j], 'add');
                 }
                 }*/
            }
            if (ipSegment != '') {
                criteria['ip'] += ' ' + ipSegment.replace(/^-|-$/g, '');//去掉首尾的“-”和空格
            }
            if (timeSegment != '') {
                timeSegment = timeSegment.replace(/\s+/g, "").replace(/^-|-$/g, '');
                if (timeSegment.indexOf('-NaN') >= 0) {
                    timeSegment = timeSegment.replace('-NaN', '-' + (Date.parse(new Date().toDateInputValue())) / 1000);
                } else if (timeSegment.indexOf('NaN-') >= 0) {
                    timeSegment = timeSegment.replace('NaN-', '');
                }
                criteria['lastModified'] = timeSegment;
            }
            return criteria;
        };
        var criteria = getCriteria();
        var inputStr = '';
        for (var key in criteria) {
            if (key == 'lastModified' && criteria[key].indexOf('-') <= 0) {
                continue;
            }
            inputStr += ' ' + criteria[key];
            if (criteria[key] && criteria[key].replace(/\s+/g, '') != '') {
                noInputTag = false;
            }
        }

        if (!noInputTag) {
            GlobalSearch.setValue(inputStr.replace(/\s+/g, ' ').trim());
        } else {//如果用户未输入，则不提交
            GlobalSearch.setValue('');
            $('#must').focus();
            return;
        }
        var successCallback = function (data) {
            var statuscode = data['statuscode'];
            //（1）将data添加到sessionStorage.data
            Session.set('data', data);
            switch (currentPage) {
                case 3:
                    ArcMap.onSearchSucceed(data);
                    break;
                case 2:
                    List.onSearchSucceed(data);
            }
        };
        /*if (!MySessionStorage.get('currentPage')) {
         MySessionStorage.set('currentPage', 'list');
         homepage_search_flag = true;
         }*/
        var requestObj = {
            'url': Constant.ADVS_SEARCH_RUL,
            'success': successCallback,
            'error': errorHandler,
            'data': criteria
        };

        LoadData.post(requestObj);
        //hide loading-------------------待开发
        this.hide();
    }
};