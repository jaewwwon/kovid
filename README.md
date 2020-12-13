# 코비드바이
<https://covid19bye.com/>
코로나바이러스 감염증(COVID-19) 정보 공유 커뮤니티

## 폴더 구조

```
├── README.md - 리드미 파일
│
├── components/ - 리액트 컴포넌트
│ ├── Content/ - 페이지 컨텐츠 폴더
│ ├── Layout/ - 페이지 스타일 폴더
│ └── Popup/ - 레이아웃 팝업 폴더
│
├── containers/ - 리액트 컨테이너
│ ├── App/ - 앱 공통 컨테이너
│ ├── Auth/ - 인증 관련 폴더(비밀번호 찾기, 회원가입, 로그인)
│ ├── Mypage/ - 마이페이지 관련 폴더(닉네임, 비밀번호 변경)
│ └── Post/ - 게시글 관련 폴더(댓글, 좋아요/싫어요)
│
├── hooks/ - 리액트 커스텀 훅 파일 폴더
│
├── pages/ - 각 페이지 담당 컴포넌트 폴더
│ ├── mypage - 마이페이지
│ ├── notice - 공지사항 페이지
│ ├── update - 게시글 수정 페이지
│ ├── user/ - 회원별 페이지 폴더
│ │ ├── comments - 작성한 댓글 리스트 페이지
│ │ └── posts - 작성한 게시글 리스트 페이지
│ ├── view - 게시글 상세 페이지
│ ├── write - 게시글 작성 페이지
│ ├── app - 앱 공통 레이아웃 페이지
│ ├── document - HTML 초기설정 페이지
│ ├── 404 - 404 에러가 발생했을 경우, 보여지는 페이지
│ └── index - 메인페이지
│
├── public/ - 페이지 공통 파일 폴더
├── reducers/ - 리액트 리듀서 폴더
├── sagas/ - 리덕스 사가 폴더
├── store/ - 리덕스 설정 파일
├── util/ - 공통으로 사용되는 자바스크립트 파일 폴더
│
├── .babelrc - babel 설정 파일
├── .env - 환경 변수 설정 파일
├── .gitignore - githup 업로드 제외 설정 파일
├── next.config.js - webpack 설정
└── package.json - npm 설정
```
