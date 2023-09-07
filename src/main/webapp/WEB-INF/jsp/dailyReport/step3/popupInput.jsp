<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>

<script src="/resources/js/dailyReport/dailyform-sub.js"></script>

<div id="popup" class="popup">
    <div class="popup-content">
        <div class="mt10">
            <form method="post" name="frm">
                <input type="hidden" name="sheetID" value="${!empty view ? view.sheetID : 0}">

                <div class="mtable">
                    <ul class="mtable__ul" style="border-bottom: 1px solid transparent !important;">
                        <li>
                            <label>상차지</label>
                            <img src="/resources/image/icons/ico_mic.png" alt="마이크" class="icon_mic">
                            <span class="content">
                                    <input type="text" class="wp100 voice" name="fromsite" id="fromsite" placeholder="상차지" value="${!empty view ? view.fromsite : ''}">
                                </span>
                        </li>
                        <li>
                            <label>상차지</label>
                            <img src="/resources/image/icons/ico_mic.png" alt="마이크" class="icon_mic">
                            <span class="content">
                                    <input type="text" class="wp100 voice" name="fromsite" id="fromsite" placeholder="상차지" value="${!empty view ? view.fromsite : ''}">
                                </span>
                        </li>

                        <li>
                            <label>하차지</label>
                            <img src="/resources/image/icons/ico_mic.png" alt="마이크" class="icon_mic">
                            <span class="content">
                                    <input type="text" class="wp100 voice" name="tosite" id="tosite" value="${!empty view ? view.tosite : ''}"
                                           placeholder="하차지" autocomplete="off">
                                </span>
                        </li>

                        <li>
                            <label>품목</label>
                            <img src="/resources/image/icons/ico_mic.png" alt="마이크" class="icon_mic">
                            <span class="content">
                                    <input type="text" class="wp100 voice" name="item" id="item" value="${!empty view ? view.item : ''}"
                                           placeholder="품목" autocomplete="off">
                                </span>
                        </li>

                        <li>
                            <label>대수</label>
                            <span class="content">
                                     <input type="number" class="wp100 ml75" name="Qty" id="Qty" placeholder="대수" autocomplete="off">
                                </span>
                        </li>

                        <li>
                            <label>비고</label>
                            <span class="content">
                                <textarea class="Rem ml75" name="Rem" id="Rem" cols="40" rows="1" placeholder="비고" autocomplete="off"
                                          style="height: auto; overflow-y:scroll; resize:none"></textarea>
                        </li>

                        <div style="display: block; height: 30px; padding-top: 3px;">
                            <label for="checkbox" id="checkboxLabel" style="height: 20px;">운반 금액 표시:</label>
                            <input type="checkbox" id="showHideCheckbox" style="margin-left: 50%; width: 14px; height: 14px;" checked>
                        </div>
                        <div class="" id="hiddenPart">
                            <form method="post" name="frm">
                                <div>
                                    <ul>
                                        <li>
                                            <label>운반 단가</label>
                                            <span class="content">
                                                    <input type="number" class="wp70 ml75" name="Qtyup" id="Qtyup"
                                                           placeholder="운반 단가" autocomplete="off">
                                                </span>
                                        </li>
                                        <li>
                                            <label>운반 총액</label>
                                            <span class="content">
                                                   <input type="number" class="wp70 ml75" name="totalAmount" id="totalAmount"
                                                          placeholder="합계" readonly autocomplete="off">

                                                </span>
                                        </li>


                                    </ul>
                                </div>
                            </form>
                        </div>
                    </ul>
                </div>
            </form>
        </div>
        <div class="popBtns">
            <button class="btn btn-white btn-popup" onclick="closePop()">
                삭제
            </button>
            <button class="btn btn-white btn-popup" onclick="closePop()" method="">
                수정
            </button>
            <button class="btn btn-white btn-popup" onclick="$.save();" onkeydown="if(event.keyCode == 13) return false;" style="width: 80px;" method="">
                저장
            </button>
            <button id="closePopupButton" class="btn btn-blue btn-popup" onclick="closePop()">
                닫기
            </button>
        </div>
    </div>
</div>


<script>
    const checkbox = document.getElementById("showHideCheckbox");
    const hiddenPart = document.getElementById("hiddenPart");
    const checkboxLabel = document.getElementById("checkboxLabel");

    checkbox.addEventListener("change", function() {
        if (checkbox.checked) {
            hiddenPart.style.display = "block";
            checkboxLabel.style.color = "#333";
        } else {
            hiddenPart.style.display = "none";
            checkboxLabel.style.color = "#aaa";
        }
    });
</script>

<script>
    <!-- "대수"와 "운반 단가" 입력 요소 가져오기 -->
    const QtyInput = document.getElementById('Qty');
    const QtyupInput = document.getElementById('Qtyup');
    const totalAmountInput = document.getElementById('totalAmount');

    <!-- 입력 값이 변경될 때마다 합계 업데이트 함수 호출 -->
    QtyInput.addEventListener('input', updateTotalAmount);
    QtyupInput.addEventListener('input', updateTotalAmount);

    <!-- 합계 업데이트 함수 -->
    function updateTotalAmount() {
        <!-- "대수"와 "운반 단가" 값을 가져옴 -->
        const Qty = parseFloat(QtyInput.value);
        const unitPrice = parseFloat(QtyupInput.value);

        <!--값이 유효한 경우에만 합계 계산 및 표시-->
        if (!isNaN(Qty) && !isNaN(unitPrice)) {
            <!-- "대수"와 "운반 단가"를 곱하여 소수점 이하 2자리까지 표시 -->
            totalAmountInput.value = Qty * unitPrice;
        } else {
            <!-- 값이 유효하지 않은 경우 합계 입력 상자를 비움 -->
            totalAmountInput.value = '';
        }
    }
</script>

<script>
    // 비고 사이즈 자동변경 기능
    const lineheight = 25;
    const freetext = document.querySelector('.Rem');

    freetext.oninput = event => {
        const $target = event.target;

        $target.style.height = 0;
        $target.style.height = lineheight + $target.scrollHeight + 'px';
    };

    $('#carSubmitTel').keyup(function (event) {
        event = event || window.event;
        var _val = this.value.trim();
        this.value = autoHypenTel(_val);
    });

    function autoHypenTel(str) {
        str = str.replace(/[^0-9]/g, '');
        var tmp = '';

        // 서울 전화번호일 경우 10자리까지만 나타나고 그 이상의 자리수는 자동삭제
        if (str.length < 4) {
            return str;
        } else if (str.length < 10) {
            tmp += str.substr(0, 4);
            tmp += '-';
            tmp += str.substr(4);
            return tmp;
        }
    }
</script>

<script>
    // 비고 사이즈 자동변경 기능
    const DEFAULT_HEIGHT = 25;
    const $textarea = document.querySelector('.salesman');

    $textarea.oninput = event => {
        const $target = event.target;

        $target.style.height = 0;
        $target.style.height = DEFAULT_HEIGHT + $target.scrollHeight + 'px';
    };
</script>