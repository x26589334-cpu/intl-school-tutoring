// ===== 신청 폼 → 구글 시트 연동 =====
// 아래 따옴표 안에 구글 Apps Script 웹앱 URL을 붙여넣으면 신청이 구글 시트에 자동 저장됩니다.
// (비어 있으면 안내창만 뜨고 저장은 되지 않습니다.)
var SHEET_ENDPOINT = "";

function submitForm(e){
  e.preventDefault();
  var name  = document.getElementById('name').value.trim();
  var phone = document.getElementById('phone').value.trim();
  if(!name || !phone){ alert('이름과 연락처를 입력해 주세요.'); return false; }

  var form = e.target;

  if(SHEET_ENDPOINT){
    var data = new URLSearchParams();
    data.append('name', name);
    data.append('phone', phone);
    data.append('grade', document.getElementById('grade').value.trim());
    data.append('subject', document.getElementById('subject').value);
    data.append('memo', document.getElementById('memo').value.trim());
    data.append('page', location.pathname);
    fetch(SHEET_ENDPOINT, { method:'POST', mode:'no-cors', body:data })
      .catch(function(){ /* 네트워크 오류는 무시하고 안내만 표시 */ });
  }

  alert(name + ' 학생, 신청이 접수되었습니다!\n담당자가 곧 연락드리겠습니다. 감사합니다.');
  form.reset();
  return false;
}
