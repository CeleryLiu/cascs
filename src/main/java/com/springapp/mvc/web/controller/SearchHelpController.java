package com.springapp.mvc.web.controller;/*
 * Created by lyp on 2016-03-09.
 * @author lyp
 * @date 2016-03-09
 * @Description: 热门搜索、系统推荐【、用户搜索记录】相关的控制器
 * @Version: V1.0
 */

import com.fasterxml.jackson.annotation.JsonView;
import com.springapp.mvc.web.jsonView.Views;
import com.springapp.mvc.web.service.SearchHelpService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class SearchHelpController {
    private static final Logger logger = LoggerFactory.getLogger(SearchHelpController.class);
    private final SearchHelpService searchHelpService;

    @Autowired
    public SearchHelpController(SearchHelpService searchHelpService) {
        this.searchHelpService = searchHelpService;
    }

    /*
     * @function name: hotSearch
     * @param:
     * @return: json字符串
     * @description: 热门搜索
     * @author: lyp
     * @date: 2016-03-09
     */
    @JsonView(Views.Public.class)
    @RequestMapping(value = "/search/getHotTerms")
    public String getHotSearchData() {
        logger.debug("SearchHelpController.getHotSearchData() ======");
//      System.out.println("SearchHelpController.getHotSearchData() ======");
        return searchHelpService.getResponse4HotSearch();
    }
}
