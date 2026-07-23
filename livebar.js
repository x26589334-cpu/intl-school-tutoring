/* ============================================================
   상단 실시간 현황 바 (live bar)
   ------------------------------------------------------------
   ⚠️ 중요: 여기 들어가는 숫자는 "실제 사실"만 넣어주세요.
            없는 숫자를 지어내면 허위·과장 광고가 될 수 있습니다.

   숫자 바꾸는 법: 아래 MESSAGES 배열의 num 값만 수정하면 됩니다.
   예) 후기가 120건이 되면 num:98 → num:120 으로 변경
   ============================================================ */
(function () {
  var MESSAGES = [
    { pre: '현재 ',                 num: 344, unit: '곳',  post: '의 국제학교·외국인학교를 관리하고 있습니다' },
    { pre: '학생·학부모 후기 ',      num: 103, unit: '건',  post: '이 등록되어 있습니다' },
    { pre: '국제학교 전문 강사 ',    num: 17,  unit: '명',  post: ' · 경력 8~15년' },
    { pre: '2027 겨울캠프 모집중 · 정원 ', num: 10, unit: '명', post: '부터 · 조기 마감될 수 있습니다' },
    { pre: '30분 무료 상담 ',        num: null, unit: '',   post: '신청 받고 있습니다 · 010-6832-1994' }
  ];

  var ROTATE_MS = 4200;

  var bar = document.getElementById('liveBar');
  if (!bar) return;

  var txt = bar.querySelector('.live-txt');
  if (!txt) return;

  function render(m) {
    if (m.num === null) {
      txt.innerHTML = '<b>' + m.pre + '</b>' + m.post;
    } else {
      txt.innerHTML = m.pre +
        '<span class="live-num">' + m.num.toLocaleString('ko-KR') + '</span>' +
        '<b>' + m.unit + '</b>' + m.post;
    }
    var n = txt.querySelector('.live-num');
    if (n) {
      // 숫자에 살짝 움직임 (라이브 느낌)
      n.classList.add('bump');
      setTimeout(function () { n.classList.remove('bump'); }, 500);
    }
  }

  var i = 0;
  render(MESSAGES[0]);

  setInterval(function () {
    i = (i + 1) % MESSAGES.length;
    txt.style.opacity = '0';
    setTimeout(function () {
      render(MESSAGES[i]);
      txt.style.opacity = '1';
    }, 260);
  }, ROTATE_MS);

  txt.style.transition = 'opacity .26s ease';
})();
