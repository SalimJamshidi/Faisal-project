// Shared ExerciseDB endpoint used by the exercise search and plan pages.
const API_BASE = "https://oss.exercisedb.dev/api/v1";

// Add shared page animations and workout-card interactions after the DOM is ready.
$(function () {
  // Respect reduced-motion preferences before starting animations.
  const prefersReducedMotion = window
    .matchMedia("(prefers-reduced-motion: reduce)")
    .matches;

  // Fade in the page intro and content as it enters the viewport.
  if (!prefersReducedMotion) {
    // Hide the page before animating it into view.
    $("body")
      .css("opacity", 0)
      .animate({ opacity: 1 }, 450);

    // Reveal each intro heading and paragraph with a staggered delay.
    $(".intro h1, .intro-copy").each(function (index) {
      $(this)
        .css("opacity", 0)
        .delay(index * 160)
        .animate({ opacity: 1 }, 850);
    });

    // Select cards and panels that should fade in when they become visible.
    const revealItems = $(
      ".plan-card, .about-panel, .gallery-item, .access-panel"
    );

    // Use the observer API when supported and there are items to reveal.
    if ("IntersectionObserver" in window && revealItems.length) {
      // Start the selected items hidden until they enter the viewport.
      revealItems.css("opacity", 0);

      // Watch each item and fade it in the first time it becomes visible.
      const revealObserver = new IntersectionObserver(
        (entries, observer) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              // Animate the visible item and stop watching it afterward.
              $(entry.target).animate({ opacity: 1 }, 750);
              observer.unobserve(entry.target);
            }
          });
        },
        // Begin revealing an item slightly before it reaches the viewport.
        { rootMargin: "0px 0px -40px 0px", threshold: 0.12 }
      );

      // Register each selected card or panel with the observer.
      revealItems.each(function () {
        revealObserver.observe(this);
      });
    }
  }

  // Add the card hover treatment only on precise-pointer devices.
  // Detect devices that support a mouse-like hover interaction.
  const supportsHover = window
    .matchMedia("(hover: hover) and (pointer: fine)")
    .matches;
  // Detect touch-first devices so plan links can receive tap feedback.
  const supportsTouch = window
    .matchMedia("(hover: none), (pointer: coarse)")
    .matches;

  // Skip the extra hover animation when motion is reduced or hover is unavailable.
  if (!prefersReducedMotion && supportsHover) {
    // Define a class for the enhanced hover appearance.
    $("<style>")
      .text(`
        .plan-card.js-plan-hover {
          transform: translateY(-6px) scale(1.015);
          box-shadow: 0 22px 50px rgb(0 0 0 / 27%);
        }
      `)
      .appendTo("head");

    // Apply the enhanced class while a pointer is over a plan card.
    $(".plan-card")
      .on("mouseenter", function () {
        $(this).addClass("js-plan-hover");
      })
      // Remove the enhanced class when the pointer leaves the card.
      .on("mouseleave", function () {
        $(this).removeClass("js-plan-hover");
      });
  }

  // Reveal the soft divider as the plans approach or when hovered.
  // Find the workout-plan grid on pages that contain one.
  const plans = $(".plans");

  // Watch the plan grid if IntersectionObserver is available.
  if ("IntersectionObserver" in window && plans.length) {
    // Add the visible-state class when the grid enters the viewport.
    const plansObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Make the divider visible and stop watching this grid.
            $(entry.target).addClass("is-in-view");
            observer.unobserve(entry.target);
          }
        });
      },
      // Trigger slightly before the grid is fully in view.
      { rootMargin: "0px 0px -30px 0px", threshold: 0.05 }
    );

    // Start observing every plan grid found on the page.
    plans.each(function () {
      plansObserver.observe(this);
    });
  // Use scroll and resize checks as a fallback on older browsers.
  } else if (plans.length) {
    // Check whether each plan grid currently overlaps the viewport.
    const checkPlansVisibility = () => {
      plans.each(function () {
        // Read the grid's top and bottom positions relative to the viewport.
        const bounds = this.getBoundingClientRect();
        if (bounds.top < window.innerHeight && bounds.bottom > 0) {
          // Reveal the divider once the grid is visible.
          $(this).addClass("is-in-view");
          // Stop listening after the grid has been revealed.
          $(window).off("scroll resize", checkPlansVisibility);
        }
      });
    };

    // Recheck visibility after scrolling or resizing the window.
    $(window).on("scroll resize", checkPlansVisibility);
    // Check immediately so an already-visible grid is revealed without delay.
    checkPlansVisibility();
  }

  // Also highlight the divider while a pointer hovers over the plan grid.
  if (supportsHover) {
    plans
      .on("mouseenter", function () {
        $(this).addClass("is-hovered");
      })
      // Remove the hover state when the pointer leaves the grid.
      .on("mouseleave", function () {
        $(this).removeClass("is-hovered");
      });
  }

  // Give touch users feedback, then follow the selected plan link.
  // Intercept plan-card taps so the navigation can be animated first.
  $(".plan-card").on("click", function (event) {
    // Leave normal browser behavior for non-touch interactions and modified clicks.
    if (
      !supportsTouch ||
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

    // Prevent immediate navigation while the tap animation runs.
    event.preventDefault();

    // Keep a jQuery reference to the clicked plan card.
    const card = $(this);
    // Ignore additional taps while navigation is already in progress.
    if (card.data("tapNavigating")) {
      return;
    }
    // Mark this card as navigating to prevent duplicate animations.
    card.data("tapNavigating", true);

    // Navigate immediately when the visitor prefers reduced motion.
    if (prefersReducedMotion) {
      window.location.assign(this.href);
      return;
    }

    // Fade the card slightly, then navigate to its destination.
    card.stop(true).animate({ opacity: 0.78 }, 100, () => {
      window.location.assign(this.href);
    });
  });
});


// Search the exercise API by the text entered on the women’s plan page.
async function searchExercises(searchTerm) {
  try {
    // Request up to 12 exercises matching the URL-encoded search text.
    const res = await fetch(`${API_BASE}/exercises/search?search=${encodeURIComponent(searchTerm)}&limit=12`);
    // Parse the API response body as JSON.
    const data = await res.json();
    // Return the exercise list, or an empty list when the API has none.
    return data.data || [];
  } catch (err) {
    // Log a failed search and return no results to the caller.
    console.error("Search error:", err);
    return [];
  }
}

// Load a limited set of exercises for one or more requested body parts.
async function getByBodyPart(bodyPart) {
  try {
    // Ask the API for up to six exercises for the requested body part.
    const res = await fetch(`${API_BASE}/exercises/bodyparts?bodyParts=${bodyPart}&limit=6`);
    // Parse the response and return its exercise data when present.
    const data = await res.json();
    return data.data || [];
  } catch (err) {
    // Log the request error and let the page continue with no exercises.
    console.error("Error:", err);
    return [];
  }
}

// Render exercises in the requested plan-page container.
function displayExercises(exercises, containerId) {
  // Find the page element where these exercises should be displayed.
  const container = document.getElementById(containerId);
  // Stop when the current page does not have that container.
  if (!container) return;

  // Clear old results before displaying the current list.
  container.innerHTML = "";

  // Show a friendly message when the API returned no exercises.
  if (!exercises.length) {
    container.innerHTML = '<p class="text-center">No exercises found 😊</p>';
    return;
  }

  // Build and append a Bootstrap card for each exercise.
  exercises.forEach(ex => {
    // The template includes an optional GIF, exercise name, target muscles, and equipment.
    container.innerHTML += `
      <div class="col-md-6 col-lg-4 mb-4">
        <div class="card h-100 shadow-sm">
          ${ex.gifUrl ? `<img src="${ex.gifUrl}" class="card-img-top" alt="${ex.name}" style="height: 180px; object-fit: cover;">` : ''}
          <div class="card-body">
            <h5 class="card-title">${ex.name}</h5>
            <p class="card-text small mb-1"><strong>Target:</strong> ${(ex.targetMuscles || []).join(', ') || 'N/A'}</p>
            <p class="card-text small"><strong>Equipment:</strong> ${(ex.equipments || []).join(', ') || 'N/A'}</p>
          </div>
        </div>
      </div>
    `;
  });
}

// Handle the women’s plan search form.
async function doSearch() {
  // Find the exercise search input on the women’s plan page.
  const input = document.getElementById('exercise-search');
  // Do nothing if this page does not contain the search form.
  if (!input) return;
  
  // Trim whitespace from the submitted search text.
  const term = input.value.trim();
  // Ignore an empty search instead of making an unnecessary API request.
  if (!term) return;
  
  // Search for matching exercises, then render the results in the page.
  const results = await searchExercises(term);
  displayExercises(results, "female-exercises");
}

// Populate the women’s plan only when its exercise container is present.
// Wait until the document elements are available before checking for the plan.
document.addEventListener("DOMContentLoaded", async () => {
  // Load leg and core exercises only on the page with this results container.
  if (document.getElementById("female-exercises")) {
    // Request leg exercises from the exercise API.
    const legs = await getByBodyPart("legs");
    // Request core/waist exercises from the exercise API.
    const core = await getByBodyPart("waist");
    // Combine both API result lists into one collection.
    const allExercises = [...legs, ...core];
    // Display the combined exercise list in the women’s plan section.
    displayExercises(allExercises, "female-exercises");
  }
});

// News loading and rendering functions for the news page.
async function loadFitnessNews() {
    // Find the element that will hold the loading message and news cards.
    const Container = document.getElementById("news-container");
    if (!Container) return;
    
    // Show an initial loading message when the news section exists.
    if (Container) {
        Container.innerHTML = '<p class="loading-text">Loading fitness news...</p>';
    }

    try {
        // Request up to five English-language health and sports news articles.
        const response = await fetch("https://api.apilayer.net/mediastack/v1/news?access_key=360df136a6f5c875c015f5387d162507&categories=health,sports&limit=5&languages=en");
        // Convert the server response to a JavaScript object.
        const data = await response.json();
        // Log the returned news data for debugging.
        console.log(data);

        // Continue only when the response contains at least one news article.
        if (data.data && data.data.length > 0) {
            // Keep only the title, description, and article URL needed by the page.
            const articles = data.data.map(item => ({
                title: item.title,
                description: item.description || "Click to read the full article",
                url: item.url
            }));
            // Render the simplified article list inside the news container.
            displayNews(articles, Container);
        } else {
            // Let visitors know when the API returned no news items.
            Container.innerHTML = '<p>No news found right now.</p>';
        }
    } catch (error) {
        // Log the request failure and show a readable message in the news section.
        console.log("Error:", error);
        Container.innerHTML = '<p>Could not load news. Please try again later.</p>';
    }
}

// Create the news-card markup and prepare each description for click-to-expand.
function displayNews(articles, container) {
    // Stop if the news container is missing or there are no articles to show.
    if (!container || !articles || articles.length === 0) return;
    
    // Remove the loading message or any previously rendered cards.
    container.innerHTML = "";

    // Add a card containing a title, description, and article link for each item.
    articles.forEach(article => {
        // Insert each article's fields into the card template.
        container.innerHTML += `
            <div class="news-card">
                <h4>${article.title}</h4>
                <p>${article.description}</p>
                <a href="${article.url}" target="_blank" class="news-link">Read full article →</a>
            </div>
        `;
    });

    // Collapse descriptions initially; clicking a card reveals its description.
    $(container).find(".news-card p").hide();
}

// Delegate clicks from the news container so dynamically-added cards work.
$("#news-container").on("click", ".news-card", function (event) {
    // Let article-link clicks follow their URL without toggling the description.
    if ($(event.target).closest(".news-link").length) return;

    // Smoothly expand or collapse the clicked card's description.
    $(this).find("p").first().slideToggle();
});

// Start loading news when this script runs.
loadFitnessNews();







async function loadExercises() {
    const exerciseContainer = document.getElementById("exercise-container");
    
    // ✅ Safety check — only run if element exists on page
    if (!exerciseContainer) return;
    
    // Show loading message
    exerciseContainer.innerHTML = '<p class="loading-text">Loading exercises...</p>';

    try {
        const response = await fetch("https://api.api-ninjas.com/v1/exercises?muscle=biceps", {
            method: "GET",
            headers: {
                "X-Api-Key": "tqINgtj3Dz3SIS9iaPsqH1QzPF3yWp3InUe4NTTe"
            }
        });

        // Handle HTTP errors
        if (!response.ok) {
            throw new Error("HTTP Error: " + response.status);
        }

        const data = await response.json();
        console.log("Exercises data:", data);

        // Display the exercises
        if (data && data.length > 0) {
            exerciseContainer.innerHTML = "";
            
            data.forEach(ex => {
                exerciseContainer.innerHTML += `
                    <div class="exercise-card">
                        <h4>${ex.name}</h4>
                        <p><strong>Muscle:</strong> ${ex.muscle}</p>
                        <p><strong>Type:</strong> ${ex.type}</p>
                        <p><strong>Difficulty:</strong> ${ex.difficulty}</p>
                        <p><strong>Equipment:</strong> ${ex.equipment || "None needed"}</p>
                        <p><strong>Instructions:</strong> ${ex.instructions}</p>
                    </div>
                `;
            });
        } else {
            exerciseContainer.innerHTML = '<p>No exercises found.</p>';
        }

    } catch (error) {
        console.log("Error loading exercises:", error);
        exerciseContainer.innerHTML = '<p>Could not load exercises. Please try again later.</p>';
    }
}

// Run when page loads
document.addEventListener("DOMContentLoaded", loadExercises);




