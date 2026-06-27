import { useEffect, useState } from 'react';
import './UserForm.css';

const emptyFormValues = {
  name: '',
  email: '',
  phone: '',
};

const formFields = [
  {
    id: 'name',
    label: 'Name',
    type: 'text',
  },
  {
    id: 'email',
    label: 'Email',
    type: 'email',
  },
  {
    id: 'phone',
    label: 'Phone',
    type: 'tel',
  },
];

function validateForm(values) {
  const nextErrors = {};

  formFields.forEach((field) => {
    if (!values[field.id].trim()) {
      nextErrors[field.id] = `${field.label} is required.`;
    }
  });

  return nextErrors;
}

function UserForm({
  mode = 'create',
  initialValues = emptyFormValues,
  isSubmitting = false,
  onSubmit,
}) {
  const [formValues, setFormValues] = useState({
    ...emptyFormValues,
    ...initialValues,
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setFormValues({
      ...emptyFormValues,
      ...initialValues,
    });
    setErrors({});
  }, [initialValues]);

  const isEditMode = mode === 'edit';
  const submitLabel = isEditMode ? 'Update User' : 'Create User';

  function handleChange(event) {
    const { name, value } = event.target;

    setFormValues((currentValues) => ({
      ...currentValues,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((currentErrors) => ({
        ...currentErrors,
        [name]: '',
      }));
    }
  }

  function handleSubmit(event) {
    event.preventDefault();

    const validationErrors = validateForm(formValues);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    onSubmit?.({
      name: formValues.name.trim(),
      email: formValues.email.trim(),
      phone: formValues.phone.trim(),
    });
  }

  return (
    <form className="user-form" onSubmit={handleSubmit} noValidate>
      {formFields.map((field) => {
        const errorId = `${field.id}-error`;

        return (
          <div className="form-field" key={field.id}>
            <label htmlFor={field.id}>{field.label}</label>
            <input
              id={field.id}
              name={field.id}
              type={field.type}
              value={formValues[field.id]}
              onChange={handleChange}
              aria-describedby={errors[field.id] ? errorId : undefined}
              aria-invalid={Boolean(errors[field.id])}
            />
            {errors[field.id] && (
              <p className="form-field__error" id={errorId}>
                {errors[field.id]}
              </p>
            )}
          </div>
        );
      })}

      <button className="form-submit" type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Saving...' : submitLabel}
      </button>
    </form>
  );
}

export default UserForm;
