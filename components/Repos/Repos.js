import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import {
  filterWithSearchTerm,
  formatDate,
  getLanguageColor,
  getSorted,
} from "@/Utils/helpers";
import styles from "./Repos.module.scss";
import Filters from "./Filters";
import ResultDetails from "./ResultDetails";
import {
  ALL_LABLE,
  PRIVATE_LABLE,
  PUBLIC_LABLE,
  SOURCES_LABLE,
} from "@/Utils/constants";
import { DOWN_BUTTON_IMAGE, FORK_IMAGE, LICENCE_IMAGE } from "@/Utils/images";

const Repos = () => {
  const { userData } = useSelector((state) => state.user);
  const { allData, searchTerm, typeFilter, language, sort, isLoading } =
    useSelector((state) => state?.repo);

  const [userRepos, setUserRepos] = useState(allData);

  useEffect(() => {
    //filtering repositories with search term and sorting by sort item
    let temp = filterWithSearchTerm(allData, searchTerm);

    temp = getSorted(temp, sort);

    //filtering repositories with language
    if (language !== ALL_LABLE) {
      temp = temp?.filter((item) => {
        return item?.language === language;
      });
    }

    //filtering repositories with type
    if (typeFilter !== ALL_LABLE) {
      temp = temp?.filter((item) => {
        if (typeFilter === SOURCES_LABLE) {
          return !item?.fork;
        }
        return item?.[typeFilter];
      });
    }

    setUserRepos(temp);
  }, [searchTerm, allData, sort, language, typeFilter]);

  return (
    <div className={styles.rightWrapper}>
      <Filters />
      {isLoading ? (
        <h1>Data Loading....</h1>
      ) : (
        <div className={styles.resultWrapper}>
          <ResultDetails userRepos={userRepos} />
          {userRepos?.length > 0 ? (
            <>
              {userRepos?.map((repo, index) => {
                return (
                  <div
                    className={styles.repoListItem}
                    key={`repo-list-item-${index}`}
                  >
                    <div className={styles.leftSection}>
                      <div className={styles.name}>
                        <a href={repo?.svn_url} target="_blank">
                          {repo?.name}
                        </a>
                        <span>
                          {repo?.private ? PRIVATE_LABLE : PUBLIC_LABLE}
                        </span>
                      </div>
                      <div className={styles.description}>
                        {repo?.description && <p>{repo?.description}</p>}
                        <div className={styles.starButton}>
                          <div>&#9734; Star</div>{" "}
                          <span>{DOWN_BUTTON_IMAGE}</span>
                        </div>
                      </div>
                      <div className={styles.details}>
                        {repo?.language ? (
                          <>
                            <svg className={styles.dot}>
                              <circle
                                cx="6"
                                cy="6"
                                r="6"
                                fill={getLanguageColor(repo.language)}
                              />
                            </svg>{" "}
                            {repo?.language}
                            <span className={styles.pr16} />
                          </>
                        ) : (
                          ""
                        )}
                        {repo?.stargazers_count > 0 ? (
                          <>
                            &#9734; {repo?.stargazers_count}{" "}
                            <span className={styles.pr16} />
                          </>
                        ) : (
                          ""
                        )}
                        {repo?.forks_count > 0 ? (
                          <>
                            {FORK_IMAGE} {repo?.forks_count}{" "}
                            <span className={styles.pr16} />
                          </>
                        ) : (
                          ""
                        )}
                        {repo?.license?.name ? (
                          <>
                            {LICENCE_IMAGE} {repo?.license?.name}{" "}
                            <span className={styles.pr16} />
                          </>
                        ) : (
                          ""
                        )}
                        Updated on {formatDate(repo?.updated_at)}
                      </div>
                    </div>
                    <div className={styles.rightSection}>
                      <div>&#9734; Star</div> <span>{DOWN_BUTTON_IMAGE}</span>
                    </div>
                  </div>
                );
              })}
            </>
          ) : (
            <h1 className={styles.noData}>
              {userData?.login || ""} doesn’t have any repositories that match.{" "}
            </h1>
          )}
        </div>
      )}
    </div>
  );
};

export default Repos;
