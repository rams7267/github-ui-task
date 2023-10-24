export const STARS_LABLE = "stargazers_count";
export const NAME_LABLE = "name";
export const UPDATED_AT_LABLE = "updated_at";
export const OVERVIEW_LABLE = "Overview";
export const REPOSITORIES_LABLE = "Repositories";
export const PROJECTS_LABLE = "Projects";
export const PACKAGES_LABLE = "Packages";
export const STARS_TAB_LABLE = "Stars";
export const ALL_LABLE = "ALL";
export const SOURCES_LABLE = "sources";
export const FORK_LABLE = "fork";
export const ARCHIEVED_LABLE = "archived";
export const MIRRORED_LABLE = "mirror_url";
export const TEMPLATE_LABLE = "is_template";
export const PRIVATE_LABLE = "Private"
export const PUBLIC_LABLE = "Public"

export const Navbar_Items = [
  { icon: "📖", name: OVERVIEW_LABLE },
  { icon: "📑", name: REPOSITORIES_LABLE },
  { icon: "🧮", name: PROJECTS_LABLE },
  { icon: "📦", name: PACKAGES_LABLE },
  { icon: "&#9734;", name: STARS_TAB_LABLE },
];

export const SortOrderElements = [
  { lable: "Last Updated", field: UPDATED_AT_LABLE },
  { lable: "Name", field: NAME_LABLE },
  { lable: "Stars", field: STARS_LABLE },
];

export const TypeFilter = [
  { lable: "ALL", value: ALL_LABLE },
  { lable: "Sources", value: SOURCES_LABLE },
  { lable: "Forks", value: FORK_LABLE },
  { lable: "Archieved", value: ARCHIEVED_LABLE },
  { lable: "Mirrors", value: MIRRORED_LABLE },
  { lable: "Templates", value: TEMPLATE_LABLE },
];
