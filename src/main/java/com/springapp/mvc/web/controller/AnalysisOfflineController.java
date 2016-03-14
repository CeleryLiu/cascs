package com.springapp.mvc.web.controller;
/*
 * Created by lyp on 2016-03-14.
 * @author lyp
 * @date 2016-03-14
 * @Description: 离线分析控制器
 * @Version: V1.0
 */

import com.springapp.mvc.web.service.AnalysisOfflineService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

@RestController
public class AnalysisOfflineController {
    private static final Logger logger = LoggerFactory.getLogger(AnalysisOfflineController.class);
    private final AnalysisOfflineService service;

    @Autowired
    public AnalysisOfflineController(AnalysisOfflineService service) {
        this.service = service;
    }

    @RequestMapping(value = "/analysis/getLatestData")
    public String getLatestData(@RequestParam(value = "scale") String scale) {
        return service.getLatest().toJSONString();
    }

    @RequestMapping(value = "/analysis/getSummary")
    public String getSummary() {
        return service.getSummary().toJSONString();
    }

    //返回离线分析页面view及页面渲染需要的所有数据model
    @RequestMapping(value = "/analysis-offline", method = RequestMethod.GET)
    public ModelAndView offlineAnalysis() {
        logger.debug("offlineAnalysis.offlineAnalysis() ======");
        System.out.println("offlineAnalysis.offlineAnalysis() ======");
        ModelAndView mav = new ModelAndView("analysis-offline");
        mav.addObject("summary", service.getSummary());
        mav.addObject("latest", service.getLatest());
        return mav;
    }
}
