package com.dispatch.dump.commonModule.db.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class DailyReportStep4OptionForm {
    private String carNo;     // 차량번호
    private String fromDate;  // 시작날짜
    private String toDate;    // 끝날짜
    private String club;      // 제출처
    private String fromSite;  // 상차지
    private String toSite;    // 하차지
    private String item;      // 품목
    private String tel;       // 전화번호
    private Boolean state;    // 결재여부
}