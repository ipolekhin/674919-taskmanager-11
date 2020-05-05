import {createElement} from "../utils";

const createBoardTemplate = () => {
  return (
    `<section class="board container"></section>`
  );
};

export default class Board {
  // Объявляем конструктор
  constructor() {
    this._element = null;
  }

  // Метод возвращает DOM элемент
  getTemplate() {
    // this._task используем для создания шаблона
    return createBoardTemplate();
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
}
