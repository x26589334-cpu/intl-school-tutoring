// ===== 신청 폼 → 구글 시트 연동 =====
// 아래 따옴표 안에 구글 Apps Script 웹앱 URL을 붙여넣으면 신청이 구글 시트에 자동 저장됩니다.
// (비어 있으면 안내창만 뜨고 저장은 되지 않습니다.)
var SHEET_ENDPOINT = "https://script.google.com/macros/s/AKfycbyK9lsdLYJHtGGgE2pioeAv_VGJ1vrF_HYbAZ3m2cFyF-73VNSl9RjT-B4w_xDG_AR1/exec";

// 한국 번호 판별: +82 로 시작하거나 0(010·02 등)으로 시작하면 한국. 그 외(+1 등)는 해외.
function isKRPhone(p){
  var s = (p||'').replace(/[\s().\-]/g,'');
  if(s.charAt(0)==='+') return /^\+82/.test(s);
  return /^0\d/.test(s);
}

// 해외 번호일 때만 나타나는 '카카오톡 ID' 입력칸을 #phone 아래에 끼워 넣는다.
function _ensureKakaoField(){
  var ph = document.getElementById('phone');
  if(!ph || document.getElementById('kakao')) return;
  var lab = document.createElement('label');
  lab.id = 'kakaoLab'; lab.setAttribute('for','kakao');
  lab.innerHTML = '카카오톡 ID <span style="font-weight:400;opacity:.8">(해외 번호는 카톡 ID를 꼭 적어주세요)</span>';
  lab.style.display = 'none';
  var inp = document.createElement('input');
  inp.id = 'kakao'; inp.type = 'text'; inp.placeholder = '카카오톡 ID'; inp.style.display = 'none';
  ph.insertAdjacentElement('afterend', inp);
  ph.insertAdjacentElement('afterend', lab);
  function toggle(){
    var show = ph.value.trim()!=='' && !isKRPhone(ph.value);
    lab.style.display = show ? '' : 'none';
    inp.style.display = show ? '' : 'none';
  }
  ph.addEventListener('input', toggle);
  ph.addEventListener('blur', toggle);
}

function submitForm(e){
  e.preventDefault();
  var name  = document.getElementById('name').value.trim();
  var phone = document.getElementById('phone').value.trim();
  if(!name || !phone){ alert('이름과 연락처를 입력해 주세요.'); return false; }

  var kk = document.getElementById('kakao');
  var kakao = kk ? kk.value.trim() : '';
  if(!isKRPhone(phone) && !kakao){
    if(kk){ document.getElementById('kakaoLab').style.display=''; kk.style.display=''; kk.focus(); }
    alert('한국 번호가 아니면 전화 연락이 어려워요.\n카카오톡 ID를 적어주시면 빠르게 안내해 드립니다.');
    return false;
  }

  var form = e.target;

  if(SHEET_ENDPOINT){
    var data = new URLSearchParams();
    data.append('name', name);
    data.append('phone', phone);
    data.append('grade', document.getElementById('grade').value.trim());
    data.append('subject', document.getElementById('subject').value);
    var memo = document.getElementById('memo').value.trim();
    if(kakao) memo = '[카톡 ID] ' + kakao + (memo ? ' / ' + memo : '');
    data.append('memo', memo);
    data.append('kakao', kakao);
    data.append('page', location.pathname);
    fetch(SHEET_ENDPOINT, { method:'POST', mode:'no-cors', body:data })
      .catch(function(){ /* 네트워크 오류는 무시하고 안내만 표시 */ });
  }

  alert(name + ' 학생, 신청이 접수되었습니다!\n담당자가 곧 연락드리겠습니다. 감사합니다.');
  form.reset();
  if(kk){ document.getElementById('kakaoLab').style.display='none'; kk.style.display='none'; }
  return false;
}

if(document.readyState==='loading') document.addEventListener('DOMContentLoaded', _ensureKakaoField);
else _ensureKakaoField();
