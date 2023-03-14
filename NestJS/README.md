# NestJS
- JavaScript나 TypeScript로 서버 애플리케이션 개발 가능한 백엔드 웹 프레임워크
- 웬만한 기능을 내장하고 있고 플러그인을 통해 쉽게 확장 가능
  - DB, typeORM, Config 등 기본 제공
- OOP, IOC, DI, AOP와 같은 트랜드 반영
- 싱글톤 패턴으로 한개의 모듈에 컨트롤러, 서비스 등을 캡슐화하여 최상단 모듈에 연결
  - `@Module`, `@Injectable` 데코레이터로 작성된 모듈들이 싱글톤으로 작동
  - 공유된 자원에 접근하기 위해
  - 새로운 인스턴스를 필요에 따라 매번 생성, 삭제할 필요 없음
    - 직접 인스턴스화를 하게 되면 언제 어느 시점에 메모리를 관리해야 할지 결정하기 어려움
  - 클래스 또는 함수가 어떤 의존성을 갖는지 선언적으로 알 수 있음
  - 어떤 클래스에서든 접근 가능하도록 global scope를 가짐
  - node.js는 싱글스레드로 작동하기에 클래스 인스턴스들이 싱글톤으로 관리가 되어도 성능상 문제가 없고 안전함
    - 후에 scale out하여도, 프로세스마다 분리된 싱글톤 객체를 갖기에 확장에 용이
  - 인스턴스의 lifecycle은 NestJS에 종속되어 처음 실행될 때 모든 싱글톤 객체들이 인스턴스화 되고, 앱이 종료될 떄 수거되는 방식
- 기본적으로 express.js를 기반으로 작동하지만 fastify로 작동 가능

- 방식
    1. 모듈을 재귀를 통해서 단 한번의 호출로 해당 모듈의 자식, 의 자식 모듈을 모두 불러옴
       - 즉, 모듈을 DFS로 모두 찾아 토큰 정보를 찾음
    2. 토큰 정보를 기반으로 실제 인스턴스를 만들어냄

## Provider
- NestJS에서 매우 중요한 개념
- 의존성 주입 원칙에 의존
- 기본 개념은 관계를 설정하기 위해 클래스 내 종속성으로 provider를 주입
- 실제 인스턴스를 만들고 **연결**하는 작업은 NestJS 런타임 시스템에 있음
- `@Injectable` 데코레이터는 Nest IoC 컨테이너에서 관리 가능한 클래스임을 선언하는 메타데이터를 첨부

## Module
- NestJS 애플리케이션에 주입되도록 캡슐화된 코드 집합
- 모듈을 사용하여 특정 작업을 수행하기 위한 사용자 지정 서비스 생성 가능
### Module 상태관리
- 기본적으로 NestJS의 모듈은 싱글톤이므로 모듈을 한 번만 시작
- 모든 모듈에 대해 싱글톤으로 생성하는 것은 엔지니어링 관점에서 과도하게 보일 수 있지만 **구성 요소 수준에서 싱글톤을 초기화**

#### module 범위
- 모듈 내에 저장된 데이터는 자주 변경되지 않으므로 메모리를 절약하고 전체적으로 액세스 가능한 클래스를 만들기 위해 애플리케이션 수준의 싱글톤으로 연기될 수 있음
- `@Module` 데코레이터는 Nest가 애플리케이션 구조를 구성하는데 사용하는 메타데이터 제공
- 각 애플리케이션에는 루트 모듈이라는 하나 이상의 모듈 존재
  - 루트 모듈은 Nest가 애플리케이션 그래프를 빌드하는데 사용하는 시작점

- 모듈은 기본적으로 프로바이더를 캡슐화
- `@Global` 데코레이터가 있는 모듈은 다시 초기화할 필요가 없으므로 코드 및 구성요소 수준에서 중복성을 제거함

1. 공유 애플리케이션 수준 모듈
     - 기본적으로 대부분의 NestJS 모듈
2. 요청 수준 모듈
3. 구성 요소 수준 모듈 또는 임시 모듈

## guards
- 인증된 사용자, 권한 체크는 가장 앞서서 확인되어야 함
- intercetor에 해당 내용 구성 가능하지만
  - interceptor로 구현을 한다면 interceptor decorator에 순서에 맞게 구성을 해야함, 순서가 바뀐다면 안타도 될 로직을 탈 수 도 있음
  - 그를 대비하여 nestjs의 request lifecycle에서 더 앞선 단계인 guard를 사용하여 처리하여 불필요한 자원낭비 방지

## interceptor
- AOP(Aspect Oriented Programming, 관점 지향 프로그래밍)에 영감을 받아 만들어짐
  - Aspect로 모듈화하고 핵심적인 비즈니스 로직에서 분리하여 재사용
- request와 responese시에 중간에서 값을 intercept한 뒤, 보내는 역할
  - nestjs에서의 interceptor는 spring과 같이 pre와, post가 존재하지 않아 요청, 응답시 실행됨
- 추가적인 로직이 필요한 경우 사용
  - Logger 사용에 주로 쓰임
    - Logger의 경우 request에 대한 정보, response에 대한 정보를 logging해야 하기에 구현하기 좋음
    - parameter를 두개를 사용
      - 첫 번째는 ExecutionContext로 현재 상태에 대한 정보
      - 두 번째는 CallHandler이며 Observable 객체
- Interceptor와 Middleware의 차이
  - Middleware는 parameter로 request, response, next 세가지를 받음
    - Nest.js에서 request와 response가 HTTP 위에서 동작하게 설계되어있어 HTTP 통신이 아니면 사용 불가능
    - 반면, Interceptor는 parameter로 ExecutionContext라는 helperClass를 받아 처리하기에 HTTP 이외에도 WebSocket, GraphQl, RPC 위에서도 동작 가능
