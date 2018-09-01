// @ts-check
import React from "react";
import { Formik } from "formik";

const QualitiesForm = ({ addQuality }) => (
  <Formik
    initialValues={{ quality: "" }}
    validate={values => {
      // same as above, but feel free to move this into a class method now.
      let errors = {};
      if (!values.quality) {
        errors.quality = "Can't be blank";
      }
      return errors;
    }}
    onSubmit={(values, { setSubmitting, resetForm }) => {
      addQuality(values.quality);
      setSubmitting(false);
      resetForm();
    }}
    render={({
      values,
      touched,
      errors,
      handleSubmit,
      handleChange,
      handleBlur,
      isSubmitting
    }) => (
      <form onSubmit={handleSubmit}>
        <div className="field has-addons" style={{ justifyContent: "center" }}>
          <div className="control">
            <input
              name="quality"
              type="text"
              className="input"
              placeholder="Quality"
              onChange={handleChange}
              value={values.qulity}
            />
          </div>
          <div className="control">
            <button
              type="submit"
              className="button is-purple"
              disabled={isSubmitting}
            >
              Add
            </button>
          </div>
        </div>
        {touched.quality &&
          errors.quality && <p className="help is-danger">{errors.quality}</p>}
      </form>
    )}
  />
);

const QualitiesList = ({ addQuality, removeQuality, qualities }) => {
  return (
    <div>
      <QualitiesForm addQuality={addQuality} />
      <ul className="list">
        {qualities.map(quality => (
          <li key={quality}>
            <div className="item">{quality}</div>
            <button
              className="button is-danger is-inverted"
              onClick={() => removeQuality(quality)}
            >
              X
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QualitiesList;
