package com.dispatch.dump.dailyReportModule.controller;

import com.dispatch.dump.commonModule.db.dto.DailyReportStep6;
import com.dispatch.dump.commonModule.db.dto.DailyReportStep6OptionForm;
import com.dispatch.dump.dailyReportModule.service.DailyReportService;
import com.dispatch.dump.dailyReportModule.service.Step6Service;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

@Controller
@RequestMapping("/dailyReport")
@RequiredArgsConstructor
public class Step6Controller {

    private final Step6Service step6Service;

    @RequestMapping(value = "/carcarelist", method = RequestMethod.GET)
    public String step6() {
        return "/dailyReport/step6/carcarelist";
    }

    @RequestMapping(value = "/ajax/carcarelist", method = RequestMethod.POST)
    @ResponseBody
    public List<DailyReportStep6> searchDailyReport(DailyReportStep6OptionForm optionForm) {
        return step6Service.getCarListByOption(optionForm);
    }
}