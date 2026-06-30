const player = document.getElementById("radioPlayer");
const volumeSlider = document.getElementById("volumeSlider");
const volumeValue = document.getElementById("volumeValue");
const statusText = document.getElementById("status");

/* Station Config */
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

/* Load Stream */
player.src = CONFIG.streamUrl;
player.load();

/* Volume */
player.volume = parseFloat(volumeSlider.value);

function updateVolume() {
    const volume = parseFloat(volumeSlider.value);

    player.volume = volume;
    volumeValue.textContent =
        `${Math.round(volume * 100)}%`;
}

updateVolume();
volumeSlider.addEventListener("input", updateVolume);

/* Auto Start */
let started = false;

async function startRadio() {
    if (started) return;

    started = true;

    try {
        statusText.textContent = "Connecting...";
        await player.play();
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

/* Status Events */
player.addEventListener("loadstart", () => {
    statusText.textContent = "Connecting...";
});

player.addEventListener("playing", () => {
    statusText.textContent = "🔴 Live";
});

player.addEventListener("waiting", () => {
    statusText.textContent = "Buffering...";
});

player.addEventListener("stalled", () => {
    statusText.textContent = "Reconnecting...";
});

player.addEventListener("suspend", () => {
    statusText.textContent = "Loading Stream...";
});

player.addEventListener("pause", () => {
    statusText.textContent = "Paused";
});

/* Auto Reconnect */
function reconnectStream() {
    statusText.textContent = "Reconnecting...";

    const wasPlaying = !player.paused;

    player.src =
        CONFIG.streamUrl +
        "?nocache=" +
        Date.now();

    player.load();

    if (wasPlaying) {
        player.play().catch(() => {});
    }
}

player.addEventListener("error", () => {
    reconnectStream();
});

setInterval(() => {
    if (
        player.readyState === 0 ||
        player.networkState ===
            HTMLMediaElement.NETWORK_NO_SOURCE
    ) {
        reconnectStream();
    }
}, 10000);
