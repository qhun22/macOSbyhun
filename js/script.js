// =======================
// Đồng hồ taskbar
function updateClock() {
  const now = new Date();
  document.getElementById("clock").textContent = now.toLocaleTimeString();
  document.getElementById("date").textContent = now.toLocaleDateString();
}
setInterval(updateClock, 1000);
updateClock();

// Đồng hồ màn hình khóa
function updateLockTime() {
  const now = new Date();
  const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  document.getElementById("lockTime").textContent = time;
}
setInterval(updateLockTime, 1000);
updateLockTime();

// =======================
// Unlock Desktop
function unlockDesktop() {
  document.getElementById("lockScreen").style.display = "none";
  document.getElementById("desktop").classList.remove("hidden");
  document.getElementById("startupSound").play();
}

// PC: Enter hoặc Space
document.addEventListener("keydown", (e) => {
  if ((e.key === "Enter" || e.key === " ") && !document.getElementById("desktop").classList.contains("hidden")) {
    if (systemOverlay.classList.contains("sleep")) {
      exitSleepIfActive();
    }
  }
});

// Mobile: chạm màn hình
document.getElementById("lockScreen").addEventListener("touchstart", () => {
  unlockDesktop();
});

// Nút Login
document.getElementById("unlockBtn").addEventListener("click", unlockDesktop);

// =======================
// Mở / Đóng app
function openApp(app) {
  document.getElementById(app + "App").classList.remove("hidden");
}
function closeApp(app) {
  document.getElementById(app + "App").classList.add("hidden");
}

// =======================
// Start Menu toggle
function toggleStartMenu() {
  const menu = document.getElementById("startMenu");
  menu.classList.toggle("show");
}

// =======================
// System actions: Sleep / Shutdown / Restart
const systemOverlay = document.getElementById("systemOverlay");
const systemImage = document.getElementById("systemImage");

// 🌙 Sleep
document.querySelector('#startMenu li:nth-child(1)').addEventListener('click', () => {
  systemOverlay.classList.remove("hidden");
  systemOverlay.classList.add("sleep");
  systemImage.src = "images/small6099.png";
  document.getElementById("startMenu").classList.remove("show");

  // Gắn listener thoát sau khi sleep hiển thị
  setTimeout(() => {
    document.addEventListener("click", exitSleepIfActiveOnce, { once: true });
    document.addEventListener("touchstart", exitSleepIfActiveOnce, { once: true });
  }, 300);
});

// ⏻ Shut Down
document.querySelector('#startMenu li:nth-child(2)').addEventListener('click', () => {
  systemOverlay.classList.remove("hidden");
  systemOverlay.classList.remove("sleep");
  systemImage.src = "images/small11116.png";
  document.getElementById("startMenu").classList.remove("show");
});

// 🔁 Restart
document.querySelector('#startMenu li:nth-child(3)').addEventListener('click', () => {
  systemOverlay.classList.remove("hidden");
  systemOverlay.classList.remove("sleep");
  systemImage.src = "images/6101.gif";
  document.getElementById("startMenu").classList.remove("show");

  // Sau 3s quay lại lock
  setTimeout(() => {
    systemOverlay.classList.add("hidden");
    document.getElementById("desktop").classList.add("hidden");
    document.getElementById("lockScreen").style.display = "flex";
  }, 3000);
});

// =======================
// Thoát Sleep khi click/touch/enter (sau delay)
function exitSleepIfActiveOnce() {
  if (systemOverlay.classList.contains("sleep")) {
    systemOverlay.classList.add("hidden");
    systemOverlay.classList.remove("sleep");
    document.getElementById("desktop").classList.add("hidden");
    document.getElementById("lockScreen").style.display = "flex";
  }
}

