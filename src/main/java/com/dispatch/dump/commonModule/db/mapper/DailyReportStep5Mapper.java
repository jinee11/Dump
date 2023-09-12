package com.dispatch.dump.commonModule.db.mapper;

import com.dispatch.dump.commonModule.db.dto.DailyReport;
import com.dispatch.dump.commonModule.db.dto.DailyReportStep5;

import java.util.List;

public interface DailyReportStep5Mapper {

    /* FUNCTION ::  등록 */
    int insertDailyReportStep5(DailyReportStep5 dailyReportMain);


    /* FUNCTION :: 일보 수정 *//*
    int updateDailyReportStep5(DailyReport dailyReport);

    *//* FUNCTION :: 일보 상세보기 *//*
    DailyReport findDailyReportBySheetID(DailyReport dailyReport);

    /* FUNCTION :: 일보 리스트 조회(전체조건) */
    List<DailyReport> findDailyReportList(DailyReport dailyReport);

    //* FUNCTION :: 일보 리스트 조회 (제출처별) *//
/*    List<DailyReport> findDailyReportListByCarSubmit(DailyReport dailyReport);

    int deleteDailyReport(DailyReport dailyReport);*/
}
