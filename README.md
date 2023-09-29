# 오늘의 Health [개인프로젝트]

<div align="center"><h2><a href="https://www.youtube.com/watch?v=bHAxhtkzwGI">시연 영상</a></h2></div>
<div align="center"><h2><a href="https://www.notion.so/Health-4eb978e518b543678e93060674303409">프로젝트 노션</a></h2></div>
<div align="center"><h2><a href="https://d1icsui2guauqx.cloudfront.net/">Demo</a></h2> <span>ID : test@naver.com / PW : test1234!</span></p></div>

# 프로젝트 소개
   자신의 운동을 기록하며 소통할 수 있는 커뮤니티 입니다. <br/><br/>
  ## 대표 기능  
   - 기록한 운동을 날짜별로 확인가능,
   - 게시물, 댓글 CRUD
   - 채팅기능
   - 위치찾기 기능 

## Install
  * 패키지 : yarn
  * 실행 : yarn dev
<br/>

## 기술 스택
- 프레임워크로 Vite를 사용합니다.
- AWS S3, CloudFront 를 활용하여 CI/CD 배포를 진행하였습니다.
- Firebase 서비스를 이용하여 서버 구축 없이 빠르게 웹개발을 진행하였습니다.
- 로컬 상태관리를 위해 Redux를 사용합니다.
- Css Module를 사용하여 유지보수가 용이합니다.
- TypeScript를 통해 코드의 안정성을 높였습니다.
<br/>

## 시스템 Architecture
![vercel아키텍쳐](https://github.com/jinhyeon0810/team_project_zerobase/assets/121710757/ad5720a5-1822-4e86-92cd-3007ce803723)

<br/>

## Pages

### 1. 로그인 페이지
- 구글로그인, ID/PW 로그인, 비밀번호 찾기 기능
<img src="https://github.com/jinhyeon0810/todayHealth_ts/assets/121710757/f4c17347-3883-4b9c-b0c9-cd24aaa806a4" width="500px"/>


### 2. 회원가입 페이지
 - 아이디 / 패스워드 형식 검사
 - 비밀번호 재확인 기능
 - 닉네임, 프로필 이미지 등록 기능
<img src="https://github.com/jinhyeon0810/todayHealth_ts/assets/121710757/966ac74c-713e-4138-8ed0-70eff85a35ee" width="500px"/>

### 3. 메인 페이지
 - 운동기록 , 채팅기능, 스톱워치 기능
 - 운동을 기록하면 메인페이지에 저장
 <img src="https://github.com/jinhyeon0810/todayHealth_ts/assets/121710757/5daac955-ef33-43c2-8f20-0bbd731a6fb4" width="500px"/>

### 4. 운동 추가, 기록페이지
- 추가페이지 : 제목 검색 가능, 장바구니 담기 기능
<img src="https://github.com/jinhyeon0810/todayHealth_ts/assets/121710757/1a5808a1-60b5-4386-9337-930f69bf68bf" width="500px"/>

<br/><br/>
- 기록페이지 : 운동기록 가능
<img src="https://github.com/jinhyeon0810/todayHealth_ts/assets/121710757/48fb499e-3d12-42cb-bac1-a1da29247ffa" width="500px"/>

### 5. 채팅 페이지
- 실시간 채팅기능 추가
<img src="https://github.com/jinhyeon0810/todayHealth_ts/assets/121710757/7891d065-88ef-4745-b479-b443847a85f6" width="500px"/>

### 6. 게시물 페이지
- 페이지네이션 기능 : grid 사용
- 작성페이지, 상세페이지, 게시물 수정/삭제, 댓글 작성,수정,삭제 기능 추가
<img src="https://github.com/jinhyeon0810/todayHealth_ts/assets/121710757/31abea43-63d9-44eb-9b83-a872b01fed70" width="500px"/>

### 7. 나의 운동 기록 페이지
- 날짜별로 기록한 운동들을 확인 할 수 있고, 기록 삭제 기능 추가
<img src="https://github.com/jinhyeon0810/todayHealth_ts/assets/121710757/26c7906a-5c6d-42e3-920b-ec1647566259" width="500px"/>

### 8. 위치찾기 페이지 
  - 카카오 Open API를 이용하여 지역마다 헬스장 위치 찾기 기능 추가
<img src="https://github.com/jinhyeon0810/todayHealth_ts/assets/121710757/47d53186-6042-429f-93a4-b6cc68383866" width="500px"/>


### 9. 설정 페이지 
  - 닉네임 변경, 로그아웃 기능 추가
<img src="https://github.com/jinhyeon0810/todayHealth_ts/assets/121710757/edc23c81-1c82-4de7-b4f7-6e16df4bca11" width="500px"/>
<br/>

## 프로젝트 회고
2023.09.18 ~ 이후로 전체적인 UI를 수정하였고, 채팅기능을 추가하였습니다.
채팅 기능 부분에 있어 데이터를 어떠한 방식으로 저장하고 불러와야하는지 어려움이 있었습니다.
회원가입 시 userChat이라는 항목을 만들어 채팅 상대방의 정보를 저장하였습니다.
대화방 마다의 고유ID를 생성하여 데이터에 저장하였고, useEffect를 통해 불러왔습니다.

앞으로도 develop 예정입니다.
- 카카오맵API 지도를 보여주는 화면에 길찾기 기능 추가예정
- 로그인 후, 일정 시간이 지나면 자동으로 로그아웃을 구현예정
