import {COLORS, DESCRIPTION_ITEMS, DAY_NAMES} from "../const.js";
import {getRandomBooleanValue} from "../utils/common";
import {DaysType} from "../const";

const DAYS_VALUE = 8;
const HOURS_VALUE = 23;
const DEFAULT_REPEATING_DAYS = {
  [DaysType.MO]: false,
  [DaysType.TU]: false,
  [DaysType.WE]: false,
  [DaysType.TH]: false,
  [DaysType.FR]: false,
  [DaysType.SA]: false,
  [DaysType.SU]: false,
};

const getRandomItem = (items) => {
  const randomIndex = getRandomIntegerNumber(0, items.length);

  return items[randomIndex];
};

const getRandomIntegerNumber = (min, max) => {
  return min + Math.floor(Math.random() * (max - min));
};

// Генерируем дату и время от текущего +/- 8
const getRandomDate = () => {
  const targetDate = new Date();
  const sign = getRandomBooleanValue() ? 1 : -1;
  const diffValue = sign * getRandomIntegerNumber(0, DAYS_VALUE);

  targetDate.setDate(targetDate.getDate() + diffValue);
  targetDate.setHours(HOURS_VALUE);

  return targetDate;
};

const generateRepeatingDays = () => {
  return Object.assign({}, ...DAY_NAMES.map((day) =>
    ({[day]: getRandomBooleanValue()})
  ));
};

const generateTask = () => {
  const dueDate = getRandomBooleanValue() ? getRandomDate() : null;

  return {
    // Дата и время или null
    dueDate,
    // уникальный id задачи
    id: String(new Date() + Math.random()),
    color: getRandomItem(COLORS),
    description: getRandomItem(DESCRIPTION_ITEMS),
    isArchive: getRandomBooleanValue(),
    isFavorite: getRandomBooleanValue(),
    // Объект с фиксированными ключами
    repeatingDays: dueDate ? Object.assign({}, DEFAULT_REPEATING_DAYS) : generateRepeatingDays(),
  };
};

const generateTasks = (count) => {
  return new Array(count)
    .fill(``)
    .map(generateTask);
};

export {generateTask, generateTasks};
