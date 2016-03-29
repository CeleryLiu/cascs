package com.springapp.mvc.web.controller;

import com.fasterxml.jackson.annotation.JsonView;
import com.springapp.mvc.web.dao.VisionDAO;
import com.springapp.mvc.web.jsonView.Views;
import com.springapp.mvc.web.service.VisionService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/*
 * Created by lyp on 2016-03-25.
 * @author lyp
 * @date 2016-03-25
 * @Description: “看世界”控制器
 * @Version: V1.0
 */
@RestController
public class VisionController {
    private static final Logger logger = LoggerFactory.getLogger(VisionController.class);
    private final VisionService service;

    @Autowired
    public VisionController(VisionService service) {
        this.service = service;
    }

    @JsonView(Views.Public.class)
    @RequestMapping(value = "/vision/getPictures/{pictureTag}")
    public String getPictures(@PathVariable(value = "pictureTag") String pictureTag) {
        logger.debug("DeviceController.listSearch() ====== pictureTag: " + pictureTag);
//        System.out.println("DeviceController.listSearch() ====== pictureTag: " + pictureTag);
        return service.getVisionResponse(pictureTag).toJSONString();
    }

/*    public static void main(String[] args) {
        VisionController vc = new VisionController(new VisionService(new VisionDAO()));
        System.out.println(vc.getPictures("学校"));
    }*/
}
