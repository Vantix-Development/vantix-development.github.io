document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector(".cc_request_form");

    if (!form) return;

    form.addEventListener("submit", () => {

        const data = new FormData(form);

        const payload = {
            artist: data.get("request[artist]"),
            title: data.get("request[title]"),
            sender: data.get("request[sender]")
        };

        console.log("Song Request:", payload);

        const webhook = "https://discord.com/api/webhooks/1521948838078976200/3yjzbQfZnE1NBzJnBKe9sM9oRXZwS8W6x-0lGtPvIlg1_JYQqDQIcJw2M-PMtCu72gYJ";

        if (webhook) {
            fetch(webhook, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    content: `🎵 **New Song Request**\n🎤 ${payload.artist}\n🎶 ${payload.title}\n👤 ${payload.sender}`
                })
            }).catch(() => {});
        }

        // DO NOT prevent default
        // DO NOT call form.submit()
    });
});
