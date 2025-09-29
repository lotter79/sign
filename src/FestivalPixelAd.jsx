import React, { useMemo, useState, useEffect } from 'react'

// ======== 1) CONFIG ========
const FESTIVAL = {
  name: '🌸 2025 봄꽃축제',
  start: '2025-04-12T10:00:00+09:00',
  end: '2025-04-14T21:00:00+09:00',
  location: '한강시 시민공원 일대',
  slogan: '봄바람 타고, 도시 한가운데서!',
  heroImage:
    'https://images.unsplash.com/photo-1520975922284-4f56f3d5ebf6?q=80&w=1470&auto=format&fit=crop',
  ticketUrl: 'https://example.com/tickets',
  mapUrl: 'https://map.naver.com/',
}

const PROGRAMS = [
  { id: 'stage', title: '메인 공연', time: '토·일 18:00', weight: 3, value: 0.9, desc: '아이돌·밴드 라이브' },
  { id: 'parade', title: '플라워 퍼레이드', time: '매일 14:00', weight: 2, value: 0.7, desc: '지역 단체 참여' },
  { id: 'market', title: '지역 마켓', time: '상시', weight: 2, value: 0.6, desc: '푸드/핸드메이드' },
  { id: 'kids', title: '키즈존', time: '상시', weight: 1, value: 0.5, desc: '놀이터·체험' },
  { id: 'fireworks', title: '불꽃쇼', time: '토 20:30', weight: 2, value: 1.0, desc: '강변 불꽃' },
  { id: 'workshop', title: '꽃다발 클래스', time: '1일 4회', weight: 1, value: 0.4, desc: '사전 예약' },
  { id: 'photo', title: '포토스팟', time: '상시', weight: 1, value: 0.3, desc: '랜드마크 배경' },
  { id: 'local', title: '전통공연', time: '일 16:00', weight: 1, value: 0.55, desc: '풍물/민요' },
]

// ======== 2) UTILS ========
function useCountdown(targetIso) {
  const target = useMemo(() => new Date(targetIso).getTime(), [targetIso])
  const [diff, setDiff] = useState(() => target - Date.now())
  useEffect(() => {
    const t = setInterval(() => setDiff(target - Date.now()), 1000)
    return () => clearInterval(t)
  }, [target])
  const total = Math.max(0, diff)
  const days = Math.floor(total / (1000 * 60 * 60 * 24))
  const hours = Math.floor((total / (1000 * 60 * 60)) % 24)
  const minutes = Math.floor((total / (1000 * 60)) % 60)
  const seconds = Math.floor((total / 1000) % 60)
  return { days, hours, minutes, seconds }
}
const valueToBg = (v) => {
  const light = 85 - Math.round(v * 35)
  const sat = 45 + Math.round(v * 35)
  return `hsl(152 ${sat}% ${light}%)`
}
const valueToText = (v) => (v > 0.75 ? 'text-white' : 'text-slate-900')

// ======== 3) COMPONENT (no framer-motion) ========
export default function FestivalPixelAd() {
  const { days, hours, minutes, seconds } = useCountdown(FESTIVAL.start)
  const [active, setActive] = useState(PROGRAMS[0].id)
  const activeItem = PROGRAMS.find((p) => p.id === active) ?? PROGRAMS[0]

  const handleCTA = (type) => {
    const url = type === 'ticket' ? FESTIVAL.ticketUrl : FESTIVAL.mapUrl
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-pink-50 to-white">
      {/* HERO */}
      <header className="relative">
        <img src={FESTIVAL.heroImage} alt="hero" className="h-[38vh] w-full object-cover object-center" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/0" />
        <div className="absolute inset-x-0 bottom-0 px-6 pb-6">
          <div className="max-w-6xl mx-auto flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <h1 className="text-white text-3xl sm:text-5xl font-extrabold drop-shadow">{FESTIVAL.name}</h1>
              <p className="text-white/90 mt-2 text-base sm:text-lg">{FESTIVAL.slogan}</p>
              <p className="text-white/80 text-sm sm:text-base mt-1">
                {new Date(FESTIVAL.start).toLocaleDateString()} – {new Date(FESTIVAL.end).toLocaleDateString()} · {FESTIVAL.location}
              </p>
            </div>
            <div className="bg-white/90 backdrop-blur rounded-2xl p-4 w-full sm:w-auto">
              <div className="text-xs text-slate-500">오픈까지</div>
              <div className="text-2xl sm:text-3xl font-bold tracking-wider tabular-nums">
                {days}일 {hours}:{String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
              </div>
              <div className="mt-3 flex gap-2">
                <button onClick={() => handleCTA('ticket')} className="px-4 py-2 rounded-xl bg-emerald-600 text-white font-semibold shadow">
                  예매하기
                </button>
                <button onClick={() => handleCTA('map')} className="px-4 py-2 rounded-xl bg-white text-slate-900 font-semibold border border-slate-200">
                  오시는 길
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* GRID */}
      <main className="max-w-6xl mx-auto px-6 py-10">
        <h2 className="text-2xl font-bold mb-4">프로그램 한눈에 보기</h2>
        <div className="grid grid-cols-2 sm:grid-cols-6 gap-3">
          {PROGRAMS.map((p) => (
            <button
              key={p.id}
              onMouseEnter={() => setActive(p.id)}
              onFocus={() => setActive(p.id)}
              onClick={() => setActive(p.id)}
              aria-label={`${p.title} 상세보기`}
              className={`relative rounded-2xl p-4 text-left shadow-sm hover:shadow-md outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 transition ${valueToText(p.value)}`}
              style={{
                gridColumn: `span ${Math.min(3, p.weight)}`,
                gridRow: `span ${p.weight === 3 ? 2 : 1}`,
                backgroundColor: valueToBg(p.value),
              }}
            >
              <div className="text-sm/5 font-semibold">{p.title}</div>
              <div className="text-xs opacity-80">{p.time}</div>
            </button>
          ))}
        </div>

        {/* DETAIL */}
        <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="text-lg font-bold">{activeItem.title}</h3>
              <p className="text-sm text-slate-600 mt-1">{activeItem.time}</p>
            </div>
            <span className="inline-flex items-center rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700">
              추천도 {Math.round(activeItem.value * 100)}%
            </span>
          </div>
          <p className="mt-3 text-slate-700 text-sm">{activeItem.desc}</p>
          <div className="mt-4 flex gap-2">
            <button onClick={() => handleCTA('ticket')} className="px-4 py-2 rounded-xl bg-emerald-600 text-white font-semibold shadow">
              이 프로그램 예매
            </button>
            <button onClick={() => handleCTA('map')} className="px-4 py-2 rounded-xl bg-white text-slate-900 font-semibold border border-slate-200">
              전체 일정 보기
            </button>
          </div>
        </section>
      </main>

      <footer className="px-6 pb-12">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="text-sm text-slate-600">© 2025 {FESTIVAL.name} · {FESTIVAL.location}</div>
          <div className="flex gap-2">
            <a href="#" className="text-sm underline">개인정보처리방침</a>
            <a href="#" className="text-sm underline">공지사항</a>
            <a href="#" className="text-sm underline">고객센터</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
