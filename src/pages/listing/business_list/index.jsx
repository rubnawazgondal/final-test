import React, { useEffect, useState } from "react";
import SkeletonTable from "../../../components/reusable_components/skeleton_loader";
import { getBusinessList } from "../../../global/fetch_requests";
import Header from "../../../components/reusable_components/header";
import SideBar from "../../../components/reusable_components/sidebar";
import styles from "../../admin_users/users_list/user_list.module.css";
import { GrAddCircle } from "react-icons/gr";
import { BiDotsVerticalRounded } from "react-icons/bi";
const BusinessList = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [businessList, setBusinessList] = useState([]);
  useEffect(() => {
    const fetchBusinessList = () => {
      setIsLoading(true);
      getBusinessList()
        .then((res) => res.statusCode === 0 && setBusinessList(res?.result))
        .catch((e) => alert(e))
        .finally(() => setIsLoading(false));
    };
    fetchBusinessList();
  }, []);

  return (
    <>
      <Header showAdmin={false} />
      <SideBar activeIndex={6} showTitleBar={true} title="Business List">
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
                  <th className="text-center">ID</th>
                  <th className="text-center">Description</th>
                  <th className="text-center">Type</th>
                  <th className="text-center">Industry</th>
                  <th className="text-center">URL</th>
                  <th className="text-center">Address</th>
                  <th className="text-center">Designation</th>
                  <th className="text-center">Status</th>
                  <th className="text-center">
                    <GrAddCircle />
                  </th>
                </tr>
              </thead>
              <tbody className={`${styles.tableBody}`}>
                {businessList?.map((item, index) => (
                  <tr key={index}>
                    <td className="text-center">
                      <input type="checkbox" />
                    </td>
                    <td>{item.name}</td>
                    <td className="text-center">{item.id}</td>
                    <td className="text-center">{item.description}</td>{" "}
                    <td className="text-center">
                      {item.businessType === null
                        ? "No Type Found"
                        : item.businessType}
                    </td>
                    <td className="text-center">
                      {item.industry === null
                        ? "No Industry Found"
                        : item.industry}
                    </td>
                    <td className="text-center">{item.websiteUrl}</td>
                    <td className="text-center">
                      {!item.businessAddress ||
                      !item?.businessAddress?.addressName
                        ? "UNKNOWN LOCATION"
                        : item?.businessAddress?.addressName}
                    </td>
                    <td className="text-center">
                      {item.designation === "Owner" ? "Owner" : "Employee"}
                    </td>
                    <td className="text-center">
                      {item.status === "active" ? "active" : "inActive"}
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
export default BusinessList;
