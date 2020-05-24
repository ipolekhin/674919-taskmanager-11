import {MENU_NAMES, MenuType, TAGS_MENU_NAME} from "../const";
import AbstractComponent from "./abstract-component";

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

export default class Menu extends AbstractComponent {
  getTemplate() {
    return createMenuTemplate();
  }

  setActiveItem(menuItem) {
    const item = this.getElement().querySelector(`#${menuItem}`);

    if (item) {
      item.checked = true;
    }
  }

  setOnChange(handler) {
    this.getElement().addEventListener(`change`, (evt) => {
      if (evt.target.tagName !== `INPUT`) {
        return;
      }

      const menuItem = evt.target.id;

      handler(menuItem);
    });
  }
}
