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
import com.springapp.mvc.web.service.DeviceService;
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
    private final DeviceService commonSearchService;

    @Autowired
    public DeviceController(DeviceService commonSearchService) {
        this.commonSearchService = commonSearchService;
    }

    @JsonView(Views.Public.class)
    @RequestMapping(value = "/search/list")
    public String listSearch(@RequestBody SearchCriteria search) {
        logger.debug("SearchController.markpointSearch() ======" + JSONObject.fromObject(search));
        System.out.println("SearchController.markpointSearch() ======" + JSONObject.fromObject(search));
        String result = commonSearchService.getResponse4List(search);
        System.out.println("SearchController.markpointSearch() result: " + result);
        return result;
    }

    @JsonView(Views.Public.class)
    @RequestMapping(value = "/search/map")
    public String mapSearch(@RequestBody SearchCriteria search) {
        logger.debug("SearchController.mapSearch() ======" + JSONObject.fromObject(search));
        System.out.println("SearchController.mapSearch() ======" + JSONObject.fromObject(search));
        String result = commonSearchService.getResponse4Map(search);
        System.out.println("SearchController.mapSearch() result: " + result);
        return result;
    }
}
