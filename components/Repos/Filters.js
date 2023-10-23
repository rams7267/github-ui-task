import React from "react";
import styles from "./Repos.module.scss";
import { SortOrderElements, TypeFilter } from "@/Utils/constants";
import { useDispatch, useSelector } from "react-redux";
import {
  setLanguage,
  setSearchTerm,
  setSort,
  setType,
} from "@/Utils/Redux/repo.slice";
import { debounce } from "@/Utils/helpers";

const Filters = () => {
  const dispatch = useDispatch();
  const { allLanguages, typeFilter, language, sort } = useSelector(
    (state) => state?.repo
  );

  const handleTextChange = debounce((e) => {
    dispatch(setSearchTerm(e?.target?.value || ""));
  }, 1000);

  const handleSortChange = (e) => {
    dispatch(setSort(e.target.value));
  };

  const handleLanguageChange = (e) => {
    dispatch(setLanguage(e.target.value));
  };

  const handleTypeChange = (e) => {
    dispatch(setType(e.target.value));
  };

  return (
    <div className={styles.filters}>
      <button className={styles.newButtonMweb}>NEW</button>
      <div>
        <input
          type="text"
          placeholder="Find a repository"
          onChange={handleTextChange}
        />
      </div>
      <div>
        <select value={typeFilter} onChange={handleTypeChange}>
          {TypeFilter?.map((option, index) => {
            return (
              <option key={`typeOptionSelect-${index}`} value={option.value}>
                {option.lable}
              </option>
            );
          })}
        </select>
        <select value={language} onChange={handleLanguageChange}>
          {allLanguages?.map((option, index) => {
            return (
              <option key={`languageOptionSelect-${index}`} value={option}>
                {option}
              </option>
            );
          })}
        </select>
        <select value={sort} onChange={handleSortChange}>
          {SortOrderElements?.map((option, index) => {
            return (
              <option key={`sortOptionSelect-${index}`} value={option.field}>
                {option?.lable}
              </option>
            );
          })}
        </select>
        <button className={styles.newButtonWeb}>NEW</button>
      </div>
    </div>
  );
};

export default Filters;
