import {FILTER_NAMES, FilterType} from "../const";

// Функция считатет статиститку фильтра
const calculateFilterStatistics = (tasks) => {
  const date = new Date();

  return tasks.reduce((result, {dueDate, repeatingDays, isArchive, isFavorite}) => {
    const isRepeatingTask = Object.values(repeatingDays).some((element) => element);

    result[FilterType.ALL]++;

    if (dueDate instanceof Date && dueDate < date) {
      result[FilterType.OVERDUE]++;
    }

    if (dueDate instanceof Date && dueDate.getDate() === date.getDate()) {
      result[FilterType.TODAY]++;
    }

    if (isFavorite) {
      result[FilterType.FAVORITES]++;
    }

    if (isRepeatingTask) {
      result[FilterType.REPEATING]++;
    }

    if (isArchive) {
      result[FilterType.ALL]--;
      result[FilterType.ARCHIVE]++;
    }

    return result;
  }, {
    [FilterType.ALL]: 0,
    [FilterType.OVERDUE]: 0,
    [FilterType.TODAY]: 0,
    [FilterType.FAVORITES]: 0,
    [FilterType.REPEATING]: 0,
    [FilterType.ARCHIVE]: 0,
  });
};

const generateFilters = (tasks) => {
  const valuesOfFilterStatistics = calculateFilterStatistics(tasks);
  console.log(valuesOfFilterStatistics);

  return FILTER_NAMES.map((filterName) => {
    return {
      'name': filterName,
      'count': valuesOfFilterStatistics[filterName],
    };
  });
};

export {generateFilters};
