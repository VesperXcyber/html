const canvas = document.getElementById('starCanvas');
const ctx = canvas.getContext('2d');

let shapes = [];
let W, H;
const mouse = { x: null, y: null, radius: 150 };

function resize() {
  W = canvas.width = window.innerWidth;
  H = canvas.height = window.innerHeight;
  initShapes();
}

// إنشاء المجسمات البيضاء
function initShapes() {
  shapes = [];
  // عدد المجسمات بناءً على حجم الشاشة لضمان الأداء
  const count = Math.floor((W * H) / 12000); 
  
  for (let i = 0; i < count; i++) {
    shapes.push({
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 3 + 1.5, // حجم المجسم البنائي
      speedX: (Math.random() * 0.4 - 0.2), // سرعة بطيئة واحترافية
      speedY: (Math.random() * 0.4 - 0.2),
      originalX: 0,
      originalY: 0
    });
  }
}

function drawBackground() {
  ctx.clearRect(0, 0, W, H);

  // 1. تحريك ورسم المجسمات والخطوط المشتركة
  for (let i = 0; i < shapes.length; i++) {
    let s1 = shapes[i];
    
    // تحريك النقاط
    s1.x += s1.speedX;
    s1.y += s1.speedY;

    // الارتداد عند حواف الشاشة
    if (s1.x < 0 || s1.x > W) s1.speedX *= -1;
    if (s1.y < 0 || s1.y > H) s1.speedY *= -1;

    // التفاعل مع الفأرة (جذب خفيف للمجسمات)
    if (mouse.x !== null && mouse.y !== null) {
      let dxMouse = mouse.x - s1.x;
      let dyMouse = mouse.y - s1.y;
      let distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);
      if (distMouse < mouse.radius) {
        s1.x += dxMouse * 0.02;
        s1.y += dyMouse * 0.02;
      }
    }

    // رسم المجسم (نقطة بيضاء متوهجة خفيفة)
    ctx.beginPath();
    ctx.arc(s1.x, s1.y, s1.r, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.73)';
    ctx.fill();

    // 2. حساب المسافات لربط الخطوط البيضاء بين المجسمات
    for (let j = i + 1; j < shapes.length; j++) {
      let s2 = shapes[j];
      let dx = s1.x - s2.x;
      let dy = s1.y - s2.y;
      let distance = Math.sqrt(dx * dx + dy * dy);

      // إذا كانت المسافة قريبة، ارسم خطاً أبيض شفافاً بينهما
      if (distance < 110) {
        let alpha = (1 - (distance / 110)) * 0.18; // الخطوط تكون خفيفة وأنيقة
        ctx.beginPath();
        ctx.moveTo(s1.x, s1.y);
        ctx.lineTo(s2.x, s2.y);
        ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
        ctx.lineWidth = 0.8;
        ctx.stroke();
      }
    }
  }
}

// ── PARALLAX MOUSE EFFECT ──
document.addEventListener('mousemove', e => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;

  // تأثير تحريك الواجهة بالكامل عكس الفأرة بنعومة
  const mx = (e.clientX / window.innerWidth - 0.5) * 25;
  const my = (e.clientY / window.innerHeight - 0.5) * 18;
  document.documentElement.style.setProperty('--mx', mx + 'px');
  document.documentElement.style.setProperty('--my', my + 'px');
});

document.addEventListener('mouseleave', () => {
  mouse.x = null;
  mouse.y = null;
});

// ── MAIN LOOP ──
function loop() {
  drawBackground();
  requestAnimationFrame(loop);
}

window.addEventListener('resize', resize);
resize();
loop();

// ── عداد الزوار الحقيقي للموقع ──
function updateVisitorCount() {
  const countElement = document.getElementById('visitorCount');
  
  // نستخدم خدمة CountAPI المجانية والآمنة
  // استبدل "sufys_vesper_site" بأي اسم فريد خاص بموقعك لإنشاء مفتاح عداد خاص بك
  const namespace = "sufys_vesper_site";
  const key = "visits";

  fetch(`https://api.countapi.xyz/hit/${namespace}/${key}`)
    .then(response => response.json())
    .then(data => {
      // تحديث الرقم الحقيقي داخل الصفحة بنجاح
      countElement.textContent = data.value;
    })
    .catch(error => {
      console.error("حدث خطأ أثناء جلب عدد الزوار:", error);
      // في حال حدوث مشكلة في الاتصال، نضع رقماً افتراضياً لبقائه جميلاً
      countElement.textContent = "137"; 
    });
}

// تشغيل دالة العداد فور تحميل الصفحة
document.addEventListener("DOMContentLoaded", updateVisitorCount);
// ── تأثير انزلاق واختفاء التبويب من اليمين إلى اليسار ──
const fullTitle = "@ 𝘝𝘌𝘚𝘗𝘌𝘙 "; // النص الأصلي مع مسافة في النهاية للانسيابية
let currentText = fullTitle;
let isDisappearing = true; // تبدأ بحالة الاختفاء تدريجياً
let charIndex = fullTitle.length;

// روابط الأيقونة البنفسجية البرمجية
const purpleVIcon = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Cdefs%3E%3ClinearGradient id='pGlow' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' stop-color='%23c084fc'/%3E%3Cstop offset='100%25' stop-color='%237c3aed'/%3E%3C/linearGradient%3E%3C/defs%3E%3Cpath d='M6,4 L13,24 L16,24 L23,4 L18,4 L14.5,16.5 L11,4 Z' fill='url(%23pGlow)'/%3E%3C/svg%3E";
const faviconLink = document.querySelector("link[rel*='icon']");

// دالة التحريك الاحترافية
function animateTab() {
  if (document.hasFocus()) { // تعمل الحركة فقط إذا كان المستخدم داخل الموقع
    
    if (isDisappearing) {
      // الاختفاء من اليمين إلى اليسار (حذف الحروف من البداية)
      currentText = fullTitle.substring(fullTitle.length - charIndex);
      charIndex--;
      
      if (charIndex < 0) {
        isDisappearing = false; // عند الاختفاء الكامل، انتظر قليلاً ثم اظهر مجدداً
        setTimeout(animateTab, 1500); // مدة البقاء مختفياً (ثانية ونصف)
        return;
      }
    } else {
      // الظهور مجدداً بشكل تدريجي ناعم
      charIndex++;
      currentText = fullTitle.substring(fullTitle.length - charIndex);
      
      if (charIndex >= fullTitle.length) {
        isDisappearing = true;
        setTimeout(animateTab, 4000); // مدة بقاء النص كاملاً قبل أن يختفي مجدداً (4 ثوانٍ)
        return;
      }
    }
    
    document.title = currentText;
  }
  
  // سرعة حركة الحذف والانزلاق (كل 150 ملي ثانية يتم حذف/إظهار حرف)
  setTimeout(animateTab, 150); 
}

// تخصيص النص في حال خرج المستخدم لتبويب آخر ليعود سريعاً
window.addEventListener("blur", () => {
  document.title = "عد إلينا! 👀";
});

window.addEventListener("focus", () => {
  document.title = fullTitle;
  isDisappearing = true;
  charIndex = fullTitle.length;
  if (faviconLink) faviconLink.href = purpleVIcon;
});

// تشغيل الحركة تلقائياً عند تحميل الصفحة
animateTab();