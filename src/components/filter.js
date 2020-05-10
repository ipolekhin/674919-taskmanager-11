import {createElement} from "../utils";
import AbstractComponent from "./abstract-component";

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
export default class Filter extends AbstractComponent {
  constructor(filters) {
    super();

    this._filters = filters;
  }

  // Метод возвращает DOM элемент
  getTemplate() {
    // this._task используем для создания шаблона
    return createFilterTemplate(this._filters);
  }
}
