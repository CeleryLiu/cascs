package com.springapp.mvc.web.service;

import com.springapp.mvc.web.config.Constant;
import com.springapp.mvc.web.dao.MarklineDAO;
import com.springapp.mvc.web.model.MarkLine;
import com.springapp.mvc.web.model.MarkLineResponseBody;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * Created by lyp on 2015/12/10.
 * 业务逻辑层
 */
@Service
public class MarklineService {
    private static final Logger logger = LoggerFactory.getLogger(MarklineService.class);
    private static final String uri4Line = Constant.LG_MARKLINE_SEARCH_URL;
    private final MarklineDAO marklineDAO;

    @Autowired
    public MarklineService(MarklineDAO marklineDAO) {
        this.marklineDAO = marklineDAO;
    }

    public MarkLineResponseBody getResponse(String pageId) {
        MarkLineResponseBody result = new MarkLineResponseBody();
        MarkLine marklines = marklineDAO.getMarklines(uri4Line, pageId);
        if (!"".equals(pageId)) {
            if (marklines != null && marklines.getLines().size() > 0) {
                result.setStatuscode("200");
                result.setErrmsg("");
                result.setData(marklines);
            } else {
                result.setStatuscode("204");
                result.setErrmsg("No related data!");
            }
        } else {
            result.setStatuscode("400");
            result.setErrmsg("PageId is empty!");
        }
        return result;
    }

   /* public static void main(String[] args) {
        MarklineService mls = new MarklineService(new MarklineDAO());
        System.out.println(mls.getResponse("1"));
    }*/
}
