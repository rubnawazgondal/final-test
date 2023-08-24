export const getNumberOfDays = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const oneDay = 24 * 60 * 60 * 1000;
    return Math.round(Math.abs((end - start) / oneDay));
  }