$(function () {
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (!prefersReducedMotion) {
    $("body")
      .css("opacity", 0)
      .animate({ opacity: 1 }, 450);
  }

  const supportsHover = window.matchMedia("(hover: hover) and (pointer: fine)");

  if (!prefersReducedMotion && supportsHover.matches) {
    $("<style>")
      .text(`
        .plan-card.js-plan-hover {
          transform: translateY(-6px) scale(1.015);
          box-shadow: 0 22px 50px rgb(0 0 0 / 27%);
        }
      `)
      .appendTo("head");

    $(".plan-card")
      .on("mouseenter", function () {
        $(this).addClass("js-plan-hover");
      })
      .on("mouseleave", function () {
        $(this).removeClass("js-plan-hover");
      });
  }
});