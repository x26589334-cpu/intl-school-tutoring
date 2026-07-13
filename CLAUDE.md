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

### ⚠️ Pages 배포가 안 될 때 (자주 있음)
- 증상: push 했는데 새 페이지가 라이브에서 404. GitHub Actions "pages build and deployment"에서 **build는 success인데 deploy 단계만 failure** (GitHub 쪽 간헐 오류).
- 해결: **빈 커밋으로 재시도** → `git commit --allow-empty -m "retry Pages deploy" && git push`. 보통 1~2회 재시도면 deploy 성공. (또는 GitHub 웹 → Actions 탭 → 실패한 실행 → "Re-run failed jobs")
- 확인법(캐시 무시): `curl -o /dev/null -s -w "%{http_code}" "https://internationaledu.co.kr/새페이지.html?cb=1"` → 200이면 반영됨.

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

## ⭐ 후기 규칙 (사용자 요청) — 하루 5개
- "업데이트해줘" 하면 뉴스 3개와 함께 **reviews.html에 후기 5개**도 추가.
- 형식: `— OO국제학교 · 수학과외/영어과외 · G학년 학부모(또는 학생)` 스타일 attribution.
- 키워드 섞기: 알지브라·지오메트리·에세이·면접/인터뷰·IB·AP·미국수학·화상·수학과외/영어과외/과학과외.
- reviews.html의 `.rev-grid` 안 템플릿 주석 위(맨 위)에 삽입 → newest first. commit/push.

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
  - news28=Irvine, news29=Northern Valley Demarest, news30=Westlake (7/1)
  - news31=Ridgewood, news32=Bellevue, news33=Langley (7/2)
  - news34=Interlake, news35=Chantilly, news36=Reedy (7/3)
  - news37=인천 EJU 수학과외, news38=청주 EJU, news39=세종 EJU (7/3, 지역+EJU 수학과외 2000자, 글자 썸네일 자동생성)
  - news40=밀턴 아카데미, news41=태프트 스쿨, news42=웨스트민스터 스쿨 (7/5, 학교소개형, 사진 폴더 없어 글자 썸네일 자동생성)
  - news43=이튼 칼리지(사진=news11 재사용), news44=스타이베선트(사진=news13 재사용), news45=그로튼(사진=news14 재사용) (7/6, 학교소개형)
  - news46=스톤브리지 고등학교(버지니아), news47=뉴포트 고등학교(벨뷰), news48=벨레어 고등학교(휴스턴) (7/7, 학교소개형, **실제 사진** 국제학교 사진 폴더에서 사용)
  - news49=서울 EJU 수학과외, news50=부산 EJU, news51=대구 EJU (7/7, 지역+EJU 수학과외 2000자, 글자 썸네일 자동생성) ※ EJU 사용지역: 인천·청주·세종·서울·부산·대구
  - news52=베이시스 스코츠데일(애리조나), news53=테슬라 STEM 고교(레드먼드), news54=반데그리프트 고교(오스틴) (7/8, 학교소개형, **실제 사진** 폴더에서 사용)
  - news55=카네기 뱅가드(휴스턴 마그넷), news56=레드먼드 고교(워싱턴), news57=유니버시티 고교(어바인) (7/9, 학교소개형, **실제 사진** 폴더에서 사용)
  - news58=드와이트 스쿨 뉴욕(IB), news59=오버레이크 스쿨(레드먼드 사립), news60=크리스탈 스프링스 업랜즈(실리콘밸리 사립) (7/10, 학교소개형, **실제 사진** 폴더에서 사용)
  - news61=페이 스쿨(주니어 보딩), news62=페센든 스쿨(주니어 보딩), news63=재스퍼 고교(플레이노) (7/11, 학교소개형, **실제 사진** 폴더에서 사용)
  - ⚠️ **폴더 사진 거의 소진**: 남은 미사용 사진은 Liberty High School 1장뿐 (+ 한국 학교 사진들). 사용자에게 새 학교 사진 추가를 요청하거나, 다음 회차는 EJU 지역글(글자 썸네일) 등으로 대체할 것.
  - news64=싱가포르 국제학교 과외(사진=news17 재사용), news65=홍콩 국제학교 과외(사진=news13 재사용), news66=상하이 국제학교 과외(사진=news60 재사용) (7/12, **지역+주재원 화상수업형** — 미국 학교 편중 완화 위해 아시아 주재원 도시로 지역 다변화)
  - news67=송도, news68=평택, news69=용인, news70=수원, news71=안산 — **"OO 국제학교 수학과외" 학부모 일기형 5편** (7/13, 사진=news6·7·8·12·15 재사용). 제목에 학교명 대신 **지역+국제학교 수학과외** 키워드, 본문은 1인칭 학부모 일기(왜 과외가 필요했는지). 5편 상호 내부링크(지역별 클러스터).
  - 다음 글은 news-72부터. 📝 **일기형 미사용 지역**: 대전·대구·부산·제주·판교·분당·광주·서울(강남/서초/용산) 등 → 같은 포맷으로 확장 가능.
  - ⚠️ 사용자 선호: **글자 썸네일 별로임 → 실제 사진 사용할 것.** 집 PC엔 '국제학교 사진' 폴더가 없어 repo 기존 간판없는 캠퍼스 컷 재사용(현재까지 사용한 클린 컷: news11·13·14·17·60). 사무실 PC엔 폴더 있음.
  - 📌 **SEO 방향(2026-07-12 지시)**: 노출수 하락 → 미국 무명 공립고 양산 자제. 검색수요 큰 쪽으로 다변화 = ① 주재원 인기도시(싱가포르·홍콩·상하이·도쿄·베트남·두바이) ② 명문 한국 국제학교 개별글(SFS·SIS·YISS·채드윅송도·NLCS제주 등) ③ 지역+국제학교/EJU 과외(로컬 인텐트). 글마다 내용 차별화 필수(템플릿 복붙 지양).

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
