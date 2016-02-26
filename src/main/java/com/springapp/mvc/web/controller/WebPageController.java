package com.springapp.mvc.web.controller;

import com.springapp.mvc.web.service.DeviceService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

/**
 * Created by lyp on 2016/2/25.
 * Web页面控制器
 */
@Controller
public class WebPageController {
    private final Logger logger = LoggerFactory.getLogger(WebPageController.class);
    private final DeviceService deviceService;

    @Autowired
    public WebPageController(DeviceService deviceService) {
        this.deviceService = deviceService;
    }

    @RequestMapping(value = "/device-globe", method = RequestMethod.GET)
    public String device3d() {
        logger.debug("device3d() starts----------------------");
        return "device-globe";
    }


    @RequestMapping(value = "/device-list", method = RequestMethod.GET)
    public String deviceList() {
        logger.debug("deviceList() starts----------------------");
        return "device-list";
    }

    @RequestMapping(value = "/device-probe-globe", method = RequestMethod.GET)
    public String deviceProbe() {
        logger.debug("deviceProbe() starts----------------------");
        return "device-probe-globe";
    }


    @RequestMapping(value = "/device-map/{wd}", method = RequestMethod.GET)
    public ModelAndView deviceMap(@PathVariable("wd") String wd) {
        logger.debug("deviceMap(param) starts----------------------");
        ModelAndView mav = new ModelAndView("device-map");
        mav.addObject("wd", wd);
        return mav;
    }

    @RequestMapping(value = "/device-map", method = RequestMethod.GET)
    public String deviceMap() {
        logger.debug("deviceMap() starts----------------------");
        return "device-map";
    }

    @RequestMapping(value = "/device-map-leaflet/{wd}", method = RequestMethod.GET)
    public ModelAndView deviceMapLeaflet(@PathVariable("wd") String wd) {
        logger.debug("deviceMap(param) starts----------------------");
        ModelAndView mav = new ModelAndView("device-map-leaflet");
        mav.addObject("wd", wd);
        return mav;
    }

    @RequestMapping(value = "/device-map-leaflet", method = RequestMethod.GET)
    public String deviceMapLeaflet() {
        logger.debug("deviceMap() starts----------------------");
        return "device-map-leaflet";
    }

    //错误处理页面
    String errorPage = "error/error";

    @RequestMapping(value = "/error", method = RequestMethod.GET)
    public String error() {
        logger.debug("error() starts----------------------");
        return errorPage;
    }

    @RequestMapping(value = "/index2", method = RequestMethod.GET)
    public String index2() {
        logger.debug("index2() starts----------------------");
        return "index2";
    }

    @RequestMapping(value = "/new-index", method = RequestMethod.GET)
    public String newIndex() {
        logger.debug("newIndex() starts----------------------");
        return "new-index";
    }


    @RequestMapping(value = "/user/forgetPwd", method = RequestMethod.GET)   //忘记密码
    public String forgetPwd() {
        logger.debug("forgetPwd() starts----------------------");
        return "user/forgetPwd";
    }

    @RequestMapping(value = "/", method = RequestMethod.GET)
    public String index() {
        logger.debug("Inside index()----------------------");
        System.out.println("Inside index()----------------");
        return "index";
    }

    @RequestMapping(value = "/user/register", method = RequestMethod.GET)
    public String register() {
        logger.debug("Inside register()----------------------");
        System.out.println("Inside register()----------------");
        return "user/register";
    }

    @RequestMapping(value = "/user/login", method = RequestMethod.GET)
    public String login() {
        logger.debug("Inside login()----------------------");
        System.out.println("Inside login()----------------");
        return "user/login";
    }

    @RequestMapping(value = "/user/pwdRetrieve", method = RequestMethod.GET)
    public String pwdRetrieve() {
        logger.debug("Inside pwdRetrieve()----------------------");
        System.out.println("Inside pwdRetrieve()----------------");
        return "user/pwdRetrieve";
    }

    @RequestMapping(value = "/user/agreement", method = RequestMethod.GET)
    public String agreement() {
        logger.debug("Inside agreement()----------------------");
        System.out.println("Inside agreement()--------X--------");
        return "user/agreement";
    }

    @RequestMapping(value = "/map", method = RequestMethod.GET)
    public String map() {
        logger.debug("Inside map()----------------------");
        System.out.println("Inside map()----------------");
        return "map";
    }

    @RequestMapping(value = "/list", method = RequestMethod.GET)
    public String listt() {
        logger.debug("Inside list()----------------------");
        System.out.println("Inside list()----------------");
        return "list";
    }

    @RequestMapping(value = "/markpoint", method = RequestMethod.GET)
    public String markpoint() {
        logger.debug("Inside markpoint()----------------------");
        System.out.println("Inside markpoint()----------------");
        return "markpoint";
    }

    @RequestMapping(value = "/markline", method = RequestMethod.GET)
    public String markline() {
        logger.debug("Inside markline()----------------------");
        System.out.println("Inside markline()----------------");
        return "agreemarklinement";
    }
}
