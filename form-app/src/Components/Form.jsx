import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";

const ContactForm = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState(null);

  const initialValues = {
    name: "",
    email: "",
    message: "",
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string()
      .email("Invalid email")
      .required("Email is required"),
    message: Yup.string().required("Message is required"),
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const response = await axios.post("https://my-json-server.typicode.com/tundeojediran/contacts-api-server/inquiries", values);
      console.log(response.data); // Check response data in console
      setIsSubmitted(true); // Set state to indicate successful submission

      // Reset form fields after a 3 second delay
      setTimeout(() => {
        resetForm();
      }, 3000);
    } catch (error) {
      console.error(error);
      setError("Error submitting form. Please try again later.");
    }
    setSubmitting(false);
  };

  return (
    <div>
      {error && <p className="error">{error}</p>}
      {isSubmitted && (
        <p className="success">Thank you for Contacting us!</p>
      )}
      <h1>Contact Us</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <div>
              <label htmlFor="name">Name</label>
              <Field type="text" id="name" name="name" />
              <ErrorMessage name="name" component="div" className="error" />
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <Field type="email" id="email" name="email" />
              <ErrorMessage name="email" component="div" className="error" />
            </div>
            <div>
              <label htmlFor="message">Message</label>
              <Field as="textarea" id="message" name="message" />
              <ErrorMessage
                name="message"
                component="div"
                className="error"
              />
            </div>
            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ContactForm;