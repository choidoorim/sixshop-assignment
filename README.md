# 1. Stack
### NestJS
### Postgres

## Conventional commit 을 따릅니다.

## Customers
### 1. 회원가입 - /auth/register
- 중복되는 회원가입일 경우 403 error 를 통해 로그인을 진행하도록 한다.
- 비밀번호는 bcrypt 를 이용한 단방향 암호화를 사용한다.
- 고객의 store 는 고객 아이디와 동일하게 uuid 로 자동 생성된다.
- auth 에 회원가입이 있는 이유는 회원가입 또한 서비스를 이용하기 위한 인증단계라고 생각했다.