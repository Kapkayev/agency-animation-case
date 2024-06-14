gsap.registerPlugin(Observer);

let preview = document.querySelector(".preview-mode");
let previewSection = document.querySelector(".container-header");

let padding = 70; // Значение отступа будет изменяться в зависимости от ширины/типа устройства.

let x = 0;

function move(e) {
  let previewWidth = preview.getBoundingClientRect().width;
  let previewSectionWidth = previewSection.getBoundingClientRect().width;

  const maxX = previewSectionWidth - previewWidth;

  x = Math.max(0, Math.min(maxX, e.x - padding));

  gsap.set(preview, { x: x, z: 0 });
}

function moveDown(progress) {
  let previewSectionWidth = previewSection.getBoundingClientRect().width;

  const offset = (progress / 200) * previewSectionWidth; // Вычисление offset
  let newX = x - offset; // Вычисление newX

  const width = 540 + (((previewSectionWidth - 540) / 100) * progress.toFixed());
  const height = 350 + (((800 - 350) / 100) * progress.toFixed());

  gsap.to(preview, { 
    x: newX,
    width: width,
    height: height,
    ease: 'power2.out',
    onUpdate: () => {
      const maxX = previewSectionWidth - width;
      gsap.set(preview, {x: gsap.utils.clamp(0, maxX, newX),})
    }
  });
}

Observer.create({
  target: window,
  onMove: (e) => move(e),
  onClick: (e) => move(e),
});

Observer.create({
  target: window,
  type: "wheel",
});

let previewSectionWidth = previewSection.getBoundingClientRect().width;
const targetWidth = `calc(100% - ${padding * 2}px)`;

gsap.to(preview, {
  y: '600',
  // width: previewSectionWidth,
  markers: false,
  pin: true,
  scrollTrigger: {
    toggleActions: "play reverse none reverse",
    trigger: ".container-header",
    markers: false,
    start: "top",
    end: "top top-=700",
    scrub: 1,
    scale: 1,
    onUpdate: (self) => {
      const progress = self.progress * 100; // Прогресс в процентах
      moveDown(progress); // Вызов функции moveDown с передачей прогресса
    },
  },
});
