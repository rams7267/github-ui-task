import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAllRepoData } from "@/Utils/Redux/repo.slice";
import { setUserData } from "@/Utils/Redux/user.slice";
import { getUserProfile, getUserRepos } from "@/Utils/fetchCalls";
import { Navbar } from "@/components/Navbar/Navbar";
import Profile from "@/components/Profile/Profile";
import Repos from "@/components/Repos/Repos";
import styles from "./index.module.scss";

export default function Home() {
  const dispatch = useDispatch();
  const { activeTab } = useSelector((state) => state.user);
  const { userData } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchData = async () => {
      const userData = await getUserProfile();
      dispatch(setUserData(userData));
      const userRepos = await getUserRepos();
      dispatch(setAllRepoData(userRepos));

    };

    fetchData();
  }, []);

  return (
    <div>
      <Navbar />
      <div className={styles.wrapper}>
        <Profile />
        {activeTab !== "Repositories" ? (
          <div className={styles.noData}>{userData?.login || ""} doesn’t have any data related to {activeTab}. </div>
        ) : (
          <Repos />
        )}
      </div>
    </div>
  );
}
