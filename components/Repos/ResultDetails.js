import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./Repos.module.scss";
import { getLables } from "@/Utils/helpers";
import { clearFilter } from "@/Utils/Redux/repo.slice";
import { CLOSE_IMAGE } from "@/Utils/images";

const ResultDetails = ({ userRepos }) => {
  const dispatch = useDispatch();

  const { searchTerm, typeFilter, sort, showResult } = useSelector(
    (state) => state?.repo
  );

  const handleClear = () => {
    dispatch(clearFilter());
  };

  return (
    <>
      {showResult ? (
        <div className={styles.resultDetails}>
          <p>
            {" "}
            <b>{userRepos?.length || 0}</b> results for{" "}
            <b>{getLables(typeFilter)}</b> repositories{" "}
            {searchTerm && (
              <>
                matching <b>{searchTerm}</b>
              </>
            )}{" "}
            sorted by <b>{getLables(sort)}</b>
          </p>
          <span onClick={handleClear}>{CLOSE_IMAGE} Clear Filter</span>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default ResultDetails;
