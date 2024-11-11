const fields = [
  {
    name: 'name',
    id: 'name',
    placeholder: 'Full name',
    errorId: 'nameError',
    errorMsg: 'Minimum 5 letters',
  },
  {
    name: 'email',
    id: 'email',
    placeholder: 'Email Address',
    type: 'email',
    errorId: 'emailError',
    errorMsg: 'Invalid Email Address',
  },
  {
    name: 'subject',
    id: 'subject',
    placeholder: 'Subject',
    errorId: 'subjectError',
    errorMsg: 'Minimum 15 letters',
  },
  {
    name: 'message',
    id: 'message',
    placeholder: 'Text',
    isTextarea: true,
    errorId: 'textError',
    errorMsg: 'Minimum 5 letters',
  }
];

function validateInput(input, field) {
  let isValid = true;

  // Define custom minimum lengths based on field names
  let minLength;
  switch (field.name) {
    case 'name':
      minLength = 5;
      break;
    case 'subject':
      minLength = 15;
      break;
    case 'message':
      minLength = 25;
      break;
    default:
      minLength = 3;
  }

  // Validation for non-email fields based on their minimum length
  if (field.name !== 'email' && input.value.length < minLength) {
    isValid = false;
  }

  // Email validation
  if (field.name === 'email') {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    isValid = emailPattern.test(input.value);
  }

  // Update error display and attributes
  const errorDiv = document.getElementById(field.errorId);
  if (!isValid) {
    // Display a dynamic error message with minimum length
    errorDiv.textContent = field.name === 'email'
      ? field.errorMsg
      : `⚠️ Minimum ${minLength} characters`;
    errorDiv.style.display = 'block';
    input.setAttribute('aria-invalid', 'true');
    input.style.backgroundColor = 'rgba(255, 0, 0, 0.2)';
  } else {
    errorDiv.style.display = 'none';
    input.setAttribute('aria-invalid', 'false');
    input.style.backgroundColor = '#d4edda';
  }

  return isValid; // Return validity status
}

function createContactForm() {
  const formSection = document.createElement('section');
  formSection.className = 'formSection';

  const heading = document.createElement('h1');
  heading.id = 'contactFormHeading';
  heading.textContent = 'Contact Form';

  const form = document.createElement('form');
  form.id = 'contactForm';
  form.setAttribute('aria-labelledby', 'contactFormHeading');

  fields.forEach((field) => {
    const fieldDiv = document.createElement('div');
    fieldDiv.className = 'formStyle';

    let input;
    if (field.isTextarea) {
      input = document.createElement('textarea');
      input.rows = 5;
      input.cols = 30;
    } else {
      input = document.createElement('input');
      if (field.type) {
        input.type = field.type;
      }
    }

    input.name = field.name;
    input.id = field.id;
    input.placeholder = field.placeholder;
    input.className = field.className;
    input.setAttribute('aria-label', field.placeholder);
    input.setAttribute('aria-required', 'true');
    input.setAttribute('aria-invalid', 'false');

    const errorDiv = document.createElement('div');
    errorDiv.className = 'errorForm';
    errorDiv.id = field.errorId;
    errorDiv.setAttribute('role', 'alert');
    errorDiv.style.display = 'none'; // Initially hide error message

  

    const messageSpan = document.createElement('span');
    messageSpan.className = 'errorMsg';
    messageSpan.textContent = field.errorMsg;


    errorDiv.appendChild(messageSpan);

    // Add event listener for validation
    input.addEventListener('input', () => validateInput(input, field));
    fieldDiv.appendChild(input);
    fieldDiv.appendChild(errorDiv);
    form.appendChild(fieldDiv);
  });

  const submitButton = document.createElement('button');
  submitButton.className = 'ctaSend';
  submitButton.type = 'submit';
  submitButton.setAttribute('aria-label', 'Send');
  submitButton.textContent = 'Send';

  form.appendChild(submitButton);
  formSection.appendChild(heading);
  formSection.appendChild(form);

  // Append the form section to the desired location in the DOM
  const targetContainer = document.getElementById('contact-form');
  targetContainer.appendChild(formSection);

  function showPopupMessage(message) {
    const popup = document.createElement('div');
    popup.className = 'popup-message';
    popup.textContent = message;

    // Append the popup to the body
    document.body.appendChild(popup);

    // Remove the popup after 3 seconds
    setTimeout(() => {
      popup.remove();
    }, 3000);
  }

  form.addEventListener('submit', (event) => {
    event.preventDefault(); // Prevents actual form submission

    let allValid = true;

    // Validate each input field
    fields.forEach((field) => {
      const input = document.getElementById(field.id);
      const isValid = validateInput(input, field); // Pass both input and field
      allValid = allValid && isValid; // Combine the validity results
    });

    if (allValid) {
      showPopupMessage("Message sent!"); // Show the popup message
      form.reset(); // Reset the form
    } else {
      console.log("Please fix the errors before submitting."); // Optional feedback
    }
  });
}

// Call the function to create and insert the form
document.addEventListener('DOMContentLoaded', createContactForm);
