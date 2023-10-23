import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { formatDate } from "@/Utils/helpers";
import styles from "./Repos.module.scss";
import Filters from "./Filters";
import ResultDetails from "./ResultDetails";

const Repos = () => {
  const { allData, searchTerm, typeFilter, language, sort } = useSelector(
    (state) => state?.repo
  );
  const { userData } = useSelector((state) => state.user);
  const [userRepos, setUserRepos] = useState(allData);

  useEffect(() => {
    let temp = allData
      ?.filter((item) => {
        return (
          searchTerm?.length === 0 ||
          item?.name?.toLowerCase().indexOf(searchTerm?.toLowerCase()) > -1 ||
          item?.description?.toLowerCase().indexOf(searchTerm?.toLowerCase()) >
            -1
        );
      })
      ?.sort((a, b) => {
        if (sort === "stargazers_count") return b[sort] - a[sort];
        else if (sort === "name")
          return b[sort]?.toLowerCase() < a[sort]?.toLowerCase();
        else if (sort === "updated_at")
          return new Date(b[sort]).getTime() - new Date(a[sort]).getTime();
      });

    if (language !== "ALL") {
      temp = temp?.filter((item) => {
        return item?.language === language;
      });
    }

    if (typeFilter !== "ALL") {
      temp = temp?.filter((item) => {
        if (typeFilter === "sources") {
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
                      <span>{repo?.private ? "Private" : "Public"}</span>
                    </div>
                    <div className={styles.description}>
                      <p>{repo?.description || ""}</p>
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
      </div>
    </div>
  );
};

export default Repos;
