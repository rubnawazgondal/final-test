import React, { useState, useEffect } from "react";
import Card from "../../../reusable_components/card";
import { AiOutlineMinus } from "react-icons/ai";
import { CgLoadbarDoc } from "react-icons/cg";
import { BsChevronLeft, BsChevronRight, BsChevronDown } from "react-icons/bs";
import { RxCross2 } from "react-icons/rx";
import TextField from "../../../reusable_components/custom_textfield";
import { getQuestions, postForm } from "../../../../global/fetch_requests";
import Button from "../../../reusable_components/button";
import styles from "./form_builder.module.css";

const FormBuilder = () => {
  /* -------------------------------------------------------------------------- */
  /*                                  VARIABLES                                 */
  /* -------------------------------------------------------------------------- */
  const [questionsList, setQuestionsList] = useState([]);
  const [questionsFilterList, setQuestionsFilterList] = useState([]);
  const [questionStatement, setQuestionStatement] = useState("");
  const [questionType, setQuestionType] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [formTitle, setFormTitle] = useState("");
  const [selectedSection, setSelectedSection] = useState({
    id: 1,
    section: "Section 1",
    questionList: [],
  });
  const [section, setSection] = useState([
    {
      id: 1,
      section: "Section 1",
      questionList: [],
    },
  ]);

  /* -------------------------------------------------------------------------- */
  /*                                  FUNCTIONS                                 */
  /* -------------------------------------------------------------------------- */
  /* --------------------------- FETCHING QUESTIONS --------------------------- */
  useEffect(() => {
    const fetchQuestions = () => {
      setIsLoading(true);
      getQuestions()
        .then((response) => {
          setQuestionsList(response.results);
        })
        .catch((e) => alert(e))
        .finally(() => setIsLoading(false));
    };
    fetchQuestions();
  }, []);

  /* ----------------------------- ADDING SECTION ----------------------------- */
  const addSection = () => {
    setSection((prevItems) => [
      ...prevItems,
      {
        id: section.length + 1,
        section: `Section ${section.length + 1}`,
        questionList: [],
      },
    ]);
  };

  /* ---------------------------- REMOVING SECTION ---------------------------- */
  const removeSection = (sec) => {
    if (selectedSection.id === sec.id) {
      const updatedSections = section.filter(
        (section) => section.id !== sec.id
      );
      setSection(updatedSections);
      setSelectedSection(section[0]);
    } else {
      const updatedSections = section.filter(
        (section) => section.id !== sec.id
      );
      setSection(updatedSections);
    }
  };

  /* ----------------------- ADDING QUESTION TO SECTION ----------------------- */
  const addQuestionToSection = (newQuestion) => {
    setSection((prevSections) =>
      prevSections.map((section) => {
        if (section.id === selectedSection.id) {
          return {
            ...section,
            questionList: [...section.questionList, newQuestion],
          };
        }
        return section;
      })
    );
    setSelectedSection((prevSec) => ({
      ...prevSec,
      questionList: [...prevSec.questionList, newQuestion],
    }));
    setQuestionsFilterList([]);
    setQuestionStatement("");
  };

  /* ---------------------- REMOVE QUESTION FROM SECTION ---------------------- */
  const removeQuestionFromSection = (question) => {
    console.log("QUESTION TO REMOVE", question);
    setSection((prevSections) =>
      prevSections.map((section) => {
        if (section.id === selectedSection.id) {
          return {
            ...section,
            questionList: section.questionList.filter(
              (que) => que.id !== question.id
            ),
          };
        }
        return section;
      })
    );
    setSelectedSection((prevSec) => ({
      ...prevSec,
      questionList: prevSec.questionList.filter(
        (que) => que.id !== question.id
      ),
    }));
    setQuestionsFilterList([]);
    setQuestionStatement("");
  };

  /* -------------------------- MOVE TO NEXT SECTION -------------------------- */
  const nextSection = () => {
    const currentIndex = section.findIndex(
      (section) => section.id === selectedSection.id
    );
    if (currentIndex < section.length - 1) {
      setSelectedSection(section[currentIndex + 1]);
    } else if (currentIndex === section.length - 1) {
      setSelectedSection(section[0]);
    }
  };

  /* ------------------------ MOVE TO PREVIOUS SECTION ------------------------ */
  const previousSection = () => {
    const currentIndex = section.findIndex(
      (section) => section.id === selectedSection.id
    );
    if (currentIndex > 0) {
      setSelectedSection(section[currentIndex - 1]);
    }
  };

  /* ------------ HANDLING SEARCHED VALUE AND FLITER OUT QUESTIONS ------------ */
  const handleSearchedValue = (e) => {
    setQuestionStatement(e.target.value);
    if (e.target.value === "") {
      setQuestionsFilterList([]);
    } else {
      setQuestionsFilterList(
        questionsList.filter((question) =>
          question.contentObject.questionText
            .toLowerCase()
            .includes(e.target.value.toLowerCase())
        )
      );
    }
  };

  /* ----------------------------- PUBLISHING FORM ---------------------------- */
  const publishForm = () => {
    console.log(section);
    const sectionToSend = section;
    sectionToSend?.forEach((section) => {
      section?.questionList?.forEach((question) => {
        if (
          question?.contentType === "api | mcq question" ||
          question?.contentType === "api | dropdown question"
        ) {
          question?.contentObject?.options.forEach((option) => {
            if (typeof option?.id !== "string") {
              option.id = option.id.toString();
            }
          });
        }
      });
    });
    setIsLoading(true);
    var data = {
      title: formTitle,
      name: "",
      sectionsList: sectionToSend,
      published: true,
    };
    postForm(data)
      .then((res) => {
        if (res?.code === 0) {
          setSelectedSection({
            id: 1,
            section: "Section 1",
            questionList: [],
          });
          setSection([
            {
              id: 1,
              section: "Section 1",
              questionList: [],
            },
          ]);
          setFormTitle("");
          setQuestionStatement("");
          setQuestionType("");
        }
      })
      .catch((e) => alert(e))
      .finally(() => setIsLoading(false));
  };

  /* -------------------------------------------------------------------------- */
  /*                                  RENDERING                                 */
  /* -------------------------------------------------------------------------- */
  const renderOptions = (index, e) => {
    return (
      <div key={index} className="rounded shadow p-3 bg-white my-2">
        <div className="d-flex justify-content-between">
          <h5>{e?.contentObject?.questionText}</h5>
          <div
            className="bg-danger rounded px-2 py-1 text-light"
            role="button"
            onClick={() => removeQuestionFromSection(e)}
          >
            <AiOutlineMinus />
          </div>
        </div>
        <p className="m-0 p-0 small">
          Type: <b>{e?.contentObject?.questionType}</b>{" "}
        </p>
        {e?.contentObject?.questionType === "MCQQuestion" ? (
          <p className="small">
            Multiple Choose:{" "}
            <b>{e?.contentObject?.multiple_choice ? "Yes" : "No"}</b>{" "}
          </p>
        ) : (
          <></>
        )}
        <p className="small">Options:</p>
        {e?.contentObject?.options?.map((op, indexOp) => {
          return (
            <div key={indexOp} className=" my-1 rounded bg-light p-1 ">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6>{op.choiceText}</h6>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  const renderDateOptions = (index, e) => {
    return (
      <div key={index} className="rounded shadow p-3 bg-white my-2">
        <div className="d-flex justify-content-between">
          <h5>{e?.contentObject?.questionText}</h5>
          <div
            className="bg-danger rounded px-2 py-1 text-light"
            role="button"
            onClick={() => removeQuestionFromSection(e)}
          >
            <AiOutlineMinus />
          </div>
        </div>
        {e.contentObject.isDateLimit ? (
          <div>
            <h6>Start Date: {e.contentObject.startDate}</h6>
            <h6>End Date: {e.contentObject.endDate}</h6>
          </div>
        ) : (
          <></>
        )}
        <p className="m-0 p-0 small">
          Type: <b>{e.contentObject.questionType}</b>{" "}
        </p>
      </div>
    );
  };

  const renderOtherOptions = (index, e) => {
    return (
      <div key={index} className="rounded shadow p-3 bg-white my-2">
        <div className="d-flex justify-content-between">
          <h5>{e?.contentObject?.questionText}</h5>
          <div
            className="bg-danger rounded px-2 py-1 text-light"
            role="button"
            onClick={() => removeQuestionFromSection(e)}
          >
            <AiOutlineMinus />
          </div>
        </div>
        <p className="m-0 p-0 small">
          Type: <b>{e?.contentObject?.questionType}</b>{" "}
        </p>
      </div>
    );
  };

  return (
    <Card>
      <div className="d-flex align-items-center justify-content-between">
        <div className="d-flex align-items-center">
          <CgLoadbarDoc size={"1.5rem"} className="text-primary" />
          <h4 className="ms-2 mt-2">Form Builder</h4>
        </div>
        <div>
          <Button onClickHandler={addSection} disabled={isLoading}>
            Add Section
          </Button>
        </div>
      </div>
      <hr />
      <TextField
        type="text"
        label="Form Title"
        placeholder="Enter Form Title"
        value={formTitle}
        onHandleChange={(e) => setFormTitle(e.target.value)}
      />
      <div className="d-flex align-items-center justify-content-between my-2">
        <div
          className={`border px-2 py-2 rounded-circle ${styles.arrowButtons}`}
          role="button"
          onClick={previousSection}
        >
          <BsChevronLeft size={"1.4rem"} />
        </div>
        <div className="d-flex overflow-auto align-items-center">
          {section.map((item, index) => (
            <div
              key={index}
              role="button"
              onClick={() => setSelectedSection(item)}
              className="me-2"
            >
              <Card
                className={`${
                  selectedSection.id - 1 === index
                    ? styles.activeTab
                    : styles.tab
                }`}
              >
                {index !== 0 && (
                  <RxCross2
                    className="me-2"
                    onClick={() => removeSection(item)}
                  />
                )}
                {item?.section}
              </Card>
            </div>
          ))}
        </div>
        <div
          className={`border px-2 py-2 rounded-circle ${styles.arrowButtons}`}
          role="button"
          onClick={nextSection}
        >
          <BsChevronRight size={"1.4rem"} />
        </div>
      </div>
      <Card className="p-0">
        <div className={styles.sectionTitle}>{selectedSection.section}</div>
        <div className="px-4 pt-4">
          <Card className="px-4 py-3">{selectedSection.section}</Card>
          <div className="d-flex">
            <div className="col-8">
              <TextField
                placeholder="What..."
                value={questionStatement}
                onHandleChange={(e) => handleSearchedValue(e)}
                label="What..."
              />
              <div>
                {questionsFilterList.map((e, i) => (
                  <div
                    onClick={() => {
                      if (
                        selectedSection.questionList.some(
                          (question) => question.id === e.id
                        )
                      ) {
                        removeQuestionFromSection(e);
                      } else {
                        addQuestionToSection(e);
                      }
                      setQuestionType(e?.contentObject?.questionType);
                    }}
                    className=" border p-2 mt-0 me-3"
                    style={{ cursor: "pointer" }}
                  >
                    <div className="d-flex justify-content-between">
                      <div>{e?.contentObject.questionText}</div>
                      <div>Type: {e?.contentObject.questionType}</div>
                    </div>
                    {e?.contentObject.questionType === "MCQQuestion" ? (
                      <div className="d-flex">
                        {e?.contentObject?.options?.map((option, i) => (
                          <p className="pe-4 pt-2">
                            <i
                              class="ri-checkbox-blank-circle-fill"
                              style={{ color: "lightGray" }}
                            ></i>{" "}
                            {option.choiceText}
                          </p>
                        ))}
                      </div>
                    ) : (
                      <></>
                    )}
                  </div>
                ))}
              </div>
            </div>
            <Card className="d-flex align-items-center justify-content-between h-min col-3 ms-5">
              <div className="me-4">
                {questionType === "" ? "Please Select Question" : questionType}
              </div>
              <div>
                <BsChevronDown />
              </div>
            </Card>
          </div>
          {selectedSection.questionList.map((question, index) => {
            return (
              <div key={index}>
                {(question?.contentObject?.questionType === "MCQQuestion" ||
                  question?.contentObject?.questionType ===
                    "DropdownQuestion") &&
                  renderOptions(index, question)}
                {question?.contentObject?.questionType === "DateQuestion" &&
                  renderDateOptions(index, question)}
                {question.contentObject.questionType !== "MCQQuestion" &&
                  question?.contentObject?.questionType !==
                    "DropdownQuestion" &&
                  question?.contentObject?.questionType !== "DateQuestion" &&
                  renderOtherOptions(index, question)}
              </div>
            );
          })}
        </div>
      </Card>
      <div className="d-flex justify-content-end">
        <Button isGreyButton={true} className="me-4" disabled={true}>
          Draft
        </Button>
        <Button
          disabled={
            isLoading ||
            formTitle === "" ||
            selectedSection.questionList.length === 0
          }
          onClickHandler={publishForm}
        >
          Publish
        </Button>
      </div>
    </Card>
  );
};
export default FormBuilder;

/* -------------------------------------------------------------------------- */
/*                             for Child Questions                            */
/* -------------------------------------------------------------------------- */
// {
//   "title": "adasdadsadsadadadds",
//   "name": "",
//   "sectionsList": [
//       {
//           "section": "Section 1",
//           "id": 1,
//           "questionList": [
//               {
//                   "id": 3,
//                   "contentType": "api | mcq question",
//                   "contentObject": {
//                       "id": 1,
//                       "options": [
//                           {
//                               "id": "3.1",
//                               "mcqQuestion": 1,
//                               "choiceText": "Framework",
//                               "childs": [
//                                   {
//                                       "id": "3.1.8",
//                                       "contentType": "api | email question",
//                                       "contentObject": {
//                                           "id": 1,
//                                           "options": [],
//                                           "questionText": "",
//                                           "questionType": "EmailQuestion",
//                                           "regex": "^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-.]+$",
//                                           "hasOption": false
//                                       },
//                                       "objectId": 1,
//                                       "createdDate": "2023-08-08T09:06:14.667685Z",
//                                       "updatedDate": "2023-08-08T09:06:14.667708Z",
//                                       "enabled": true,
//                                       "version": 1,
//                                       "published": false,
//                                       "isRequired": false
//                                   },
//                                   {
//                                       "id": "3.1.12",
//                                       "contentType": "api | mcq question",
//                                       "contentObject": {
//                                           "id": 3,
//                                           "options": [
//                                               {
//                                                   "id": "3.1.12.3",
//                                                   "mcqQuestion": 3,
//                                                   "choiceText": "IDK"
//                                               },
//                                               {
//                                                   "id": "3.1.12.4",
//                                                   "mcqQuestion": 3,
//                                                   "choiceText": "nothing"
//                                               },
//                                               {
//                                                   "id": "3.1.12.5",
//                                                   "mcqQuestion": 3,
//                                                   "choiceText": "Software Company"
//                                               }
//                                           ],
//                                           "questionText": "What is Selteq???",
//                                           "questionType": "MCQQuestion",
//                                           "regex": " ",
//                                           "hasOption": true,
//                                           "multipleChoice": false
//                                       },
//                                       "objectId": 3,
//                                       "createdDate": "2023-08-08T13:11:06.883056Z",
//                                       "updatedDate": "2023-08-08T13:11:06.883083Z",
//                                       "enabled": true,
//                                       "version": 1,
//                                       "published": false,
//                                       "isRequired": false
//                                   }
//                               ],
//                               "hasChild": true
//                           },
//                           {
//                               "id": "3.2",
//                               "mcqQuestion": 1,
//                               "choiceText": "Tool",
//                               "childs": [
//                                   {
//                                       "id": "3.2.13",
//                                       "contentType": "api | email question",
//                                       "contentObject": {
//                                           "id": 2,
//                                           "options": [],
//                                           "questionText": "raheel@yasir.selteq",
//                                           "questionType": "EmailQuestion",
//                                           "regex": "^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-.]+$",
//                                           "hasOption": false
//                                       },
//                                       "objectId": 2,
//                                       "createdDate": "2023-08-08T13:14:56.989954Z",
//                                       "updatedDate": "2023-08-08T13:14:56.989974Z",
//                                       "enabled": true,
//                                       "version": 1,
//                                       "published": false,
//                                       "isRequired": false
//                                   }
//                               ],
//                               "hasChild": true
//                           }
//                       ],
//                       "questionText": "What is React js ??????????????????????????????????????????????",
//                       "questionType": "MCQQuestion",
//                       "regex": "",
//                       "hasOption": true,
//                       "multipleChoice": false
//                   },
//                   "objectId": 1,
//                   "createdDate": "2023-08-04T13:33:00.756785Z",
//                   "updatedDate": "2023-08-04T13:33:00.756808Z",
//                   "enabled": true,
//                   "version": 1,
//                   "published": false,
//                   "isRequired": false
//               }
//           ]
//       }
//   ],
//   "published": true
// }
