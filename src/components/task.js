// Импортируем функцию createElement создания эелементов
import {blockForTaskTemplates} from "../utils/common.js";
import {BUTTON_NAMES, ButtonType} from "../const";
import {encode} from "he";
import AbstractComponent from "./abstract-component";

const createButtonsMarkup = (isArchive, isFavorite) => {

  return BUTTON_NAMES
    .map((name) => {
      const archiveClass = name === ButtonType.ARCHIVE && !isArchive ? `card__btn--disabled` : ``;
      const favoritesClass = name === ButtonType.FAVORITES && !isFavorite ? `card__btn--disabled` : ``;

      return (
        `<button type="button"
          class="card__btn card__btn--${name}
          ${archiveClass}
          ${favoritesClass}">
          ${name}
        </button>`
      );
    })
    .join(`\n`);
};

// Функция вовращает html разметку нашей карточки задач
const createTaskTemplate = (task) => {
  const {description: notSanitizedDescription, dueDate, color, repeatingDays, isArchive, isFavorite} = task;
  const {isDateShowing, date, time, deadlineClass} = blockForTaskTemplates(dueDate);
  const description = encode(notSanitizedDescription);
  const repeatClass = Object.values(repeatingDays).some((element) => element) ? `card--repeat` : ``;
  const buttonsMarkup = createButtonsMarkup(isArchive, isFavorite);

  return (
    `<article class="card card--${color} ${repeatClass} ${deadlineClass}">
      <div class="card__form">
        <div class="card__inner">
          <div class="card__control">
            ${buttonsMarkup}
          </div>

          <div class="card__color-bar">
            <svg class="card__color-bar-wave" width="100%" height="10">
              <use xlink:href="#wave"></use>
            </svg>
          </div>

          <div class="card__textarea-wrap">
            <p class="card__text">${description}</p>
          </div>

          <div class="card__settings">
            <div class="card__details">
    ${ isDateShowing ?
      `<div class="card__dates">
        <div class="card__date-deadline">
          <p class="card__input-deadline-wrap">
            <span class="card__date">${date}</span>
            <span class="card__time">${time}</span>
          </p>
        </div>
      </div>` : ``
    }
            </div>
          </div>
        </div>
      </div>
    </article>`
  );
};

// Компонент карточки задач
export default class Task extends AbstractComponent {
  constructor(task) {
    super();

    this._task = task;
  }

  // Метод возвращает DOM элемент
  getTemplate() {
    // this._task используем для создания шаблона
    return createTaskTemplate(this._task);
  }

  setEditButtonClickHandler(handler) {
    this.getElement().querySelector(`.card__btn--edit`)
      .addEventListener(`click`, handler);
  }

  setFavoritesButtonClickHandler(handler) {
    this.getElement().querySelector(`.card__btn--favorites`)
      .addEventListener(`click`, handler);
  }

  setArchiveButtonClickHandler(handler) {
    this.getElement().querySelector(`.card__btn--archive`)
      .addEventListener(`click`, handler);
  }
}
