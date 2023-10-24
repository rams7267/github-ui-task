import React from "react";
import Image from "next/image";
import { useSelector } from "react-redux";

import styles from "./Profile.module.scss";

const Profile = () => {
  const { userData } = useSelector((state) => state.user);

  return (
    <div className={styles.profileWrapper}>
      <div className={styles.imageWrapper}>
        <Image
          className={styles.profilePic}
          src={userData?.avatar_url || ""}
          width={100}
          height={100}
          alt={userData?.avatar_url}
        />
        <div className={styles.nameLogin}>
          {userData?.name && <p className={styles.name}>{userData?.name}</p>}
          {userData?.login && <p className={styles.login}>{userData?.login}</p>}
        </div>
      </div>
      <div className={styles.detailsWrapper}>
        {userData?.bio && <p className={styles.bio}>{userData?.bio}</p>}
        <p>
          <b>{userData?.followers || 0}</b> followers &#183;{" "}
          <b>{userData?.following || 0}</b> following
        </p>
        {userData?.company && <p>🏬 {userData?.company}</p>}
        {userData?.location && <p>📍 {userData?.location}</p>}
      </div>
      <button className={styles.editButton}>Edit Profile</button>
    </div>
  );
};

export default Profile;
