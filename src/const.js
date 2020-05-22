export const ButtonType = {
  EDIT: `edit`,
  ARCHIVE: `archive`,
  FAVORITES: `favorites`,
};

export const BUTTON_NAMES = [
  ButtonType.EDIT,
  ButtonType.ARCHIVE,
  ButtonType.FAVORITES,
];

export const COLOR = {
  BLACK: `black`,
  YELLOW: `yellow`,
  BLUE: `blue`,
  GREEN: `green`,
  PINK: `pink`,
};

export const COLORS = Object.values(COLOR);

export const DaysType = {
  MO: `mo`,
  TU: `tu`,
  WE: `we`,
  TH: `th`,
  FR: `fr`,
  SA: `sa`,
  SU: `su`
};

export const DAY_NAMES = [
  DaysType.MO,
  DaysType.TU,
  DaysType.WE,
  DaysType.TH,
  DaysType.FR,
  DaysType.SA,
  DaysType.SU,
];

export const DESCRIPTION_ITEMS = [
  `Изучить теорию`,
  `Сделать домашку`,
  `Пройти интенсив на соточку`,
];

export const FilterType = {
  ALL: `all`,
  OVERDUE: `overdue`,
  TODAY: `today`,
  FAVORITES: `favorites`,
  REPEATING: `repeating`,
  ARCHIVE: `archive`
};

export const FILTER_NAMES = [
  FilterType.ALL,
  FilterType.OVERDUE,
  FilterType.TODAY,
  FilterType.FAVORITES,
  FilterType.REPEATING,
  FilterType.ARCHIVE,
];

export const Keys = {
  ESCAPE: `Escape`,
  ESC: `Esc`,
};

export const MenuType = {
  NEW_TASK: `+ ADD NEW TASK`,
  TASK: `TASKS`,
  STATISTIC: `STATISTICS`,
};

export const MENU_NAMES = [
  MenuType.NEW_TASK,
  MenuType.TASK,
  MenuType.STATISTIC,
];

export const Mode = {
  DEFAULT: `default`,
  EDIT: `edit`,
};

export const SortType = {
  DEFAULT: `DEFAULT`,
  DATE_UP: `DATE up`,
  DATE_DOWN: `DATE down`,
};

export const SORT_NAMES = [
  SortType.DEFAULT,
  SortType.DATE_UP,
  SortType.DATE_DOWN,
];

export const TagsSortType = {
  DEFAULT: `default`,
  DATE_UP: `date-up`,
  DATE_DOWN: `date-down`,
};

export const TAGS_SORT_NAME = [
  TagsSortType.DEFAULT,
  TagsSortType.DATE_UP,
  TagsSortType.DATE_DOWN,
];

export const TagsMenuType = {
  NEW_TASK: `new-task`,
  TASK: `task`,
  STATISTIC: `statistic`,
};

export const TAGS_MENU_NAME = [
  TagsMenuType.NEW_TASK,
  TagsMenuType.TASK,
  TagsMenuType.STATISTIC,
];
