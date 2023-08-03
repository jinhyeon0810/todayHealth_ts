# todayHealth_ts [개인프로젝트]
## 기획 배경
  오.운.완 이라는 단어가 생길만큼 운동에 대한 수요는 증가하고 있습니다.
  
  수요가 증가한 만큼, 운동을 사랑하는 사람들끼리의 소통 공간을 만들고 싶었습니다.
  
  게시물 이용 시 매번 운동 후 사진 인증이 필수인만큼, 운동에 진심인 사람들을 위한 커뮤니티 입니다. 
  
  ## 기술 스택
  * React 18.2.0
  * Vite 4.3.2
  * TypeScript 5.0.2
  * Router 6.10.0
  * Firebase 9.22.0
  
  ## Install
  * 패키지 : > yarn
  * 실행 : yarn dev

## Pages

### 1. 메인페이지
  * 운동 텍스트 기록 가능
  * 스톱워치 기능


<img src="https://github.com/jinhyeon0810/todayHealth_ts/assets/121710757/c88e1c0a-d257-4a31-b58e-834456a83d21" width="500px"/>



### 2. 회원가입 페이지
  * 아이디 / 패스워드 형식 검사

  * 비밀번호 재확인 기능


<img src="https://github.com/jinhyeon0810/todayHealth_ts/assets/121710757/070acb81-d707-4d4d-aada-4ae84a076701" width="500px"/>

### 3. 게시물 페이지
  * 제목 기반 검색 기능


   <img src="https://github.com/jinhyeon0810/todayHealth_ts/assets/121710757/c893a184-e17e-4dfb-aed8-0f3869550ed0" width="500px"/>
   

  * 페이지네이션 기능
 


<img src="https://github.com/jinhyeon0810/todayHealth_ts/assets/121710757/42a5565f-34ac-4793-a423-7f87dd574d40" width="500px"/>


### 4. 게시물 작성 페이지
  * 카테고리 / 제목 / 내용 / 이미지 등록


<img src="https://github.com/jinhyeon0810/todayHealth_ts/assets/121710757/6fa31499-a6fa-430a-87e1-1bbb03054ef4" width="500px"/>


  * 카테고리 / 제목 / 내용 수정


<img src="https://github.com/jinhyeon0810/todayHealth_ts/assets/121710757/3e140eae-15c5-4a49-9ac5-07df84cf2e16" width="500px"/>


# 2023.07 ~ 이후로 추가한기능
### 1. 메인페이지
  - 메인페이지에 캘린더를 추가하여 지난기록과 오늘의 기록을 한 눈에 비교 가능

<img src="https://github.com/jinhyeon0810/FirstTimeGit/assets/121710757/31cebb94-9634-42d5-bf5a-eee3f8a83dc6" width="500px"/>

  - 드래그 앤 드랍 기능을 이용하여 운동기록 삭제 가능
    
<img src="https://github.com/jinhyeon0810/FirstTimeGit/assets/121710757/2538c8ef-a94b-4148-a107-d648cd2a30b4" width="500px"/>


### 2. 위치 페이지 추가
  - 카카오 오픈 API를 이용하여 지역마다 헬스장 위치 찾기 기능
    
<img src="https://github.com/jinhyeon0810/FirstTimeGit/assets/121710757/04f5e2a0-d010-458d-a3af-74985e12898d" width="500px"/>


### 3. 나의 운동일지 페이지 기능 추가
  - 날짜 별로 기록했던 운동 확인 가능
    
<img src="https://github.com/jinhyeon0810/FirstTimeGit/assets/121710757/7a423b7a-3e99-4cc8-9036-c4842875c596" width="500px"/>


# Project 회고

게시물 등록 페이지 구현 중 내용 저장 후 새로고침 시, 첫 화면이 랜더링 되는 문제를 경험했습니다. 저는 게시물을 작성 후 새로고침을 해도 화면 안에 데이터가 그대로 남아있도록 구현하고 싶었습니다.


첫 게시물 등록하는 화면은 상태관리 함수를 이용하여 editing = true 일때, 게시물 작성 텍스트가 보여지게끔 구현하였습니다. 그리고 데이터를 등록하면 editing=false 로 지정하여 firebase서버에서 받아온 데이터를 화면에 보여지게끔 하였습니다.


아무래도 게시물 등록 페이지 첫 화면이 텍스트만 있는 모습이기에 f5버튼을 누르면, editing=true 로 화면이 랜더링되었고, 그렇기 때문에 등록한 데이터가 화면에서 사라졌습니다.


이는 게시물의 등록페이지, 상세페이지를 따로 분리함으로써 해결하였습니다.

게시물 등록 후 게시물을 볼 수 있는 페이지로 바로 이동할 수 있게끔 구현하였고, 수정 페이지는 게시물의 상세페이지에서 구현하였습니다.

상세페이지는 첫 화면 자체에 텍스트 값이 있었기 때문에  새로고침을 하더라도 데이터 값이 화면에 그대로 보여지게 할 수 있었습니다.


이를 통해 여러 페이지나 컴포넌트들을 만든는 것이 데이터들을 보관하는데 더 용이하다는 것을 깨달았고, 코드 가독성도 훨씬 좋아지는 것을 느꼈습니다.

다만 너무 기본적인 기능 위주로만 구성되어있어 추후 학습을 통해 꾸준히 기능을 추가 할 생각입니다.

## 추가 기능 구현 후 2023.08 ~

제로베이스 개인프로젝트 라는 기회를 통해 처음으로 커뮤니티를 기획부터 개발까지 경험했습니다. 당시에 모든 것이 처음이라 간단한 개발에도 시간 소요가 심했고, 기간 내에 만족할만한 기능들을 모두 넣지 못했습니다.
제로베이스 팀프로젝트를 경험하고 난 후, 다시 프로젝트로 돌아와보니 예전에는 구현하기 까다로웠던 것들이 하나 둘씩 구현이 가능해지기 시작했습니다. 아직 많이 부족하지만  앞으로도 추가 학습을 통해 코드의 가독성, 사용자 편의에 초점을 맞춘 기능들 추가, 성능향상 등 여러가지 시도들을 계속 할 생각입니다.  


