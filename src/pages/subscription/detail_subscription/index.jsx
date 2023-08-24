import React from "react";
import { GrAddCircle } from "react-icons/gr";
import { BiDotsVerticalRounded } from "react-icons/bi";
import Button from "../../../components/reusable_components/button";
import { IoChevronBackCircleOutline } from "react-icons/io5";

import styles from "../../admin_users/users_list/user_list.module.css";

const DetailSubscription = (props) => {
  return (
    <div className="px-5 pt-3">
      <div className="d-flex justify-content-end mb-2 align-items-center">
        <Button onClickHandler={props.onClick}>
          <IoChevronBackCircleOutline size={"0.8rem"} className="me-2" />
          Back
        </Button>
      </div>
      {props.list.length === 0 ? (
        <div>No Item Found here</div>
      ) : (
        <div className={`${styles.applyToParentOfTable}`}>
          <table className={styles.tableStyle}>
            <thead className={styles.tableHeadings}>
              <tr>
                <th>
                  <div />
                  <input type="checkbox" />
                </th>
                <th>
                  <div />
                  Business ID
                </th>
                <th className="text-center">Start Date</th>
                <th className="text-center">Action</th>
                <th className="text-center">
                  <GrAddCircle />
                </th>
              </tr>
            </thead>
            <tbody className={`${styles.tableBody}`}>
              {props.list?.map((item, index) => (
                <tr key={index}>
                  <td className="text-center">
                    <input type="checkbox" />
                  </td>
                  <td>{item.BusinessId}</td>
                  <td className="text-center">{item.startDate}</td>
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
    </div>
  );
};
export default DetailSubscription;
