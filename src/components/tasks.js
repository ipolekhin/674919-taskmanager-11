import {createElement} from "../utils";

const createTasksTemplate = () => {
  return (
    `<div class="board__tasks"></div>`
  );
};

export default class Tasks {
  // Объявляем конструктор
  constructor() {
    this._element = null;
  }

  // Метод возвращает DOM элемент
  getTemplate() {
    // this._task используем для создания шаблона
    return createTasksTemplate();
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
