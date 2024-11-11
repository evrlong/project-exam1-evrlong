export function showErrorMessage(container) {
  console.log('showErrorMessage called');
  
  // The static error message to display
  const message = ' ❌ ' + ' ' + ' Oops, something went wrong! Please try again later'
  

  // Clear the container content (remove everything inside)
  container.innerHTML = '';

  // Create a new div element to hold the error message
  const errorHeading = document.createElement('div');
  
  // Set the text content of the h2 element
  errorHeading.textContent = message
  
  // Optionally, add a class for styling (e.g., .error)
  errorHeading.classList.add('error');
  
  // Append the error message to the provided container
  container.appendChild(errorHeading);
}
