// ===== 간편선택 팝업 — index.html·schools.html 공용 =====
// 페이지에 <link href="quick.css">, <script src="quick.js" defer> 만 넣으면 동작.
// 신청은 form.js 의 SHEET_ENDPOINT 로 전송 (없으면 아래 예비 주소 사용).
(function(){
  var EP = (typeof SHEET_ENDPOINT !== 'undefined' && SHEET_ENDPOINT) ||
    "https://script.google.com/macros/s/AKfycbyK9lsdLYJHtGGgE2pioeAv_VGJ1vrF_HYbAZ3m2cFyF-73VNSl9RjT-B4w_xDG_AR1/exec";

  var HTML =
  '<div class="quick" id="quickPick">'+
    '<button type="button" class="q-close" id="quickClose" aria-label="닫기">✕</button>'+
    '<div class="q-step q-s1 on">'+
      '<div class="q-title">어떤 도움이 필요하세요?<small>클릭 한 번이면 딱 맞는 선생님을 안내해 드립니다</small></div>'+
      '<div class="q-tiles">'+
        '<button type="button" data-s="에세이 과외" data-h="영어 에세이 첨삭 전문 강사가 배정됩니다"><b>✍️</b>에세이 과외</button>'+
        '<button type="button" data-s="SAT 과외" data-h="실전 SAT 전문 강사가 배정됩니다"><b>📝</b>SAT 과외</button>'+
        '<button type="button" data-s="수학 과외" data-h="알지브라·지오메트리·AP 미적분까지 커리큘럼별 배정"><b>📐</b>수학 과외</button>'+
        '<button type="button" data-s="과학 과외" data-h="Biology·Chemistry·Physics 전문 강사 배정"><b>🧪</b>과학 과외</button>'+
        '<button type="button" data-s="일상 영어회화" data-h="원어민급 회화 전문 강사와 1:1 화상·대면 수업"><b>💬</b>일상 영어회화</button>'+
        '<button type="button" data-s="주재원 준비" data-h="출국 전 준비부터 현지 화상수업까지 안내해 드립니다"><b>✈️</b>주재원 준비</button>'+
        '<button type="button" data-s="국제학교 입학 준비" data-h="배치고사·에세이·면접 준비를 안내해 드립니다"><b>🎓</b>국제학교 입학 준비</button>'+
      '</div>'+
      '<button type="button" class="q-etc" data-s="기타" data-h="필요하신 내용을 적어주시면 전문가가 안내해 드립니다">찾는 게 없나요? 기타 문의 →</button>'+
    '</div>'+
    '<div class="q-step q-s2">'+
      '<button type="button" class="q-back">← 다시 선택</button>'+
      '<div class="q-chosen"></div><div class="q-hint"></div>'+
      '<div class="q-grades">'+
        '<button type="button">초등 저학년</button><button type="button">초등 고학년</button><button type="button">중등 (G7~8)</button><button type="button">G9~10</button><button type="button">G11~12</button><button type="button">학부모·기타</button>'+
      '</div>'+
      '<div class="q-row2">'+
        '<input type="text" id="q_name" placeholder="이름 *" autocomplete="name">'+
        '<input type="tel" id="q_phone" placeholder="연락처 *" autocomplete="tel">'+
      '</div>'+
      '<input type="text" id="q_addr" placeholder="도로명 주소 (해외는 국가·도시만 대략 적어주세요)" autocomplete="street-address">'+
      '<textarea id="q_memo" placeholder="원하시는 수업이 있다면 적어주세요 (선택)"></textarea>'+
      '<button type="button" class="q-submit">상담 신청하기</button>'+
    '</div>'+
    '<div class="q-step q-s3">'+
      '<div class="q-done"><b>✅ 신청이 접수되었습니다!</b><p>담당자가 확인 후 곧 연락드리겠습니다.<br>급하시면 <a href="tel:010-6832-1994" style="color:#f5b53d">010-6832-1994</a> 로 전화 주세요.</p>'+
        '<div class="q-links"><div class="q-lt">연락 기다리는 동안 둘러보세요 👀</div><div id="q_links"></div></div>'+
      '</div>'+
    '</div>'+
  '</div>';

  var LINKS={
    '에세이 과외':[['국제학교 영어 공부법','news-117.html'],['학부모 후기 보기','reviews.html'],['전문 강사진','index.html#teachers']],
    'SAT 과외':[['SAT 준비 가이드','news-112.html'],['학부모 후기 보기','reviews.html'],['전문 강사진','index.html#teachers']],
    '수학 과외':[['과목 안내 보기','index.html#subjects'],['학부모 후기 보기','reviews.html'],['관리중인 학교 336곳','schools.html']],
    '과학 과외':[['과목 안내 보기','index.html#subjects'],['학부모 후기 보기','reviews.html'],['전문 강사진','index.html#teachers']],
    '일상 영어회화':[['과목 안내 보기','index.html#subjects'],['학부모 후기 보기','reviews.html'],['전문 강사진','index.html#teachers']],
    '주재원 준비':[['해외 학사일정·용어 가이드','guide-overseas-terms.html'],['국가별 준비 안내','study.html'],['관리중인 학교 336곳','schools.html']],
    '국제학교 입학 준비':[['국내 국제학교 입학 가이드','guide-korea-admission.html'],['학교 유형 총정리','guide-school-types.html'],['관리중인 학교 336곳','schools.html']],
    '기타':[['자주 묻는 질문','faq.html'],['관리중인 학교 336곳','schools.html'],['학부모 후기 보기','reviews.html']]
  };

  function init(){
    var modal=document.createElement('div');
    modal.className='q-modal'; modal.id='quickModal'; modal.innerHTML=HTML;
    document.body.appendChild(modal);
    var box=document.getElementById('quickPick');
    var s1=box.querySelector('.q-s1'), s2=box.querySelector('.q-s2'), s3=box.querySelector('.q-s3');
    var subject='', grade='';
    function show(el){[s1,s2,s3].forEach(function(x){x.classList.remove('on')});el.classList.add('on');}
    function openM(){modal.classList.add('open');if(typeof gtag==='function') gtag('event','quick_open');}
    function closeM(){modal.classList.remove('open');}
    var opener=document.getElementById('quickOpen');
    if(opener){ opener.addEventListener('click',openM); }
    else { var fab=document.createElement('button');fab.type='button';fab.className='q-fab';fab.textContent='⚡ 간편 상담';fab.addEventListener('click',openM);document.body.appendChild(fab); }
    document.getElementById('quickClose').addEventListener('click',closeM);
    modal.addEventListener('click',function(e){if(e.target===modal)closeM()});
    document.addEventListener('keydown',function(e){if(e.key==='Escape')closeM()});
    setTimeout(openM,900);
    box.querySelectorAll('[data-s]').forEach(function(b){
      b.addEventListener('click',function(){
        subject=b.getAttribute('data-s');
        box.querySelector('.q-chosen').textContent=subject;
        box.querySelector('.q-hint').textContent=b.getAttribute('data-h')||'';
        show(s2);
        if(typeof gtag==='function') gtag('event','quick_pick',{tile:subject});
      });
    });
    box.querySelector('.q-back').addEventListener('click',function(){show(s1)});
    box.querySelectorAll('.q-grades button').forEach(function(g){
      g.addEventListener('click',function(){
        box.querySelectorAll('.q-grades button').forEach(function(x){x.classList.remove('sel')});
        g.classList.add('sel'); grade=g.textContent;
      });
    });
    box.querySelector('.q-submit').addEventListener('click',function(){
      var name=document.getElementById('q_name').value.trim();
      var phone=document.getElementById('q_phone').value.trim();
      if(!name||!phone){alert('이름과 연락처를 입력해 주세요.');return;}
      var addr=document.getElementById('q_addr').value.trim();
      var memo=document.getElementById('q_memo').value.trim();
      if(addr) memo='[주소] '+addr+(memo?' / '+memo:'');
      if(EP){
        var d=new URLSearchParams();
        d.append('name',name);d.append('phone',phone);d.append('grade',grade);
        d.append('subject',subject);d.append('memo',memo);
        d.append('page','간편선택:'+subject+' ('+location.pathname.replace(/^\//,'')+')');
        fetch(EP,{method:'POST',mode:'no-cors',body:d}).catch(function(){});
      }
      if(typeof gtag==='function') gtag('event','quick_submit',{tile:subject,grade:grade});
      var wrap=document.getElementById('q_links');wrap.innerHTML='';
      (LINKS[subject]||LINKS['기타']).forEach(function(l){var a=document.createElement('a');a.textContent=l[0];a.href=l[1];wrap.appendChild(a);});
      show(s3);
    });
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',init); else init();
})();
