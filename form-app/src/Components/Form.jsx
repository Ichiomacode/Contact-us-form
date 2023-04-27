import React, { useState } from 'react';
import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import axios from 'axios'


const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const response = await axios.post('https://my-json-server.typicode.com/tundeojediran/contacts-api-server/inquiries', {
      name: name,
      email: email,
      message: message
    });
    console.log(response);
    // reset form fields
  } catch (error) {
    console.error(error);
  }
};
const ContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);

  const initialValues = {
    name: '',
    email: '',
    message: '',
  };

  const validationSchema = Yup.object({
    name: Yup.string().required('Required'),
    email: Yup.string()
      .email('Invalid email address')
      .required('Required'),
    message: Yup.string().required('Required'),
  });

  const handleSubmit = (values, { resetForm }) => {
    setIsSubmitting(true);
    setIsSuccess(false);
    setIsError(false);

    // For a successful submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      resetForm();
    }, 2000);
  };

  return (
    <div className = "all">
      <h2>Contact Us</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form onSubmit={handleSubmit}>
            <div className='input'>
              <label htmlFor="name" className='form-label'>Name</label>
              <Field type="text" name="name" />
              <ErrorMessage name="name" component="div" />
            </div>

            <div>
              <label htmlFor="email"className='form-label' >Email</label>
              <Field type="email" name="email" />
              <ErrorMessage name="email" component="div" />
            </div>

            <div>
              <label className='text-area' htmlFor="message">Message</label>
              <Field as="textarea" name="message" />
              <ErrorMessage name="message" component="div" />
            </div>

            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </button>
          </Form>
        )}
      </Formik>

      {isSuccess && (
        <div style={{ color: 'green' }}>Your message was sent successfully!</div>
      )}

      {isError && (
        <div style={{ color: 'red' }}>
          There was an error submitting your message. Please try again later.
        </div>
      )}
    </div>
  );
};

export default ContactForm;

