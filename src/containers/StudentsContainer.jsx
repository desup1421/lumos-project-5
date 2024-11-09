import React from "react";
import StudentTable from "../components/StudentTable";
import PropTypes from 'prop-types';

const StudentsContainer = ({setSelectedStudent}) => {
  return (
    <main className="main">
      <StudentTable setSelectedStudent={setSelectedStudent} />
    </main>
  );
};

StudentsContainer.propTypes = {
  setSelectedStudent: PropTypes.func,
};
export default StudentsContainer;
