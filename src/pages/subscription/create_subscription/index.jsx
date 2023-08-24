import { useNavigate } from "react-router-dom";
import { RiAddCircleLine } from "react-icons/ri";
import React, { useCallback, useEffect, useState } from "react";

import Header from "../../../components/reusable_components/header";
import SideBar from "../../../components/reusable_components/sidebar";
import { createGraphQlQuery, getGraphQlQuery } from "../../../global/fetch_requests";
import TextField from "../../../components/reusable_components/custom_textfield";
import CustomDropdown from "../../../components/reusable_components/custom_dropdown";
import Button from "../../../components/reusable_components/button";
import TextFieldWithButton from "../../../components/reusable_components/textfieldwithbutton";

import styles from "./create_subscription.module.css";

const paymentMethods = [
  { id: 1, name: "Monthly" },
  { id: 2, name: "Annually" },
];

const CreateSubscription = () => {
  const navigate = useNavigate();
  const [createPlanEntity, setCreatePlanEntity] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [plans, setPlans] = useState([]);
  const [planEntities, setPlanEntities] = useState([]);
  const [products, setProducts] = useState([]);
  const [addPlan, setAddPlan] = useState(false);
  const [isLoadingForCreatePlan, setIsLoadingForCreatePlan] = useState(false);
  const [isLoadingForCreateFeature, setIsLoadingForCreateFeature] =
    useState(false);
  const [createPlan, setCreatedPlan] = useState({
    title: "",
    price: 0,
  });
  const [selectedSubscription, setSelectedSubscription] = useState({
    business: {},
    startDate: "",
    endDate: "",
    plan: {},
    subscriptionTitle: "",
    paymentMethod: { id: 1, name: "Monthly" },
    product: {},
    selectedFeatures: [],
  });

  const fetchPlan = useCallback(() => {
    setIsLoading(true);
    getGraphQlQuery(false, true, false)
      .then((res) => {
        if (res) {
          setPlans(res?.data?.plans);
        }
      })
      .catch((e) => alert(e))
      .finally(() => setIsLoading(false));
  }, []);

  const fetchPlanEntites = useCallback(() => {
    getGraphQlQuery(false, false, true)
      .then((res) => {
        if (res) {
          setPlanEntities(res?.data?.planEntities);
        }
      })
      .catch((e) => alert(e));
  }, []);

  const fetchProducts = useCallback(() => {
    getGraphQlQuery(false, false, false, true)
      .then((res) => res && setProducts(res?.data?.products))
      .catch((e) => alert(e));
  }, []);

  const createPlanEntityHandler = () => {
    if (createPlanEntity !== "") {
      setIsLoadingForCreateFeature(true);
      const query = {
        query: `
              mutation {
                createPlanEntity(name: "${createPlanEntity}") {
                  planEntity {
                    createdAt
                    id
                    isDeleted
                    name
                    updatedAt
                  }
                }
              }
            `,
      };
      createGraphQlQuery(query)
        .then((res) => {
          setCreatePlanEntity("");
          fetchPlanEntites();
        })
        .catch((e) => alert(e))
        .finally(() => setIsLoadingForCreateFeature(false));
    } else {
      alert("Enter entity here");
      return;
    }
  };

  const createPlanHandler = () => {
    if (
      selectedSubscription?.product?.id &&
      selectedSubscription.selectedFeatures.length > 0
    ) {
      setIsLoadingForCreatePlan(true);
      const query = {
        query: `
            mutation {
              createPlan(
                currency: "USD"
                isActive: false
                name: "${createPlan.title}"
                planEntity: "${selectedSubscription.selectedFeatures[0].id}"
                price: "${createPlan.price}"
                productId: "${selectedSubscription.product.id}"
              ) {
                plan {
                  createdAt
                  currency
                  id
                  isActive
                  isDeleted
                  name
                  planEntity
                  price
                  updatedAt
                }
              }
            }
          `,
      };
      createGraphQlQuery(query)
        .then((res) => {
          setCreatedPlan({
            title: "",
            price: 0,
          });
          fetchPlan();
        })
        .catch((e) => alert(e))
        .finally(() => setIsLoadingForCreatePlan(false));
    } else {
      alert("please select product and feature");
      return;
    }
  };

  const createSubscriptionHandler = () => {
    if (
      selectedSubscription?.product?.id &&
      selectedSubscription?.plan?.id &&
      selectedSubscription.endDate &&
      selectedSubscription.startDate &&
      selectedSubscription.subscriptionTitle &&
      selectedSubscription.selectedFeatures.length > 0
    ) {
      setIsLoading(true);
      const query = {
        query: `
                mutation {
                  createSubscription(
                    businessId: "${selectedSubscription?.business?.id}",
                    startDate: "${selectedSubscription?.startDate}",
                    endDate: "${selectedSubscription?.endDate}",
                    planId: "${selectedSubscription?.plan?.id}"
                  ) {
                    subscription {
                      BusinessId
                      createdAt
                      endDate
                      id
                      isDeleted
                      startDate
                      status
                      updatedAt
                    }
                  }
                }
              `,
      };
      createGraphQlQuery(query)
        .then((res) => {
          setSelectedSubscription({
            business: {},
            startDate: "",
            endDate: "",
            plan: {},
            subscriptionTitle: "",
            paymentMethod: { id: 1, name: "Monthly" },
            product: {},
            selectedFeatures: [],
          });
          setCreatePlanEntity("");
          setCreatedPlan({
            title: "",
            price: 0,
          });
        })
        .catch((e) => alert(e))
        .finally(() => setIsLoading(false));
    } else {
      alert("Please select Business and Plan");
      return;
    }
  };

  useEffect(() => {
    fetchPlan();
    fetchProducts();
    fetchPlanEntites();
  }, [fetchPlan, fetchProducts, fetchPlanEntites]);

  const checkBoxHandler = (item) => {
    if (selectedSubscription.selectedFeatures.includes(item)) {
      setSelectedSubscription((prevSubscription) => ({
        ...prevSubscription,
        selectedFeatures: prevSubscription.selectedFeatures.filter(
          (feature) => feature !== item
        ),
      }));
    } else {
      setSelectedSubscription((prevSubscription) => ({
        ...prevSubscription,
        selectedFeatures: [...prevSubscription.selectedFeatures, item],
      }));
    }
  };

  return (
    <>
      <Header showAdmin={false} />
      <SideBar showTitleBar={true} title="Add Subscription">
        <div className=" px-5 py-3">
          <div className="d-flex justify-content-between">
            <div className="me-2 w-50">
              <TextField
                label="Subscription Title"
                placeholder="Enter Title for Subscription"
                type="text"
                value={selectedSubscription.subscriptionTitle}
                onHandleChange={(e) =>
                  setSelectedSubscription((prevItems) => ({
                    ...prevItems,
                    subscriptionTitle: e.target.value,
                  }))
                }
                disabled={isLoading}
              />
            </div>
            <div className="ms-2 w-50">
              <CustomDropdown
                id="Payment Method"
                options={paymentMethods}
                value={selectedSubscription?.paymentMethod?.name}
                onChange={(value) =>
                  setSelectedSubscription((prevItems) => ({
                    ...prevItems,
                    paymentMethod: paymentMethods?.find(
                      (method) => method.id === parseInt(value)
                    ),
                  }))
                }
                labelKey="name"
                valueKey="id"
                disabled={isLoading}
              />
            </div>
          </div>
          <div className="d-flex">
            <div className="w-50 me-2">
              <TextField
                type="date"
                label="Start Date"
                value={selectedSubscription.startDate}
                onHandleChange={(e) =>
                  setSelectedSubscription((prevItems) => ({
                    ...prevItems,
                    startDate: e.target.value,
                  }))
                }
                maxDate={selectedSubscription.endDate}
                disabled={isLoading}
              />
            </div>
            <div className="w-50 ms-2">
              <TextField
                type="date"
                label="End Date"
                value={selectedSubscription.endDate}
                onHandleChange={(e) =>
                  setSelectedSubscription((prevItems) => ({
                    ...prevItems,
                    endDate: e.target.value,
                  }))
                }
                minDate={selectedSubscription.startDate}
                disabled={isLoading}
              />
            </div>
          </div>
          <div className="d-flex">
            <div className={`me-2 ${styles.giveWidth}`}>
              <CustomDropdown
                id="Select Plan"
                options={plans}
                value={selectedSubscription?.plan?.name}
                onChange={(value) =>
                  setSelectedSubscription((prevItems) => ({
                    ...prevItems,
                    plan: plans.find((method) => method.id === value),
                  }))
                }
                labelKey="name"
                valueKey="id"
                disabled={isLoading}
              />
            </div>
            <div className={`me-2 ${styles.giveWidth}`}>
              <CustomDropdown
                id="Select Product for Plan"
                options={products}
                value={selectedSubscription?.product?.name}
                onChange={(value) =>
                  setSelectedSubscription((prevItems) => ({
                    ...prevItems,
                    product: products.find((method) => method.id === value),
                  }))
                }
                labelKey="name"
                valueKey="id"
                disabled={isLoading}
              />
            </div>
            <div className={styles.giveWidth}>
              <CustomDropdown
                id="business"
                options={[{ id: 1, name: "BUSINESS" }]}
                value={selectedSubscription?.business?.name}
                onChange={(value) =>
                  setSelectedSubscription((prevItems) => ({
                    ...prevItems,
                    business: { id: 1, name: "BUSINESS" },
                  }))
                }
                labelKey="name"
                valueKey="id"
                disabled={isLoading}
              />
            </div>
          </div>

          <div className="d-flex justify-content-between">
            <div className={styles.addPlanHeading}>
              {addPlan ? "Add Plan" : "Subscription Features"}
            </div>
            <div class="form-check form-switch">
              <input
                class="form-check-input"
                type="checkbox"
                value={addPlan}
                role="switch"
                id="flexSwitchCheckDefault"
                onChange={(e) => setAddPlan(!addPlan)}
              />
              <label class="form-check-label" for="flexSwitchCheckDefault">
                Add Plan
              </label>
            </div>
          </div>
          {addPlan && (
            <div className="card mt-3 px-3 py-4 ">
              <div className="d-flex">
                <div className="w-100 me-2">
                  <TextField
                    label="Plan Title"
                    placeholder="Enter Title for Plan"
                    type="text"
                    value={createPlan.title}
                    onHandleChange={(e) =>
                      setCreatedPlan((prevItems) => ({
                        ...prevItems,
                        title: e.target.value,
                      }))
                    }
                    disabled={isLoadingForCreatePlan}
                  />
                </div>
                <div className="w-100 ms-2">
                  <TextField
                    label="Price"
                    placeholder="Enter Price"
                    type="number"
                    value={createPlan.price}
                    onHandleChange={(e) =>
                      setCreatedPlan((prevItems) => ({
                        ...prevItems,
                        price: e.target.value,
                      }))
                    }
                    disabled={isLoadingForCreatePlan}
                  />
                </div>
              </div>
              <div className="d-flex justify-content-end">
                <Button
                  type="submit"
                  disabled={
                    createPlan.title === "" || createPlan.price <= 0
                      ? true
                      : isLoadingForCreatePlan
                      ? true
                      : false
                  }
                  onClickHandler={(e) => createPlanHandler(e)}
                >
                  Save
                  {/* {loadings ? <ClipLoader color="#fffff" size={30} /> : "Save"}{" "} */}
                </Button>
              </div>
            </div>
          )}

          <div className="card mt-3">
            <div className="d-flex px-4 pt-3">
              <div className="w-100 me-2">
                <TextFieldWithButton
                  label="Add Feature"
                  placeholder="Enter New Feature"
                  type="text"
                  value={createPlanEntity}
                  onHandleChange={(e) => setCreatePlanEntity(e.target.value)}
                  disabled={isLoadingForCreateFeature}
                  disabledButton={
                    createPlanEntity === ""
                      ? true
                      : isLoadingForCreateFeature
                      ? true
                      : false
                  }
                  buttonText="Add"
                  buttonIcon={<RiAddCircleLine className="me-1" />}
                  onClickHandler={createPlanEntityHandler}
                />
              </div>
              <div className="w-100 ms-2">
                <TextFieldWithButton
                  label="Add Feature"
                  placeholder="Enter New Feature"
                  type="text"
                  value=""
                  onHandleChange={() => {}}
                  disabledButton={true}
                  buttonText="Add"
                  buttonIcon={<RiAddCircleLine className="me-1" />}
                />
              </div>
            </div>
            <div className="d-flex ps-4 pb-4">
              <div className={styles.featuresBox}>
                <ul>
                  {planEntities.map((item, index) => (
                    <li key={index}>
                      <input
                        type="checkbox"
                        className="me-3 mb-3"
                        checked={selectedSubscription.selectedFeatures.includes(
                          item
                        )}
                        onChange={() => checkBoxHandler(item)}
                      />
                      {item.name}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="ms-4 d-flex flex-column">
                <span>Please Select Sample Text</span>
                <div className="pt-3">
                  <TextField
                    label="User"
                    type="text"
                    placeholder="Enter Number of User"
                  />
                </div>
                <div className="mt-2 d-flex justify-content-center form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckCheckedDisabled"
                    checked
                    disabled
                  />
                  <label
                    className="form-check-label record ms-2"
                    htmlFor="flexCheckCheckedDisabled"
                  >
                    Automatic Scheduling
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className="d-flex pt-4  justify-content-end">
            <Button isGreyButton={true} className="me-3" onClickHandler={()=>navigate("/subscriptions_list")}>
              Cancel
            </Button>
            <Button
              onClickHandler={createSubscriptionHandler}
              disabled={
                selectedSubscription?.product?.id &&
                selectedSubscription?.plan?.id &&
                selectedSubscription.endDate &&
                selectedSubscription.startDate &&
                selectedSubscription.subscriptionTitle &&
                selectedSubscription.selectedFeatures.length > 0
                  ? false
                  : true
              }
            >
              Save
            </Button>
          </div>
        </div>
      </SideBar>
    </>
  );
};
export default CreateSubscription;
