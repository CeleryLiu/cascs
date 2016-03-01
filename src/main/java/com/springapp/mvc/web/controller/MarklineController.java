package com.springapp.mvc.web.controller;/*
 * Created by lyp on 2016-03-01.
 * @author lyp
 * @date 2016-03-01
 * @Description: 3d设备展示控制器
 * @Version: V1.0
 */

import com.alibaba.fastjson.JSONObject;
import com.fasterxml.jackson.annotation.JsonView;
import com.springapp.mvc.web.dao.MarklineDAO;
import com.springapp.mvc.web.jsonView.Views;
import com.springapp.mvc.web.model.MarkLineResponseBody;
import com.springapp.mvc.web.service.MarklineService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class MarklineController {
    private static final Logger logger = LoggerFactory.getLogger(MarklineController.class);
    private final MarklineService marklineService;

    @Autowired
    public MarklineController(MarklineService marklineService) {
        this.marklineService = marklineService;
    }

    @JsonView(Views.Public.class)
    @RequestMapping(value = "/search/markline")
    public MarkLineResponseBody marklineSearch(@RequestParam(value = "pageId") String pageId) {
        logger.debug("MarklineController.marklineSearch() starts-----------");
        return marklineService.getResponse(pageId);
    }

   /* public static void main(String[] args) {
        MarklineController mc = new MarklineController(new MarklineService(new MarklineDAO()));
        System.out.println(JSONObject.toJSON(mc.marklineSearch("1")));
    }*/
}
