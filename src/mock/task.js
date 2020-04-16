import {COLORS, DESCRIPTION_ITEMS} from "../const.js";
import {getRandomBooleanValue} from "../utils";

const DAYS_VALUE = 8;
const HOURS_VALUE = 23;

const DefaultRepeatingDays = {
  'mo': false,
  'tu': false,
  'we': false,
  'th': false,
  'fr': false,
  'sa': false,
  'su': false,
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
  return Object.assign({}, DefaultRepeatingDays, {
    'mo': getRandomBooleanValue(),
  });
};

const generateTask = () => {
  const dueDate = getRandomBooleanValue() ? null : getRandomDate();

  return {
    description: getRandomItem(DESCRIPTION_ITEMS),
    dueDate: dueDate,
    repeatingDays: dueDate ? DefaultRepeatingDays : generateRepeatingDays(),
    color: getRandomItem(COLORS),
    isArchive: getRandomBooleanValue(),
    isFavorite: getRandomBooleanValue(),
  };
};

const generateTasks = (count) => {
  return new Array(count)
    .fill(``)
    .map(generateTask);
};

export {generateTask, generateTasks};
