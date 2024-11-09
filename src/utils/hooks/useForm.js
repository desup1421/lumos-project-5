import React, { useState } from 'react';

const useForm = (initialValues) => {
	const [values, setValues] = useState(initialValues);
	const [errors, setErrors] = useState(initialValues);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setValues((prepValues) => ({
			...prepValues,
			[name]: value,
		}));

		let validate = value ? 'is-valid' : 'is-invalid';
		if (name === 'address') {
			validate = value.length > 20 ? 'is-valid' : 'is-invalid';
		}
		setErrors((prepErrors) => ({
			...prepErrors,
			[name]: validate,
		}));
	};

	const clearForm = () => {
		setValues(initialValues);
		setErrors(initialValues);
	};

	const isInvalid = Object.values(errors).some((error) => error === 'is-invalid' || error === '');

	return [values, handleChange, clearForm, errors, isInvalid];
}
export default useForm;