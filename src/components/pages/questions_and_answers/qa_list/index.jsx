import React, { useState, useEffect } from "react";

import { getQuestions } from "../../../../global/fetch_requests";
import Card from "../../../reusable_components/card";
import Loader from "../../../reusable_components/loader";

const QAList = () => {
  const [questionsList, setQuestionsList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    loadQuestions();
  }, []);

  const loadQuestions = () => {
    setIsLoading(true);
    getQuestions()
      .then((response) => {
        setQuestionsList(response.results);
      })
      .catch((e) => alert(e))
      .finally(() => setIsLoading(false));
  };
  return (
    <Card>
      <div className=" my-2 text-center">
        <h4>Question Bank</h4>
        <h6 className="text-start mt-2">
          Total Question: {questionsList.length}
        </h6>
        <div className="mb-2">
          {questionsList.map((e, index) => {
            // const c_date = new Date(e.created_date);
            // const date = new Date(e.updated_date);

            return (
              <div
                className="text-start shadown border p-2 my-2 rounded-2"
                key={index}
              >
                <h5>{e.contentObject?.questionText}</h5>
                <small>Type: {e.contentObject.questionType}</small>
                <br />
              </div>
            );
          })}
          {isLoading && (
            <div className="d-flex align-items-center justify-content-center">
              <Loader />
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};

export default QAList;
