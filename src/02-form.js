// saving data at local storage
function localStorageSavedData(key, value) {
    const dataToJSON = JSON.stringify(value);
    localStorage.setItem(key, dataToJSON);
  }

// restoring data from local storage
function localStorageRestoredData(key) {
    const jsonData = localStorage.getItem(key);
// error processing with *JSON format by using try...catch
try {
    const parsedData = JSON.parse(jsonData);
        return parsedData;
    } catch {
        return jsonData;
    }
}
  
// preparing form data object
const formData = {
    email: "",
    message: "",
};
  
// adding event-listener for local storage states
const feedbackFormElement = document.querySelector('.feedback-form');

// local storage's name
const feedbackFormState = "feedback-form-state";
  
feedbackFormElement.addEventListener('submit', event => {
    event.preventDefault();

// catching form datas
    let typedEmail = feedbackFormElement.elements.email.value;
    let typedMessage = feedbackFormElement.elements.message.value;
    
// deleting white characters by .trim() method
    typedEmail = typedEmail.trim();
    typedMessage = typedMessage.trim();
  
    if (typedEmail === '' || typedMessage === '') {
        alert("Before sending all of fields must be filled up.");
        } else {
        console.log(formData);

// reseting all typing fields from local storage  
        localStorage.removeItem(feedbackFormState);
        formData.email = "";
        formData.message = "";
        feedbackFormElement.reset();
    }
});

/* preventing typing fields from erasing during refreshing site */
feedbackFormElement.addEventListener('input', event => {
    let typedEmail = feedbackFormElement.elements.email.value;
    let typedMessage = feedbackFormElement.elements.message.value;

// deleting white characters by .trim() method
    typedEmail = typedEmail.trim();
    typedMessage = typedMessage.trim();
     
    formData.email = typedEmail;
    formData.message = typedMessage;

    localStorageSavedData(feedbackFormState, formData);
});
  
  
const localStorageBackup = localStorage.getItem(feedbackFormState);
if (localStorageBackup !== null) {
    const parsedLocalStorage = JSON.parse(localStorageBackup);
    feedbackFormElement.elements.email.value = parsedLocalStorage.email;
    feedbackFormElement.elements.message.value = parsedLocalStorage.message;

    formData.email = parsedLocalStorage.email;
    formData.message = parsedLocalStorage.message;
}