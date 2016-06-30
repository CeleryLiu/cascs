package com.springapp.mvc.web.listener;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.springapp.mvc.web.config.Constant;
import com.springapp.mvc.web.util.RestClient;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

/**
 * Created by lyp on 2016-01-22.
 * 系统启动时，运行此程序，从服务器获取国家、省份（中国）的地理数据，保存为静态数据，常驻内存
 */
@Component
public class FeatureSetsFillerOnStartup implements ApplicationListener<ContextRefreshedEvent> {
    private static JSONObject countryFeatureSet;
    private static JSONObject provinceFeatureSet;
    private static JSONObject cityFeatureSet;

    @Override
    public void onApplicationEvent(ContextRefreshedEvent event) {
        countryFeatureSet = getCountryFeatureSet();
        provinceFeatureSet = getProvinceFeatureSet();
        cityFeatureSet = getCityFeatureSet();
    }

    public static JSONObject getCountryFeatureSet() {
        if (countryFeatureSet == null) {
            countryFeatureSet = getAndFormatCountryFeatureSet(Constant.countryFeatureSetURL);
        }
        return countryFeatureSet;
    }

    public static JSONObject getProvinceFeatureSet() {
        if (provinceFeatureSet == null) {
            provinceFeatureSet = getAndFormatProvinceFeatureSet(Constant.provinceFeatureSetURL, Constant.provinceNameMappingArc_ES);
        }
        return provinceFeatureSet;
    }

    public static JSONObject getCityFeatureSet() {
        return new JSONObject();
    }

    // 将features对象数组以其中的一个属性为key转化为map数组，更方便前端使用
    public static JSONObject getAndFormatCountryFeatureSet(String url) {
        RestClient rc = new RestClient();
        JSONObject jsonObj = JSONObject.parseObject(rc.get(url));
        JSONArray features = jsonObj.getJSONArray("features");
        Map<String, JSONObject> map = new HashMap<String, JSONObject>();
        if (features != null) {
            Iterator<Object> it = features.iterator();
            while (it.hasNext()) {
                JSONObject feature = (JSONObject) JSON.toJSON(it.next());
                if (feature.getJSONObject("attributes").containsKey("NAME")) {
                    map.put(feature.getJSONObject("attributes").getString("NAME"), feature);
                } else if (feature.getJSONObject("attributes").containsKey("Name_CHN")) {
                    map.put(feature.getJSONObject("attributes").getString("Name_CHN"), feature);
                }
            }
        }
        jsonObj.put("features", map);
        return jsonObj;
    }

    public static JSONObject getAndFormatProvinceFeatureSet(String url, String mapping) {
        RestClient rc = new RestClient();
        JSONObject jsonObj = JSONObject.parseObject(rc.get(url));
        JSONArray features = jsonObj.getJSONArray("features");
        JSONObject nameMapping = JSONObject.parseObject(mapping);
        Map<String, JSONObject> map = new HashMap<String, JSONObject>();
        if (features != null) {
            Iterator<Object> it = features.iterator();
            while (it.hasNext()) {
                JSONObject feature = (JSONObject) JSON.toJSON(it.next());
                if (feature.getJSONObject("attributes").containsKey("Name_CHN")) {
                    String name = feature.getJSONObject("attributes").getString("Name_CHN");
                    map.put(nameMapping.getString(name), feature);
                }
            }
        }
        jsonObj.put("features", map);
        return jsonObj;
    }

/*    public static void main(String[] args) {
       *//* List<String> names = new ArrayList<String>();
        names.add("北京郊县");
        names.add("上海郊县");
        System.out.println(getProvinceFeatureSet().getJSONObject("features").keySet());*//*
        System.out.println(ClassLoader.getSystemResource(""));
    }*/
}
