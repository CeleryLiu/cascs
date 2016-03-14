package com.springapp.mvc.web.service;/*
 * Created by lyp on 2016-03-14.
 * @author lyp
 * @date 2016-03-14
 * @Description: 离线统计分析业务层
 * @Version: V1.0
 */

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.springapp.mvc.web.dao.AnalysisOfflineDAO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AnalysisOfflineService {
    private static final Logger logger = LoggerFactory.getLogger(AnalysisOfflineService.class);
    private final AnalysisOfflineDAO dao;

    @Autowired
    public AnalysisOfflineService(AnalysisOfflineDAO dao) {
        this.dao = dao;
    }

    public JSONObject getSummary() {
        logger.debug("AnalysisOfflineService.getSummary() ======");
        System.out.println("AnalysisOfflineService.getSummary () ======");
        JSONObject result = dao.getSummary();
        JSONArray data = result.getJSONArray("data");
        if (data.size() > 0) {
            result.put("statuscode", "200");
            result.put("errmsg", "");
            result.put("data", data);
        } else {
            result.put("statuscode", "204");
            result.put("errmsg", "");
            result.put("data", new JSONArray());
        }
        return result;
    }

    public JSONObject getLatest() {
        logger.debug("AnalysisOfflineService.getLatest() ======");
        System.out.println("AnalysisOfflineService.getLatest() ======");
        JSONObject result = dao.getLatestData();
        JSONArray data = result.getJSONArray("data");
        if (data.size() > 0) {
            result.put("statuscode", "200");
            result.put("errmsg", "");
            result.put("data", data);
        } else {
            result.put("statuscode", "204");
            result.put("errmsg", "");
            result.put("data", new JSONArray());
        }
        return result;
    }
}
