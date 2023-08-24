/* -------------------------------------------------------------------------- */
/*                                Ip Addresses                                */
/* -------------------------------------------------------------------------- */
// const plexarSignUpUrlLocal = "http://20.77.168.88:8056/"
// const plexaradminSignUpUrlLocal = "http://20.77.168.88:7994/";
// const plexarSubscriptionUrlLocal = "http://20.77.168.88:8030/";
// const plexargenericFormUrlLocal = "http://20.77.168.88:8095/";
// const plexarBusinessUrlLocal = "http://20.77.168.88:8048/";
// const expertStaffUrlLocal = "http://20.68.148.2:8099/";

import {
  GET_PLAN,
  GET_PLAN_ENTITIES,
  GET_PRODUCTS,
  GET_SUBSCRIPTION,
} from "./graphql_queries";

// const headersForGraphQl = {
//   "Content-Type": "application/json",
//   "referrerPolicy": "no-referrer-when-downgrade",
// };

/* -------------------------------------------------------------------------- */
/*                             Links With BaseUrl                             */
/* -------------------------------------------------------------------------- */
// const plexaarLiveUrl = "https://plexaargateway.findanexpert.net/";
const plexaarStagingUrl = "https://plexaargateway-staging.findanexpert.net/";
// const expertLiveUrl = 'https://gateway.findanexpert.net/';
// const expertStagingUrl = "https://gateway-staging.findanexpert.net/";

const plexarAdminSignUpUrl = `${plexaarStagingUrl}adminsignup_svc/pv/`;
const plexarAdminSignInUrl = `${plexaarStagingUrl}adminsignup_svc/pb/`;
const plexarSignUpUrl = `${plexaarStagingUrl}signup_svc/pv/`;
const plexarSubscriptionUrl = `${plexaarStagingUrl}subscription_svc/pb/`;
const plexarGenericFormUrl = `${plexaarStagingUrl}genericform_svc/pb/`;
const plexarBusinessUrl = `${plexaarStagingUrl}business_svc/pb/`;
const expertStaffUrl = `${plexaarStagingUrl}staff_svc/pv/`;

const fetchRequest = async ({
  url = "",
  method = "GET",
  data = {},
  headers = { "Content-Type": "application/json" },
}) => {
  const requestOptions = {
    method: method,
    headers: headers,
  };
  if (method !== "GET") {
    requestOptions.body = JSON.stringify(data);
  }
  try {
    const response = await fetch(url, requestOptions);
    return await response.json(); // Return the parsed response data
  } catch (error) {
    throw new Error("An error occurred during the request."); // Throw an error in case of failure
  }
};

/* -------------------------------------------------------------------------- */
/*                                   SIGN IN                                  */
/* -------------------------------------------------------------------------- */
export const signIn = async (data) => {
  const response = await fetchRequest({
    url: `${plexarAdminSignInUrl}users/signIn`,
    method: "POST",
    data: data,
  });
  return response;
};

/* -------------------------------------------------------------------------- */
/*                                    USERS                                   */
/* -------------------------------------------------------------------------- */
/* -------------------------------- ADD USER -------------------------------- */
export const addUser = async (data) => {
  const response = await fetchRequest({
    url: `${plexarAdminSignInUrl}users/addNewUser`,
    method: "POST",
    data: data,
  });
  return response;
};

/* --------------------------- Assign Permissions --------------------------- */
export const assignPermission = async (data) => {
  const response = await fetchRequest({
    url: `${plexarAdminSignUpUrl}roles/addUserPermissions`,
    method: "POST",
    data: data,
  });
  return response;
}

/* ------------------------------ GET ALL USERS ----------------------------- */
export const getAllUsers = async (userId, pageSize, pageNo) => {
  const response = await fetchRequest({
    url: `${plexarAdminSignUpUrl}users/getAllUsers?userId=${userId}&pageSize=${pageSize}&pageNo=${pageNo}`,
    method: "GET",
  });
  return response;
};

/* -------------------------- GET ALL PLEXAR USERS -------------------------- */
export const getAllPlexarUsers = async () => {
  const response = await fetchRequest({
    url: `${plexarSignUpUrl}users/getAllUsers`,
    method: "GET",
  });
  return response;
};

/* -------------------------------------------------------------------------- */
/*                               GRSPHQL QUERIES                              */
/* -------------------------------------------------------------------------- */
/* ------------------------------- GET METHOD ------------------------------- */
export const getGraphQlQuery = async (
  isAllSubscriptions = false,
  isPlan = false,
  isPlanEntities = false,
  isProduct = false
) => {
  const data = {
    query:
      isAllSubscriptions && !isPlan && !isPlanEntities && !isProduct
        ? GET_SUBSCRIPTION
        : !isAllSubscriptions && isPlan && !isPlanEntities && !isProduct
        ? GET_PLAN
        : !isAllSubscriptions && !isPlan && isPlanEntities && !isProduct
        ? GET_PLAN_ENTITIES
        : !isAllSubscriptions && !isPlan && !isPlanEntities && isProduct
        ? GET_PRODUCTS
        : null,
  };
  const response = await fetchRequest({
    url: plexarSubscriptionUrl,
    method: "POST",
    data: data,
  });
  return response;
};

/* ------------------------------ CREATE METHOD ----------------------------- */
export const createGraphQlQuery = async (query) => {
  const response = await fetchRequest({
    url: plexarSubscriptionUrl,
    method: "POST",
    data: query,
  });
  return response;
};

/* -------------------------------------------------------------------------- */
/*                            QUESTIONS AND ANSWERS                           */
/* -------------------------------------------------------------------------- */
/* ------------------------------ GET QUESTION ------------------------------ */
export const getQuestions = async () => {
  const response = await fetchRequest({
    url: `${plexarGenericFormUrl}questions`,
    method: "GET",
  });
  return response;
};

/* ----------------------------- SEARCH QUESTION ---------------------------- */
export const searchQuestions = async () => {
  const response = await fetchRequest({
    url: `${plexarGenericFormUrl}questions?s=${{}}`,
    method: "GET",
  });
  return response;
};

/* ------------------------------ POST QUESTION ----------------------------- */
export const postQuestion = async (data) => {
  const response = await fetchRequest({
    url: `${plexarGenericFormUrl}question/create`,
    method: "POST",
    data: data,
  });
  return response;
};

/* -------------------------------------------------------------------------- */
/*                                    FORMS                                   */
/* -------------------------------------------------------------------------- */
/* -------------------------------- POST FORM ------------------------------- */
export const postForm = async (data) => {
  const response = await fetchRequest({
    url: `${plexarGenericFormUrl}form/create`,
    method: "POST",
    data: data,
  });
  return response;
};

/* -------------------------------- GET FORMS ------------------------------- */
export const getForms = async () => {
  const response = await fetchRequest({
    url: `${plexarGenericFormUrl}forms`,
    method: "GET",
  });
  return response;
};

/* -------------------------------------------------------------------------- */
/*                                    STAFF                                   */
/* -------------------------------------------------------------------------- */
export const getStaff = async () => {
  const response = await fetchRequest({
    url: `${expertStaffUrl}staff/getStaffs?userId=11&pageSize=22&pageNo=1`,
    method: "GET",
  });
  return response;
};

/* -------------------------------------------------------------------------- */
/*                              GET BUSINESS LIST                             */
/* -------------------------------------------------------------------------- */
export const getBusinessList = async () => {
  const response = await fetchRequest({
    url: `${plexarBusinessUrl}business`,
    method: "GET",
  });
  return response;
};
