# ERD
![Sixshop-ERD](https://user-images.githubusercontent.com/63203480/167356414-65ebe4c7-cdda-43af-97ca-5343b84472a4.png)

### 1. Admin, Store
- 하나의 Admin 계정은 하나의 상점을 가질 수 있습니다.
- Store 테이블의 token 을 이용한 인증을 통해 Customer, Product, Order 기능을 사용할 수 있습니다.

### 2. ***(Customer, Product, Order)CustomFields
- Admin 계정의 소유자가 Customer, Product, Order 별로 커스텀필드를 설정할 수 있는 테이블입니다.
- key 컬럼에 커스텀 필드 명칭 대한 데이터를 저장합니다.

### 3. ***(Customer, Product, Order)CustomFiledsData
- 설정한 커스텀 필드에 대한 실제 데이터들이 존재하는 테이블입니다.
- Json 타입의 value 컬럼에 ```{ “value”: data(Int, String, Boolean) }```  해당 형식으로 커스텀 필드 데이터가 저장됩니다.

# 디렉토리 구조
```bash
📂 lib
 ├── 📂 config 
 ├── 📂 constants
 ├── 📂 prisma
 ├── 📂 utils 
      └── 📂 guard
      └── 📂 strategy
      └── 📂 bcrypt
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
         ├── 📄 index.ts
     ├── 📄 validate.ts
     ├── 📄 parse.ts
     ├── 📄 index.ts
 └── 📄 app.module.ts
 └── 📄 main.ts
 📄 .env
```

### libs
공유가 가능한 함수, 객체들을 모아놓은 디렉토리 입니다.

### src
실질적인 도메인에 해당하는 로직들이 있는 디렉토리 입니다.     
각 도메인 별로 디렉토리를 구성하고, 객체 간 역할에 알맞는 책임을 가질 수 있도록 노력했습니다.

### prisma
Database 과 관련된 설정, 테이블에 매핑되는 Data Model 등이 존재하는 디렉토리 입니다. 

# 기술 스택
- Typescript
- NestJS(Express)
- Prisma/Postgresql
- Swagger
- Jwt

# API 목록
- Admin 회원가입 + Store 토큰 발급
- Admin 로그인 + Jwt 토큰 발급
- Admin 상점 토큰 조회
- 고객 커스텀 필드 생성
- 고객 커스텀 필드 목록 조회
- 고객 커스텀 필드 삭제
- 고객 생성
- 고객 정보 조회
- 상품 생성
- 상품 주문

# Code Convention
- [Conventional Commit](https://www.conventionalcommits.org/ko/v1.0.0-beta.4/) 을 준수합니다.
- 폴더 네이밍은 케밥 케이스(kebab-case), 클래스는 파스칼 케이스(PascalCase), 메서드는 camelCase 로 작성합니다.
- Swagger 를 통해 EndPoint 를 확인할 수 있습니다.
- 패키지 관리는 **Yarn** 을 사용합니다.
- 요청과 응답은 DTO 를 통해서 이뤄지고 Validation, 역직렬화, 직렬화를 진행합니다.

# 프로그램 시작방법
### 1. ENV 파일 작성하기
ENV 파일의 요구사항에 알맞게 작성합니다.
```dotenv
# TOKEN
ACCESS_TOKEN_SECRET_KEY=
ADMIN_ACCESS_TOKEN_SECRET_KEY=

ADMIN_ACCESS_TOKEN_EXPIRATION_TIME=

# DATABASE
DATABASE_URL=

# BCRYPT
SALT_ROUNDS=
```

### 2. 패키지 설치하기
```yarn install```

### 3. 프로그램 실행하기
#### 3-1. Database 반영
```
yarn prisma:push:dev
```

#### 3-2. Prisma Client 생성
```
yarn prisma:generate
```

#### 3-3. NestJS 실행
```
yarn start:dev
```

#### http://localhost:3000/api 에서 문서 확인을 할 수 있습니다.

# 기능 소개
## 커스텀 필드
(Customer/Product/Order)CustomFields Table 에는 커스텀 필드의 타입, 키(이름), 필수 여부등의 정보들이 저장됩니다. 
```
...
type - INT, STRING, BOOLEAN 타입의 데이터를 저장
key - 커스텀 필드의 명칭
required - 필수 여부
```
(Customer/Product/Order)CustomFieldsData Table 에는 상점 별 커스텀 필드의 값(value)들이 저장됩니다. 
```
...
value - 커스텀 필드의 값
```

## 주문 Status
```
주문완료: ORDER
배송중: SHIPPING
환불: REFUND
배송완료: ARRIVED
```

## 1. Admin 회원가입 - POST /auth/register
```
1. 이미 존재하는 유저인가?
    Yes - Conflict Exception: 이미 가입된 회원입니다
    No - 다음 단계 진행
2. Bcrypt 를 통한 비밀번호 암호화
3. Admin 유저 데이터 저장 및 상점 Token 생성 후 Store DB 에 저장
4. 회원가입 성공
```

## 2. Admin 로그인 - POST /auth/login
```
1. 존재하는 회원인가?
    No - Notfound Exception: 존재하지 않는 회원입니다.
    Yes - 다음 단계 진행
2. 비밀번호가 일치하는가?
    No - Unauthorized Exception: 비밀번호가 일치하지 않습니다.
    Yes - 다음 단계 진행
3. Access Token 발급 
```

## 3. Admin 상점 토큰 조회 - GET /admin/store/token
```
1. Admin Token 검증
    Yes - 다음 단계 진행
    No - Unauthorized Exception
2. 상점 토큰 조회 후 Return
```

## 4. Customer 커스텀 필드 추가 - POST /customers/custom/fields
```
1. Admin Token 검증
    Yes - 다음 단계 진행
    No - Unauthorized Exception
2. 이미 존재하는 key 값이 있는가?
    Yes - Conflict Exception: 키 값이 중복됩니다.
    No - 다음 단계 진행
3. 커스텀 필드 생성
```

## 5. Customer 커스텀 필드 조회 - GET /customer/custom/fields
```
1. Admin Token 검증
    Yes - 다음 단계 진행
    No - Unauthorized Exception
2. Customer 커스텀 필드 조회
3. 커스텀 필드가 존재하는가?
    Yes - id, type, key 등 데이터 Return
    No - null Return
```

## 6. Customer 커스텀 필드 삭제 - DELETE /customers/custom/fields/{customFieldId}
```
1. Admin Token 검증
    Yes - 다음 단계 진행
    No - Unauthorized Exception
2. 존재하는 커스텀 필드인가?
    Yes - 다음 단계 진행
    No - NotFound Exception: 커스텀 필드가 존재하지 않습니다.
3. 삭제하려는 커스텀 필드의 소유자가 맞는가?
    Yes - 다음 단계 진행
    No - Forbidden Exception: store id 값이 다릅니다 
4. Customer 커스텀 필드를 삭제하면서 관련된 커스텀 필드 데이터들을 함께 삭제
```

## 7. Customer 생성 - POST /customers
```
1. Store Table 의 Token 을 통해 검증
    Yes - 다음 단계 진행
    No - Unauthorized Exception
2. 커스텀 필드가 필요하지 않은데 body 를 통해 커스텀필드 데이터를 요청하고 있는가?
    Yes - BadRequest Exception: 고객 커스텀 필드 데이터가 필요하지 않습니다
    No - 다음 단계 진행
3. 필수인 커스텀 필드가 있는데 body 를 통해 커스텀 필드 데이터를 요청하지 않고 있는가?
    Yes - BadRequest Exception: 고객 커스텀 필드가 필요가 합니다
    No - 다음 단계 진행
4. 요청한 커스텀 필드 데이터들 중에 누락된 필수 커스텀 필드가 존재하는가?
    Yes - BadRequest Exception: 필수 커스텀 필드 ID - ${id} 가 누락됐습니다
    No - 다음 단계 진행
5. 요청한 커스텀 필드의 Id 들이 모두 올바른가?
    Yes - 다음 단계 진행 
    No: BadRequest Exception: 잘못된 커스텀 필드 id 가 존재합니다
6. 커스텀 필드의 타입과 요청하는 커스텀 필드 데이터들의 타입이 일치하는가?
    Yes - 다음 단계 진행
    No - BadRequest Exception: 데이터의 커스텀 필드 타입이 일치하지 않습니다
7. 비밀번호 암호화
8. 고객 생성 및 Customer 커스텀 필드 데이터가 있을 경우 추가로 생성
```

## 8. Customer 조회 - GET /customers/{customerId}
```
1. Store Table 의 Token 을 통해 검증
    Yes - 다음 단계 진행
    No - Unauthorized Exception
2. 고객이 존재하지 않는가?
    Yes - NotFound Exception: 존재하지 않는 고객입니다
    No - 다음 단계 진행
3. 조회하려는 고객을 소유하고 있는 상점이 맞는가?
    Yes - 다음 단계 진행
    No - Forbidden Exception: store id 값이 다릅니다
4. 고객의 커스텀 필드가 있는지 확인한다.
    Yes - 다음 단계 진행
    No - null Return
5. 커스텀 필드의 key 와 커스텀 필드 데이터의 value 를 매핑해준다. 
6. 고객 및 커스텀 필드 데이터(key, value...) 를 Return 
```

## 9. Product 생성 - POST /products
```
1. Store Table 의 Token 을 통해 검증
    Yes - 다음 단계 진행
    No - Unauthorized Exception
2. 상품 생성
```

## 10. 상품 주문 - POST /orders
```
1. 주문 하려는 고객이 존재하는 고객인가?
    Yes - 다음 단계 진행
    No - NotFound Exception: 존재하지 않는 고객입니다
2. 주문하려는 상품이 모두 존재하는가?
    Yes - 다음 단계 진행
    No - NotFound Exception: 존재하지 않는 상품이 있습니다
3. 주문하려는 상품의 금액이 일치하는가?
    Yes - 다음 단계 진행
    No - BadRequest Exception: 상품의 총 금액이 일치하지 않습니다
4. status 가 ORDER 상태로 주문을 생성
```

### 처음에는 store 라는 랜덤한 uuid 를 넣어주는 방식을 생각했다. 그런데 그렇게 되면 누가 커스텀 필드를 작성하고 생성할 것인지에 대한 것이 알 수 없었다.

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