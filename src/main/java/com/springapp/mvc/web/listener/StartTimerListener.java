package com.springapp.mvc.web.listener;

import com.springapp.mvc.web.model.CachedData;
import com.springapp.mvc.web.timer.SuggestionTimer;
import com.springapp.mvc.web.timer.VisionTimer;

import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;

/**
 * Created by lyp on 2016/1/17.
 * 定时任务监听器
 */
public class StartTimerListener implements ServletContextListener {
    SuggestionTimer suggTimer = null;
    VisionTimer visionTimer = null;

    /**
     * 创建一个初始化监听器对象，一般有容器调用
     */
    public StartTimerListener() {
        super();
    }

    /*
    * 让WEB程序运行的时候自动加载Timer
    */
    @Override
    public void contextInitialized(ServletContextEvent servletContextEvent) {
//        System.out.println("--------------------------timer.init-----------------------");
        suggTimer = new SuggestionTimer();
        suggTimer.execute();

        visionTimer = new VisionTimer();
        visionTimer.execute();
    }

    /*
    * 该方法由容器调用，空实现
    */
    @Override
    public void contextDestroyed(ServletContextEvent servletContextEvent) {

    }
}