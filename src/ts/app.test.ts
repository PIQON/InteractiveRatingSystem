import { JSDOM } from "jsdom";
import path from "path";
import { readFileSync } from "fs";

const htmLDocPath = path.join(process.cwd(), "index.html");
const htmlDocContent = readFileSync(htmLDocPath).toString();

let dom;

beforeEach(() => {
  dom = new JSDOM(htmlDocContent);
  const { window } = dom;

  global.document = window.document;
});

describe("Rating System Test", () => {
  it("Should correct render initially", () => {
    const ratingContainer = document.querySelector(".rating");
    // const summaryContainer = document.querySelector(".summary");

    expect(ratingContainer).toBeDefined();
  });
});
