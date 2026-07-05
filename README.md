# whs4

WHS4 교육 일정 상태를 반환하는 간단한 npm 패키지입니다.

## Install

```bash
npm install whs4
```

## Usage

```javascript
const { getStatus } = require("whs4");

console.log(getStatus().message);
```

예시

```
📚 1단계 진행 중입니다.
Start+28 | End-138
```

반환 객체

```javascript
{
  stage: 1,
  status: "running",
  message: "📚 1단계 진행 중입니다.\nStart+28 | End-138"
}
```
