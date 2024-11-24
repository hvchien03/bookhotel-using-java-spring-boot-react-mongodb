package com.spring.be_booktours.services;

import java.util.logging.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

@Service
public class Scheduler {

    Logger logger = Logger.getLogger(Scheduler.class.getName());

    @Autowired
    private DataService dataService;

    // Back up dữ liệu lúc 2 giờ sáng mỗi ngày
    @Scheduled(cron = "0 0 2 * * *")
    public void backupData() {
        dataService.backupData("D:\\backupmongodb");
        try {
            dataService.backupData("D:\\backupmongodb");
        } catch (Exception ex) {
            logger.info("Gặp gián đoạn trong quá trình sao lưu dữ liệu(" + ex.getMessage() + ")");
        }
    }

}
