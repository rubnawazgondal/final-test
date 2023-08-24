// export const GET_SUBSCRIPTION = `
//   query {
//     subscriptions {
//       BusinessId
//       createdAt
//       endDate
//       id
//       isDeleted
//       startDate
//       status
//       updatedAt
//       planId {
//         createdAt
//         currency
//         id
//         isActive
//         isDeleted
//         name
//         planEntity
//         price
//       }
//     }
//   }
// `;

export const GET_SUBSCRIPTION = `
query{
  subscriptions{
    planId{
      name
      isActive
      updatedAt
      createdAt
      planEntity
    }
    startDate
    endDate
  subscriberSet{
    startDate
    BusinessId
  }
  }
  
}`;

export const GET_PLAN = `
  query {
    plans {
      createdAt
      currency
      id
      isActive
      isDeleted
      name
      planEntity
      price
      productId {
        createdAt
        description
        id
        isDeleted
        name
      }
    }
  }`;

export const GET_PLAN_ENTITIES = `
  query {
    planEntities {
      createdAt
      id
      isDeleted
      name
      updatedAt
    }
      }`;

export const GET_PRODUCTS = `
  query {
   products {
    createdAt
    updatedAt
    type
    name
    id
    isDeleted
  }
}`;
