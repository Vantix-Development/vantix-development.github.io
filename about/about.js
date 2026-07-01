document.addEventListener("DOMContentLoaded", () => {

    const card =
        document.querySelector(".about-card");

    card.style.opacity = 0;
    card.style.transform = "translateY(20px)";

    setTimeout(() => {
        card.style.transition = "0.6s ease";
        card.style.opacity = 1;
        card.style.transform = "translateY(0)";
    }, 100);

});
