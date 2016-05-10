package com.springapp.mvc.web.service;/*
 * Created by lyp on 2016-03-14.
 * @author lyp
 * @date 2016-03-14
 * @Description: 离线统计分析业务层
 * @Version: V1.0
 */

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.springapp.mvc.web.dao.StatisticDAO;
import com.springapp.mvc.web.util.RestClient;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class StatisticService {
    private static final Logger logger = LoggerFactory.getLogger(StatisticService.class);
    private RestClient rc = new RestClient();
    private final StatisticDAO dao;

    @Autowired
    public StatisticService(StatisticDAO dao) {
        this.dao = dao;
    }

    public JSONObject getSummary(String scale, int size) {
        logger.debug("StatisticService.getSummary() ======");
//        System.out.println("StatisticService.getSummary () ======");
        JSONObject result = dao.getSummary(scale, size);
        if (result.getJSONArray("data").size() == 0) {
            result.put("statuscode", "204");
            result.put("errmsg", "");
            result.put("data", new JSONArray());
        }
        return result;
    }

    public JSONObject getNMonthSummary(int monthCount) {
        logger.debug("StatisticService.getNMonthSummary() ======");
        JSONObject result = new JSONObject();
        JSONObject data = dao.getNMonthSummaryAll(monthCount);
        if (data != null) {
            result.put("statuscode", "200");
            result.put("errmsg", "");
            result.put("data", data);
        } else {
            result.put("statuscode", "555");
            result.put("errmsg", "");
            result.put("data", new JSONObject());
        }
        return result;
    }

    public JSONObject getLatest(String size) {
        logger.debug("StatisticService.getLatest4FusionCharts() ======");
//        System.out.println("StatisticService.getLatest4FusionCharts() ======");
        JSONObject result = dao.getLatest(size);
        if (result.getJSONArray("data").size() == 0) {
            result.put("statuscode", "204");
            result.put("errmsg", "");
            result.put("data", new JSONArray());
        }
        return result;
    }

    public JSONObject getLatest4FusionCharts() {
        logger.debug("StatisticService.getLatest4FusionCharts() ======");
//        return dao.getLatest4FusionCharts();
        return dao.getAll4FusionCharts();
    }
}
