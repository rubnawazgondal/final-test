import React from "react";
import styles from "./index.module.css";

const SkeletonTable = () => {
  return (
    <div className={styles.tableContainer}>
      <table className={styles.customTable} aria-label="customized table">
        <thead>
          <tr>
            <th className={styles.customTableCell}>
              <div className={styles.skeleton}></div>
            </th>
            <th className={styles.customTableCell}>
              <div className={styles.skeleton}></div>
            </th>
            <th className={styles.customTableCell}>
              <div className={styles.skeleton}></div>
            </th>
            <th className={styles.customTableCell}>
              <div className={styles.skeleton}></div>
            </th>
          </tr>
        </thead>
        <tbody>
          {[1, 2, 3, 4, 5].map((data, i) => (
            <tr key={i}>
              <td className={styles.customTableCell}>
                <div className={styles.skeleton}></div>
              </td>
              <td className={styles.customTableCell}>
                <div className={styles.skeleton}></div>
              </td>
              <td className={styles.customTableCell}>
                <div className={styles.skeleton}></div>
              </td>
              <td className={styles.customTableCell}>
                <div className={styles.skeleton}></div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SkeletonTable;
