package com.springapp.mvc.web.model;

import com.fasterxml.jackson.annotation.JsonView;
import com.springapp.mvc.web.jsonView.Views;

/**
 * Created by lyp on 2015/12/10.
 * 单纯的返回设备信息的ResponseBody
 */
public class MarkLineResponseBody {
    @JsonView(Views.Public.class)
    String errmsg;
    @JsonView(Views.Public.class)
    String statuscode;
    @JsonView(Views.Public.class)
    MarkLine data;

    public String getErrmsg() {
        return errmsg;
    }

    public void setErrmsg(String errmsg) {
        this.errmsg = errmsg;
    }

    public String getStatuscode() {
        return statuscode;
    }

    public void setStatuscode(String statuscode) {
        this.statuscode = statuscode;
    }

    public MarkLine getData() {
        return data;
    }

    public void setData(MarkLine data) {
        this.data = data;
    }
}
