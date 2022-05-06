# 1. Stack
### NestJS
### Postgres

## 커스텀 필드를 메타 데이터라고 칭한다.

## Conventional commit 을 따릅니다.

### Meta(커스텀 필드) 의 소유권은 고객에게 있다.

### 한 사람당 하나의 상점을 열 수 있다는 가정하에 진행하였다. Token 마다 Role 을 부여했다

### 고객들에게도 토큰을 발급받아서 바로 사용하는 시스템인줄 알고 착각했다...

### 한번 발급 받은 Store Token 은 재발급할 수 없다. 왜냐하면 Store 테이블의 id 이기 때문이다.

### Store Id 는 Token 으로 암호화 한 뒤에 저장한 뒤에 해당 Token 을 strategy, guard 를 통해서 매번 체크할 수 잇도록 한다. 

### 실질적으로 admin 작업을 제외한 토큰을 사용하기 위해서는 store db 에 token 을 사용해서 인증을 해야 한다.

생성되는 Store ID 를 기존 Clayful 의 토큰?이라고 생각하면 될 것 같다.
메타 필드를 체크할 때 필수 값들을 확인 후, 그에 맞는 type 을 체크해줘야 한다.

## Customers-meta
### 1. 회원가입 - /auth/register

### 2. 로그인 - /auth/login
- 로그인 시 admin 에서 사용할 수 있는 JWT 토큰을 발행한다.
- Jwt 토큰에는 해당 store id key 값도 같이 포함시킨다.

## 3. 고객 메타 필드 생성 - /customers/meta
1. 현재 존재하는 상점인지 체크한다
2. 커스텀 필드의 수정은 기존에 추가한 필드의 목적을 잃기 때문에 안되는 것으로 생각했다.

## 4. 고객 커스텀 필드 삭제 - /customers/meta
1. 고객 커스텀 필드 삭제 시, 그와 관련된 모든 데이터들을 같이 삭제해줘야 할까?

## Customers
### 1. 로그인
1. 로그인 시 JWT 토큰에 store id 를 같이 넣어준다.