// 조회수 카운터 (Abacus 무료 API — 서버/가입 불필요)
// 화면의 <span class="view-count" data-slug="news-100" data-mode="hit"></span> 요소를 채웁니다.
//  - data-mode="hit"  : 페이지 열 때 조회수 +1 후 표시 (상세글용). 같은 방문자는 세션당 1회만 +1.
//  - data-mode 없음/"get" : 증가 없이 현재 숫자만 표시 (목록·미리보기용).
// 실패하면 아무것도 표시하지 않고 조용히 넘어갑니다(페이지 안 깨짐).
(function () {
  var NS = 'internationaledu-co-kr';           // 우리 사이트 전용 네임스페이스
  var API = 'https://abacus.jasoncameron.dev';  // 무료 조회수 API

  function fmt(n) {
    try { return Number(n).toLocaleString('ko-KR'); } catch (e) { return String(n); }
  }
  function show(el, n) {
    el.textContent = '👁 ' + fmt(n);   // 👁 1,234
    el.style.visibility = 'visible';
  }

  function run() {
    var els = document.querySelectorAll('.view-count');
    for (var i = 0; i < els.length; i++) {
      (function (el) {
        var slug = el.getAttribute('data-slug');
        if (!slug) return;
        var mode = el.getAttribute('data-mode') || 'get';

        // 새로고침으로 숫자 뻥튀기 방지: 같은 세션에서 이미 본 글은 읽기만.
        if (mode === 'hit') {
          try {
            var key = 'vc_' + slug;
            if (sessionStorage.getItem(key)) { mode = 'get'; }
            else { sessionStorage.setItem(key, '1'); }
          } catch (e) { /* sessionStorage 불가 시 그냥 hit */ }
        }

        var isHit = (mode === 'hit');
        var url = API + '/' + (isHit ? 'hit' : 'get') + '/' + NS + '/' + slug;
        fetch(url)
          .then(function (r) { return r.json().catch(function () { return {}; }); })
          .then(function (d) {
            if (d && typeof d.value === 'number') { show(el, d.value); }
            else if (!isHit) { show(el, 0); }  // 아직 조회 없는 글: 목록에 0으로 표시
          })
          .catch(function () { /* 네트워크 오류: 조용히 숨김 */ });
      })(els[i]);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', run);
  } else {
    run();
  }
})();
