// scroll-timeline polyfill
// https://github.com/flackr/scroll-timeline

import 'https://flackr.github.io/scroll-timeline/dist/scroll-timeline.js';

//
const progress0 = document.querySelector('#progress-0 > div');
const progress1 = document.querySelector('#progress-1 > div');

progress0.animate(
  { transform: ['scaleX(0)', 'scaleX(1)'] },
  {
    duration: 3000,
    fill: 'both',
  }
);

progress1.animate(
  { transform: ['scaleX(0)', 'scaleX(1)'] },
  {
    duration: 10000, // Totally arbitrary!
    fill: 'both',
    timeline: new ScrollTimeline({
      source: document.scrollingElement,
      orientation: 'block',
      // scrollOffsets 특정 스크롤 범위 지정인가? 작동안됨 모르겠음
      scrollOffsets: [new CSSUnitValue(0, 'px'), new CSSUnitValue(0, 'px')],
    }),
  }
);

//
const box0 = document.querySelector('#box-0 > div');
const box1 = document.querySelector('#box-1 > div');

var sbHeight =
  window.innerHeight * (window.innerHeight / document.body.offsetHeight);
// window.pageYOffset - returns the current height of the scrollbar concerning the full height of the document.

// 문서 전체 높이
const dh =
  document.height !== undefined ? document.height : document.body.offsetHeight;
// 뷰포트 높이
const vh = window.innerHeight;
// 스크롤 높이
const st = dh - vh;

const delay = 100 / st;
const duration = 200 / st;
const endDelay = (vh - 200 - 100) / st;
const boxScrollTimeline = new ScrollTimeline({
  source: document.scrollingElement,
  orientation: 'block',
  // scrollOffsets 특정 스크롤 범위 지정인가? 작동안됨 모르겠음
  scrollOffsets: [new CSSUnitValue(100, 'px'), new CSSUnitValue(300, 'px')],
});

box0.animate(
  { transform: ['translateY(0)', 'translateY(100px)'] },
  {
    duration: duration, // Totally arbitrary!
    fill: 'both',
    timeline: boxScrollTimeline,
  }
);
box1.animate(
  { transform: ['translateY(0)', 'translateY(100px)'] },
  {
    duration: duration, // Totally arbitrary!
    fill: 'both',
    timeline: boxScrollTimeline,
    delay: delay,
    endDelay: endDelay,
  }
);

//
const hBox = document.querySelector('#h-box');
const hBoxDiv = document.querySelector('#h-box > div:nth-child(2)');

const hBoxTimeline = new ScrollTimeline({
  source: hBox,
  orientation: 'inline',
});

hBoxDiv.animate(
  {
    transform: [
      'perspective(1000px) rotateX(0deg)',
      'perspective(1000px) rotateX(90deg)',
    ],
  },
  {
    timeline: hBoxTimeline,
  }
);

//
const section0 = document.getElementById('section-0');
const section1 = document.querySelector('#section-1');
const section1Div = document.querySelector('#section-1 > div');

section0.animate(
  {
    opacity: [0, 1],
    clipPath: ['inset(0% 20% 0% 20%)', 'inset(0% 0% 0% 0%)'],
  },
  {
    fill: 'both',
    timeline: new ViewTimeline({
      subject: section0,
    }),
    //
    delay: { phase: 'enter', percent: CSS.percent(0) },
    endDelay: { phase: 'enter', percent: CSS.percent(100) },
    // timeRange: 'enter 20% 80%'
  }
);
//
section1Div.animate(
  {
    transform: ['rotate(0deg)', 'rotate(180deg)'],
  },
  {
    fill: 'both',
    timeline: new ViewTimeline({
      subject: section1,
    }),
    //
    delay: { phase: 'contain', percent: CSS.percent(30) },
    endDelay: { phase: 'contain', percent: CSS.percent(80) },
    // timeRange: 'contain 20% 80%'
  }
);

//
const hScrollContainer = document.getElementById('h-scroll-container');
const hScrollList = document.querySelector('#h-scroll-container > ul');
//
// Adjust wrapper
// - Change height so that we have room to scroll in
// - Add fix to make position: sticky work
hScrollContainer.style.height = `1000vh`;
hScrollContainer.style.overflow = `visible`;

// Adjust content
// - Make it stick to the top
hScrollList.style.position = 'sticky';
hScrollList.style.top = 0;

hScrollList.animate(
  [
    { transform: 'translateX(0)' },
    { transform: `translateX(calc(-100% + 100vw))` },
  ],
  {
    fill: 'both',
    timeRange: 'contain',
    timeline: new ViewTimeline({
      subject: hScrollContainer,
      axis: 'block',
    }),
  }
);
