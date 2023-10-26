import React from "react";
import { useDispatch, useSelector } from "react-redux";

import styles from "./Repos.module.scss";
import { SortOrderElements, TypeFilter } from "@/Utils/constants";
import {
  setLanguage,
  setSearchTerm,
  setSort,
  setType,
} from "@/Utils/Redux/repo.slice";
import { debounce } from "@/Utils/helpers";
import Select from "../Select/Select";
import { REPO_IMAGE } from "@/Utils/images";

const Filters = () => {
  const dispatch = useDispatch();
  const { allLanguages, typeFilter, language, sort } = useSelector(
    (state) => state?.repo
  );

  const handleTextChange = debounce((e) => {
    dispatch(setSearchTerm(e?.target?.value || ""));
  }, 1000);

  const handleSortChange = (e) => {
    dispatch(setSort(e));
  };

  const handleLanguageChange = (e) => {
    dispatch(setLanguage(e));
  };

  const handleTypeChange = (e) => {
    dispatch(setType(e));
  };

  return (
    <div className={styles.filters}>
      <button className={styles.newButtonMweb}>{REPO_IMAGE} {" "}New</button>
      <div>
        <input
          type="text"
          placeholder="Find a repository..."
          onChange={handleTextChange}
        />
      </div>
      <div>
        <Select
          lable="Type"
          data={TypeFilter}
          value={typeFilter}
          onSelect={handleTypeChange}
        />
        <Select
          lable="Language"
          data={allLanguages}
          value={language}
          onSelect={handleLanguageChange}
        />
        <Select
          lable="Sort"
          optionLable="Select order"
          data={SortOrderElements}
          value={sort}
          onSelect={handleSortChange}
        />
        <button className={styles.newButtonWeb}>{REPO_IMAGE} {" "}New</button>
      </div>
    </div>
  );
};

export default Filters;
