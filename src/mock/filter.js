import {FILTER_NAMES} from "../const";

const generateFilters = (count) => {
  return FILTER_NAMES.map((it) => {
    return {
      'name': it,
      'count': count[it],
    };
  });
};

export {generateFilters};
