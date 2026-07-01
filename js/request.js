document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector(".cc_request_form");

    if (!form) return;

    form.addEventListener("submit", () => {
        setTimeout(() => {
            const data = new FormData(form);

            console.log("Song Request:", {
                artist: data.get("request[artist]"),
                title: data.get("request[title]"),
                sender: data.get("request[sender]")
            });
        }, 500);
    });
});
