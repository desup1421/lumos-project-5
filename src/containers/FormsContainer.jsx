import React from 'react';
import StudentForm from '../components/StudentForm';
import PropTypes from 'prop-types';

const FormsContainer = ({selectedStudent}) => {
  return (
    <main className='main'>
      <StudentForm selectedStudent={selectedStudent} />
    </main>
  )
}

FormsContainer.propTypes = {
  selectedStudent: PropTypes.object
}
export default FormsContainer