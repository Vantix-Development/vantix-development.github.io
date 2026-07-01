document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("requestForm");
    const result = document.getElementById("result");

    const webhook = "https://discord.com/api/webhooks/1521948838078976200/3yjzbQfZnE1NBzJnBKe9sM9oRXZwS8W6x-0lGtPvIlg1_JYQqDQIcJw2M-PMtCu72gYJ";

    if (!form) return;

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const artist = document.getElementById("artist").value.trim();
        const title = document.getElementById("title").value.trim();
        const sender = document.getElementById("sender").value.trim();

        if (!artist || !title || !sender) {
            result.textContent = "Please fill in all fields.";
            return;
        }

        result.textContent = "Sending request...";

        const payload = {
            content:
`🎵 **New Song Request**
🎤 Artist: ${artist}
🎶 Song: ${title}
👤 Requested by: ${sender}`
        };

        try {
            const res = await fetch(webhook, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            });

            if (res.ok) {
                result.textContent = "✅ Request sent to Discord!";
                form.reset();
            } else {
                result.textContent = "❌ Failed to send request.";
            }
        } catch (err) {
            result.textContent = "❌ Error sending request.";
        }
    });
});
