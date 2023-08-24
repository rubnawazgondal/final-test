import React, { useState } from "react";
import { CgLoadbarDoc } from "react-icons/cg";

import Card from "../../../reusable_components/card";
import Button from "../../../reusable_components/button";
import { postQuestion } from "../../../../global/fetch_requests";
import TextField from "../../../reusable_components/custom_textfield";

export const QuestionBuilder = () => {
  const [questionType, setQuestionType] = useState("SmallTextQuestion");
  const [questionTitle, setQuestionTitle] = useState("");
  const [isMultiple, setIsMultiple] = useState(false);
  const [limitDate, setLimitDate] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [statement, setStatement] = useState("");
  const [endDate, setEndDate] = useState("");
  const [Options, setOptions] = useState([
    { id: 1, value: "" },
    { id: 2, value: "" },
  ]);
  const [McqOptions, setMCQOptions] = useState([
    { id: 1, value: "" },
    { id: 2, value: "" },
  ]);

  const updateSpinnerOptions = (id, value) => {
    const index = Options.findIndex((e) => e.id === id);
    var optionsList = [...Options]; // important to create a copy, otherwise you'll modify state outside of setState call
    optionsList[index] = { id: id, value: value };
    setOptions(optionsList);
  };

  const addOptionSpinner = () => {
    setOptions([
      ...Options,
      { id: Options[Options.length - 1].id + 1, value: "" },
    ]);
  };
  const deleteOptionSpinner = (index) => {
    setOptions([
      ...Options.slice(0, index),
      ...Options.slice(index + 1, Options.length),
    ]);
  };

  const updateMCQOptions = (id, value) => {
    const index = McqOptions.findIndex((e) => e.id === id);
    var optionsList = [...McqOptions]; // important to create a copy, otherwise you'll modify state outside of setState call
    optionsList[index] = { id: id, value: value };
    setMCQOptions(optionsList);
  };

  const addMCQSpinner = () => {
    setMCQOptions([
      ...McqOptions,
      { id: McqOptions[McqOptions.length - 1].id + 1, value: "" },
    ]);
  };
  const deleteMCQSpinner = (index) => {
    setMCQOptions([
      ...McqOptions.slice(0, index),
      ...McqOptions.slice(index + 1, McqOptions.length),
    ]);
  };

  const submitQuestion = () => {
    setIsLoading(true);
    const questionTypeConfig = {
      SmallTextQuestion: {
        regex: "^.{0,100}$",
      },
      LongTextQuestion: {
        regex: "^.*$",
      },
      EmailQuestion: {
        regex: "^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-.]+$",
      },
      NumberQuestion: {
        regex: "^\\d+$",
      },
      DropdownQuestion: {
        options: Options,
        regex: " ",
      },
      MCQQuestion: {
        options: McqOptions,
        multiple: isMultiple,
        regex: " ",
      },
      DateQuestion: {
        startDate,
        endDate,
        limit: limitDate,
        regex: " ",
      },
      ImageQuestion: {
        regex: " ",
      },
      DocumentQuestion: {
        regex: " ",
      },
      SignatureQuestion: {
        regex: " ",
      },
      LabelQuestion: {
        regex: " ",
      },
      StatementQuestion: {
        statement,
        regex: " ",
      },
      VideoQuestion: {
        regex: " ",
      },
      AudioQuestion: {
        regex: " ",
      },
    };
    const config = questionTypeConfig[questionType];
    if (config) {
      const data = {
        type: questionType,
        question: questionTitle,
      };
      Object.keys(config).forEach((key) => {
        if (config[key]) {
          data[key] = config[key];
        }
      });
      postQuestion(data)
        .then((res) => {
          if (!res.error) {

            cleanFields();
          } else {
            alert(res.message);
          }
        })
        .catch((e) => alert(e))
        .finally(() => setIsLoading(false));
    }
  };

  const cleanFields = () => {
    setQuestionType("SmallTextQuestion");
    setMCQOptions("");
    setMCQOptions([
      { id: 1, value: "" },
      { id: 2, value: "" },
    ]);
    setOptions([
      { id: 1, value: "" },
      { id: 2, value: "" },
    ]);
    setIsMultiple(false);
    setLimitDate(false);
    setStartDate("");
    setEndDate("");
    setQuestionTitle("");
  };

  const renderOptions = (
    options,
    updateFunction,
    deleteFunction,
    addSpinner
  ) => (
    <div className="mt-3">
      <div className="d-flex align-items-center mb-3">
        <input
          type="checkbox"
          id="check_mcq"
          className="me-3"
          value={"isMultiple"}
          onClick={() => {
            setIsMultiple(!isMultiple);
          }}
        />
        <label>Multiple Choose</label>
      </div>
      <div className="mb-4">
        Options{" "}
        <Button className="px-1 py-2" onClickHandler={addSpinner}>
          <small className="px-2">+</small>
        </Button>
      </div>
      {options.map((option, index) => (
        <div className="mb-2 d-flex align-items-start" key={option.id}>
          <TextField
            type="text"
            value={option.value}
            onHandleChange={(e) => updateFunction(option.id, e.target.value)}
            placeholder="enter text"
            label="Enter Details"
          />
          {index > 1 ? (
            <Button
              className="px-4 py-3 ms-3"
              onClickHandler={() => deleteFunction(index)}
            >
              -
            </Button>
          ) : null}
        </div>
      ))}
    </div>
  );

  const renderDateOptions = () => (
    <div className="d-flex flex-column align-items-center mt-2">
      <div>
        <input
          id="limit_date"
          type="checkbox"
          className="me-3"
          checked={limitDate}
          onChange={() => setLimitDate(!limitDate)}
        />
        <label htmlFor="limit_date">Limit Date (Start/End)</label>
      </div>
      {limitDate ? (
        <div className="d-flex mt-3">
          <TextField
            label="Start Date"
            type="date"
            value={startDate}
            onHandleChange={(e) => setStartDate(e.target.value)}
            maxDate={endDate}
          />
          <div className="ms-5">
            <TextField
              label="End Date"
              type="date"
              value={endDate}
              onHandleChange={(e) => setEndDate(e.target.value)}
              minDate={startDate}
            />
          </div>
        </div>
      ) : null}
    </div>
  );

  return (
    <Card>
      <div className="d-flex align-items-center">
        <CgLoadbarDoc size={"1.5rem"} className="text-primary me-2" />
        <h4 className="mt-2">Question and Answer Builder</h4>
      </div>
      <hr />
      <div className="d-flex">
        <div className="col-lg-8 col-md-8">
          <div className="me-3">
            <TextField
              type={
                questionType === "EmailQuestion"
                  ? "email"
                  : questionType === "NumberQuestion"
                  ? "number"
                  : "text"
              }
              label="What..."
              onHandleChange={(e) => setQuestionTitle(e.target.value)}
              value={questionTitle}
              placeholder="What..."
            />
          </div>
        </div>
        <div className="form-floating col-lg-4 col-md-4 ">
          <select
            className="form-select pt-2 input_field_height"
            value={questionType}
            onChange={(e) => {
              setQuestionType(e.target.value);
            }}
            id="floatingSelect"
            aria-label="Floating label select example"
          >
            <option defaultValue>Small Text</option>
            <option value="LongTextQuestion">Long Text</option>
            <option value="EmailQuestion">Email</option>
            <option value="NumberQuestion">Number</option>
            <option value="DropdownQuestion">Dropdown/Spinner</option>
            <option value="MCQQuestion">MCQ(Multiple Choice)</option>
            <option value="DateQuestion">Date</option>
            <option value="ImageQuestion">Image</option>
            <option value="DocumentQuestion">Document</option>
            <option value="SignatureQuestion">Signature</option>
            <option value="LabelQuestion">Label</option>
            <option value="StatementQuestion">Statement</option>
            <option value="VideoQuestion">Video</option>
            <option value="AudioQuestion">Audio</option>
          </select>
          {/* <label htmlFor="floatingSelect">select question type</label> */}
        </div>
      </div>
      {questionType === "StatementQuestion" && (
        <div className="rounded shadow p-3 bg-light my-2">
          <div>
            <h4>Statement</h4>
            <textarea
              type="text"
              className="form-control "
              onChange={(e) => setStatement(e.target.value)}
              value={statement}
            />
          </div>
        </div>
      )}
      {questionType === "DropdownQuestion" && (
        <div className="rounded shadow p-3 bg-light my-2">
          {renderOptions(
            Options,
            updateSpinnerOptions,
            deleteOptionSpinner,
            addOptionSpinner
          )}
        </div>
      )}
      {questionType === "MCQQuestion" && (
        <div className="rounded shadow p-3 bg-light my-2">
          {renderOptions(
            McqOptions,
            updateMCQOptions,
            deleteMCQSpinner,
            addMCQSpinner
          )}
        </div>
      )}
      {questionType === "DateQuestion" && (
        <div className="rounded shadow p-3 bg-light my-2">
          {renderDateOptions()}
        </div>
      )}
      {
        <div className="d-flex justify-content-end mt-4">
          <Button
            disabled={
              isLoading ||
              (questionTitle === "" && questionType === "") || // For other question types
              (questionType === "StatementQuestion" && statement === "") || // For StatementQuestion type
              (questionType === "MCQQuestion" &&
                McqOptions.some((option) => option.value === "")) || // For MCQQuestion type
              (questionType === "DropdownQuestion" &&
                Options.some((option) => option.value === "")) || // For DropdownQuestion type
              (questionType === "DateQuestion" &&
                (limitDate ? startDate === "" || endDate === "" : false)) // For DateQuestion type
            }
            onClickHandler={() => submitQuestion()}
          >
            Create New
          </Button>
        </div>
      }
    </Card>
  );
};

// const [smallQuestion, setSmallQuestion] = useState("");
//   const [longQuestion, setLongQuestion] = useState("");
//   const [emailQuestion, setEmailQuestion] = useState("");
//   const [numberQuestion, setNumberQuestion] = useState(0);
//   const [spinnerQuestion, setSpinnerQuestion] = useState("");
//   const [mcqQuestion, setMcqQuestion] = useState("");
//   const [dateQuestion, setDateQuestion] = useState("");
// const [imageQuestion, setImageQuestion] = useState("");
//   const [documentQuestion, setDocumentQuestion] = useState("");
// const [videoQuestion, setVideoQuestion] = useState("");
//   const [audioQuestion, setAudioQuestion] = useState("");
//   const [questionStatement, setQuestionStatement] = useState("");
//   const [refreshQuestions, setRefreshQuestions] = useState(false);
//   const [questionsList, setQuestionsList] = useState([]);
//   const [questionsFilterList, setQuestionsFilterList] = useState([]);
// const [signatureQuestion, setSignatureQuestion] = useState("");
//   const [labelQuestion, setLabelQuestion] = useState("");
//   const [statementQuestion, setStatementQuestion] = useState("");

// {(() => {
//   if (
//     questionType === "SmallTextQuestion"
//   ) {
//     return (
//       <div className="text-end">
//         {/* <div>
//           <h4>Short Question Statement</h4>
//           <input
//             type="text"
//             onChange={(e) => setSmallQuestion(e.target.value)}
//             value={smallQuestion}
//             className="form-control "
//           />
//         </div> */}
//       </div>
//     );
//   }
//   //  else if (questionType === "LongTextQuestion") {
//   //   return (
//   //     <div className="rounded shadow p-3 bg-light my-2">
//   //       <div>
//   //         <h4>Long Question Statement</h4>
//   //         <input
//   //           type="text"
//   //           className="form-control "
//   //           onChange={(e) => setLongQuestion(e.target.value)}
//   //           value={longQuestion}
//   //         />
//   //       </div>
//   //       {longQuestion !== "" ? (
//   //         <button
//   //           className="btn btn-danger mt-3"
//   //           onClick={() => submitQuestion()}
//   //         >
//   //           Save
//   //         </button>
//   //       ) : (
//   //         <></>
//   //       )}
//   //     </div>
//   //   );
//   // }
//   //  else if (questionType === "NumberQuestion") {
//   //   return (
//   //     <div className="rounded shadow p-3 bg-light my-2">
//   //       <div>
//   //         <h4>Number Question Statement</h4>
//   //         <input
//   //           type="text"
//   //           className="form-control "
//   //           onChange={(e) => setNumberQuestion(e.target.value)}
//   //           value={numberQuestion}
//   //         />
//   //       </div>
//   //       {numberQuestion !== "" ? (
//   //         <button
//   //           className="btn btn-danger mt-3"
//   //           onClick={() => submitQuestion()}
//   //         >
//   //           Save
//   //         </button>
//   //       ) : (
//   //         <></>
//   //       )}
//   //     </div>
//   //   );
//   // }
//   //  else if (questionType === "EmailQuestion") {
//   //   return (
//   //     <div className="rounded shadow p-3 bg-light my-2">
//   //       <div>
//   //         <h4>Email Question Statement</h4>
//   //         <input
//   //           type="text"
//   //           className="form-control "
//   //           onChange={(e) => setEmailQuestion(e.target.value)}
//   //           value={emailQuestion}
//   //         />
//   //       </div>
//   //       {emailQuestion !== "" ? (
//   //         <button
//   //           className="btn btn-danger mt-3"
//   //           onClick={() => submitQuestion()}
//   //         >
//   //           Save
//   //         </button>
//   //       ) : (
//   //         <></>
//   //       )}
//   //     </div>
//   //   );
//   // }
//   //  else if (questionType === "ImageQuestion") {
//   //   return (
//   //     <div className="rounded shadow p-3 bg-light my-2">
//   //       <div>
//   //         <h4>Image Question Statement</h4>
//   //         <input
//   //           type="text"
//   //           className="form-control "
//   //           onChange={(e) => setImageQuestion(e.target.value)}
//   //           value={imageQuestion}
//   //         />
//   //       </div>
//   //       {imageQuestion !== "" ? (
//   //         <button
//   //           className="btn btn-danger mt-3"
//   //           onClick={() => submitQuestion()}
//   //         >
//   //           Save
//   //         </button>
//   //       ) : (
//   //         <></>
//   //       )}
//   //     </div>
//   //   );
//   // }
//   //  else if (questionType === "DocumentQuestion") {
//   //   return (
//   //     <div className="rounded shadow p-3 bg-light my-2">
//   //       <div>
//   //         <h4>Document Question Statement</h4>
//   //         <input
//   //           type="text"
//   //           className="form-control "
//   //           onChange={(e) => setDocumentQuestion(e.target.value)}
//   //           value={documentQuestion}
//   //         />
//   //       </div>
//   //       {documentQuestion !== "" ? (
//   //         <button
//   //           className="btn btn-danger mt-3"
//   //           onClick={() => submitQuestion()}
//   //         >
//   //           Save
//   //         </button>
//   //       ) : (
//   //         <></>
//   //       )}
//   //     </div>
//   //   );
//   // }
//   //  else if (questionType === "SignatureQuestion") {
//   //   return (
//   //     <div className="rounded shadow p-3 bg-light my-2">
//   //       <div>
//   //         <h4>Signature Question Statement</h4>
//   //         <input
//   //           type="text"
//   //           className="form-control "
//   //           onChange={(e) => setSignatureQuestion(e.target.value)}
//   //           value={signatureQuestion}
//   //         />
//   //       </div>
//   //       {signatureQuestion !== "" ? (
//   //         <button
//   //           className="btn btn-danger mt-3"
//   //           onClick={() => submitQuestion()}
//   //         >
//   //           Create New
//   //         </button>
//   //       ) : (
//   //         <></>
//   //       )}
//   //     </div>
//   //   );
//   // }
//   //  else if (questionType === "LabelQuestion") {
//   //   return (
//   //     <div className="rounded shadow p-3 bg-light my-2">
//   //       <div>
//   //         <h4>Label Question Statement</h4>
//   //         <input
//   //           type="text"
//   //           className="form-control "
//   //           onChange={(e) => setLabelQuestion(e.target.value)}
//   //           value={labelQuestion}
//   //         />
//   //       </div>
//   //       {labelQuestion !== "" ? (
//   //         <button
//   //           className="btn btn-danger mt-3"
//   //           onClick={() => submitQuestion()}
//   //         >
//   //           Save
//   //         </button>
//   //       ) : (
//   //         <></>
//   //       )}
//   //     </div>
//   //   );
//   // }
//   //  else if (questionType === "VideoQuestion") {
//   //   return (
//   //     <div className="rounded shadow p-3 bg-light my-2">
//   //       <div>
//   //         <h4>Video Question Statement</h4>
//   //         <input
//   //           type="text"
//   //           className="form-control "
//   //           onChange={(e) => setVideoQuestion(e.target.value)}
//   //           value={videoQuestion}
//   //         />
//   //       </div>
//   //       {videoQuestion !== "" ? (
//   //         <button
//   //           className="btn btn-danger mt-3"
//   //           onClick={() => submitQuestion()}
//   //         >
//   //           Save
//   //         </button>
//   //       ) : (
//   //         <></>
//   //       )}
//   //     </div>
//   //   );
//   // }
//   //  else if (questionType === "AudioQuestion") {
//   //   return (
//   //     <div className="rounded shadow p-3 bg-light my-2">
//   //       <div>
//   //         <h4>Audio Question Statement</h4>
//   //         <input
//   //           type="text"
//   //           className="form-control "
//   //           onChange={(e) => setAudioQuestion(e.target.value)}
//   //           value={audioQuestion}
//   //         />
//   //       </div>
//   //       {audioQuestion !== "" ? (
//   //         <button
//   //           className="btn btn-danger mt-3"
//   //           onClick={() => submitQuestion()}
//   //         >
//   //           Save
//   //         </button>
//   //       ) : (
//   //         <></>
//   //       )}
//   //     </div>
//   //   );
//   // }
//   else if (questionType === "StatementQuestion") {
//     return (
//       <div className="rounded shadow p-3 bg-light my-2">
//         <div>
//           {/* <h4>Statement Question Statement</h4>
//           <input
//             type="text"
//             className="form-control "
//             onChange={(e) => setStatementQuestion(e.target.value)}
//             value={statementQuestion}
//           /> */}
//           <h4>Statement</h4>
//           <textarea
//             type="text"
//             className="form-control "
//             onChange={(e) => setStatement(e.target.value)}
//             value={statement}
//           />
//         </div>
//       </div>
//     );
//   } else if (questionType === "DropdownQuestion") {
//     return (
//       <div className="rounded shadow p-3 bg-light my-2">
//         <div>
//           {/* <h4>Spinner Question Statement</h4>
//           <input
//             type="text"
//             className="form-control "
//             onChange={(e) => setSpinnerQuestion(e.target.value)}
//             value={spinnerQuestion}
//           /> */}
//         </div>
//         <div className="mt-3">
//           <div className="d-flex align-items-center mb-2">
//             <h5 className="me-2">Options</h5>
//             <button
//               className="btn btn-danger"
//               onClick={() => addOptionSpinner()}
//             >
//               +
//             </button>
//           </div>

//           <div className="">
//             {Options.map((e, index) => {
//               return (
//                 <div className="mb-2 d-flex" key={e.id}>
//                   <input
//                     type="text"
//                     value={e.value}
//                     key={e.id}
//                     onChange={(v) =>
//                       updateSpinnerOptions(e.id, v.target.value)
//                     }
//                     className="form-control me-2"
//                     placeholder="enter text"
//                   />
//                   {index > 1 ? (
//                     <button
//                       className="btn btn-danger"
//                       onClick={() => deleteOptionSpinner(index)}
//                     >
//                       -
//                     </button>
//                   ) : (
//                     <></>
//                   )}
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//       </div>
//     );
//   } else if (questionType === "MCQQuestion") {
//     return (
//       <div className="rounded shadow p-3 bg-light my-2">
//         <div>
//           {/* <h4>MCQ Question Statement</h4>
//           <input
//             type="text"
//             className="form-control "
//             onChange={(e) => setMcqQuestion(e.target.value)}
//             value={mcqQuestion}
//           /> */}
//           <div className="d-flex align-items-center mt-2">
//             <input
//               type="checkbox"
//               id="check_mcq"
//               className="me-3"
//               value={isMultiple}
//               onClick={() => {
//                 setIsMultiple(!isMultiple);
//               }}
//             />
//             <label htmlFor="check_mcq">Multiple Selection </label>
//           </div>
//         </div>
//         <div className="mt-3">
//           <div className="d-flex align-items-center mb-2">
//             <h5 className="me-2">Options</h5>
//             <button
//               className="btn btn-danger"
//               onClick={() => addMCQSpinner()}
//             >
//               +
//             </button>
//           </div>

//           <div className="">
//             {McqOptions.map((e, index) => {
//               return (
//                 <div className="mb-2 d-flex" key={e.id}>
//                   <input
//                     type="text"
//                     value={e.value}
//                     key={e.id}
//                     onChange={(v) =>
//                       updateMCQOptions(e.id, v.target.value)
//                     }
//                     className="form-control me-2"
//                     placeholder="enter text"
//                   />
//                   {index > 1 ? (
//                     <button
//                       className="btn btn-danger"
//                       onClick={() => deleteMCQSpinner(index)}
//                     >
//                       -
//                     </button>
//                   ) : (
//                     <></>
//                   )}
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//       </div>
//     );
//   } else if (questionType === "DateQuestion") {
//     return (
//       <div className="rounded shadow p-3 bg-light my-2">
//         <div>
//           {/* <h4>Date Question Statement</h4>
//           <input
//             type="email"
//             className="form-control "
//             onChange={(e) => setDateQuestion(e.target.value)}
//             value={dateQuestion}
//           /> */}
//           <div className="d-flex align-items-center mt-2">
//             <input
//               id="limit_date"
//               type="checkbox"
//               className="me-3"
//               value={limitDate}
//               onClick={() => {
//                 setLimitDate(!limitDate);
//               }}
//             />
//             <label htmlFor="limit_date">
//               Limit Date (Start/End){" "}
//             </label>
//           </div>
//           {limitDate ? (
//             <div className="d-flex mt-3">
//               <div>
//                 <label>Start Date</label>
//                 <input
//                   type="date"
//                   className="form-control"
//                   value={startDate}
//                   onChange={(e) => setStartDate(e.target.value)}
//                 />
//               </div>
//               <div className="ms-5">
//                 <label>End Date</label>
//                 <input
//                   type="date"
//                   className="form-control"
//                   value={endDate}
//                   onChange={(e) => setEndDate(e.target.value)}
//                 />
//               </div>
//             </div>
//           ) : (
//             <></>
//           )}
//         </div>
//       </div>
//     );
//   }
// })()}

// function cleanFields() {
//   setQuestionType("");
//   setSmallQuestion("");
//   setLongQuestion("");
//   setNumberQuestion("");
//   setEmailQuestion("");
//   setSpinnerQuestion("");
//   setMCQOptions("");
//   setMCQOptions([
//     { id: 1, value: "" },
//     { id: 2, value: "" },
//   ]);
//   setOptions([
//     { id: 1, value: "" },
//     { id: 2, value: "" },
//   ]);
//   setIsMultiple(false);
//   setLimitDate(false);
//   setDateQuestion("");
//   setStartDate("");
//   setEndDate("");
// }
