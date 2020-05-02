import {SORT_NAMES, TAGS_SORT_NAME} from "../const";
import {createElement} from "../utils";

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

export default class Sort {
  // Объявляем конструктор
  constructor() {
    this._element = null;
  }

  // Метод возвращает DOM элемент
  getTemplate() {
    // this._task используем для создания шаблона
    return createSortTemplate();
  }

  // Метод удаляет DOM элемент (очистка ресурсов в памяти)
  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
};
