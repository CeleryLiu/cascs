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
import com.springapp.mvc.web.service.SearchService;
import net.sf.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class SearchController {
    private static final Logger logger = LoggerFactory.getLogger(SearchController.class);
    private final SearchService searchService;

    @Autowired
    public SearchController(SearchService searchService) {
        this.searchService = searchService;
    }

    @JsonView(Views.Public.class)
    @RequestMapping(value = "/search/listSearch")
    public String listSearch(@RequestBody SearchCriteria search) {
        logger.debug("Inside ListSearchController.listSearch() ======" + JSONObject.fromObject(search));
        System.out.println("Inside ListSearchController.listSearch() ======" + JSONObject.fromObject(search));
        String result = searchService.getRequest4CommonSearch(search);
        System.out.println("ListSearchController.listSearch() result: " + result);
        return result;
    }
}
