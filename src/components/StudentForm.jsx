import React, { useState, useContext } from "react";
import { useNavigate, useParams } from "react-router";
import useForm from "../utils/hooks/useForm";
import apiService from "../utils/api/api";
import Swal from "sweetalert2";
import LangContext from "../context/LangContext";
import PropTypes from "prop-types";

//Make an array of years from 2000 to current year
const date = new Date();
const year = date.getFullYear();
const years = [];
for (let i = 2000; i <= year; i++) {
  years.push(i);
}

//Make an array of classes
const classNames = ["X", "XI", "XII"];
const classMajors = ["MIPA", "IPS"];
const classRange = 5;
const classes = [];

classNames.forEach((className) => {
  classMajors.forEach((major) => {
    for (let i = 1; i <= classRange; i++) {
      classes.push(`${className} ${major} ${i}`);
    }
  });
});

const StudentForm = ({ selectedStudent }) => {
  const { lang } = useContext(LangContext);
  const navigate = useNavigate();
  const { id } = useParams();

  //If selectedStudent is not null, set form to selectedStudent
  const defaultForm = selectedStudent || {
    name: "",
    class: "",
    year: "",
    nim: "",
    guardian_name: "",
    birthDate: "",
    address: "",
    gender: "male",
  };

  const [form, handleFormChange, clearForm, isInputValid, formInvalid] =
    useForm(defaultForm);
  const [isLoading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    apiService
      .postNewStudent(form)
      .then((response) => {
        clearForm();
        Swal.fire({
          title: "Success",
          text: response.data.message,
          icon: "success",
          confirmButtonText: "OK",
        }).then(() => {
          navigate("/");
        });
      })
      .catch((error) => {
        Swal.fire({
          title: "Error",
          text: error.response.data.message,
          icon: "error",
          confirmButtonText: "OK",
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleEdit = (e) => {
    e.preventDefault();
    apiService
      .updateStudent(id, form)
      .then((response) => {
        clearForm();
        Swal.fire({
          title: "Success",
          text: response.data.message,
          icon: "success",
          confirmButtonText: "OK",
        }).then(() => {
          navigate("/");
        });
      })
      .catch((error) => {
        Swal.fire({
          title: "Error",
          text: error.response.data.message,
          icon: "error",
          confirmButtonText: "OK",
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="form-container">
      <div className="back-btn-container">
        <button
          className="btn btn-primary"
          onClick={() => {
            navigate(-1);
          }}
        >
          {lang === "en" ? "Back" : "Kembali"}
        </button>
      </div>
      <div className="card">
        <h1>
          {id
            ? lang === "en"
              ? "Edit Student"
              : "Sunting Siswa"
            : lang === "en"
            ? "Add Student"
            : "Tambah Siswa"}
        </h1>
        <form onSubmit={id ? handleEdit : handleSubmit}>
          <div>
            <label htmlFor="name" className="form-label">
              {lang === "en" ? "Name" : "Nama"}
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className={isInputValid.name}
              value={form.name}
              onChange={handleFormChange}
              required
            />
          </div>

          <div>
            <label htmlFor="class" className="form-label">
              {lang === "en" ? "Class" : "Kelas"}
            </label>
            <select
              id="class"
              name="class"
              className={isInputValid.class}
              value={form.class}
              onChange={handleFormChange}
              required
            >
              <option value="">
                {lang === "en" ? "Select class" : "Pilih kelas"}
              </option>
              {classes.map((className, index) => {
                return (
                  <option key={index} value={className}>
                    {className}
                  </option>
                );
              })}
            </select>
          </div>

          <div>
            <label htmlFor="year" className="form-label">
              {lang === "en" ? "Year" : "Tahun"}
            </label>
            <select
              id="year"
              aria-label="Default select example"
              name="year"
              className={isInputValid.year}
              value={form.year}
              onChange={handleFormChange}
              required
            >
              <option value="">
                {lang === "en" ? "Select year" : "Pilih tahun"}
              </option>
              {years.map((year, index) => {
                return (
                  <option key={index} value={year}>
                    {year}
                  </option>
                );
              })}
            </select>
          </div>

          <div>
            <label htmlFor="nim" className="form-label">
              NIM
            </label>
            <input
              type="text"
              inputMode="numeric"
              id="nim"
              name="nim"
              className={isInputValid.nim}
              value={form.nim}
              onChange={handleFormChange}
              required
            />
          </div>

          <div>
            <label htmlFor="guardian-name" className="form-label">
              {lang === "en" ? "Guardian's Name" : "Nama wali kelas"}
            </label>
            <input
              type="text"
              inputMode="numeric"
              id="guardian-name"
              name="guardian_name"
              className={isInputValid.guardian_name}
              value={form.guardian_name}
              onChange={handleFormChange}
              required
            />
          </div>

          <div>
            <label htmlFor="birthDate" className="form-label">
              {lang === "en" ? "Birth Date" : "Tanggal Lahir"}
            </label>
            <input 
              type="date" 
              id="birthDate" 
              name="birthDate" 
              className={isInputValid.birthDate}
              value={form.birthDate}
              onChange={handleFormChange}
              required 
            />
           
          </div>

          <div>
            <label htmlFor="address" className="form-label">
              {lang === "en" ? "Address" : "Alamat"}
            </label>
            <textarea
              name="address"
              id="address"
              className={isInputValid.address}
              value={form.address}
              onChange={handleFormChange}
              required
            ></textarea>
          </div>

          <div className="radio-group">
            <div>
              <input
                type="radio"
                name="gender"
                id="male"
                value="male"
                checked={form.gender === "male"}
                onChange={handleFormChange}
                required
              />
              <label className="form-check-label" htmlFor="male">
                {lang === "en" ? "Male" : "Laki-laki"}
              </label>
            </div>
            <div>
              <input
                type="radio"
                name="gender"
                id="female"
                value="female"
                checked={form.gender === "female"}
                onChange={handleFormChange}
                required
              />
              <label className="form-check-label" htmlFor="female">
                {lang === "en" ? "Female" : "Perempuan"}
              </label>
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            disabled={formInvalid || isLoading}
          >
            {lang === "en" ? "Submit" : "Kirim"}
          </button>
        </form>
      </div>
    </div>
  );
};

StudentForm.propTypes = {
  selectedStudent: PropTypes.object,
};

export default StudentForm;
