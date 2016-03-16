package com.springapp.mvc.web.dao;
/*
 * Created by lyp on 2016-03-16.
 * @author lyp
 * @date 2016-03-16
 * @Description: 离线统计分析数据访问层
 * @Version: V1.0
 */

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.springapp.mvc.web.config.Constant;
import com.springapp.mvc.web.util.DateUtil;
import com.springapp.mvc.web.util.RestClient;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Repository;

@Repository
public class AnalysisOfflineDAO {
    private static final Logger logger = LoggerFactory.getLogger(AnalysisOfflineDAO.class);
    RestClient rc = new RestClient();

    /*
     * @function name:
     * @param: {n:"月数，获取当前时间起之前n个月的数据"}
     * @return: 原始数据的基础上，将data改为如下格式
     * {
     *  dataGlobal:{
     *      Jan15: [{name:"1号",value:10},{},......],
     *      Jan15Max:maxValue(int),
     *      Feb15:...
     *  },
     *  dataGlobalStack1:{同dataGlobal},
     *  dataGlobalStack2:{同dataGlobal},
     *  ...
     *  dataChina:{同dataGlobal},
     *  dataChinaStack1:{同dataGlobal},
     *  ...
     * }
     * @description: 获取从当前时间起前n个月的数据（包括global和china的），并将其格式化为前端需要的格式
     * @author: lyp
     * @date: 2016-03-16
     */
    public JSONObject getNMonthSummaryAll(int n) {
        long endTime = System.currentTimeMillis();
        long startTime = DateUtil.getFirstDayOfPreviousNMonth(n);
        String globalUri = Constant.SE_OFFLINE_ANALYSIS_SUMMARY_URL + "?scale=Global&startTime=" + startTime + "&endTime=" + endTime;
        String chinaUri = Constant.SE_OFFLINE_ANALYSIS_SUMMARY_URL + "?scale=china&startTime=" + startTime + "&endTime=" + endTime;
        // global
        JSONObject global = rc.getJSONObject(globalUri);
        JSONObject dataGlobal = new JSONObject();
        if (global.getJSONArray("data").size() > 0) {
            dataGlobal = convert(global.getJSONArray("data"));
        }
        // china
        JSONObject china = rc.getJSONObject(chinaUri);
        JSONObject dataChina = new JSONObject();
        if (china.getJSONArray("data").size() > 0) {
            dataChina = convert(china.getJSONArray("data"));
        }

        //dataMap=global和china的拼接
        for (String key : dataChina.keySet()) {
            System.out.println(key);
            System.out.println(dataChina.get(key));
        }
        return dataGlobal;
    }

    private JSONObject convert(JSONArray data) {
        return null;
    }

    public static void main(String[] args) {
        AnalysisOfflineDAO dao = new AnalysisOfflineDAO();
        System.out.println(dao.getNMonthSummaryAll(6));
    }
}
