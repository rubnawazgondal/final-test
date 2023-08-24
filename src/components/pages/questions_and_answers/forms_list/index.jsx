import React, { useEffect, useState } from "react";
import Card from "../../../reusable_components/card";
import { getForms } from "../../../../global/fetch_requests";
import styles from "./forms_list.module.css";
import Loader from "../../../reusable_components/loader";

const FormsList = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [formList, setFormList] = useState([]);

  const fetchForms = () => {
    setIsLoading(true);
    getForms()
      .then((response) => {
        setFormList(response?.results);
      })
      .catch((e) => alert(e))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    fetchForms();
  }, []);
  return (
    <>
      {isLoading ? (
        <div className="d-flex align-items-center justify-content-center">
          <Loader />
        </div>
      ) : (
        <Card className="p-0">
          <table className={styles.table}>
            <thead className="w-100">
              <tr>
                <th className={styles.th}>#</th>
                <th className={styles.th}>ID</th>
                <th className={styles.th}>Form Name</th>
                <th className={styles.th}>Created</th>
                <th className={styles.th}>Version</th>
                <th className={styles.th}>Status</th>
              </tr>
            </thead>
            <tbody className="w-100">
              {formList.map((item, index) => (
                <tr key={index}>
                  <td className={styles.td}>{index + 1}</td>
                  <td className={styles.td}>{item.id}</td>
                  <td className={styles.td}>{item.title}</td>
                  <td className={styles.td}>{item.createdDate}</td>
                  <td className={styles.td}>{item.version}</td>
                  <td className={styles.td}>
                    {item.published ? "published" : "Draft"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      )}
    </>
  );
};
export default FormsList;
