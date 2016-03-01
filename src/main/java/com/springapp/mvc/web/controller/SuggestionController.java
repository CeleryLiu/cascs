package com.springapp.mvc.web.controller;/*
 * Created by lyp on 2016-03-01.
 * @author lyp
 * @date 2016-03-01
 * @Description: 输入框提示控制器
 * @Version: V1.0
 */

import com.fasterxml.jackson.annotation.JsonView;
import com.springapp.mvc.web.jsonView.Views;
import com.springapp.mvc.web.service.SuggestionService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class SuggestionController {
    private static final Logger logger = LoggerFactory.getLogger(SuggestionController.class);
    private final SuggestionService suggestionService;

    @Autowired
    public SuggestionController(SuggestionService suggestionService) {
        this.suggestionService = suggestionService;
    }

    /*
* @function 高级搜索，接收高级搜索传入的查询对象
* @param advancedSearch，用户输入的搜索条件
* @result String，查询结果
*/
    @JsonView(Views.Public.class)
    @RequestMapping(value = "/search/getSuggestions")
    public String getSuggestions(@RequestParam(value = "search") String search) {
        logger.debug("DataApiController advancedSearch starts-----------");
        return suggestionService.getResponse4Suggestion(search).toString();
    }
}
