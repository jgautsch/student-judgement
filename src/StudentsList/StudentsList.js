// @ts-check
import React from "react";
import { Formik } from "formik";

const StudentsForm = ({ addStudent }) => (
  <Formik
    initialValues={{ name: "" }}
    validate={values => {
      return !values.name ? { name: "Name can't be blank" } : {};
    }}
    onSubmit={(values, { setSubmitting, resetForm }) => {
      addStudent(values.name);
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
                name="name"
                type="text"
                className="input"
                placeholder="Student Name"
                onChange={handleChange}
                value={values.name}
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
          {touched.name &&
            errors.name && <p className="help is-danger">{errors.name}</p>}
        </form>
      )}
  />
);

const StudentsList = ({
  selectedStudent,
  students,
  selectStudent,
  addStudent,
  removeStudent
}) => {
  return (
    <div>
      <StudentsForm addStudent={addStudent} />
      <ul className="list">
        {students.length === 0 && <p>Please add some students</p>}
        {students.map(student => (
          <li
            key={student.id}

          >
            <div
              className={
                selectedStudent && student.id === selectedStudent.id
                  ? "item selectable is-active"
                  : "item selectable"
              }
              onClick={() => selectStudent(student)}
            >
              {student.name}
            </div>
            <button
              className="button is-danger is-inverted"
              onClick={() => removeStudent(student.id)}
            >
              X
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StudentsList;
