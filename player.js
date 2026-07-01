// Vantix Radio Player

document.addEventListener("DOMContentLoaded", () => {

    const player =
        document.getElementById("radioPlayer");

    const playBtn =
        document.getElementById("playBtn");

    const volumeSlider =
        document.getElementById("volumeSlider");

    const volumeValue =
        document.getElementById("volumeValue");

    const status =
        document.getElementById("status");

    const STREAM_URL =
        "https://eu8.fastcast4u.com/proxy/vantixradio/stream";

    let reconnecting = false;

    player.src = STREAM_URL;
    player.preload = "auto";

    /* =========================
       CROSS PAGE MEMORY (ADDED SAFE)
    ========================= */

    const WAS_PLAYING =
        sessionStorage.getItem("vantix_playing") === "true";

    if (WAS_PLAYING) {
        setTimeout(() => {
            player.play().catch(() => {});
        }, 300);
    }

    function savePlayState(isPlaying) {
        sessionStorage.setItem(
            "vantix_playing",
            isPlaying ? "true" : "false"
        );
    }

    /* =========================
       VOLUME
    ========================= */

    const savedVolume =
        localStorage.getItem(
            "vantix_volume"
        );

    if (savedVolume !== null) {

        player.volume =
            parseFloat(savedVolume);

        volumeSlider.value =
            savedVolume;

    } else {

        player.volume = 1;
        volumeSlider.value = 1;
    }

    function updateVolume() {

        const volume =
            parseFloat(
                volumeSlider.value
            );

        player.volume = volume;

        volumeValue.textContent =
            Math.round(
                volume * 100
            ) + "%";

        localStorage.setItem(
            "vantix_volume",
            volume
        );
    }

    updateVolume();

    volumeSlider.addEventListener(
        "input",
        updateVolume
    );

    /* =========================
       PLAY BUTTON
    ========================= */

    async function playRadio() {

        try {

            await player.play();

            savePlayState(true);

        } catch (err) {

            console.error(err);

            status.textContent =
                "Unable to Start Stream";
        }
    }

    function stopRadio() {

        player.pause();

        savePlayState(false);
    }

    playBtn.addEventListener(
        "click",
        async () => {

            if (player.paused) {

                await playRadio();

            } else {

                stopRadio();
            }
        }
    );

    /* =========================
       PLAYER EVENTS
    ========================= */

    player.addEventListener(
        "loadstart",
        () => {

            status.textContent =
                "Connecting...";
        }
    );

    player.addEventListener(
        "playing",
        () => {

            status.textContent =
                "🔴 Live Now Playing";

            playBtn.textContent =
                "⏹ Stop Radio";

            playBtn.classList.add(
                "playing"
            );
        }
    );

    player.addEventListener(
        "pause",
        () => {

            status.textContent =
                "Stopped";

            playBtn.textContent =
                "▶ Play Radio";

            playBtn.classList.remove(
                "playing"
            );
        }
    );

    player.addEventListener(
        "waiting",
        () => {

            status.textContent =
                "Buffering...";
        }
    );

    player.addEventListener(
        "stalled",
        () => {

            reconnectStream();
        }
    );

    player.addEventListener(
        "error",
        () => {

            reconnectStream();
        }
    );

    /* =========================
       RECONNECT
    ========================= */

    function reconnectStream() {

        if (reconnecting)
            return;

        reconnecting = true;

        status.textContent =
            "Reconnecting...";

        const wasPlaying =
            !player.paused;

        player.src =
            STREAM_URL +
            "?t=" +
            Date.now();

        player.load();

        if (wasPlaying) {

            player.play()
                .catch(() => {});
        }

        setTimeout(() => {

            reconnecting = false;

        }, 5000);
    }

    /* =========================
       HEALTH CHECK
    ========================= */

    setInterval(() => {

        if (
            player.readyState === 0 ||
            player.networkState ===
            HTMLMediaElement
                .NETWORK_NO_SOURCE
        ) {

            reconnectStream();
        }

    }, 15000);

    /* =========================
       🎧 NOW PLAYING (ADDED SAFE)
    ========================= */

    const NOW_PLAYING_URL =
        "/status.json";

    async function updateNowPlaying() {

        try {

            const res =
                await fetch(NOW_PLAYING_URL);

            const data =
                await res.json();

            if (data && data.nowPlaying) {

                status.textContent =
                    "🎧 Live Radio Stream: " +
                    data.nowPlaying;
            }

        } catch (err) {

            // silent fail
        }
    }

    setInterval(
        updateNowPlaying,
        15000
    );

    updateNowPlaying();

});
