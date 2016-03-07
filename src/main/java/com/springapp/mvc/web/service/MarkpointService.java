package com.springapp.mvc.web.service;

import com.alibaba.fastjson.JSONObject;
import com.springapp.mvc.web.config.Constant;
import com.springapp.mvc.web.dao.MarkpointDAO;
import com.springapp.mvc.web.model.SearchCriteria;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

/**
 * Created by lyp on 2015/12/10.
 * 业务逻辑层
 */
@Service
public class MarkpointService {
    private static final Logger logger = LoggerFactory.getLogger(MarkpointService.class);
    private static final String uri4Markpoint = Constant.SE_MARKPOINT_SEARCH_URL;
    private final MarkpointDAO markpointDAO;

    @Autowired
    public MarkpointService(MarkpointDAO markpointDAO) {
        this.markpointDAO = markpointDAO;
    }

    private boolean isValidSearchCriteriaOld(SearchCriteria search) {
        boolean valid = true;
        if (search == null) {
            valid = false;
        }
        if (StringUtils.isEmpty(search.getWd()) && StringUtils.isEmpty(search.getTypefilter())) {
            valid = false;
        }
        return valid;
    }

    //返回用户查询的数据，用于前端3d地球显示设备信息（业务逻辑层）
    public String getResponse(SearchCriteria search) {
        logger.debug("MarkpointService.getResponse()starts ================");
//        System.out.println("MarkpointService.getResponse()starts-------");
        JSONObject result;
        if (isValidSearchCriteriaOld(search)) {
            result = markpointDAO.getDevices(uri4Markpoint, JSONObject.toJSON(search).toString());
            if (result.getJSONObject("data").isEmpty()) {
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
}
