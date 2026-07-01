/* =========================
   DATA (EDIT HERE ONLY)
========================= */

/* 📅 SCHEDULE */
const scheduleData = [
  { time: "08:00 - 10:00", title: "Morning Beats with DJ Nova" },
  { time: "10:00 - 13:00", title: "Chill Zone Mix" },
  { time: "13:00 - 16:00", title: "Afternoon Drive with DJ Vex" },
  { time: "16:00 - 20:00", title: "Live Requests & Top Hits" },
  { time: "20:00 - 00:00", title: "Night EDM Session" }
];

/* 🎙️ PRESENTERS */
const presentersData = [
  {
    name: "Vantix",
    role: "CEO",
    image: "https://cdn.discordapp.com/avatars/1078071377401221252/c18e95efc45aff8514d1b8f02211d313.png"
  },
  {
    name: "Laffy",
    role: "COO",
    image: "https://cdn.discordapp.com/avatars/1418823351312453652/e8317cb908c45a239b00546a3655e791.png"
  }
];

/* =========================
   RENDER FUNCTIONS
========================= */

function loadSchedule() {
  const el = document.getElementById("schedule");
  el.innerHTML = "";

  scheduleData.forEach(show => {
    el.innerHTML += `
      <div class="card">
        <div class="time">${show.time}</div>
        ${show.title}
      </div>
    `;
  });
}

function loadPresenters() {
  const el = document.getElementById("presenters");
  el.innerHTML = "";

  const grid = document.createElement("div");
  grid.className = "grid";

  presentersData.forEach(p => {
    grid.innerHTML += `
      <div class="presenter">
        <img class="avatar" src="${p.image}" alt="${p.name}">
        <div class="name">${p.name}</div>
        <div class="role">${p.role}</div>
      </div>
    `;
  });

  el.appendChild(grid);
}

/* =========================
   TABS SYSTEM
========================= */

document.addEventListener("DOMContentLoaded", () => {
  loadSchedule();
  loadPresenters();

  const buttons = document.querySelectorAll(".tab-btn");

  buttons.forEach(btn => {
    btn.addEventListener("click", () => {
      const tab = btn.dataset.tab;

      document.querySelectorAll(".section")
        .forEach(s => s.classList.remove("active"));

      document.getElementById(tab).classList.add("active");

      buttons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
    });
  });
});
