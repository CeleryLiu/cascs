package com.springapp.mvc.web.dao;/*
 * Created by lyp on 2016-03-14.
 * @author lyp
 * @date 2016-03-14
 * @Description: 离线分析数据访问层
 * @Version: V1.0
 */

import com.alibaba.fastjson.JSONObject;
import com.springapp.mvc.web.config.Constant;
import com.springapp.mvc.web.util.RestClient;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Repository;

@Repository
public class AnalysisOfflineDAO {
    private static final Logger logger = LoggerFactory.getLogger(AnalysisOfflineDAO.class);
    private RestClient rc = new RestClient();

    public JSONObject getSummary() {
        logger.debug("AnalysisOfflineDAO.getSummary() ======");
        System.out.println("AnalysisOfflineDAO.getSummary() ======");
        JSONObject result = rc.getJSONObject(Constant.SE_OFFLINE_ANALYSIS_SUMMARY_URL);
        return result;
    }

    public JSONObject getLatestData() {
        logger.debug("AnalysisOfflineDAO.getSummary() ======");
        System.out.println("AnalysisOfflineDAO.getSummary() ======");
        JSONObject result = rc.getJSONObject(Constant.SE_OFFLINE_ANALYSIS_SUMMARY_URL);
        return result;
    }

}
