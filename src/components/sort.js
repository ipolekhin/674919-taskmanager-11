import {SORT_NAMES, TAGS_SORT_NAME, TagsSortType} from "../const";
import AbstractComponent from "./abstract-component";

const createSortMarkup = () => {
  return (SORT_NAMES
      .map((name, index) => {
        return (
          `<a
            href="#"
            class="board__filter"
            data-sort-type="${TAGS_SORT_NAME[index]}">
              SORT BY ${name}
          </a>`
        );
      })
  ).join(`\n`);
};

const createSortTemplate = () => {
  const sortMarkup = createSortMarkup();

  return (
    `<div class="board__filter-list">
      ${sortMarkup}
    </div>`
  );
};

export default class Sort extends AbstractComponent {
  constructor() {
    super();
    this._currentSortType = TagsSortType.DEFAULT;
  }

  getTemplate() {
    return createSortTemplate();
  }

  getSortType() {
    return this._currentSortType;
  }

  setSortTypeChangeHandler(handler) {
    this.getElement().addEventListener(`click`, (event) => {
      event.preventDefault();

      if (event.target.tagName !== `A`) {
        return;
      }

      const sortType = event.target.dataset.sortType;

      if (this._currentSortType === sortType) {
        return;
      }

      this._currentSortType = sortType;
      handler(this._currentSortType);
    });
  }
}
