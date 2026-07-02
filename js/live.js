document.addEventListener("DOMContentLoaded", () => {

    const counter = document.getElementById("listenerCount");

    const STATS_URL =
        "https://eu8.fastcast4u.com/proxy/vantixradio/stats?json=1";

    let intervalStarted = false;

    async function updateListeners() {
        try {
            const res = await fetch(STATS_URL, {
                cache: "no-store"
            });

            if (!res.ok) {
                throw new Error("HTTP Error: " + res.status);
            }

            const data = await res.json();

            const listenersRaw =
                data?.currentlisteners ??
                data?.listeners ??
                data?.active_listeners;

            const listeners = Number(listenersRaw);

            if (counter) {
                counter.textContent =
                    Number.isFinite(listeners) ? listeners : 0;
            }

        } catch (err) {
            if (counter) {
                counter.textContent = "0";
            }
        }
    }

    // initial run
    updateListeners();

    // prevent multiple intervals if script loads twice
    if (!intervalStarted) {
        intervalStarted = true;

        setInterval(() => {
            updateListeners();
        }, 10000);
    }
});
