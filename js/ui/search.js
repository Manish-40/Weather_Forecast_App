// FEATURE 1 – Search
// Owner: Contributor 1
import { searchAndLoad } from "../actions.js";

export function initSearch(root) {
  root.innerHTML = `
    <form class="search" role="search">
      <input class="search__input" name="q" type="search"
             placeholder="Search a city, e.g. Mumbai" aria-label="City name" autocomplete="off" />
      <button class="search__button" type="submit">Search</button>
    </form>
    <!-- TODO (Feature 1): "Use my location" button and recent searches list -->
  `;

  root.querySelector("form").addEventListener("submit", (e) => {
    e.preventDefault();
    searchAndLoad(new FormData(e.target).get("q"));
  });
}
