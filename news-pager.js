/* ============================================================
   뉴스 목록 페이지네이션 (한 페이지 5개) + 같은 페이지 내 사진 중복 제거
   ------------------------------------------------------------
   - 카드는 그대로 두고 JS로 5개씩 나눠 보여줍니다(글이 추가돼도 자동 적용).
   - 한 페이지 안에서 "내용이 같은 사진"이 겹치면 다른 사진으로 자동 교체합니다.
     (파일명이 달라도 내용이 같은 복사본까지 잡도록 내용 해시로 판별)
   ============================================================ */
var IMG_KEY={"news1.png":"52f3b532","news10.jpg":"c880d78d","news100.jpg":"fd382a51","news101.jpg":"dda99635","news102.jpg":"c2141bc1","news103.jpg":"004aa88d","news104.jpg":"7ef257fa","news105.jpg":"0889d1f8","news106.jpg":"8e97ab7e","news11.jpg":"0889d1f8","news112.jpg":"463b0b89","news113.jpg":"ed4e1805","news114.jpg":"80bfd8bf","news116.jpg":"ce36daea","news117.jpg":"2d992930","news118.jpg":"a6b5143f","news121.jpg":"aeac6e8d","news122.jpg":"22124b4b","news123.jpg":"8e97ab7e","news124.jpg":"c880d78d","news125.jpg":"896d0389","news126.jpg":"be1153a2","news127.jpg":"22124b4b","news128.jpg":"c880d78d","news129.jpg":"2d992930","news130.jpg":"8e97ab7e","news131.jpg":"80bfd8bf","news132.jpg":"c2141bc1","news133.jpg":"22124b4b","news134.jpg":"896d0389","news135.jpg":"7ef257fa","news136.jpg":"004aa88d","news137.jpg":"5519cfe0","news138.jpg":"1f3085bc","news139.jpg":"31217703","news140.jpg":"55c2b86c","news141.jpg":"d853c94b","news142.jpg":"7860f930","news143.jpg":"93876ac1","news144.jpg":"f366cc3c","news145.jpg":"91090765","news12.jpg":"aeac6e8d","news13.jpg":"80bfd8bf","news14.jpg":"8e97ab7e","news15.jpg":"2d992930","news16.jpg":"a6b5143f","news17.jpg":"ed4e1805","news18.jpg":"2f5f4437","news19.jpg":"f3fce969","news2.jpg":"7ef257fa","news20.jpg":"4eda5538","news21.jpg":"f44b829e","news22.jpg":"6b862c61","news23.jpg":"ccacbea0","news24.jpg":"d91d1347","news25.jpg":"ebdda7f6","news26.jpg":"476d2bf3","news27.jpg":"c4484b78","news28.jpg":"26f44fa3","news29.jpg":"efecf57c","news3.jpg":"dda99635","news30.jpg":"1f5f648b","news31.jpg":"46e2da83","news32.jpg":"01e7ad23","news33.jpg":"014b09b4","news34.jpg":"7c14f111","news35.jpg":"c5039d6e","news36.jpg":"4404c80d","news37.jpg":"551c0b29","news38.jpg":"6503d8b4","news39.jpg":"d4eff591","news4.jpg":"004aa88d","news40.jpg":"1ecd274e","news41.jpg":"bb9af268","news42.jpg":"b3ffa4f1","news43.jpg":"0889d1f8","news44.jpg":"80bfd8bf","news45.jpg":"8e97ab7e","news46.jpg":"81e53324","news47.jpg":"64d4e955","news48.jpg":"1908b8e0","news49.jpg":"84ffffca","news5.jpg":"c2141bc1","news50.jpg":"c5347ab3","news51.jpg":"e74071bb","news52.jpg":"bc144daf","news53.jpg":"ed7721f4","news54.jpg":"67f0af05","news55.jpg":"e68a0693","news56.jpg":"c1f00bb6","news57.jpg":"d979b0d4","news58.jpg":"3425de28","news59.jpg":"31825824","news6.jpg":"5519cfe0","news60.jpg":"ce36daea","news61.jpg":"68261576","news62.jpg":"3e468cbd","news63.jpg":"5dc109e1","news64.jpg":"ed4e1805","news65.jpg":"80bfd8bf","news66.jpg":"ce36daea","news67.jpg":"5519cfe0","news68.jpg":"be1153a2","news69.jpg":"22124b4b","news7.jpg":"be1153a2","news70.jpg":"aeac6e8d","news71.jpg":"2d992930","news72.jpg":"896d0389","news73.jpg":"7ef257fa","news74.jpg":"004aa88d","news75.jpg":"c2141bc1","news76.jpg":"c880d78d","news77.jpg":"26f44fa3","news78.jpg":"d91d1347","news79.jpg":"ed4e1805","news8.jpg":"22124b4b","news80.jpg":"ce36daea","news81.jpg":"ed4e1805","news82.jpg":"ed4e1805","news83.jpg":"2d992930","news84.jpg":"80bfd8bf","news85.jpg":"22124b4b","news86.jpg":"ce36daea","news87.jpg":"be1153a2","news88.jpg":"5cfa288b","news89.jpg":"5eb394b1","news9.jpg":"896d0389","news90.jpg":"97f2a756","news91.jpg":"cdb989d9","news92.jpg":"d19f8d0b","news93.jpg":"1f506f1f","news94.jpg":"7ef257fa","news95.jpg":"aeac6e8d","news96.jpg":"2d992930","news97.jpg":"40e180ab","news98.jpg":"1b11d8ca","news99.jpg":"fe5eca8c"};

(function () {
  var PAGE_SIZE = 5;

  function fileOf(src) {           // "path/news17.jpg?x" -> "news17.jpg"
    if (!src) return '';
    var s = src.split('?')[0].split('#')[0];
    var parts = s.split('/');
    return parts[parts.length - 1];
  }
  function keyOf(file) { return IMG_KEY[file] || file; }

  function run() {
    var grid = document.querySelector('.news-grid');
    var pager = document.getElementById('newsPager');
    if (!grid || !pager) return;

    var cards = Array.prototype.slice.call(grid.querySelectorAll('a.post'));
    if (cards.length <= PAGE_SIZE) return;   // 5개 이하면 나눌 필요 없음
    var pageCount = Math.ceil(cards.length / PAGE_SIZE);

    // 교체용 사진 풀: 내용이 서로 다른 대표 사진 한 장씩
    var seen = {}, POOL = [];
    Object.keys(IMG_KEY).forEach(function (f) {
      var k = IMG_KEY[f];
      if (!seen[k]) { seen[k] = 1; POOL.push({ f: f, k: k }); }
    });

    // 각 카드의 원본 썸네일 파일명을 기억(재계산해도 흔들리지 않게)
    cards.forEach(function (c) {
      var img = c.querySelector('.post-thumb img');
      if (img && !img.getAttribute('data-thumb')) {
        img.setAttribute('data-thumb', fileOf(img.getAttribute('src')));
      }
    });

    var current = 1;

    function showPage(p) {
      current = p;
      var start = (p - 1) * PAGE_SIZE, end = start + PAGE_SIZE;
      var usedKeys = {};
      cards.forEach(function (c, i) {
        var visible = (i >= start && i < end);
        c.style.display = visible ? '' : 'none';
        if (!visible) return;
        var img = c.querySelector('.post-thumb img');
        if (!img) return;
        var orig = img.getAttribute('data-thumb');
        var k = keyOf(orig);
        if (usedKeys[k]) {
          // 이미 같은 사진이 이 페이지에 있음 -> 안 겹치는 다른 사진으로 교체
          for (var j = 0; j < POOL.length; j++) {
            if (!usedKeys[POOL[j].k]) { img.setAttribute('src', POOL[j].f); k = POOL[j].k; break; }
          }
        } else {
          // 겹치지 않으면 원본으로 복원
          if (fileOf(img.getAttribute('src')) !== orig) img.setAttribute('src', orig);
        }
        usedKeys[k] = 1;
      });
      buildPager();
    }

    function windowPages(cur, total) {
      var arr = [], w = 2;
      for (var p = 1; p <= total; p++) {
        if (p === 1 || p === total || (p >= cur - w && p <= cur + w)) arr.push(p);
        else if (arr[arr.length - 1] !== '…') arr.push('…');
      }
      return arr;
    }

    function buildPager() {
      var html = '';
      html += '<button class="pg-btn pg-nav" data-go="' + (current - 1) + '"' + (current === 1 ? ' disabled' : '') + ' aria-label="이전">←</button>';
      windowPages(current, pageCount).forEach(function (pg) {
        if (pg === '…') html += '<span class="pg-gap">…</span>';
        else html += '<button class="pg-btn' + (pg === current ? ' active' : '') + '" data-go="' + pg + '">' + pg + '</button>';
      });
      html += '<button class="pg-btn pg-nav" data-go="' + (current + 1) + '"' + (current === pageCount ? ' disabled' : '') + ' aria-label="다음">→</button>';
      pager.innerHTML = html;
    }

    pager.addEventListener('click', function (e) {
      var b = e.target.closest ? e.target.closest('.pg-btn') : null;
      if (!b || b.disabled) return;
      var go = parseInt(b.getAttribute('data-go'), 10);
      if (go >= 1 && go <= pageCount) {
        showPage(go);
        var top = document.querySelector('.news');
        if (top && top.scrollIntoView) top.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });

    showPage(1);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', run);
  else run();
})();
