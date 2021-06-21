# 1. 소개

## 기술스택
+ DB: Mysql 
+ backend: express 
+ frontend: react, redux 
+ deploy: nginx, docker, jenkins
## 기능 설명
+ 유저 로그인, 회원가입
+ 유저 authentication에 따른 feed CRUD

# 2. 강조하고 싶은 점
+ Docker와 jenkins를 이용한 무중단 배포
+ Swagger를 통한 api 명세
+ docker volume을 통한 ssl 인증서 활용

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
### post
+ POST /api/feeds
+ GET /api/feeds
+ GET /api/feeds/:id
+ PUT /api/feeds/:id
+ DELETE /api/feeds/:id

## 3.2 architecture
router -> controller -> services -> DB

## 3.3 directory structure


# 4. frontend architecture

