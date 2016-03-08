/*
 * @function LoadData.get()和LoadData.post()分别为ajax的get和post请求
 * @param requestObj:"请求对象",requestObj={url:"string,请求地址",data:"JSONObject,请求参数"，beforeSend:"function,发送请求前执行的操作"，success:"function,成功回调函数"，error:"function,失败回调函数"}
 * @return 无
 * @description ajax提交请求，获取数据
 * @author lyp
 * @date 2016-02-19
 */
var LoadData = {
    get: function (requestObj) {
        //console.log("LoadData.get() ======, requestObj = ", requestObj);
        $.ajax({
            url: requestObj.url,
            type: "get",
            dataType: "json",
            timeout: 50000,
            beforeSend: function () {
                if (requestObj.beforeSend) {
                    requestObj.beforeSend();
                }
            }
        }).success(requestObj.success)
            .error(requestObj.error ? requestObj.error : errorHandler())
            .complete(function (jqXHR, textStatus) {
            });
    },
    post: function (requestObj) {
        //console.log("LoadData.post() ======, requestObj = ", requestObj);
        //Pace.start();
        $.ajax({
            url: requestObj.url,
            type: "post",
            contentType: "application/json",
            dataType: "json",
            timeout: 50000,
            data: JSON.stringify(requestObj.data),
            beforeSend: function () {
                disableButtons(true);
                Pace.start();
            }
        }).success(function (data) {
            Session.set('data', data);
            Session.set('wd', GlobalSearch.getValue() ? GlobalSearch.getValue() : HomeSearch.getValue());
            if (requestObj.success) {
                requestObj.success(data);
            } else {
                createView({
                        q: GlobalSearch.getValue(),
                        contentId: currentPage,
                        title: 'Welcome to CASCS ' + currentPage,
                        data: data
                    },
                    true
                );
            }
        })
            .error(function (e) {
                console.log("ajax error");
                if (requestObj.error) {
                    requestObj.error()
                } else {
                    errorHandler()
                }
            })
            .complete(function (jqXHR, textStatus) {
                disableButtons(false);
                Pace.stop();
            });
    }
};
var disableButtons = function (disable) {
    var homeSearchBtn = $('#home_search_btn'),
        globalSearchBtn = $('#global_search_button'),
        advsBtn = $('#advs_search_btn');
    //启用/禁用指定的按钮
    var disableButton = function (button, flag) {
        if (button) {
            button.prop("disabled", flag);
        }
    };
    if (disable) {
        disableButton(homeSearchBtn, true);
        disableButton(globalSearchBtn, true);
        disableButton(advsBtn, true);
    } else {
        disableButton(homeSearchBtn, false);
        disableButton(globalSearchBtn, false);
        disableButton(advsBtn, false);
    }
};
var createView = function (stateObject, pushHistory) {
    //console.log(stateObject, stateObject.data);
    if (stateObject == null || !stateObject.data || stateObject.data == null)return;
    var data = stateObject.data;
    var statuscode = data['statuscode'];
    // (1)Add data loaded from the server to sessionStorage
    //Session.set('data', data);
    if (statuscode == 200) {
        // (2)Render page by using stateObject
        switch (stateObject.contentId) {
            case 1:
                HomeSearch.onSearchSucceed(data);
                break;
            case 2:
                //console.log('list');
                List.onSearchSucceed(data);
                GlobalSearch.setValue(stateObject.q);
                break;
            case 3:
                //console.log('map');
                ArcMap.onSearchSucceed(data);
                GlobalSearch.setValue(stateObject.q);
                break;
            case 4:
                //console.log('point');
                break;
            case 5:
                //console.log('line');
                break;
            default :
                //console.log(stateObject.contentId);
                break;
        }
    } else if (statuscode == 204) {
        noDataHandler(data);
    } else {
        errorHandler();
    }
    $.fn.fullpage.reBuild();
    //(3) Save state on history stack
    /** param {
     *   firstOne: any object that will let you restore state
     *   secondOne:　a title (not the page title, and not currently used)
     *   thirdOne: the URL - this will appear in the browser address bar
     * }
     */
    //if (pushHistory) history.pushState(stateObject, stateObject.title, '?q=' + stateObject.q);
    //console.log("==========================");
};