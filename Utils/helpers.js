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

export const getLables = (lable) => {
  switch (lable) {
    case "updated_at":
      return "Last Updated";
    case "name":
      return "Name";
    case "stargazers_count":
      return "Stars";
    case "sources":
      return "Sourced";
    case "fork":
      return "Forked";
    case "archived":
      return "Archieved";
    case "mirror_url":
      return "Mirrored";
    case "is_template":
      return "Templated";
    default:
      return "";
  }
};
