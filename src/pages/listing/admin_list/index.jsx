import React, { useState, useEffect } from "react";
import { getAllUsers } from "../../../global/fetch_requests";
import Header from "../../../components/reusable_components/header";
import SideBar from "../../../components/reusable_components/sidebar";
import SkeletonTable from "../../../components/reusable_components/skeleton_loader";
import styles from "../staff_list/listing.module.css";
import { GrAddCircle } from "react-icons/gr";
import { BiDotsVertical } from "react-icons/bi";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AdminListing = () => {
  const auth = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [userList, setUserList] = useState([]);
  const [showDropDown, setShowDropDown] = useState(false);
  const [selectedColumnName, setSelectedColumnName] = useState("");
  const permissions = auth?.profile?.permissions?.permissions;
  const [permission, setPermission] = useState();
  useEffect(() => {
    if (permissions.length >= 1) {
      const parsedPermission = JSON.parse(permissions[0]);
      const userPermissions = parsedPermission.find(
        (perm) => perm.key === "adminUsers"
      );
      setPermission(userPermissions);
    }
  }, [permissions]);

  useEffect(() => {
    const fetchAdminList = () => {
      setIsLoading(true);
      getAllUsers(auth.profile.id, 20, 1)
        .then((res) => {
          if (res.code === 0) {
            let data = res?.result?.users;
            // const stickyColumns = data.filter((column) => column.isShown);
            // const nonStickyColumns = data.filter((column) => !column.isShown);
            // stickyColumns.sort((a, b) => a.position - b.position);
            // let stickyPositionCounter = 1;
            // const sortedColumns = [];
            // stickyColumns.forEach((column) => {
            //   column.position = stickyPositionCounter++;
            //   sortedColumns.push(column);
            // });
            // sortedColumns.push(...nonStickyColumns);
            setUserList(data);
          }
        })
        .catch((e) => console.error(e))
        .finally(() => setIsLoading(false));
    };
    fetchAdminList();
  }, [auth]);

  const handleDropdownToggle = (columnName) => {
    setShowDropDown(!showDropDown);
    setSelectedColumnName(columnName);
  };

  const removeDropDownToggle = (columnName) => {
    setShowDropDown(false); // Set to false directly
    setSelectedColumnName("");
    const columnIndex = userList.findIndex(
      (column) => column.columnName === columnName
    );
    if (columnIndex !== -1) {
      const updatedStaffList = [...userList];
      updatedStaffList[columnIndex].isShown = false;
      setUserList(updatedStaffList);
    }
  };

  const renderDropDown = (name, isFrozen) => {
    return (
      <ul
        className={`dropdown-menu ${
          showDropDown && selectedColumnName === name ? "d-block" : ""
        } p-2 mt-1 `}
        style={{
          position: "absolute",
          top: "100%",
          left: 0,
          zIndex: 100000000,
          maxHeight: "25vh",
          maxWidth: "25vw",
          overflow: "auto",
          backgroundColor: "white",
        }}
      >
        <li role="button" onClick={() => removeDropDownToggle(name)}>
          Hide
        </li>
        <li role="button" onClick={() => {}}>
          {/* <li role="button" onClick={() => toggleColumnFreeze(name)}> */}
          {/* {isFrozen ? "Unfreeze" : "freeze"} */}
          Freeze
        </li>
      </ul>
    );
  };

  const navigateToAddUser = () => navigate("/create_user");

  return (
    <>
      <Header showAdmin={false} />
      <SideBar
        activeIndex={0}
        showTitleBar={true}
        title="Users List"
        showButton={permission?.permissions["isAdd"] ? true : false}
        onClickHandler={navigateToAddUser}
      >
        {isLoading ? (
          <SkeletonTable />
        ) : (
          <div className={`${styles.applyToParentOfTable} mx-3 mt-3`}>
            {userList?.map((column, index) => {
              return (
                <div
                  key={index}
                  className={styles.assignWidthToTable}
                >
                  <table style={{}}>
                    <thead className={styles.tableHeadings}>
                      <tr>
                        <th>
                          {(index === 0 || index === 1) && <div />}
                          <span className="d-flex align-items-center justify-content-between position-relative">
                            {column.columnName}
                            <BiDotsVertical
                              role="button"
                              onClick={() =>
                                handleDropdownToggle(column.columnName)
                              }
                            />
                            {renderDropDown(column.columnName, column.isSticky)}
                          </span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className={styles.tableBody}>
                      {column.columnValue.map((valueObj, index) => (
                        <tr key={index}>
                          <td className="text-center">
                            {valueObj.values === "" || valueObj.values === null
                              ? "-"
                              : valueObj.values}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              );
            })}
            <div className={styles.assignWidthToTable}>
              <table>
                <thead className={styles.tableHeadings}>
                  <tr>
                    <th>
                      <GrAddCircle />
                    </th>
                  </tr>
                </thead>
                <tbody className={styles.tableBody}>
                  {/* {userList.map((column, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                    </tr>
                  ))} */}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </SideBar>
    </>
  );
};
export default AdminListing;
