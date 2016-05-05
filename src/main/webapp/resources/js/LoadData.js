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
        //console.log("LoadData.post() ======, requestObj = ", requestObj.data);
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
        })
            .success(requestObj.success)
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
                //$.fn.fullpage.reBuild();
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