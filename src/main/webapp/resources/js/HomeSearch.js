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
                    console.log('statuscode == 200',data);
                    //(2.a)调用Sidebar的render方法，生成sidebar
                    Sidebar.render(data['aggregation']);
                    //(2.b)调用List的render方法，生成搜索结果页面
                    List.render(data);
                    //(3)将用户的搜索条件填充到全局搜索框
                    globalInput.val(userInputTxt);
                    //(4)跳转到list页面
                    $.fn.fullpage.silentMoveTo('se2');
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
//------------------to be deleted----------------------
var CheckboxId_SEPARATOR = '_s0s_',//分隔符：key_s0s_value（s零s）
    PivotId_SEPARATOR = '_pivot_',
    CountryId_SEPARATOR = '_all_',
    SPACE_SEPARATOR = '_s1s_';//表示空格，免得id里边出现空格(s壹s)
var homepage_search_flag = false;
var suggestionSearchURL = 'api/getSuggestions?search=',
    imgUrl = "resources/img/",
    getCountryFeatureSetURL = 'api/getCountryFeatureSet',
    getProvinceFeatureSetURL = 'api/getProvinceFeatureSet';
var featureSets = {}, countryFS = {};       //全局变量
var mainInit = function () {
    function getFeatureSet(url, featureSet) {
        $.ajax({
            url: url,
            type: "post",
            contentType: "application/json",
            dataType: "json",
            timeout: 50000
        }).success(function (data) {
            //console.log(url + "  succeed.", data);
            if (featureSet == 'country') {
                countryFS = data.data;
            } else if (featureSet == 'province') {
                provinceFS = data.data;
            } else if (featureSet == 'city') {
                cityFS = data.data;
            }
        }).error(function () {
            console.log("Getting country feature set error!");
        }).fail(function () {
            console.log("Getting country feature set failed!");
        });
    }
    //获取国家Layer数据
    function getCountryFeatureSet() {
        console.log("FUNCTION CALL: getCountryFeatureSet");
        getFeatureSet(getCountryFeatureSetURL, 'country');
    }
//获取省份Layer数据
    function getProvinceFeatureSet() {
        console.log("FUNCTION CALL: getProvinceFeatureSet");
        getFeatureSet(getProvinceFeatureSetURL, 'province');
    }
    getCountryFeatureSet();
    getProvinceFeatureSet();
    //advanced search link
    $('.advs-link').on('click', function (e) {
        e.preventDefault();
        var $advsWrapper = $('#advs_wrapper').toggleClass('active');
        var dirIndicator = $('.advs-link-main').find('span');
        if ($advsWrapper.hasClass('active')) {
            dirIndicator.removeClass('glyphicon-menu-right').addClass('glyphicon-menu-left');
        } else {
            dirIndicator.removeClass('glyphicon-menu-left').addClass('glyphicon-menu-right');
        }
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
};