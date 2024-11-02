const fields = [
  {
    name: 'firstname',
    id: 'firstName',
    placeholder: 'First name',
    errorId: 'firstNameError',
    errorMsg: 'Enter at least 2 letters'
  },
  {
    name: 'lastname',
    id: 'lastName',
    placeholder: 'Last name',
    errorId: 'lastNameError',
    errorMsg: 'Enter at least 2 letters'
  },
  {
    name: 'email',
    id: 'email',
    placeholder: 'Email Address',
    type: 'email',
    errorId: 'emailError',
    errorMsg: 'Please enter a valid email address'
  },
  {
    name: 'subject',
    id: 'subject',
    placeholder: 'Subject',
    errorId: 'subjectError',
    errorMsg: 'Enter at least 2 letters'
  },
  {
    name: 'message',
    id: 'message',
    placeholder: 'Text',
    isTextarea: true,
    errorId: 'textError',
    errorMsg: 'Enter at least 5 letters'
  }
];

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
      input.cols = 40;
    } else {
      input = document.createElement('input');
      if (field.type) {
        input.type = field.type;
      }
    }

    input.name = field.name;
    input.id = field.id;
    input.placeholder = field.placeholder;
    input.setAttribute('aria-label', field.placeholder);
    input.setAttribute('aria-required', 'true');
    input.setAttribute('aria-invalid', 'false');

    const errorDiv = document.createElement('div');
    errorDiv.className = 'errorForm';
    errorDiv.id = field.errorId;
    errorDiv.setAttribute('role', 'alert');
    errorDiv.innerHTML = `&#9940; <span class="errorMsg">${field.errorMsg}</span>`;

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
}

// Call the function to create and insert the form
document.addEventListener('DOMContentLoaded', createContactForm);
