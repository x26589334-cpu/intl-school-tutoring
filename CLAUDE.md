# 국제학교 전문 과외 — 프로젝트 안내 (이어서 작업용)

## 개요
- 국제학교 전문 과외 홍보 웹사이트 (정적 사이트, GitHub Pages 호스팅)
- **라이브 주소:** https://internationaledu.co.kr (HTTPS)
- **GitHub 저장소:** https://github.com/x26589334-cpu/intl-school-tutoring
- **상담 전화:** 010-6832-1994
- **카카오 오픈채팅:** https://open.kakao.com/o/svHm7W8b

## 배포 방법 (수정 → 반영)
```
git add .
git commit -m "메시지"
git push
```
→ 1~2분 후 라이브 사이트에 자동 반영 (GitHub Pages). 캐시 때문에 안 보이면 Ctrl+Shift+R.

## 파일 구조
- `index.html` — 홈 (히어로 / 선생님 소개(#about) / 강사진 슬라이드(#teachers) / 진학안내(#abroad) / 과목(#subjects) / 관리중인학교 바로가기 / 후기 바로가기 / 성적그래프(SVG) / 추천 / 진행과정(#process) / 신청(#apply))
- `schools.html` — 관리중인 학교 (상단 검색창 + 지역별 그룹 + 해외 국가별 카드)
- `reviews.html` — 후기 (※ 예시 후기, 실제 후기로 교체 필요)
- `study.html` — 유학 (※ 예시 상품, 실제 내용으로 교체 필요)
- `news.html` — 국제학교 뉴스 (블로그 타일 그리드 목록)
- `news-N.html` — 뉴스 상세 글 (현재 news-1 ~ news-5)
- `styles.css` — 전 페이지 공용 스타일 (색/폰트 한 곳에서 관리)
- `form.js` — 신청 폼 처리 → 구글 시트 전송
- `favicon.svg` — 빨간 원 "I" 마크 / `og-image.png` — 링크 미리보기 이미지
- `sitemap.xml`, `rss.xml`, `robots.txt` — 검색엔진용
- `face1~12.png` — 강사 사진(현재 CSS로 숨김, 카드는 텍스트만)
- `news1~5.jpg` — 뉴스 글 사진

## 상단 메뉴(nav) — 모든 페이지 동일
홈 · 📌관리중인학교 · 진학안내 · 과목 · 선생님 · 진행과정 · 후기 · 유학 · 뉴스
(우측 상단 "상담신청" = 전화 자동연결)

## 신청 폼 → 구글 시트
- `form.js`의 `SHEET_ENDPOINT` 에 구글 Apps Script 웹앱 URL이 들어있음.
- 신청 시 이름/연락처/학년·학교/과목/메모/페이지가 구글 시트에 자동 기록됨.
- ⚠️ Apps Script 코드 수정 시 "새 배포" 말고 기존 배포 "버전 업데이트" 해야 URL 유지.

## 검색엔진(SEO) — 완료됨
- 네이버 서치어드바이저 + 구글 서치콘솔 소유확인 완료 (각 페이지 head에 verification meta 있음)
- sitemap.xml, rss.xml 제출 완료, robots.txt 있음
- 새 페이지 만들면 sitemap.xml(+ 뉴스면 rss.xml)에 추가할 것

## 사진 추가 규칙
- 사용자가 **바탕화면 \ 국제학교 사진** 폴더에 이미지를 넣어둠.
- 새 뉴스/사진 요청 시 그 폴더에서 가져와 repo로 복사 후 사용.

## 자주 하는 작업
### 뉴스 글 추가
1. `news-N.html` 새로 생성 (기존 news-2.html 복사해 내용/사진/제목 교체)
2. `news.html` 그리드 맨 위에 `<a class="post">` 카드 추가 (썸네일+날짜·지역+제목+요약)
3. `sitemap.xml`, `rss.xml`에 새 글 추가
4. 사진 없으면 글자 썸네일 생성(PowerShell System.Drawing) 또는 .post-thumb 비워두면 파란 그라데이션
### 학교 카드 추가 → `schools.html`
### 후기 추가 → `reviews.html`

## ⭐ 날짜 규칙 (사용자 요청)
- 사용자는 한국에 거주. **모든 뉴스/블로그 날짜는 한국 시간(KST, UTC+9) 기준**으로 기입.
- 글 상단 meta, JSON-LD datePublished/dateModified, news.html 카드, rss.xml pubDate 전부 KST 날짜로.
- 시스템 날짜가 하루 늦게 넘어가는 경우가 있으니, 애매하면 사용자에게 오늘 날짜 확인.

## ⭐ "오늘 업데이트해줘" 규칙 (사용자 요청)
- 사용자가 "오늘 업데이트해줘 / 3개 올려줘" 하면 → **바탕화면\국제학교 사진 폴더에서 아직 안 쓴 학교 사진 3개를 골라** 뉴스 글 3개 생성.
- 각 글 내용: ① 학교 특징 ② 한국 학생들이 이 학교에 진학하는 이유 ③ 왜 수학과외·영어과외·과학과외가 필요한지 (키워드: 알지브라·지오메트리·AP·IB·에세이·면접/인터뷰·화상수업).
- 절차: 사진 newsN.jpg 복사 → news-N.html 생성 → news.html 맨 위 카드 추가 → sitemap.xml + rss.xml 추가 → commit/push.
- **이미 사용한 사진/번호 (중복 금지):**
  - news1=photo.jpg.png, news2=대전, news3=대구, news4=부산, news5=제주, news6=Dwight Seoul, news7=Phillips Exeter, news8=Harker, news9=Bergen County Academies, news10=Phillips Academy Andover, news11=Deerfield, news12=Lawrenceville
  - news13=Choate, news14=Hotchkiss, news15=Harvard-Westlake, news16=St. Paul's, news17=Lakeside, news18=Chadwick School(미국)
  - news19=Monta Vista, news20=Tenafly, news21=Mission San Jose (6/28)
  - news22=Thomas Jefferson 과학고, news23=Lynbrook, news24=Fort Lee (6/29)
  - news25=Palo Alto, news26=McLean, news27=Plano West (6/30)
  - 다음 글은 news-28부터. 폴더의 나머지 미국 학교들(St. Paul's, Lakeside, Chadwick School, Fay, Fessenden, Crystal Springs, Bellaire, Bellevue, Monta Vista, Lynbrook, Palo Alto, Mission San Jose, Tenafly, 각종 public high 등)이 미사용.

## 남은 TODO (실제 내용으로 교체 권장)
- [ ] reviews.html 후기: 현재 예시 → 실제 후기
- [ ] study.html 유학 상품: 현재 예시 → 실제 상품/가격
- [ ] index.html 성적그래프 수치(64.3~91.5), 강사 통계(8~15년 등): 실제 데이터
- [ ] 강사진 카드: 현재 텍스트만(사진 숨김). 필요시 사진/AI얼굴 복원

## 최근 작업 로그 (이어서 할 때 참고)
- **2026-06-29 (집 PC):** `schools.html` 관리 학교 목록 대폭 확장 — 빠져 있던 국제학교 **117곳 추가** (기존 219 → 336곳).
  - 한국 7 (서울독일학교DSSI·서울프랑스학교LFS·서울일본인학교·국제크리스천학교평택·험프리스DoDEA·경남국제외국인학교사천·청심국제가평)
  - 미국 보딩 19 / 미국 명문 공립·마그넷 22 (뉴욕 스타이베선트·브롱스과학고 등, 캘리 한인밀집지역 고교 다수)
  - 캐나다 8 / 영국 14 / 스위스 4 / 싱가포르 7 / 홍콩 7 / 말레이시아 6 / 중국 4 / 일본 2 / 인도 3 / 중동 6 / 인니 3 / 유럽 5
  - 목적: SEO (학교명 한글+영문 모두 노출 → 검색 유입). 검색·상세안내 기능 그대로 동작.
  - 커밋 `b73634b` push 완료.
- **다음에 할 후보:** ① 더 추가할 지역/학교 있으면 보강 ② 아래 TODO(후기·유학·성적그래프 실제 데이터) ③ 오늘 뉴스글 추가(news-25부터)

## 집/다른 PC에서 이어서 하기
1. git 설치 (https://git-scm.com)
2. 원하는 폴더에서: `git clone https://github.com/x26589334-cpu/intl-school-tutoring.git`
3. 그 폴더에서 Claude Code 실행 → "이 국제학교 사이트 이어서 작업해줘"
4. 수정 후 `git add . && git commit -m "..." && git push`
