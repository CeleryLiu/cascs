package com.springapp.mvc.web.model;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.springapp.mvc.web.config.Constant;
import com.springapp.mvc.web.util.RestClient;
import org.apache.commons.lang.StringUtils;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Set;

/**
 * Created by lyp on 2016/1/17.
 * 从搜索服务器获取提示信息
 */
public class Suggestion {
    public static List<String> suggestions = new ArrayList<String>();
    public static List<String> recommend = new ArrayList<String>();

    public Suggestion() {
        //可以用来初始化映射表
    }

    public static List<String> getSuggestions() {
        if (suggestions == null || suggestions.size() <= 0) {
            setSuggestionAndRecommend();
        }
        return suggestions;
    }

    public static List<String> getRecommend() {
        if (recommend == null || recommend.size() <= 0) {
            setSuggestionAndRecommend();
        }
        return recommend;
    }

    public static void setSuggestionAndRecommend() {
        RestClient rc = new RestClient();
        String respStr = rc.get(Constant.SE_GET_SUGGESTION_URL);
        JSONObject resp = JSONObject.parseObject(respStr);
        if ("200".equals(resp.getString("statuscode")) && resp.getJSONObject("data") != null) {
            JSONObject data = resp.getJSONObject("data");
            System.out.println(data);
            Set<String> keys = data.keySet();
            for (String key : keys) {
                JSONArray arrItem = data.getJSONArray(key);
                for (int i = 0; i < arrItem.size(); i++) {
                    if (StringUtils.equals(key, "description.port_info.device_model")
                            || StringUtils.equals(key, "description.device_location.province")
                            || StringUtils.equals(key, "description.vul_info.vul_name")
                            || StringUtils.equals(key, "description.port_info.device_brand")
                            || StringUtils.isBlank(arrItem.getString(i))) {
                        continue;
                    }
                    String item = getPrefix(key) + ":" + arrItem.getString(i);
                    suggestions.add(item);
                    if (i < 10) {
                        recommend.add(item);
                    }
                }
            }
        }
    }

    private static String getPrefix(String key) {
        String prefix = key.substring(key.lastIndexOf(".") + 1);
        JSONObject mapping = JSON.parseObject(Constant.keyPrefixMapping);
        Iterator<String> it = mapping.keySet().iterator();
        while (it.hasNext()) {
            String k = it.next();
            if (StringUtils.equals(k, prefix)) {
                prefix = mapping.getString(k);
                break;
            }
        }
        return prefix;
    }

    public static void main(String[] args) {
        setSuggestionAndRecommend();
        /*for (int i = 0; i < suggestions.size(); i++) {
            System.out.println(suggestions.get(i));
        }
        for (int i = 0; i < recommend.size(); i++) {
            System.out.println(recommend.get(i));
        }*/
//        System.out.println(JSONObject.toJSON(suggestions));
    }
}
