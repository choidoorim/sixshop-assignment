### :file_folder: 디렉토리 구조
```bash
📂 lib
 ├── 📂 config 
 ├── 📂 constants
 ├── 📂 prisma
 ├── 📂 utils 
      └── 📂 guard
      └── 📂 strategy
      └── 📄 bcrypt.ts
      └── 📄 jwt-token.decorator.ts
📂 prisma 
      └── 📄 schema.prisma
📂 src
 └── 📂 admin 
      ├── 📂 dto
          ├── 📄 get-store-token-response.dto.ts
          ├── 📄 index.ts
      ├── 📂 respository
          ├── 📄 admin.repository.ts
          ├── 📄 stores.repository.ts
          ├── 📄 index.ts
      ├── 📄 admin.controller.decorator.ts
      ├── 📄 admin.controller.ts
      ├── 📄 admin.module.ts
      ├── 📄 admin.service.ts
 └── 📂 authentication 
      └── 📂 auth 
          ├── 📂 dto
              ├── 📄 create-admin-request.dto.ts
              ├── 📄 login-admin-response.dto.ts
              ├── 📄 index.ts
          ├── 📂 type
              ├── 📄 index.ts
          ├── 📄 admin.controller.decorator.ts
          ├── 📄 admin.controller.ts
          ├── 📄 admin.module.ts
          ├── 📄 admin.service.ts
      ├── 📄 authentication.module.ts
 └── 📂 customers
      └── 📂 custom-fields
          ├── 📂 dto
              ├── 📄 create-customer-custom-fields-request.dto.ts
              ├── 📄 delete-customers-custom-fields-request.dto.ts
              ├── 📄 get-customer-response.dto.ts
              ├── 📄 index.ts
          ├── 📂 repository
              ├── 📄 customers-custom-fields.repository.ts
              ├── 📄 customers-custom-fields-data.repository.ts
          ├── 📄 customers-custom-fields.controller.decorator.ts
          ├── 📄 customers-custom-fields.controller.ts
          ├── 📄 customers-custom-fields.module.ts
          ├── 📄 customers-custom-fields.service.ts
      ├── 📂 dto
          ├── 📄 create-customer-request.dto.ts
          ├── 📄 get-customer-request.dto.ts
          ├── 📄 get-customer-response.dto.ts
          ├── 📄 index.ts
      ├── 📂 type
          ├── 📄 index.ts
      ├── 📄 customers.controller.decorator.ts
      ├── 📄 customers.controller.ts
      ├── 📄 customers.module.ts
      ├── 📄 customers.repository.ts
      ├── 📄 customers.service.ts
 └── 📂 orders
      ├── 📂 dto
          ├── 📄 create-order-request.dto.ts
          ├── 📄 index.ts
      ├── 📄 orders.controller.decorator.ts
      ├── 📄 orders.controller.ts
      ├── 📄 orders.module.ts
      ├── 📄 orders.repository.ts
      ├── 📄 orders.service.ts
 └── 📂 products
      ├── 📂 dto
          ├── 📄 create-product-request.dto.ts
          ├── 📄 index.ts
      ├── 📄 orders.controller.decorator.ts
      ├── 📄 orders.controller.ts
      ├── 📄 orders.module.ts
      ├── 📄 orders.repository.ts
      ├── 📄 orders.service.ts
 └── 📂 shared
     ├── 📂 dto
         ├── 📄 admin-jwt-request.dto.ts
         ├── 📄 store-jwt-request.dto.ts
         ├── 📄 index.ts
     ├── 📄 validate.ts
     ├── 📄 parse.ts
     ├── 📄 index.ts
 └── 📄 app.module.ts
 └── 📄 main.ts
 📄 .env
```

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

## Admin
### 1. 회원가입 - /auth/register O
- 회원가입 시에 기간이 없는 store token 을 발급한다. 해당 토큰에는 store id 값이 들어가 있다.
- Store 테이블에 들어가 있는 token 컬럼의 값들에는 store id 값이 들어가 있다.

### 2. 로그인 - /auth/login O
- 로그인 시 admin 에서 사용할 수 있는 JWT 토큰을 발행한다.
- Jwt 토큰에는 admin id 와 store id 를 함께 추가해서 암호화 한다.

### 3. 상점 Token 조회 API O
- 개인의 상점에서 고객, 상품, 주문 기능을 사용하기 위한 Token 이 존재하는데 이 Token 을 조회하는 기능이다.

## Customers-meta
## 1. 고객 메타 필드 생성 - /customers/custom-fields
1. 현재 존재하는 상점인지 체크한다
2. 커스텀 필드의 key 이름의 수정은 기존에 추가한 필드의 목적을 잃기 때문에 안되는 것으로 생각했다.

## 2. 고객 커스텀 필드 삭제 - /customers/custom-fields
1. 고객 커스텀 필드 삭제 시, 그와 관련된 모든 데이터들을 같이 삭제해줘야 할까?

## Customers
### 1. 회원가입 - /customers
1. 특정 상점에 고객이 회원가입을 할 때는 해당 상점에 추가해야 될 커스텀 필드가 있는지 validation 을 진행한 뒤 생성한다.

### 2. 회원정보 조회 - /customers/:customerId
1. 기본적인 사용자의 정보와 custom field Data 가 있을 경우 그것도 같이 보여줘야 한다.