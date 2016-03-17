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

import java.util.Iterator;

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
     *      2015-01: [{name:"1号",value:10},{},......],
     *      2015-02: [], ...
     *  },
     *  dataChina:{同dataGlobal}
     * }
     * @description: 获取从当前时间起前n个月的数据（包括global和china的），并将其格式化为前端需要的格式
     * @author: lyp
     * @date: 2016-03-16
     */
    public JSONObject getNMonthSummaryAll(int n) {
        long startTime = DateUtil.getFirstDayOfPreviousNMonth(n);   //获取当前月之前n个月的第一天的时间戳（n包括当前月）
        long endTime = System.currentTimeMillis();                  //获取当前时间
        String globalUri = Constant.SE_OFFLINE_ANALYSIS_SUMMARY_URL + "?scale=Global&startTime=" + startTime + "&endTime=" + endTime;
        String chinaUri = Constant.SE_OFFLINE_ANALYSIS_SUMMARY_URL + "?scale=china&startTime=" + startTime + "&endTime=" + endTime;
        JSONObject data = new JSONObject();
        JSONObject dataMap = new JSONObject();
        JSONArray dataTimeline = new JSONArray();

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

        //拼接global和china，获得dataMap
        dataMap.put("data0Global", dataGlobal);
        dataMap.put("data0China", dataChina);

        //生成dataTimeline
        Iterator<String> it = dataGlobal.keySet().iterator();
        int idx = 0;
        while (it.hasNext()) {
            dataTimeline.set(idx, it.next());
            idx++;
        }

        data.put("dataMap", dataMap);
        data.put("dataTimeline", dataTimeline);
        return data;
    }

    //同一天有多次扫描的取两次相加
    private JSONObject convert(JSONArray data) {
        JSONObject result = new JSONObject();
        for (int i = 0; i < data.size(); i++) {
            JSONObject jsonDate = DateUtil.getJsonDate(data.getJSONObject(i).getLong("endtime"));
            String date = jsonDate.getString("date").substring(0, 7);
            JSONObject arrItem = new JSONObject();
            int day = jsonDate.getIntValue("day"),
                    count = data.getJSONObject(i).getIntValue("count");
            arrItem.put("name", day + "号");

            if (result.containsKey(date)) {
                JSONArray tmpArr = result.getJSONArray(date);
                JSONObject oldItem = tmpArr.getJSONObject(day - 1);
                if (oldItem != null) {
                    arrItem.put("value", oldItem.getIntValue("count") + count);
                }
                result.put(date, result.getJSONArray(date));
            } else {
                JSONArray arr = new JSONArray();
                for (int j = 0; j < day - 1; j++) {
                    JSONObject nullItem = new JSONObject();
                    nullItem.put("name", (j + 1) + "号");
                    nullItem.put("value", 0);
                    arr.set(j, nullItem);
                }
                arrItem.put("value", count);
                arr.set(day - 1, arrItem);
                result.put(date, arr);
            }
        }
        return result;
    }

    public JSONObject getLatest(String size) {
        String url = Constant.SE_OFFLINE_ANALYSIS_LATEST_URL + "/" + size;
        return rc.getJSONObject(url);
    }

    public JSONObject getSummary(String scale, int size) {
        String url = Constant.SE_OFFLINE_ANALYSIS_SUMMARY_URL + "?scale=" + scale + "&size=" + size;
        return rc.getJSONObject(url);
    }

/*    public static void main(String[] args) {
        AnalysisOfflineDAO dao = new AnalysisOfflineDAO();
//        System.out.println(dao.getSummary("Global", 10));
        System.out.println(dao.getNMonthSummaryAll(3));
//        JSONObject test = new JSONObject();
//        test.put("test", "1");
//        System.out.println(test.containsKey("test"));
//        System.out.println(test.containsKey("abc"));
    }*/
}
