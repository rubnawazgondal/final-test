import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Header from "../../components/reusable_components/header";
import SideBar from "../../components/reusable_components/sidebar";
import Card from "../../components/reusable_components/card";
import FormsList from "../../components/pages/questions_and_answers/forms_list";
import styles from "./question_and_answers.module.css";
import QAList from "../../components/pages/questions_and_answers/qa_list";
import FormBuilder from "../../components/pages/questions_and_answers/form_builder";
import { QuestionBuilder } from "../../components/pages/questions_and_answers/question_builder";

const QAForm = () => {
  const permissions = useSelector(
    (state) => state?.auth?.profile?.permissions?.permissions
  );
  const [currentTab, setCurrentTab] = useState(0);
  const [permission, setPermission] = useState();
  useEffect(() => {
    if (permissions.length >= 1) {
      const parsedPermission = JSON.parse(permissions[0]);
      const userPermissions = parsedPermission.find(
        (perm) => perm.key === "qaForms"
      );
      setPermission(userPermissions);
    }
  }, [permissions]);
  return (
    <>
      <Header />
      <SideBar
        activeIndex={2}
        showTitleBar={true}
        title="Question and Answer Form"
      >
        <Card className="mx-4 my-2">
          <div className="d-flex">
            <div
              className={`w-25 text-center ${styles.tab} ${
                currentTab === 0 ? styles.tabActive : ""
              }`}
              role="button"
              onClick={() => setCurrentTab(0)}
            >
              Question Builder
            </div>
            <div
              className={`w-25 text-center ${styles.tab} ${
                currentTab === 1 ? styles.tabActive : ""
              }`}
              role="button"
              onClick={() => setCurrentTab(1)}
            >
              Form Builder
            </div>
            <div
              className={`w-25 text-center ${styles.tab} ${
                currentTab === 2 ? styles.tabActive : ""
              }`}
              role="button"
              onClick={() => setCurrentTab(2)}
            >
              All Forms
            </div>
            <div
              className={`w-25 text-center ${styles.tab} ${
                currentTab === 3 ? styles.tabActive : ""
              }`}
              role="button"
              onClick={() => setCurrentTab(3)}
            >
              Q & A List
            </div>
          </div>
          <div className="mx-5 my-3">
            {currentTab === 0 && permission?.permissions["isAdd"] && (
              <QuestionBuilder />
            )}
            {currentTab === 1 && permission?.permissions["isAdd"] && (
              <FormBuilder />
            )}
            {currentTab === 2 && permission?.permissions["isView"] && (
              <FormsList />
            )}
            {currentTab === 3 && permission?.permissions["isView"] && <QAList />}
          </div>
        </Card>
      </SideBar>
    </>
  );
};
export default QAForm;
