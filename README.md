# Festival Landing (React + Vite + Tailwind)

지자체 축제 랜딩 페이지 예시입니다. **픽셀형(히트맵 스타일) 프로그램 그리드**와 **카운트다운, 예매/오시는 길 CTA**가 포함되어 있습니다.

## 1) 로컬에서 실행하기
```bash
npm install
npm run dev
# http://localhost:5173 접속
```

## 2) 데이터 수정
- `src/FestivalPixelAd.jsx` 상단의 `FESTIVAL`, `PROGRAMS`를 실제 축제 정보로 바꾸세요.
- 예매/오시는 길 링크(`ticketUrl`, `mapUrl`)도 실제 주소로 수정하세요.

## 3) 추적(선택)
- `index.html` `<head>`에 **GA4** 또는 **Meta Pixel**을 주석 해제하고 ID를 넣으세요.

## 4) GitHub 없이 Vercel에 바로 배포(가장 쉬움)
1. https://vercel.com → 로그인 (Google 계정 추천)
2. 대시보드에서 **Add New... → Project → Import → Upload** 선택
3. 이 폴더를 **ZIP으로 압축**해서 업로드 (아래 'ZIP 만들기' 참고)
4. 자동 빌드/배포 후 `https://{project}.vercel.app` 링크가 생성됩니다.

### ZIP 만들기 (로컬에서)
- Mac: 폴더 우클릭 → “압축”
- Windows: 폴더 우클릭 → “보내기 > 압축(zip) 폴더”

## 5) Netlify로 배포(대안)
1. https://app.netlify.com → 로그인
2. **Add new site → Deploy manually** 선택
3. 로컬에서 `npm run build` 실행 → 생성된 `dist/` 폴더를 **드래그앤드롭**으로 업로드
4. 링크 자동 생성

## 6) 기존 웹사이트에 임베드
이미 운영 중인 홈페이지가 있다면 다음과 같이 iframe으로 삽입 가능합니다.
```html
<iframe src="https://{project}.vercel.app" style="width:100%; height:900px; border:0;"></iframe>
```

## 폴더 구조
```
festival-landing/
├─ public/
│  └─ favicon.ico
├─ src/
│  ├─ App.jsx
│  ├─ FestivalPixelAd.jsx
│  ├─ index.css
│  └─ main.jsx
├─ index.html
├─ package.json
├─ postcss.config.js
└─ tailwind.config.js
```

## 라이선스
MIT
