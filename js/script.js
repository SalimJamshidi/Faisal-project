$(function () {
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (!prefersReducedMotion) {
    $("body")
      .css("opacity", 0)
      .animate({ opacity: 1 }, 450);
  }

  const supportsHover = window.matchMedia("(hover: hover) and (pointer: fine)");
  const supportsTouch = window.matchMedia("(hover: none), (pointer: coarse)");

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

  $(".plan-card").on("click", function (event) {
    if (
      !supportsTouch.matches ||
      event.isDefaultPrevented() ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey ||
      (this.target && this.target !== "_self")
    ) {
      return;
    }

    event.preventDefault();

    const card = $(this);
    if (card.data("tapNavigating")) {
      return;
    }
    card.data("tapNavigating", true);

    if (prefersReducedMotion) {
      window.location.assign(this.href);
      return;
    }

    card.stop(true).animate({ opacity: 0.78 }, 100, () => {
      window.location.assign(this.href);
    });
  });
});