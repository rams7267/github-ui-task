import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { filterWithSearchTerm, formatDate, getSorted } from "@/Utils/helpers";
import styles from "./Repos.module.scss";
import Filters from "./Filters";
import ResultDetails from "./ResultDetails";
import { ALL_LABLE, PRIVATE_LABLE, PUBLIC_LABLE, SOURCES_LABLE } from "@/Utils/constants";

const Repos = () => {
  const { userData } = useSelector((state) => state.user);
  const { allData, searchTerm, typeFilter, language, sort, isLoading } = useSelector(
    (state) => state?.repo
  );

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
      {isLoading ? <h1>Data Loading....</h1> : <div className={styles.resultWrapper}>
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
                        <div>&#9734; Star</div> <span>&#x2304;</span>
                      </div>
                    </div>
                    <div className={styles.details}>
                      {repo?.language ? <>{repo?.language}&nbsp;&nbsp;</> : ""}
                      {repo?.stargazers_count > 0 ? (
                        <>&#9734; {repo?.stargazers_count} &nbsp;&nbsp;</>
                      ) : (
                        ""
                      )}
                      {repo?.forks_count > 0 ? (
                        <>➰ {repo?.forks_count} &nbsp;&nbsp;</>
                      ) : (
                        ""
                      )}
                      {repo?.license?.name ? (
                        <>⚖️ {repo?.license?.name} &nbsp;&nbsp;</>
                      ) : (
                        ""
                      )}
                      Updated on {formatDate(repo?.updated_at)}
                    </div>
                  </div>
                  <div className={styles.rightSection}>
                    <div>&#9734; Star</div> <span>&#x2304;</span>
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
      </div>}
    </div>
  );
};

export default Repos;
