package com.springapp.mvc.web.controller;/*
 * Created by lyp on 2016-03-01.
 * @author lyp
 * @date 2016-03-01
 * @Description: 3d设备展示控制器
 * @Version: V1.0
 */

import com.fasterxml.jackson.annotation.JsonView;
import com.springapp.mvc.web.jsonView.Views;
import com.springapp.mvc.web.model.SearchCriteria;
import com.springapp.mvc.web.service.MarkpointService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class MarkpointController {
    private static final Logger logger = LoggerFactory.getLogger(MarkpointController.class);
    private final MarkpointService markpointService;

    @Autowired
    public MarkpointController(MarkpointService markpointService) {
        this.markpointService = markpointService;
    }

    @JsonView(Views.Public.class)
    @RequestMapping(value = "/search/markpoint/{typefilter}/{permitfilter}/{lossycompress}")
    public String markpoint(
            @PathVariable("typefilter") String typefilter,
            @PathVariable("permitfilter") String permitfilter,
            @PathVariable("lossycompress") Integer lossycompress) {
        logger.debug("MarkpointController.markpoint() starts-----------");
        permitfilter = !"all".equals(permitfilter) ? permitfilter : "";
        SearchCriteria search = new SearchCriteria();
        search.setPermitfilter(permitfilter);
        search.setTypefilter(typefilter);
        search.setLossycompress(lossycompress);
        String result = markpointService.getResponse(search);
//        System.out.println(result);
        return result;
    }

   /* public static void main(String[] args) {
        MarkpointController mc = new MarkpointController(new MarkpointService(new MarkpointDAO()));
        mc.markpointSearch("monitor", "all", 1);
    }*/
}
