package com.springapp.mvc.web.service;/*
 * Created by lyp on 2016-03-14.
 * @author lyp
 * @date 2016-03-14
 * @Description: 离线统计分析业务层
 * @Version: V1.0
 */

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.springapp.mvc.web.config.Constant;
import com.springapp.mvc.web.util.RestClient;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

@Service
public class AnalysisOfflineService {
    private static final Logger logger = LoggerFactory.getLogger(AnalysisOfflineService.class);
    private RestClient rc = new RestClient();

    public JSONObject getSummary(String scale, String size) {
        logger.debug("AnalysisOfflineService.getSummary() ======");
//        System.out.println("AnalysisOfflineService.getSummary () ======");
        String url = Constant.SE_OFFLINE_ANALYSIS_SUMMARY_URL + "?scale=" + scale + "&size=" + size;
        JSONObject result = rc.getJSONObject(url);
        if (result.getJSONArray("data").size() == 0) {
            result.put("statuscode", "204");
            result.put("errmsg", "");
            result.put("data", new JSONArray());
        }
        return result;
    }

    public JSONObject getLatest(String size) {
        logger.debug("AnalysisOfflineService.getLatest() ======");
//        System.out.println("AnalysisOfflineService.getLatest() ======");
        String url = Constant.SE_OFFLINE_ANALYSIS_LATEST_URL + "/" + size;
        JSONObject result = rc.getJSONObject(url);
        if (result.getJSONArray("data").size() == 0) {
            result.put("statuscode", "204");
            result.put("errmsg", "");
            result.put("data", new JSONArray());
        }
        return result;
    }
}
