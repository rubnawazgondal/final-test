import React, { useEffect, useState } from "react";
import { GrAddCircle } from "react-icons/gr";
import { useNavigate } from "react-router-dom";
import { BiDotsVerticalRounded } from "react-icons/bi";

import Header from "../../../components/reusable_components/header";
import SideBar from "../../../components/reusable_components/sidebar";
import SkeletonLoader from "../../../components/reusable_components/skeleton_loader";

import styles from "./user_list.module.css";
import { getAllUsers } from "../../../global/fetch_requests";

const UsersList = () => {
  const navigate = useNavigate();
  const [usersList, setUsersList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getAllUsers()
      .then((res) => {
        if (res?.code === 0) {
          setUsersList(res?.result?.users);
        }
      })
      .catch((e) => console.error(e))
      .finally(() => setIsLoading(false));
  }, []);

  const navigateToAddUser = () => navigate("/create_user");

  return (
    <>
      <Header showAdmin={false} />
      <SideBar
        activeIndex={0}
        showTitleBar={true}
        title="Users List"
        showButton={true}
        onClickHandler={navigateToAddUser}
      >
        {isLoading ? (
          <SkeletonLoader />
        ) : (
          <div className={`${styles.applyToParentOfTable} mx-3 mt-3`}>
            <table className={styles.tableStyle}>
              <thead className={styles.tableHeadings}>
                <tr>
                  <th>
                    <div />
                    <input type="checkbox" />
                  </th>
                  <th>
                    <div />
                    UserName
                  </th>
                  <th className="text-center">ID</th>
                  <th className="text-center">Email</th>
                  <th className="text-center">Phone</th>
                  <th className="text-center">Password</th>
                  <th className="text-center">Action</th>
                  <th className="text-center">
                    <GrAddCircle />
                  </th>
                </tr>
              </thead>
              <tbody className={`${styles.tableBody}`}>
                {usersList?.map((item, index) => (
                  <tr key={index}>
                    <td className="text-center">
                      <input type="checkbox" />
                    </td>
                    <td>{item.firstName + " " + item.lastName}</td>
                    <td className="text-center">{item.id}</td>
                    <td className="text-center">{item.primaryEmail}</td>{" "}
                    <td className="text-center">
                      {item.primaryMobile === ""
                        ? "+923035579649"
                        : item?.primaryMobile}
                    </td>
                    <td className="text-center">{"**********"}</td>
                    <td className="text-center">
                      <BiDotsVerticalRounded />
                    </td>
                    <td></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </SideBar>
    </>
  );
};
export default UsersList;
