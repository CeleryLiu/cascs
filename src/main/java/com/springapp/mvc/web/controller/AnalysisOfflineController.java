package com.springapp.mvc.web.controller;
/*
 * Created by lyp on 2016-03-14.
 * @author lyp
 * @date 2016-03-14
 * @Description: 离线统计分析控制器
 * @Version: V1.0
 */

import com.springapp.mvc.web.service.AnalysisOfflineService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AnalysisOfflineController {
    private static final Logger logger = LoggerFactory.getLogger(AnalysisOfflineController.class);
    private final AnalysisOfflineService service;

    @Autowired
    public AnalysisOfflineController(AnalysisOfflineService service) {
        this.service = service;
    }

    @RequestMapping(value = "/analysis/getLatestData")
    //size为次数，即获取多少次扫描后的结果，默认为1
    public String getLatestData(@RequestParam(value = "size", required = false, defaultValue = "1") String size) {
        logger.debug("AnalysisOfflineController.getLatestData() ======");
        return service.getLatest(size).toJSONString();
    }

    @RequestMapping(value = "/analysis/getSummary")
    public String getSummary(@RequestParam(value = "scale") String scale,
                             @RequestParam(value = "size") int size) {
        logger.debug("AnalysisOfflineController.getSummary() ======");
        return service.getSummary(scale, size).toJSONString();
    }

    @RequestMapping(value = "/analysis/getNMonthSummary/{monthCount}")
    public String getNMonthSummary(@PathVariable("monthCount") int monthCount) {
        logger.debug("AnalysisOfflineController.getNMonthSummary() ======");
        return service.getNMonthSummary(monthCount).toJSONString();
    }


/*    public static void main(String[] args) {
        AnalysisOfflineController aoc = new AnalysisOfflineController(new AnalysisOfflineService());
        System.out.println(aoc.getLatestData("3"));
        System.out.println(aoc.getSummary("Global", "10"));
    }*/
}
