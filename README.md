# 1. 소개

## 기술스택
+ DB: Mysql 
+ backend: express 
+ frontend: react, redux 
+ deploy: aws ec2, nginx, docker
## 기능 설명
+ 유저 로그인, 회원가입
+ 유저 authentication에 따른 feed CRUD

# 2. 강조하고 싶은 점
+ Swagger를 통한 api 명세
+ docker volume을 통한 ssl 인증서 활용
+ sql injection 방어를 위한 procedure 사용(insert문에서 제대로 insertId가 반환되지 않는 버그 확인)


# 3. backend
## 3.1 Endpoints
### user
+ POST /api/users
+ POST /api/users/login
+ POST /api/users/profile-image
+ PUT /api/users/profile-image
+ GET /api/users/auth
+ GET /api/users/logout
+ GET /api/users/:id
### feed
+ POST /api/feeds
+ GET /api/feeds
+ GET /api/feeds/:id
+ PUT /api/feeds/:id
+ DELETE /api/feeds/:id

## 3.2 Architecture
router -> controller -> services -> DB
![image](https://user-images.githubusercontent.com/47857304/122750982-27546080-d2ca-11eb-9101-8db90656e0ee.png)
## 3.3 Directory structure
+ Config: 로컬 환경과 배포환경에서 쓸 환경변수들을 정의한 폴더
+ controller: 컨트롤러 폴더
+ middleware: 미들웨어 폴더
+ modules: 직접 정의한 모듈들의 폴더
+ mysql: mysql 연결 정보 폴더
+ router: 라우터 폴더
+ swagger: swagger schema 폴더
+ test: test 폴더
+ upload: 업로드한 사진들의 폴더
## 3.4 DB schema
![Untitled](https://user-images.githubusercontent.com/47857304/122753554-6506b880-d2cd-11eb-9ae1-6351e4c733c3.png)


# 4. frontend 
## 4.1 Directory structure
+ src/_actions: redux actions 폴더
+ src/_reducers: redux ruducers 폴더
+ src/components/views: pages 폴더
+ src/hoc: higher order component  폴더
## 4.2 Used Redux pattern
![reduxFlow](https://user-images.githubusercontent.com/47857304/122754550-c8ddb100-d2ce-11eb-875a-256c69ace70c.png)
참조 https://velopert.com/1225

# 5. 아쉬운 점
+ 시작하면서부터 테스트를 진행하지 못하여 뒤늦게 테스트를 붙여야 하여 사실 상 테스트 코드라고 부르기 부끄러운 상황인 것
+ css 쪽의 지식이 부족하여 괜찮은 ui를 뽑아내지 못한 점
