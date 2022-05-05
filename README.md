# 1. Stack
### NestJS
### Postgres

## 커스텀 필드를 메타 데이터라고 칭한다.

## Conventional commit 을 따릅니다.

### Meta(커스텀 필드) 의 소유권은 고객에게 있다.

### 한 사람당 하나의 상점을 열 수 있다는 가정하에 진행하였다. Token 마다 Role 을 부여했다

## Customers
### 1. 회원가입 - /auth/register
- 중복되는 회원가입일 경우 403 error 를 통해 로그인을 진행하도록 한다.
- 비밀번호는 bcrypt 를 이용한 단방향 암호화를 사용한다.
- 고객의 store 는 고객 아이디와 동일하게 uuid 로 자동 생성된다.
- auth 에 회원가입이 있는 이유는 회원가입 또한 서비스를 이용하기 위한 인증단계라고 생각했다.

### 2. 로그인 - /auth/login
- 로그인 시 JWT 토큰을 발행한다.

## 3. 고객 메타 필드 생성 - /customers/meta
1. 현재 존재하는 고객인지 체크한다

