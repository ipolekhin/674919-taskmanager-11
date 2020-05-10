import {SORT_NAMES, TAGS_SORT_NAME} from "../const";
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
  getTemplate() {
    return createSortTemplate();
  }
}
