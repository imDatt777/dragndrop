/**
 * SetDataToLocalStorage
 *
 * @description - Method to set the data in the local storage
 */
export const setDataToLocalStorage = (key, data) => {
    const formattedData = JSON.stringify(data);
    localStorage.setItem(key, formattedData);
};

/**
 * GetDataFromLocalStorage
 * @description - Method to get the data from the local storage
 */
export const getDataFromLocalStorage = (key) => {
    const data = localStorage.getItem(key);
    return JSON.parse(data);
};

/**
 * RemoveElement
 * @description - Method to remove the deleted element
 */
export const removeElement = (id) => {
    let storedData = getDataFromLocalStorage("elementsData");

    // Use filter to create a new array without the object with the specified id
    storedData = storedData.filter((obj) => obj.elemId !== id);

    setDataToLocalStorage("elementsData", storedData);
};
