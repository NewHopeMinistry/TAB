//Snippets

const document = documents.find(doc => doc.id === result.ref);

if(res) {
    verses = await res.json();
} else {
    alert('This file has not been retrieved from the server yet. To access this file you must connect to the internet, so it can be fetched. Once it has been fetched from the internet, it will then be available offline for future use.');
};

// Function to check internet connection status
function checkInternetConnection() {
    if (navigator.onLine) {
        console.log("You are online!");
    } else {
        console.log("You are offline!");
    }
}

// Event listeners for online and offline events
window.addEventListener('online', () => {console.log("You are back online!")});
window.addEventListener('offline', () => console.log("You have lost connection!"));

// Initial check
checkInternetConnection();

function customError(errorCode, errorMessage) {
    const error =new Error(errorMessage);
    error.code = errorCode;
    throw error;
};
