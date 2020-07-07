# P2P 가상화폐 거래소
<image src="desc/images/banner.png" style="width: 150px;">
<a href="https://github.com/bisu8018/p2p_exchange_front_end/">
  Github 소스코드 (https://github.com/bisu8018/p2p_exchange_front_end/)
</a><br>
<a href="desc/images/sitemap.pdf">
  사이트 맵</a>
<br>

## 시연 동영상
1. <a href="https://drive.google.com/file/d/1LOb0qX82tHi7jMNO7FxkAgQQlJVrhiHa/view?usp=sharing" target="_blank">회원가입, 로그인</a>
2. <a href="https://drive.google.com/file/d/1PWgX2SDEeTJ6FcdXmiueIqT61aCX1hpC/view?usp=sharing" target="_blank">지갑, 마이페이지</a>
3. <a href="https://drive.google.com/file/d/1oBucfwBDlUuGNwNsFh8MMhZrdNnZvcaD/view?usp=sharing" target="_blank">OTC 광고 게시</a>
4. <a href="https://drive.google.com/file/d/1e36T8ocq1ZaHcbgn92hwZTsbHdY5zPF2/view?usp=sharing" target="_blank">거래소 목록, 주문/출금</a>
5. <a href="https://drive.google.com/file/d/1mt0wr2jOgiIz2uFZje1uPeAykXLPnecB/view?usp=sharing" target="_blank">채팅, 내 광고/주문</a>
6. <a href="https://drive.google.com/file/d/1aFaPeJpzy_uvNXkFN1ell-1lK3dF_qhr/view?usp=sharing" target="_blank">서비스</a>
<br>

## 개요
### 프로젝트 개요
- 가상화폐 P2P 거래 수요 증가에 따른, P2P 가상화폐 거래소 구축
- 전 세계 대상 서비스로, 다국어 지원
- 모바일 이용자 고려, 반응형 웹 개발 (캡쳐:<a href="images/main_page.png"> Desktop 환경</a>, <a href="images/main_page(mobile).png">Mobile 환경</a>)
- Bitcoin, Etherium 입/출금 우선 지원

### 현황
- 중국 업체 AllB 판매

### 구성원 
- 기획 : 1명
- 번역 : 1명
- Front-End : 2명 
- Back-End : 3명
- BlockChain Expert: 1명
- 디자인 : 3명 

### 개발기간 
- 2018.06 ~ 2018.10 (약 4개월)

### 사용 언어 및 프레임워크
- Vue js 
- JavaScript, TypeScript
- HTML5, CSS3
- Vuetify

### 프로젝트 협업 툴
- Github
- Swagger
- Jenkins (+ Filezila)
- MySQL Workbench : DB 데이터 관리
- Jira
- Zeplin 
<br>

## 필수사항
- 반응형 SPA 개발 (최소 사이즈 아이폰5se, 태블릿 PC 미고려, 'Grid, Gutter' 준수)
- 라이브러리, NPM 패키지 사용 최소화
- 멀티 브라우져 지원 (크롬, 사파리, 파이어폭스, IE Edge, IE11)
- 4개국어 지원 (한국어, 영어, 중국어 간체, 중국어 번체)
- 중국 Great Firewall 고려한 API 연동 (+ 개발 작업 시 <a href="https://github.com/bisu8018/p2p_exchange_front_end/blob/develop/vue.config.js">Proxy 설정</a>)
<br>

## 담당 업무
- P2P 거래소 반응형 사이트 구축 (하기 '프로젝트 기여도' 참고)
- Vue js 프로젝트 관리 (<a href="https://github.com/bisu8018/p2p_exchange_front_end/blob/develop/package.json">
  npm packages
</a>, <a href="https://github.com/bisu8018/p2p_exchange_front_end/blob/develop/vue.config.js">
  vue.config
</a>, vue-cli, git 등) 
- <a href="https://github.com/bisu8018/p2p_exchange_front_end/tree/develop/src/config">
  프로젝트 설정 script</a>, <a href="https://github.com/bisu8018/p2p_exchange_front_end/tree/develop/src/common">
  공통 script</a> 관리
- SelectBox, CheckBox, 인증 모달 등등 <a href="https://github.com/bisu8018/p2p_exchange_front_end/tree/develop/src/components">
  공통 Component</a> 개발 및 관리
- <a href="https://github.com/bisu8018/p2p_exchange_front_end/blob/develop/src/App.vue">CSS 공통화</a>, <a href="img/sprite_x2.4b9f8b78.png">Sprite</a>, <a href="images/z_index_list.pdf">z-index</a> 등등 디자인 관련 개발작업 및 <a href="images/common_css.pdf">문서화</a> 
- 버그/성능/디자인 개선 및 코드정리
- AWS 서버 및 도메인 관리
<br>

## 프로젝트 기여도 (76% : 시연 동영상 기준)
- 100% : <a href="https://github.com/bisu8018/p2p_exchange_front_end/tree/develop/src/views/home/body/signup">회원가입</a>, <a href="https://github.com/bisu8018/p2p_exchange_front_end/tree/develop/src/views/home/body/login">로그인</a>, <a href="https://github.com/bisu8018/p2p_exchange_front_end/tree/develop/src/views/home/body/myPage">마이페이지</a>, <a href="https://github.com/bisu8018/p2p_exchange_front_end/tree/develop/src/views/home/body/postAd">OTC 광고 게시</a>, <a href="https://github.com/bisu8018/p2p_exchange_front_end/tree/develop/src/views/home/body/trade/buy">주문(구입)</a>, <a href="https://github.com/bisu8018/p2p_exchange_front_end/tree/develop/src/views/home/body/trade/sell">출금(판매)</a>, <a href="https://github.com/bisu8018/p2p_exchange_front_end/tree/develop/src/views/home/body/chat">채팅</a>, <a href="https://github.com/bisu8018/p2p_exchange_front_end/tree/develop/src/views/home/body/service">서비스</a> 
- 50% : <a href="https://github.com/bisu8018/p2p_exchange_front_end/tree/develop/src/views/home/body/myAds">내 광고</a>/<a href="https://github.com/bisu8018/p2p_exchange_front_end/tree/develop/src/views/home/body/myOrder">주문</a>
- 10% : 지갑
- 0% : 거래소 목록
<br>

## 상세 내용
### 프로젝트 구조
<image src="desc/images/prj_structure.png" style="width: 150px;">

  ① <a href="https://github.com/bisu8018/p2p_exchange_front_end/tree/develop/src/assets">assets</a> : 폰트, 이미지, <a href="img/sprite_x2.4b9f8b78.png">Sprite 이미지</a><br>
  ② <a href="https://github.com/bisu8018/p2p_exchange_front_end/tree/develop/src/common">common</a> : Cookie 설정과 같은 프로젝트 공통 사용 함수<br>
  ③ <a href="https://github.com/bisu8018/p2p_exchange_front_end/tree/develop/src/components">components</a> : alert, date picker, select box 등등 공통 컴포넌트<br>
  ④ <a href="https://github.com/bisu8018/p2p_exchange_front_end/tree/develop/src/config">config</a> : 언어설정, url 목록 등등 설정 관련 스크립트 파일<br>
  ⑤ <a href="https://github.com/bisu8018/p2p_exchange_front_end/tree/develop/src/service">service</a> : Back-end 통신 위한 AXIOS 관련 스크립트 파일<br>
  ⑥ <a href="https://github.com/bisu8018/p2p_exchange_front_end/tree/develop/src/views">views</a> : vue 파일<br>
  ⑦ <a href="https://github.com/bisu8018/p2p_exchange_front_end/tree/develop/src/vuex">vuex</a> : vuex 관련 스크립트 파일<br>
  
### Vue 소스코드 관리 (<a href="https://github.com/bisu8018/p2p_exchange_front_end/tree/develop/src/views/home/body/login">로그인</a> 페이지 예시)
<image src="desc/images/login.png" style="width: 150px;">
  
#### 템플렛 (template)
<image src="desc/images/login_template.png" style="width: 150px;">

① Grid, Gutter 준수 위해, Vuetify에서 제공하는 태그로 전체 레이아웃 적용<br>
② 인증 슬라이더와 같은 다수 페이지 공통 컴포넌트 이용 시, <a href="https://github.com/bisu8018/p2p_exchange_front_end/tree/develop/src/components">
  공통 컴포넌트화</a> 작업 진행 및 사용
  
#### 스크립트 (script)
<image src="desc/images/login_script.png" style="width: 150px;">

① Vue 속성 순서 규칙화 (name -> data -> components -> computed -> 상태 이벤트(created, mounted 등등) -> methods)<br>
② 다수 페이지에서 사용되는 함수, <a href="https://github.com/bisu8018/p2p_exchange_front_end/blob/develop/src/common/common.ts">
  공통화 작업</a> 진행 및 사용
  
#### 스타일 (style)
<image src="desc/images/login_style.png" style="width: 150px;">

① 디자인팀에서 정한 양식 기준으로 작성된 CSS 및 공통 CSS, <a href="https://github.com/bisu8018/p2p_exchange_front_end/blob/develop/src/App.vue">App.vue</a>에서 공통 관리 <br>
② Vuetify, 공통 CSS의 수정이 필요한 예외적인 경우만 추가 선언<br>

### Vuex 관리 (<a href="https://github.com/bisu8018/p2p_exchange_front_end/tree/develop/src/vuex">vuex repository</a>)
<image src="desc/images/vuex_structure.PNG" style="width: 150px;">

  ① <a href="https://github.com/bisu8018/p2p_exchange_front_end/tree/develop/src/vuex/config">config</a> : vuex 상태, 타입 값 선언<br>
  ② <a href="https://github.com/bisu8018/p2p_exchange_front_end/tree/develop/src/vuex/controller">controller</a> : vuex 상태 호출 함수 선언<br>
  ③ <a href="https://github.com/bisu8018/p2p_exchange_front_end/tree/develop/src/vuex/model">model</a> : 데이터 모델화<br>
  ④ <a href="https://github.com/bisu8018/p2p_exchange_front_end/tree/develop/src/vuex/modules">modules</a> : vuex 상태 관리 (변이, 액션)<br>
  ⑤ <a href="https://github.com/bisu8018/p2p_exchange_front_end/blob/develop/src/vuex/MainRepository.ts">MainRepository</a> : 데이터 통신 및 vuex 작업 전체 관리하는 컨트롤러<br>
<br>

### 특이사항
#### Vue js 가상 DOM 업데이트 타이밍 이슈
- Vue js는 데이터 변환을 감지할 때마다, 가상 DOM 업데이트 진행
- 데이터 변환 감지를 못하거나, 데이터 로드/뷰 로드 타이밍이 어긋나 간헐적 에러 발생
- 데이터 관련 작업 완료 후, 가상 DOM 출력하도록 초기화 작업 필요

<image src="desc/images/init_explain.png" style="width: 150px;">
  <a href="https://github.com/bisu8018/p2p_exchange_front_end/blob/develop/src/vuex/MainRepository.ts">1,2 번 소스코드</a><br>
  <a href="https://github.com/bisu8018/p2p_exchange_front_end/blob/develop/src/views/home/Home.vue">3,4 번 소스코드</a>
 <br> 
 <br>
  
#### STOMP websocket 기반 채팅 구축(<a href="images/chat.png">스크린샷</a>)
- STOMP websocket 라이브러리 이용
- 채팅은 거래소 별도 기능으로 타기능에 영향받으면 안되므로, vue 가장 바깥에 구현
- STOMP 함수, eventbus 활용
- 채팅 url 별도 관리

<image src="desc/images/chat_explain.png" style="width: 150px;">
  <a href="https://github.com/bisu8018/p2p_exchange_front_end/blob/develop/src/views/home/body/chat/item/ChatManager.vue">1,2 번 소스코드</a><br>
  <a href="https://github.com/bisu8018/p2p_exchange_front_end/blob/develop/src/config/urlList.ts">3 번 소스코드</a>
 <br> 
 <br>
    
#### 언어 설정(<a href="images/korean.png">한국어</a>, <a href="images/english.png">영어</a>, <a href="images/chinese.png">중국어</a> 스크린샷)
- 언어 설정값 Cookie 기반
- Cookie 없을 시, 브라우저 언어 설정 기준 (<a href="https://github.com/bisu8018/p2p_exchange_front_end/blob/develop/src/common/common.ts">쿠키값 설정 코드</a>)
- 언어셋 plugin 선언 후, 각 코드에 맞는 String 값 인스턴스화
- view 또는 script 단에서 plugin 호출
  
<image src="desc/images/language.png" style="width: 150px;">
  <a href="https://github.com/bisu8018/p2p_exchange_front_end/blob/develop/src/config/localization.ts">1,2 번 소스코드</a><br>
  <a href="https://github.com/bisu8018/p2p_exchange_front_end/tree/develop/src/views/home/body/login">3 번 소스코드</a>
 <br> 
 <br>
