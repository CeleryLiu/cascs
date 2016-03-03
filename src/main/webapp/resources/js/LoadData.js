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
        console.log("LoadData.get() ======, requestObj = ", requestObj);
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
        console.log("LoadData.post() ======, requestObj = ", requestObj);
        $.ajax({
            url: requestObj.url,
            type: "post",
            contentType: "application/json",
            dataType: "json",
            timeout: 50000,
            data: JSON.stringify(requestObj.data),
            beforeSend: function () {
                if (requestObj.beforeSend) {
                    requestObj.beforeSend();
                }
            }
        }).success(requestObj.success)
            .error(requestObj.error ? requestObj.error : errorHandler())
            .complete(function (jqXHR, textStatus) {
            });
    }
};
/*---------------------------------------Function Search--------------------------*/
function newSearch(obj) {
    //console.log("FUNCTION CALL: newSearch", obj);
    var homeSearchBtn = $('#home-search-btn'),
        globalSearchBtn = $('.global-search-button'),
        globalSearchInput = $('.global-search-input'),
        advsBtn = $('.submit-advs');

    //（1）禁用查询按钮，如果是form查询
    disableButton(homeSearchBtn, true);
    disableButton(globalSearchBtn, true);
    disableButton(advsBtn, true);
    /*    $.address.value(obj.url);
     $.address.parameter('search', JSON.stringify(obj.criteria));*/
    //（2）查询数据
    $.ajax(
        {
            url: obj.url,
            type: "post",
            contentType: "application/json",
            dataType: "json",
            timeout: 50000,
            data: JSON.stringify(obj.criteria),
            beforeSend: function () {
                //$('body').showLoading();// 添加 loading 标记类
            }
        })
        .success(function (data) {
            var statuscode = data['statuscode'];
            //设置global_search_input.val的值为sessionStorage.wd
            if (statuscode == 200) {
                var wd = MySessionStorage.get('wd');
                if (wd) {
                    //globalSearchInput.val(wd);
                }
                //设置sessionStorage
                MySessionStorage.set('data', data);
                var currentPage = MySessionStorage.get('currentPage');
                if (currentPage) {
                    if (currentPage == 'list') {
                        $('.carousel').carousel(1);
                        List.show(data);
                        //MyMap.show(data);
                    } else if (currentPage == 'map') {
                        $('.carousel').carousel(2);
                        //List.show(data);
                        MyMap.show(data);
                    }
                }
            } else if (statuscode == 204) {
                noData(data);
            } else {
                console.log("ajax success with data error" + data['statuscode'], data['errmsg']);
                alert("ajax search error");
                errorHandler();
            }
        })
        .error(function (e) {
            $('body').hideLoading();// 添加 loading 标记类
            console.log("Error", e);
            disableButton(homeSearchBtn, false);
            disableButton(globalSearchBtn, false);
            disableButton(advsBtn, false);
            errorHandler();
        }).complete(function (jqXHR, textStatus) {
            //$('body').hideLoading();// 添加 loading 标记类
            $('html, body').scrollTop(0);
        }).done(function () {
            //$('body').hideLoading();// 添加 loading 标记类
            //启用查询按钮
            disableButton(homeSearchBtn, false);
            disableButton(globalSearchBtn, false);
            disableButton(advsBtn, false);
        });

    //启用/禁用指定的按钮
    function disableButton(button, flag) {
        if (button) {
            button.prop("disabled", flag);
        }
    }
}