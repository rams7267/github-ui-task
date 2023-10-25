import {
  ARCHIEVED_LABLE,
  FORK_LABLE,
  MIRRORED_LABLE,
  NAME_LABLE,
  SOURCES_LABLE,
  STARS_LABLE,
  TEMPLATE_LABLE,
  UPDATED_AT_LABLE,
} from "./constants";

export const formatDate = (inputDate) => {
  const date = new Date(inputDate);
  const options = { year: "numeric", month: "short", day: "numeric" };
  return date.toLocaleDateString("en-US", options);
};

export function debounce(func, delay) {
  let timeoutId;

  return function () {
    const context = this;
    const args = arguments;

    clearTimeout(timeoutId);
    timeoutId = setTimeout(function () {
      func.apply(context, args);
    }, delay);
  };
}

export const filterWithSearchTerm = (data = [], searchTerm) => {
  return data?.filter((item) => {
    return (
      searchTerm?.length === 0 ||
      item?.name?.toLowerCase().indexOf(searchTerm?.toLowerCase()) > -1 ||
      item?.description?.toLowerCase().indexOf(searchTerm?.toLowerCase()) > -1
    );
  });
};

export const getSorted = (data = [], sort) => {
  return data?.sort((a, b) => {
    if (sort === STARS_LABLE) return b[sort] - a[sort];
    else if (sort === NAME_LABLE)
      return b[sort]?.toLowerCase() < a[sort]?.toLowerCase();
    else if (sort === UPDATED_AT_LABLE)
      return new Date(b[sort]).getTime() - new Date(a[sort]).getTime();
  });
};

export const getLanguageColor = (language) => {
  const colorMap = {
    HTML: "#e34c26",
    JavaScript: "#f1e05a",
    CSS: "#563d7c",
    // Add more language-color mappings as needed
  };

  const stringToHash = () => {
    let hash = 0;

    for (let i = 0; i < language.length; i++) {
      hash = language.charCodeAt(i) + ((hash << 5) - hash);
    }

    return hash;
  };

  const intToRGB = (i) => {
    const c = (i & 0x00ffffff).toString(16).toUpperCase();
    return "#" + "00000".substring(0, 6 - c.length) + c;
  };

  return colorMap[language] || intToRGB(stringToHash());
};

export const getLables = (lable) => {
  switch (lable) {
    case UPDATED_AT_LABLE:
      return "Last Updated";
    case NAME_LABLE:
      return "Name";
    case STARS_LABLE:
      return "Stars";
    case SOURCES_LABLE:
      return "Sourced";
    case FORK_LABLE:
      return "Forked";
    case ARCHIEVED_LABLE:
      return "Archieved";
    case MIRRORED_LABLE:
      return "Mirrored";
    case TEMPLATE_LABLE:
      return "Templated";
    default:
      return "";
  }
};
