package com.springapp.mvc.web.controller;/*
 * Created by lyp on 2016/2/26.
 * Author: lyp
 * Date: 2016/2/26
 * Description:搜索列表查询控制器
 * Version: V1.0 
 */

import com.fasterxml.jackson.annotation.JsonView;
import com.springapp.mvc.web.jsonView.Views;
import com.springapp.mvc.web.model.SearchCriteria;
import com.springapp.mvc.web.service.Device2Service;
import net.sf.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class DeviceController {
    private static final Logger logger = LoggerFactory.getLogger(DeviceController.class);
    private final Device2Service deviceService;

    @Autowired
    public DeviceController(Device2Service deviceService) {
        this.deviceService = deviceService;
    }


    //对应搜索平台普通搜索，参数形如：wd=*&prilevel=1&page=1&pagesize=10
    @JsonView(Views.Public.class)
    @RequestMapping(value = "/search/list")
    public String listSearch(@RequestBody SearchCriteria search) {
        logger.debug("DeviceController.listSearch() ======" + JSONObject.fromObject(search));
        return deviceService.getResponse4List(search);
    }

    /*
     * @function name:
     * @param: 搜索条件
     * @return: json字符串
     * @description: 对应搜索平台使用json为参数的搜索接口
     * @author: lyp
     * @date: 2016-03-08
     */
    @JsonView(Views.Public.class)
    @RequestMapping(value = "/search/list2")
    public String listSearch2(@RequestBody SearchCriteria search) {
//        logger.debug("DeviceController.listSearch2() ======" + JSONObject.fromObject(search));
        return deviceService.getResponse4List2(search);
    }

    @JsonView(Views.Public.class)
    @RequestMapping(value = "/search/map")
    public String mapSearch(@RequestBody SearchCriteria search) {
        logger.debug("DeviceController.mapSearch() ======" + JSONObject.fromObject(search));
        return deviceService.getResponse4Map(search);
    }
}
