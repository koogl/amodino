const cards = document.querySelectorAll(".card-wrap");

cards.forEach((cardWrap) => {
  const card = cardWrap.querySelector(".card");
  const cardBg = cardWrap.querySelector(".card-bg");

  cardWrap.addEventListener("mousemove", (e) => {
    const rect = cardWrap.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = -((y - centerY) / centerY) * 15;
    const rotateY = -((x - centerX) / centerX) * -15;

    // Parallax offset for the background image
    const offsetX = -((x - centerX) / centerX) * 20;
    const offsetY = -((y - centerY) / centerY) * 20;

    card.style.transform = `
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)
    `;

    // Apply parallax shift to background
    cardBg.style.transform = `translate(${offsetX}px, ${offsetY}px)`;

    // shine effect position
    card.style.setProperty("--x", `${(x / rect.width) * 100}%`);
    card.style.setProperty("--y", `${(y / rect.height) * 100}%`);
  });

  cardWrap.addEventListener("mouseleave", () => {
    card.style.transform = "rotateX(0deg) rotateY(0deg)";
    cardBg.style.transform = "translate(0px, 0px)";
  });

  // Keyboard accessibility support
  cardWrap.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      // Add any click/activation logic here if needed
      // For now, the card is keyboard accessible and focusable
    }
  });
});