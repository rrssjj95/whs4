const DAY = 24 * 60 * 60 * 1000;

// 한국 시간(UTC+9) 기준 날짜 생성
function kstDate(year, month, day) {
  return new Date(Date.UTC(year, month - 1, day, 0, 0, 0) - 9 * 60 * 60 * 1000);
}

// 현재 한국 날짜(시/분 제거)
function todayKST() {
  const now = new Date();

  const kst = new Date(
    now.toLocaleString("en-US", {
      timeZone: "Asia/Seoul",
    })
  );

  return kstDate(
    kst.getFullYear(),
    kst.getMonth() + 1,
    kst.getDate()
  );
}

const START = kstDate(2026, 6, 8);
const END = kstDate(2026, 11, 20);

const STAGES = [
  {
    stage: 1,
    start: kstDate(2026, 6, 8),
    end: kstDate(2026, 7, 26),
  },
  {
    stage: 2,
    start: kstDate(2026, 8, 3),
    end: kstDate(2026, 10, 17),
  },
  {
    stage: 3,
    start: kstDate(2026, 10, 22),
    end: kstDate(2026, 11, 20),
  },
];

function diffDays(a, b) {
  return Math.floor((a - b) / DAY);
}

function getStatus() {
  const today = todayKST();

  const startDiff = diffDays(today, START);
  const endDiff = diffDays(END, today);

  const startText =
    startDiff >= 0 ? `Start+${startDiff}` : `Start${startDiff}`;

  const endText =
    endDiff >= 0 ? `End-${endDiff}` : `End+${Math.abs(endDiff)}`;

  // 교육 시작 전
  if (today < START) {
    return {
      stage: 0,
      status: "before",
      message: `📅 교육 시작 전입니다.\n${startText} | ${endText}`,
    };
  }

  // 교육 종료 후
  if (today > END) {
    return {
      stage: 0,
      status: "finished",
      message: `🎉 모든 교육 과정이 종료되었습니다.\n${startText} | ${endText}`,
    };
  }

  // 단계 진행 중
  for (const stage of STAGES) {
    if (today >= stage.start && today <= stage.end) {
      return {
        stage: stage.stage,
        status: "running",
        message:
          `📚 ${stage.stage}단계 진행 중입니다.\n` +
          `${startText} | ${endText}`,
      };
    }
  }

  // 단계 사이
  if (today > STAGES[0].end && today < STAGES[1].start) {
    return {
      stage: 1,
      status: "waiting",
      message:
        `⏳ 1단계가 종료되고 2단계 대기 중입니다.\n` +
        `${startText} | ${endText}`,
    };
  }

  if (today > STAGES[1].end && today < STAGES[2].start) {
    return {
      stage: 2,
      status: "waiting",
      message:
        `⏳ 2단계가 종료되고 3단계 대기 중입니다.\n` +
        `${startText} | ${endText}`,
    };
  }

  return null;
}

module.exports = {
  getStatus,
};
