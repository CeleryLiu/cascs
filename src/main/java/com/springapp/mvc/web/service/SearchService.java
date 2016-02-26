package com.springapp.mvc.web.service;/*
 * Created by lyp on 2016/2/26.
 * Author: lyp
 * Date: 2016/2/26
 * Description:搜索列表查询业务逻辑层
 * Version: V1.0 
 */

import com.springapp.mvc.web.config.Constant;
import com.springapp.mvc.web.dao.NewDeviceDAO;
import com.springapp.mvc.web.model.SearchCriteria;
import net.sf.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class SearchService {
    private static final Logger logger = LoggerFactory.getLogger(SearchService.class);
    private static final String uri4List = Constant.SE_LIST_SEARCH_URL;
    private final NewDeviceDAO dao;

    @Autowired
    public SearchService(NewDeviceDAO dao) {
        this.dao = dao;
    }

    public String getRequest4CommonSearch(SearchCriteria search) {
        logger.debug("Inside ListSearchService.getRequest4CommonSearch() ======");
        System.out.println("Inside ListSearchService.getRequest4CommonSearch() ======");
        JSONObject result;
        if (isValidSearchCriteria(search)) {
            Map<String, Object> criteria = new HashMap<String, Object>();
            criteria.put("wd", search.getWd());
            criteria.put("page", search.getPage());
            result = dao.getResult4DeviceSearch(uri4List, criteria);
            if ("200".equals(result.getString("statuscode")) && result.getJSONArray("data").size() <= 0) {
                result.put("statuscode", "204");
                result.put("errmsg", "No related data!");
            }
        } else {
            result = new JSONObject();
            result.put("statuscode", "400");
            result.put("errmsg", "Search criteria is empty!");
        }
        return result.toString();
    }

    public boolean isValidSearchCriteria(Object criteria) {
        boolean valid = true;
        if (criteria == null) {
            valid = false;
        } else {
            if ("".equals(criteria.toString())) {
                valid = false;
            }
        }
        return valid;
    }
}
