package com.springapp.mvc.web.controller;
/*
 * Created by lyp on 2016-04-08.
 * @author lyp
 * @date 2016-04-08
 * @Description: 数据统计控制器，提供设备的统计数据，代码成熟后会取代AnalysisOfflineController
 * @Version: V1.0
 */

import com.springapp.mvc.web.service.StatisticService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class StatisticController {
    private static final Logger logger = LoggerFactory.getLogger(StatisticController.class);
    private final StatisticService service;

    @Autowired
    public StatisticController(StatisticService service) {
        this.service = service;
    }

    @RequestMapping(value = "/analysis/getLatestData")
    //size为次数，即获取多少次扫描后的结果，默认为1
    public String getLatestData(@RequestParam(value = "size", required = false, defaultValue = "1") String size) {
        logger.debug("StatisticController.getLatestData() ======");
        return service.getLatest(size).toJSONString();
    }

    @RequestMapping(value = "/analysis/getSummary")
    public String getSummary(@RequestParam(value = "scale") String scale,
                             @RequestParam(value = "size") int size) {
        logger.debug("StatisticController.getSummary() ======");
        return service.getSummary(scale, size).toJSONString();
    }

    @RequestMapping(value = "/analysis/getNMonthSummary/{monthCount}")
    public String getNMonthSummary(@PathVariable("monthCount") int monthCount) {
        logger.debug("StatisticController.getNMonthSummary() ======");
        return service.getNMonthSummary(monthCount).toJSONString();
    }

    //--------------old↑------------- new↓-----------------
    @RequestMapping(value = "/statistic/getLatestData")
    //size为次数，即获取多少次扫描后的结果，默认为1
    public String getLatest4FusionCharts() {
        logger.debug("StatisticController.getLatest4FusionCharts() ======");
        return service.getLatest4FusionCharts().toJSONString();
    }

/*    public static void main(String[] args) {
        StatisticController aoc = new StatisticController(new StatisticService(new StatisticDAO()));
//        System.out.println(aoc.getLatestData("1"));
//        System.out.println(aoc.getSummary("Global", 2));
        System.out.println(aoc.getLatest4FusionCharts());
    }*/
}
