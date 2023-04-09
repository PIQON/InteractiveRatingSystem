type RatingValue = 0 | 1 | 2 | 3 | 4 | 5;

type Rating = {
  value: RatingValue;
};

export const ratingSystem = function () {
  const ratingContainer = document.querySelector(".rating");
  const summaryContainer = document.querySelector(".summary");
  const ratingElement = document.querySelector("[data-rate]");
  const form = document.querySelector(".form");
  const ratings = document.querySelectorAll('input[type="radio"');

  const rating: Rating = {
    value: 0,
  };

  const isValidRating = function () {
    if (!rating["value"]) return false;
    return true;
  };

  const changeUI = function () {
    ratingElement!.textContent = String(rating["value"]);
    ratingContainer?.setAttribute("hidden", "true");
    summaryContainer?.removeAttribute("hidden");
  };

  const setRating = function (rate: RatingValue) {
    rating["value"] = rate;
  };

  const changeRating = function (ev: Event) {
    const target = ev.target as HTMLInputElement;
    const targetRating = Number(target.value) as RatingValue;

    setRating(targetRating);
  };

  ratings.forEach((rating) => {
    rating.addEventListener("change", (ev) => {
      changeRating(ev);
    });
  });

  form?.addEventListener("submit", (ev) => {
    ev.preventDefault();
    if (!isValidRating()) return;

    changeUI();
  });
};
