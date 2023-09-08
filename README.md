# 오늘의 Health [개인프로젝트]

<div align="center"><h2><a href="https://www.notion.so/Health-4eb978e518b543678e93060674303409">프로젝트 노션</a></h2></div>
<div align="center"><h2><a href="https://today-health-ts.vercel.app/">Demo</a></h2> <span>ID : test@naver.com / PW : test1234!</span></p></div>

# 프로젝트 소개
   자신의 운동을 기록하며 소통할 수 있는 커뮤니티 입니다. 

## Install
  * 패키지 : yarn
  * 실행 : yarn dev
<br/>

## 기술 스택
- 프레임워크로 Vite를 사용합니다.
- Vercel을 통해 CI/CD 배포 진행하였습니다.
- Firebase 서비스를 이용하여 서버 구축 없이 빠르게 웹개발을 진행하였습니다.
- 로컬 상태관리를 위해 Redux를 사용합니다.
- Css Module를 사용하여 유지보수가 용이합니다.
- TypeScript를 통해 코드의 안정성을 높였습니다.
<br/>

## 시스템 Architecture
![vercel아키텍쳐](https://github.com/jinhyeon0810/todayHealth_ts/assets/121710757/f08c767b-5d06-4659-be42-9f52c8528938)

<br/>

## Pages

### 1. 메인페이지
  - 메인페이지에 캘린더를 추가하여 지난기록과 오늘의 기록을 한 눈에 비교 가능

<img src="https://github.com/jinhyeon0810/FirstTimeGit/assets/121710757/31cebb94-9634-42d5-bf5a-eee3f8a83dc6" width="500px"/>

  - 드래그 앤 드랍 기능을 이용하여 운동기록 삭제 가능
    
<img src="https://github.com/jinhyeon0810/FirstTimeGit/assets/121710757/2538c8ef-a94b-4148-a107-d648cd2a30b4" width="500px"/>

### 2. 회원가입 페이지
  * 아이디 / 패스워드 형식 검사

  * 비밀번호 재확인 기능

<img src="https://github.com/jinhyeon0810/todayHealth_ts/assets/121710757/070acb81-d707-4d4d-aada-4ae84a076701" width="500px"/>

### 3. 게시물 페이지
  * 제목 기반 검색 기능

   <img src="https://github.com/jinhyeon0810/todayHealth_ts/assets/121710757/c893a184-e17e-4dfb-aed8-0f3869550ed0" width="500px"/>
   
  * 페이지네이션 기능 : Grid를 사용하였습니다
 
<img src="https://github.com/jinhyeon0810/todayHealth_ts/assets/121710757/42a5565f-34ac-4793-a423-7f87dd574d40" width="500px"/>

### 4. 게시물 작성 페이지
  * 카테고리 / 제목 / 내용 / 이미지 등록

<img src="https://github.com/jinhyeon0810/todayHealth_ts/assets/121710757/6fa31499-a6fa-430a-87e1-1bbb03054ef4" width="500px"/>

  * 카테고리 / 제목 / 내용 수정

<img src="https://github.com/jinhyeon0810/todayHealth_ts/assets/121710757/3e140eae-15c5-4a49-9ac5-07df84cf2e16" width="500px"/>


### 5. 위치 페이지 
  - 카카오 오픈 API를 이용하여 지역마다 헬스장 위치 찾기 기능
    
<img src="https://github.com/jinhyeon0810/FirstTimeGit/assets/121710757/04f5e2a0-d010-458d-a3af-74985e12898d" width="500px"/>


### 6. 나의 운동일지 페이지 기능 
  - 날짜 별로 기록했던 운동 확인 가능
    
<img src="https://github.com/jinhyeon0810/FirstTimeGit/assets/121710757/7a423b7a-3e99-4cc8-9036-c4842875c596" width="500px"/>
<br/>

## 프로젝트 회고
지속적으로 develop 중 입니다.
- 카카오맵API 지도를 보여주는 화면에 길찾기 기능 추가예정
- 페이지마다 꽃이 떨어지는 CSS구현하였으나, 더 역동적으로 움직이게끔 수정 예정
- 로그인 후, 일정 시간이 지나면 자동으로 로그아웃을 구현예정
- 실시간 채팅기능 추가 예정
