package com.springapp.mvc.web.timer;

import com.springapp.mvc.web.dao.VisionDAO;
import com.springapp.mvc.web.model.CachedData;

import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

/*
 * @author lyp
 * @date 2016-03-28
 * @class name
 * @description 定时任务，每天凌晨2点从搜索平台获取所有有图片的设备数据，为"看世界"准备全部数据
 */

public class VisionTimer {
    private ScheduledExecutorService visionScheduler = Executors.newScheduledThreadPool(1);

    public void execute() {
        Runnable task = new Runnable() {
            @Override
            public void run() {
                VisionDAO visionDAO = new VisionDAO();
                CachedData.AllPictures = visionDAO.getAllPictures();
            }
        };
        if (visionScheduler.isShutdown()) {
            visionScheduler = Executors.newScheduledThreadPool(1);
            visionScheduler.scheduleAtFixedRate(task, 0, 1, TimeUnit.DAYS);
        } else {
            visionScheduler.scheduleAtFixedRate(task, 0, 1, TimeUnit.DAYS);
        }
    }

    public void stop() {
        visionScheduler.shutdown();
    }
}






























