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
import org.apache.commons.lang.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Repository;

import java.io.File;
import java.net.URL;
import java.util.Iterator;

@Repository
public class StatisticDAO {
    private static final Logger logger = LoggerFactory.getLogger(StatisticDAO.class);
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
        String globalUri = Constant.SE_GET_SUMMARY_STATISTIC_URL + "?scale=Global&startTime=" + startTime + "&endTime=" + endTime;
        String chinaUri = Constant.SE_GET_SUMMARY_STATISTIC_URL + "?scale=china&startTime=" + startTime + "&endTime=" + endTime;
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
        String url = Constant.SE_GET_LATEST_STATISTIC_URL + "/" + size;
        return rc.getJSONObject(url);
    }

    public JSONObject getSummary(String scale, int size) {
        String url = Constant.SE_GET_SUMMARY_STATISTIC_URL + "?scale=" + scale + "&size=" + size;
        return rc.getJSONObject(url);
    }

    public JSONObject getLatest4FusionCharts() {
        String url = Constant.SE_GET_LATEST_STATISTIC_URL + "/1";
        JSONObject resp = rc.getJSONObject(url);
        JSONObject data = new JSONObject();
        JSONObject agg = resp.getJSONArray("data").getJSONObject(0).getJSONObject("aggregations");
        Iterator<String> it = agg.keySet().iterator();
        while (it.hasNext()) {
            String key = it.next();
            JSONObject value = new JSONObject();
            String bucketsStr = agg.getJSONObject(key).getString("buckets");
            JSONArray buckets;
            if (StringUtils.equals("country", key)) {
                int max = 0;
                buckets = JSONArray.parseArray(bucketsStr.replace("key", "displayValue").replace("doc_count", "value"));
                JSONObject mapping = JSONObject.parseObject(Constant.Country_FusionId_Mapping);
                for (int i = 0; i < buckets.size(); i++) {
                    JSONObject country = buckets.getJSONObject(i);
                    String id = mapping.getString(country.getString("displayValue"));
                    if (StringUtils.isNotBlank(id)) {
                        buckets.getJSONObject(i).put("id", id);
                        buckets.getJSONObject(i).put("showLabel", "1");
                    }
                    if (country.getIntValue("value") > max) {
                        max = country.getIntValue("value");
                    }
                }
                value.put("max", max);
            } else {
                buckets = JSONArray.parseArray(bucketsStr.replace("key", "label").replace("doc_count", "value"));
            }
            value.put("data", buckets);
            data.put(key, value);
        }
        resp.put("data", data);
        return resp;
    }


/*    public static void main(String[] args) {
        StatisticDAO dao = new StatisticDAO();
//        System.out.println(dao.getSummary("Global", 10));
//        System.out.println(dao.getNMonthSummaryAll(3));
//        JSONObject test = new JSONObject();
//        test.put("test", "1");
//        System.out.println(test.containsKey("test"));
//        System.out.println(test.containsKey("abc"));
//        System.out.println(dao.getLatest4FusionCharts());
    }*/
}
