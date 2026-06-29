const player = document.getElementById("radioPlayer");
const volumeSlider = document.getElementById("volumeSlider");
const volumeValue = document.getElementById("volumeValue");
const statusText = document.getElementById("status");

volumeSlider.addEventListener("input", () => {
    player.volume = volumeSlider.value;
    volumeValue.textContent =
        Math.round(volumeSlider.value * 100) + "%";
});

document.title = CONFIG.stationName;

document.getElementById("stationName").textContent =
    CONFIG.stationName;

document.getElementById("stationSubtitle").textContent =
    CONFIG.stationSubtitle;

document.getElementById("stationLogo").src =
    CONFIG.logo;

document.getElementById("favicon").href =
    CONFIG.favicon;

document.getElementById("discordButton").href =
    CONFIG.discordInvite;

document.getElementById("streamSource").src =
    CONFIG.streamUrl;

player.load();

volumeSlider.addEventListener("input", () => {
    player.volume = volumeSlider.value;
});

let started = false;

async function startRadio() {
    if (started) return;

    started = true;

    try {
        await player.play();
        statusText.textContent = "🔴 Live";
    } catch (err) {
        console.error(err);
        statusText.textContent =
            "Unable to connect to stream";
    }
}

if (CONFIG.autoPlayOnInteraction) {
    document.addEventListener(
        "click",
        startRadio,
        { once: true }
    );

    document.addEventListener(
        "touchstart",
        startRadio,
        { once: true }
    );
}

player.addEventListener("error", () => {
    statusText.textContent =
        "Stream Offline";
});
