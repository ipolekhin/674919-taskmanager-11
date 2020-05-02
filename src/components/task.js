import {blockForTaskTemplates} from "../utils.js";
import {BUTTON_NAMES, ButtonType} from "../const";

const createButtonsMarkup = (isArchive, isFavorite) => {
  return BUTTON_NAMES
    .map((name, index) => {
      return (
        `<button type="button"
          class="card__btn card__btn--${name}
          ${name === ButtonType.ARCHIVE && !isArchive ? `card__btn--disabled` : ``
          || name === ButtonType.FAVORITES && !isFavorite ? `card__btn--disabled` : ``}">
          ${name}
        </button>`
      );
    })
    .join(`\n`);
};

const createTaskTemplate = (task) => {
  const {description, dueDate, color, repeatingDays, isArchive, isFavorite} = task;
  const {isDateShowing, date, time, deadlineClass} = blockForTaskTemplates(dueDate);
  const repeatClass = Object.values(repeatingDays).some((element) => element) ? `card--repeat` : ``;
  const buttonMarkup = createButtonsMarkup(isArchive, isFavorite);

  return (
    `<article class="card card--${color} ${repeatClass} ${deadlineClass}">
      <div class="card__form">
        <div class="card__inner">
          <div class="card__control">
            ${buttonMarkup}
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

export {createTaskTemplate};
