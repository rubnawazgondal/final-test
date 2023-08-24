import React, { useState, useEffect } from "react";
import Header from "../../../components/reusable_components/header";
import SideBar from "../../../components/reusable_components/sidebar";
import { GrAddCircle } from "react-icons/gr";
import { BiDotsVertical } from "react-icons/bi";
import styles from "./listing.module.css";
import { getStaff } from "../../../global/fetch_requests";
import SkeletonTable from "../../../components/reusable_components/skeleton_loader";

const StaffListing = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [staffList, setStaffList] = useState([]);
  const [showDropDown, setShowDropDown] = useState(false);
  const [selectedColumnName, setSelectedColumnName] = useState("");

  useEffect(() => {
    const fetchStaff = () => {
      setIsLoading(true);
      getStaff()
        .then((res) => {
          if (res.code === 0) {
            let data = res?.result?.staff;
            const stickyColumns = data.filter((column) => column.isSticky);
            const nonStickyColumns = data.filter((column) => !column.isSticky);
            stickyColumns.sort((a, b) => a.position - b.position);
            let stickyPositionCounter = 1;
            const sortedColumns = [];
            stickyColumns.forEach((column) => {
              column.position = stickyPositionCounter++;
              sortedColumns.push(column);
            });
            sortedColumns.push(...nonStickyColumns);

            setStaffList(sortedColumns);
          }
        })
        .catch((e) => alert(e))
        .finally(() => setIsLoading(false));
    };
    fetchStaff();
  }, []);

  const handleDropdownToggle = (columnName) => {
    setShowDropDown(!showDropDown);
    setSelectedColumnName(columnName);
  };

  const removeDropDownToggle = (columnName) => {
    setShowDropDown(!showDropDown);
    setSelectedColumnName("");
    const columnIndex = staffList.findIndex(
      (column) => column.columnName === columnName
    );
    if (columnIndex !== -1) {
      const updatedStaffList = [...staffList];
      updatedStaffList[columnIndex].isShown = false;
      setStaffList(updatedStaffList);
    }
  };

  // const toggleColumnFreeze = (columnName) => {
  //   setShowDropDown(!showDropDown);
  //   setSelectedColumnName("");
  //   setStaffList((prevStaffList) => {
  //     const updatedList = prevStaffList.map((column) =>
  //       column.columnName === columnName
  //         ? { ...column, isSticky: !column.isSticky }
  //         : column
  //     );
  //     const frozenIndex = updatedList.findIndex((column) => column.isSticky);
  //     if (frozenIndex !== -1) {
  //       const [frozenColumn] = updatedList.splice(frozenIndex, 1);
  //       updatedList.unshift(frozenColumn);
  //     }

  //     return updatedList;
  //   });
  // };

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

  return (
    <>
      <Header showAdmin={false} />
      <SideBar activeIndex={5}>
        {isLoading ? (
          <SkeletonTable />
        ) : (
          <div className={`${styles.applyToParentOfTable} mx-3 mt-3`}>
            {staffList.map((column, index) => {
              if (!column.isShown) {
                return null;
              } else {
                return (
                  <div
                    key={column.columnName}
                    className={styles.assignWidthToTable}
                  >
                    <table>
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
                              {renderDropDown(
                                column.columnName,
                                column.isSticky
                              )}
                            </span>
                          </th>
                        </tr>
                      </thead>
                      <tbody className={styles.tableBody}>
                        {column.columnValue.map((valueObj, index) => (
                          <tr key={index}>
                            <td className="text-center">{valueObj.values}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                );
              }
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
                  {staffList.map((column, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </SideBar>
    </>
  );
};
export default StaffListing;

// else if (column.isSticky) {
//   return (
//     <div
//       key={column.columnName}
//       className={`${styles.assignWidthToTable} ${styles.assignStickyToColumn}`}
//     >
//       <table>
//         <thead className={styles.tableHeadings}>
//           <tr>
//             <th>
//               {(index === 0 || index === 1) && <div />}
//               <span className="d-flex align-items-center justify-content-between position-relative">
//                 {column.columnName}
//                 <BiDotsVertical
//                   role="button"
//                   onClick={() =>
//                     handleDropdownToggle(column.columnName)
//                   }
//                 />
//                 {renderDropDown(
//                   column.columnName,
//                   column.isSticky
//                 )}
//               </span>
//             </th>
//           </tr>
//         </thead>
//         <tbody className={styles.tableBody}>
//           {column.columnValue.map((valueObj, index) => (
//             <tr key={index}>
//               <td className="text-center">{valueObj.values}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }
