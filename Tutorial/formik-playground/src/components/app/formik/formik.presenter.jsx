import React from 'react';
import { Formik } from 'formik';

import { connect } from 'react-redux';

/*
  The benefit of the render prop approach is that you have full access to React's
  state, props, and composition model. Thus there is no need to map outer props
  to values...you can just set the initial values, and if they depend on props / state
  then--boom--you can directly access to props / state.
  The render prop accepts your inner form component, which you can define separately or inline
  totally up to you:
  - `<Formik render={props => <form>...</form>}>`
  - `<Formik component={InnerForm}>`
  - `<Formik>{props => <form>...</form>}</Formik>` (identical to as render, just written differently)
*/
const FormikRender = (props) => (
  <div>
    <h1>My Form</h1>
    <p>This can be anywhere in your application</p>
    <Formik
      initialValues={{
        email: '',
        password: '',
      }}
      validate={values => {
        // same as above, but feel free to move this into a class method now.
        let errors = {};
        if (!values.email) {
          errors.email = 'Required';
        } else if (
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
        ) {
          errors.email = 'Invalid email address';
        }
        return errors;
      }}
      onSubmit={(
        values,
        { setSubmitting, setErrors /* setValues and other goodies */ }
      ) => {
        setSubmitting(false);
        setErrors(false);
        console.log('Submitting!!!!')
        console.log(values)
        props.onSubmit(values);
      }}
      render={({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
      }) => (
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.email}
          />
          {touched.email && errors.email && <div>{errors.email}</div>}
          <input
            type="password"
            name="password"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.password}
          />
          {touched.password && errors.password && <div>{errors.password}</div>}
          <button type="submit" disabled={isSubmitting}>
            Submit
          </button>
        </form>
      )}
    />
  </div>
);

const mapDispatchToProps = dispatch => {
  return ({
    onSubmit: (user) => {
      return dispatch({
        type: 'SUBMIT_USER',
        user
      });
    }
  });
};

export default connect(
  null,
  mapDispatchToProps
)(FormikRender);