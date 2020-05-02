import {createElement} from "../utils";

const createFilterMarkup = (filter, isChecked) => {
  // Деструктуризация
  const {name, count} = filter;
  const checked = isChecked ? `checked` : ``;
  const disabled = !count ? `disabled` : ``;

  return (
    `<input
      type="radio"
      id="filter__${name}"
      class="filter__input visually-hidden"
      name="filter"
      ${checked}
      ${disabled}
    />

    <label for="filter__${name}" class="filter__label">
      ${name} <span class="filter__${name}-count">${count}</span>
    </label>`
  );
};

const createFilterTemplate = (filters) => {
  const filterMarkup = filters
    .map((filter, i) => createFilterMarkup(filter, i === 0))
    .join(`\n`);

  return (
    `<section class="main__filter filter container">
      ${filterMarkup}
    </section>`
  );
};

// Компонент карточки задач
export default class Filter {
  // Объявляем конструктор
  constructor(filters) {
    // Объект записываем в приватное свойство
    this._filters = filters;
    this._element = null;
  }

  // Метод возвращает DOM элемент
  getTemplate() {
    // this._task используем для создания шаблона
    return createFilterTemplate(this._filters);
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
