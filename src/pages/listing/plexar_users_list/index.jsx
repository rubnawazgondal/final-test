import React, { useEffect, useState } from "react";
import SkeletonTable from "../../../components/reusable_components/skeleton_loader";
import { getAllPlexarUsers } from "../../../global/fetch_requests";
import Header from "../../../components/reusable_components/header";
import SideBar from "../../../components/reusable_components/sidebar";
import styles from "../../admin_users/users_list/user_list.module.css";
import { GrAddCircle } from "react-icons/gr";
import { BiDotsVerticalRounded } from "react-icons/bi";

const PlexarUsersList = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [usersList, setUsersList] = useState([]);
  useEffect(() => {
    const fetchBusinessList = () => {
      setIsLoading(true);
      getAllPlexarUsers()
        .then((res) => res?.code === 0 && setUsersList(res?.result?.users))
        .catch((e) => alert(e))
        .finally(() => setIsLoading(false));
    };
    fetchBusinessList();
  }, []);

  return (
    <>
      <Header showAdmin={false} />
      <SideBar activeIndex={7} showTitleBar={true} title="Plexaar Users List">
        {isLoading ? (
          <SkeletonTable />
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
                    Name
                  </th>
                  <th className="text-center">Acc Number</th>
                  <th className="text-center">Primary Email</th>
                  <th className="text-center">Primary Number</th>
                  <th className="text-center">Role</th>
                  <th className="text-center">Country</th>
                  <th className="text-center">Active</th>
                  <th className="text-center">Info Status</th>
                  <th className="text-center">Deleted</th>
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
                    <td>
                      {item.firstName + " " + item.lastName}{" "}
                      {item.firstName === "" && item.lastName === "" && "-"}
                    </td>
                    <td className="text-center">
                      {item.accountNumber === null ? "-" : item.accountNumber}
                    </td>
                    <td className="text-center">
                      {item.primaryEmail === "" ? "-" : item.primaryEmail}
                    </td>{" "}
                    <td className="text-center">
                      {item.primaryMobile === "" ? "-" : item.primaryMobile}
                    </td>
                    <td className="text-center">{item.roleName}</td>
                    <td className="text-center">{item.countryName}</td>
                    <td className="text-center">
                      {item.isActive === false ? "In Active" : "Active"}
                    </td>
                    <td className="text-center">
                      {item.basicInfoCompleted === false
                        ? "Not Completed"
                        : "Completed"}
                    </td>
                    <td className="text-center">
                      {item.isDeleted === false ? "-" : "Deleted"}
                    </td>
                    <td className="text-center">
                      <BiDotsVerticalRounded />
                    </td>
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
export default PlexarUsersList;
