import {MENU_NAMES, MenuType, TAGS_MENU_NAME} from "../const";
import {createElement} from "../utils";

const createMenuMarkup = () => {
  return (MENU_NAMES
    .map((name, index) => {
      return (
        `<input
          type="radio"
          name="control"
          id="control__${TAGS_MENU_NAME[index]}"
          class="control__input visually-hidden">

        <label
          for="control__${TAGS_MENU_NAME[index]}"
          class="control__label ${name === MenuType.NEW_TASK
          ? `control__label--${TAGS_MENU_NAME[index]}` : ``}">
            ${name}
        </label>`
      );
    })
  ).join(`\n`);
};

const createMenuTemplate = () => {
  const menuMarkup = createMenuMarkup();

  return (
    `<section class="control__btn-wrap">
      ${menuMarkup}
    </section>`
  );
};

export default class Menu {
  // Объявляем конструктор
  constructor() {
    this._element = null;
  }

  // Метод возвращает DOM элемент
  getTemplate() {
    // this._task используем для создания шаблона
    return createMenuTemplate();
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
