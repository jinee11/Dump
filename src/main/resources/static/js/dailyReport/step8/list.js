// var receiptsResultDiv = $("#receiptsSearchResult");
// //const tableBody = document.querySelector("table tbody");
// var receiptsResults;


var month_text = [
    "1월",
    "2월",
    "3월",
    "4월",
    "5월",
    "6월",
    "7월",
    "8월",
    "9월",
    "10월",
    "11월",
    "12월"
];
var day_text = [
    "일",
    "월",
    "화",
    "수",
    "목",
    "금",
    "토"
];


$(document).ready(function () {
    var agent = navigator.userAgent.toLowerCase(); // 인터넷 익스플로러 체크 후 예외 처리
    if ((navigator.appName == 'Netscape' && agent.indexOf('trident') != -1) || (agent.indexOf("msie") != -1) || (agent.indexOf("edge") != -1)) {
        $(".input-group-clear").attr("class", "dis-n");

        $('.input-group > .input-group-clear').each(function (i, e) {
            $(this).hide();
        });
    } else {
        $('.input-group > .input-group-clear').on("click", function () {
            var clear_id = $(this).attr("id").split("_clear");

            $("#" + clear_id[0]).val('').focus();
            $(this).hide();
        })

        $('.input-group > input').on("propertychange change keyup paste", function () {
            $('#' + $(this).attr("id") + "_clear").toggle(Boolean($(this).val()))
        })

        $('.input-group > .input-group-clear').each(function (i, e) {
            $(this).toggle(Boolean($(this).closest("div").find("input").val()))
        });
    }


    $.ajax({
        type: 'post',
        url: "/integrateDispatch/autocomplete",
        async: false,
        beforeSend: function (xmlHttpRequest) {
            xmlHttpRequest.setRequestHeader("AJAX", "Use");
        },
        success: function (data) {
            var json = $.parseJSON(data);

            if (json.httpCode == 200) {
                $(".carNoAutocomplete").autocomplete({
                    source: json.autoCarNo,
                    //조회를 위한 최소글자수
                    minLength: 1,
                    focus: function (event, ui) {
                        return false;
                    }
                });


                $(".fromsiteAutocomplete").autocomplete({
                    source: json.autoFromsite,
                    //조회를 위한 최소글자수
                    minLength: 1,
                    focus: function (event, ui) {
                        return false;
                    }
                });

                $(".tositeAutocomplete").autocomplete({
                    source: json.autoTosite,
                    //조회를 위한 최소글자수
                    minLength: 1,
                    focus: function (event, ui) {
                        return false;
                    }
                });

                $(".itemAutocomplete").autocomplete({
                    source: json.autoItem,
                    //조회를 위한 최소글자수
                    minLength: 1,
                    focus: function (event, ui) {
                        return false;
                    }
                });

                $(".CarNoAutocomplete").autocomplete({
                    source: json.autoDataCarNo,
                    //조회를 위한 최소글자수
                    minLength: 1,
                    focus: function (event, ui) {
                        return false;
                    }
                });

                $(".clubAutocomplete").autocomplete({
                    source: json.autoClub,
                    //조회를 위한 최소글자수
                    minLength: 1,
                    focus: function (event, ui) {
                        return false;
                    }
                });

                $(".sscodeAutocomplete").autocomplete({
                    source: json.autoSScode,
                    //조회를 위한 최소글자수
                    minLength: 1,
                    focus: function (event, ui) {
                        return false;
                    }
                });
            }
        },
        error: function (e) {
            if (e.status == 408) {
                alert("Login keep timed out. \nPlease log in again.");
                location.href = "/";
            }
        }
    });
});


$.selectBoxChange = function (data, moveid) {
    $('input[name=' + moveid + ']').val(data);
    $('#' + moveid + '_clear').show();


}

$.valuePg = function (pageNo) {
    $("[name=pageNo]").val(pageNo);
    var frm = document.pagefrm;
    frm.action = "/dailyReport/receipts";
    frm.submit();
}

// $.search = function () {
//     var frm = document.searchfrm;
//     frm.action = "/integrateDispatch/list";
//     frm.submit();
// }

$.search = function () {
    $.ajax({
        url: "/dailyReport/receipts",
        type: "POST",
        data: $("[name=searchfrm]").serialize(),
        success: function (data) {
            var receiptsJson = $.parseJSON(data);
            console.log("json은")
            console.log(receiptsJson)
            console.log(receiptsJson.receiptsSearchList)

            if (receiptsJson.httpCode == 200) {
                alert("조회가 완료되었습니다.");
                receiptsSearchResults(receiptsJson.receiptsSearchList);
            } else {
                alert("요청을 처리하는 도중 에러가 발생하였습니다. 관리자에게 문의 부탁드립니다.");
            }
        }
    })
}

function receiptsSearchResults(receiptsSearchResults) {
    var receiptsBodyOrderByDate = document.getElementById("receiptsResultBodyOrderByDate");
    var receiptsBodyOrderByCarNo = document.getElementById("receiptsResultBodyOrderByCarNo");
    var selectedRadio = document.querySelector('input[name="searchType"]:checked').value;
    var receiptsResults = receiptsSearchResults;
    var resultHtml = '';

    console.log(selectedRadio)

    if (selectedRadio === "orderByDate") {
        receiptsBodyOrderByDate.innerHTML = "";
        var totalQty = 0;

        document.getElementById("tableOrderByDate").style.display = "table";
        document.getElementById("tableOrderByCarNo").style.display = "none";

        // 결과 데이터를 동적으로 추가
        for (var i = 0; i < receiptsResults.length; i++) {
            var result = receiptsResults[i];
            var No = i + 1;


            console.log("result?")
            console.log(result)
            console.log(result.fromsite)

            console.log(result.carNo)
            console.log(result.qty)

            // 각 결과의 qty 값을 int로 파싱하여 누적
            var qty = parseInt(result.qty);
            totalQty += qty;

            // 빨간 줄 추가
            if (i >= 1 && result.date !== receiptsResults[i - 1].date) {
                resultHtml += '</tr>'; // 이전 행 닫음
                resultHtml += '<tr style="border-top: 2px solid red;">'; // 새로운 행 열기
            } else if (i > 0) {
                resultHtml += '</tr>';
            }

            resultHtml +=
                '<td>' + No + '</td>' +
                '<td>' + result.date + '</td>' +
                '<td>' + result.fromsite + '</td>' +
                '<td>' + result.tosite + '</td>' +
                '<td>' + result.item + '</td>' +
                '<td>' + result.carNo + '</td>' +
                '<td>' + result.qty + '</td>' +
                '<td>' + "하차" + '</td>';


            // 마지막 행 닫음
            if (receiptsResults.length > 0) {
                resultHtml += '</tr>';
            }
            // receiptsBodyOrderByDate.append(resultHtml);
            receiptsBodyOrderByDate.innerHTML = resultHtml;
        }
    } else if (selectedRadio === "orderByCarNo") {
        document.getElementById("tableOrderByDate").style.display = "none";
        document.getElementById("tableOrderByCarNo").style.display = "table";
        receiptsBodyOrderByCarNo.innerHTML = "";
        var totalQty = 0;

        // 결과 데이터를 동적으로 추가
        for (var i = 0; i < receiptsResults.length; i++) {
            var result = receiptsResults[i];
            var No = i + 1;

            // 각 결과의 qty 값을 int로 파싱하여 누적
            var qty = parseInt(result.qty);
            totalQty += qty;


            // 빨간 줄 추가
            if (i >= 1 && result.carNo !== receiptsResults[i - 1].carNo) {
                resultHtml += '</tr>'; // 이전 행 닫음
                resultHtml += '<tr style="border-top: 2px solid red;">'; // 새로운 행 열기
            } else if (i > 0) {
                resultHtml += '</tr>';
            }

            resultHtml +=
                '<tr>' +
                '<td>' + No + '</td>' +
                '<td>' + result.carNo + '</td>' +
                '<td>' + result.fromsite + '</td>' +
                '<td>' + result.tosite + '</td>' +
                '<td>' + result.item + '</td>' +
                '<td>' + result.date + '</td>' +
                '<td>' + result.qty + '</td>' +
                '<td>' + "하차" + '</td>' +
                '</tr>';

            receiptsBodyOrderByCarNo.innerHTML = resultHtml;
        }
    }
    //  receiptsResultDiv.empty(); // 이전 결과 지우기
    // var receiptsResultDiv = document.getElementById("receiptsResultBodyOrderByDate");
    //
    // receiptsBodyOrderByDate.innerHTML = "";
    // var receiptsResults = receiptsSearchResults;

    console.log(receiptsResults)
    console.log(receiptsBodyOrderByDate)

    // // 총 대수를 계산할 변수 초기화
    // var totalQty = 0;

    // 총 검색결과 카운트
    var receiptsCnt = receiptsResults.length;
    var receiptsCntElement = document.getElementById("receiptsCnt");
    if (receiptsCntElement) {
        receiptsCntElement.innerText = receiptsCnt;
    }


    // 총 대수 엘리먼트 업데이트
    var totalQtySpan = document.getElementById("totalQty");
    if (totalQtySpan) {
        totalQtySpan.innerText = totalQty;
    }

}

// $.search = function() {
//     var searchFromsite = $("#fromsite").val();
//     var searchTosite = $("#tositeBox").val();
//     var searchItem = $("#item").val();
//     var searchCarNo = $("#CarNoBox").val();
//
//     var receiptsSearchData = {
//         fromsite : searchFromsite,
//         tosite : searchTosite,
//         item : searchItem,
//         CarNo : searchCarNo
//     };
//     $.ajax({
//         url: "/dailyReport/receipts",
//         type: "POST",
//         data: receiptsSearchData,
//         success: function (data) {
//             var json = $.parseJSON(data);
//             console.log(json)
//             if(json.httpCode == 200) {
//                 alert("조회에 성공했습니다.");
//
//                 receiptsSearchListResults(json.receiptsSearchList);
//             } else {
//                 alert("조회를 처리하는 도중 에러가 발생하였습니다. 관리자에게 문의 부탁드립니다.");
//             }
//         }
//     })
// }


$.editFormMove = function (idx) {
    localStorage.setItem("prevBackUrl", "/integrateDispatch/list");
    $("[name=sheetID]").val(idx);
    var frm = document.listfrm;
    frm.action = "/dispatchMng/form";
    frm.submit();
}

$.allChkChange = function (result) {
    var msg = (result == 1) ? '일괄결재' : '일괄취소';


    if (confirm(msg + ' 하시겠습니까?')) {
        $("input[name=allChk2Result]").val(result);
        $.ajax({
            type: 'post',
            url: "/integrateDispatch/ajax/allChkChange",
            data: $("form[name=pagefrm]").serialize(),
            async: false,
            beforeSend: function (xmlHttpRequest) {
                xmlHttpRequest.setRequestHeader("AJAX", "Use");
            },
            success: function (data) {
                var json = $.parseJSON(data);

                if (json.httpCode == 200) {
                    alert(msg + '가 완료되었습니다.');
                } else {

                    alert(msg + "중 오류가 발생하였습니다.\n관리자에게 문의해주세요.");
                }
                location.reload();
            },
            error: function (e) {
                if (e.status == 408) {
                    alert("Login keep timed out. \nPlease log in again.");
                    location.href = "/";
                }
            }
        });
    }
}

$.openIntegratePopup = function (idx, status, writeDate, club) {
    let today = new Date();
    let year = today.getFullYear();
    let month = ('0' + (today.getMonth() + 1)).slice(-2);
    let day = ('0' + today.getDate()).slice(-2);

    let today_fmt = year + '-' + month + '-' + day;


    var carLatitude;
    var carLongitude;

    if (status != '배차' && status != '상차') {
        alert("진행상태가 배차일 경우에만 상차요청이 가능합니다.");
        return false;
    }

    if (writeDate != today_fmt) {
        alert("당일 배차된 차량만 상차요청이 가능합니다.");
        return false;
    }

    $("#pop-integrateform").removeClass("dis-n");
    $.ajax({
        url: "/integrateDispatch/ajax/popupData",
        type: "POST",
        data: {"sheetID": idx},
        success: function (data) {
            $(".integrateFromArea").html(data);
        }

    });
}

$.closeIntergratePopup = function (obj) {
    if (obj) {
        $(obj).parents(".layerMask").addClass("dis-n");
    } else {
        $(".layerMask").addClass("dis-n");
    }

    // LINE :: html 리셋
    $(obj).parents(".layer-popup").find(".integrateFromArea").html("");
}

$.statusChange = function (club, grade) {
    console.log(club);
    if (confirm(club == '출고' ? (grade == 4 ? "상차요청을 하시겠습니까?" : "상차확인을 하시겠습니까?") : club == '입고' ? (grade == 4 ? "입고요청을 하시겠습니까?" : "하차확인을 하시겠습니까?") : "상차확인을 하시겠습니까?")) {

        if (navigator.geolocation) {
            console.log(navigator.geolocation);
            navigator.geolocation.getCurrentPosition(function (pos) {
                $('[name=latitude]').val(pos.coords.latitude);
                $('[name=longitude]').val(pos.coords.longitude);

                var geoCoder = new kakao.maps.services.Geocoder();
                geoCoder.coord2Address(pos.coords.longitude, pos.coords.latitude, function (result) {
                    $("[name=address]").val(result[0].address.address_name);

                    $.ajax({
                        url: "/integrateDispatch/ajax/statusChange",
                        type: "POST",
                        data: $("[name=integrateForm]").serialize(),
                        beforeSend: function (xmlHttpRequest) {
                            xmlHttpRequest.setRequestHeader("AJAX", "Use");
                        },
                        success: function (data) {
                            var json = $.parseJSON(data);

                            if (json.httpCode == 200) {
                                alert(club == '출고' ? "상차요청되었습니다." : club == '입고' ? "입고요청되었습니다." : "상차확인되었습니다.");

                                if (json.cctvCheck && club == '입고') {
                                    $.cctvCapture();
                                } else if (club == '출고') {
                                    $.statementPrintMove();
                                }
                            } else {
                                if (json.httpCode == 300) {
                                    alert("출하실 입구에서 상차요청 가능합니다");

                                } else {
                                    alert("요청을 처리하는 도중 오류가 발생하였습니다.\n관리자에게 문의해주세요.");

                                }
                            }
                        },
                        error: function (e) {
                            if (e.status == 408) {
                                alert("Login keep timed out. \nPlease log in again.");
                                location.href = "/";
                            }
                        }
                    });
                });

            }, $.geolocationerr, {timeout: 3000});
        } else {
            modal({
                title: '알림메시지',
                type: 'alert',
                text: 'GPS를 지원하지 않는 브라우져입니다 다른 브라우져를 사용해주세요',
            });
            return false;
        }


    }

}

$.geolocationerr = function (error) {
    var errormsg = {
        0: "요청을 처리하는 도중 오류가 발생하였습니다.\n관리자에게 문의해주세요.",
        1: "위치사용 권한이 허용되지 않았습니다. 권한을 허용해주세요.",
        2: "위치를 찾을 수 없습니다. 다시 시도해주세요",
        3: "응답시간 초과"
    }

    return alert(errormsg[error.code]);
}

$.cctvCapture = function () {
    window.location = window.location.pathname;
    if (confirm($(".topImage").length ? "CCTV 사진을 재촬영하시겠습니까?" : "CCTV 사진을 촬영하시겠습니까?")) {
        $.ajax({
            url: "/integrateDispatch/ajax/cctvCapture",
            type: "POST",
            data: $("[name=integrateForm]").serialize(),
            success: function (data) {
                var json = $.parseJSON(data);

                if (json.httpCode == 200) {
                    alert("촬영을 완료했습니다.");
                    if ($(".topImage").length) {
                        $(".topImage").attr("src", "/cctv/" + json.imageView + "?date=" + new Date().getTime());
                    } else {
                        $(".integrateFromArea .pop-ul").remove();
                        $(".integrateFromArea .btn-area").remove();
                        $(".integrateFromArea").append('<img class="topImage" src="/cctv/' + json.imageView + '?date= "' + new Date().getTime() + ' style="width: 300px; height: 250px; margin: 0 auto;">');
                        $(".integrateFromArea").append('<div class="btn-area">' +
                            '<button type="button" class="btn-black" onclick="$.cctvCapture();">재촬영</button> ' +
                            '<button type="button" class="btn-white" onclick="location.href=\'/integrateDispatch/list\'">확인</button> ' +

                            '</div>');
                    }

                } else {
                    console.log(json.imageView);
                    alert("요청을 처리하는 도중 오류가 발생하였습니다.\n관리자에게 문의해주세요.");
                }
            }
        })
    } else {
        location.href = "/integrateDispatch/list";
    }

}
$.quitChange = function (idx, club) {

    if (confirm("하차확인을 하시겠습니까?")) {
        if (navigator.geolocation) {
            console.log(navigator.geolocation);
            navigator.geolocation.getCurrentPosition(function (pos) {
                $('[name=latitude]').val(pos.coords.latitude);
                $('[name=longitude]').val(pos.coords.longitude);
                var geoCoder = new kakao.maps.services.Geocoder();
                geoCoder.coord2Address(pos.coords.longitude, pos.coords.latitude, function (result, status) {
                    // console.log(result);
                    $("[name=address]").val(result[0].address.address_name);
                    $.ajax({
                        url: "/integrateDispatch/ajax/quitChange",
                        type: "POST",
                        data: {
                            "sheetID": idx,
                            "longitude": pos.coords.latitude,
                            "latitude": pos.coords.latitude,
                            "address": result[0].address.address_name,
                            "club": club
                        },
                        beforeSend: function (xmlHttpRequest) {
                            xmlHttpRequest.setRequestHeader("AJAX", "Use");
                        },
                        success: function (data) {
                            var json = $.parseJSON(data);
                            if (json.httpCode == 200) {
                                alert("하차확인되었습니다.");
                                location.href = "/integrateDispatch/list";
                            } else {
                                console.log(json.httpCode);
                                alert("요청을 처리하는 도중 오류가 발생하였습니다.\n관리자에게 문의해주세요.");
                            }
                        },
                        error: function (e) {
                            if (e.status == 408) {
                                alert("Login keep timed out. \nPlease log in again.");
                                location.href = "/";
                            }
                        }
                    });
                });
            }, $.geolocationerr, {timeout: 3000});
        } else {
            modal({
                title: '알림메시지',
                type: 'alert',
                text: 'GPS를 지원하지 않는 브라우져입니다 다른 브라우져를 사용해주세요',
            });
            return false;
        }
    }
}

$.statementPrintMove = function () {
    if ($("[name=nomanPrt]").val() == "true") {
        var frm = document.integrateForm;
        frm.action = "/integrateDispatch/statementPrint";
        frm.method = "post"
        frm.submit();
    } else {
        location.href = "/integrateDispatch/list";
    }
}

$.setChk = function (obj) {
    var id = $(obj).attr("id");
    console.log(id);
    if ($(obj).is(":checked")) {
        $("[name=" + id + "]").val("1");
    } else {
        $("[name=" + id + "]").val("0");
    }


}

