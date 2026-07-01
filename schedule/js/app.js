/* =========================
   DATA (EDIT HERE ONLY)
========================= */

/* 📅 SCHEDULE */
const scheduleData = [
  { time: "7PM EST - 9PM EST", title: "EMO NIGHT /w Vantix" }
];

/* 🎙️ PRESENTERS */
const presentersData = [
  {
    name: "Vantix",
    role: "Chief Executive Officer",
    image: "https://cdn.discordapp.com/avatars/1078071377401221252/c18e95efc45aff8514d1b8f02211d313.png"
  },
  {
    name: "Laffy",
    role: "Chief Operating Officer",
    image: "https://cdn.discordapp.com/avatars/1418823351312453652/e8317cb908c45a239b00546a3655e791.png"
  },
   {
    name: "Bandit",
    role: "Directors of Operations",
    image: "https://cdn.discordapp.com/avatars/1251639383803560019/1972a62b6007c35255ecee92f5ab2203.png"
  },
   {
    name: "Dom",
    role: "Station Presenter",
    image: "https://cdn.discordapp.com/avatars/1125549199308627988/492503f9c495b7a57e88f2d661fda641.png"
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
