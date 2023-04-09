import { JSDOM } from "jsdom";
import { readFileSync } from "fs";
import path from "path";

const htmLDocPath = path.join(process.cwd(), "index.html");
const htmlDocContent = readFileSync(htmLDocPath).toString();

let dom;

beforeEach(() => {
  dom = new JSDOM(htmlDocContent);
  const { window } = dom;

  global.document = window.document;
});

describe("Rating System Test", () => {
  it("Should correct render summary and rating initially", () => {
    const ratingContainer = document.querySelector(".rating");
    const summaryContainer = document.querySelector(".summary");

    const hiddenRatingAttribute = ratingContainer?.getAttribute("hidden");
    const hiddenSummaryAttribute = summaryContainer?.getAttribute("hidden");

    expect(ratingContainer).toBeDefined();
    expect(summaryContainer).toBeDefined();
    expect(hiddenRatingAttribute).toBeNull();
    expect(hiddenSummaryAttribute).toBe("");
  });

  it("Should correct change a rating value", () => {
    const ratings = document.querySelectorAll('input[type="radio"');
    const radioLabel = document.querySelector(
      `[for=rating1]`
    ) as HTMLLabelElement;
    const rating = {
      value: 0,
    };

    const setRating = function (rate: number) {
      rating["value"] = rate;
    };

    const changeRating = function (ev: Event) {
      const target = ev.target as HTMLInputElement;
      const targetRating = Number(target.value);

      setRating(targetRating);
    };
    ratings.forEach((rating) => {
      rating.addEventListener("change", (ev) => {
        changeRating(ev);
      });
    });

    expect(rating.value).toBe(0);

    radioLabel.click();

    expect(rating.value).toBe(1);
  });
  it("Should not show a summary when rating is 0", () => {
    const summaryContainer = document.querySelector(".summary");
    const hiddenSummaryAttribute = summaryContainer?.getAttribute("hidden");
    const formButton = document.querySelector(
      ".form--button"
    ) as HTMLButtonElement;

    const rating = {
      value: 0,
    };

    formButton.click();

    expect(rating.value).toBe(0);
    expect(hiddenSummaryAttribute).toBe("");
  });

  it("Should change a UI when rating was sent", () => {
    const ratingContainer = document.querySelector(".rating");
    const summaryContainer = document.querySelector(".summary");
    const ratingElement = document.querySelector("[data-rate]");
    const form = document.querySelector(".form");
    const formButton = document.querySelector(
      ".form--button"
    ) as HTMLButtonElement;

    const rating = {
      value: 3,
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

    form?.addEventListener("submit", (ev) => {
      ev.preventDefault();
      if (!isValidRating()) return;

      changeUI();
    });

    formButton.click();

    const hiddenRatingAttribute = ratingContainer?.getAttribute("hidden");
    const hiddenSummaryAttribute = summaryContainer?.getAttribute("hidden");

    expect(rating.value).toBe(3);
    expect(hiddenSummaryAttribute).toBeNull();
    expect(hiddenRatingAttribute).toBe("true");
    expect(ratingElement!.textContent).toBe(String(rating.value));
  });
});
