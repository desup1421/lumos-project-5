import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import apiService from "../utils/api/api";
import Swal from "sweetalert2";
import LangContext from "../context/LangContext";
import PropTypes from 'prop-types';

const StudentTable = ({setSelectedStudent}) => {
  const { lang, toggleLang } = useContext(LangContext);
  const [data, setData] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(
    () => localStorage.getItem("theme") === "dark"
  );

  //Dark mode togle
  const toggleDarkMode = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    localStorage.setItem("theme", newTheme ? "dark" : "light");
  };

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.style.setProperty("--background-color", "#121212");
      document.documentElement.style.setProperty("--text-color", "#e0e0e0");
      document.documentElement.style.setProperty("--card-bg", "#222222");
      document.documentElement.style.setProperty("--input-bg", "#333333");
      document.documentElement.style.setProperty("--input-border", "#444444");
      document.documentElement.style.setProperty("--button-group-bg", "#121212");
      document.documentElement.style.setProperty("--button-bg", "#121212");
    } else {
      document.documentElement.style.setProperty("--background-color", "#ffffff");
      document.documentElement.style.setProperty("--text-color", "#121212");
      document.documentElement.style.setProperty("--card-bg", "#f5f5f5");
      document.documentElement.style.setProperty("--input-bg", "#ffffff");
      document.documentElement.style.setProperty("--input-border", "#cccccc");
      document.documentElement.style.setProperty("--button-group-bg", "#ffffff");
      document.documentElement.style.setProperty("--button-bg", "#ffffff");

    }
  }, [isDarkMode]);

  // Get data in first render
  useEffect(() => {
    apiService
      .getStudentList("get") //API for get student data
      .then((response) => {
        setData(response.data.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  // Delete data from API
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        apiService
          .deleteStudent(id) //API for delete student data
          .then((response) => {
            setData(data.filter((student) => student.id !== id)); // Remove the deleted student from the data array (needed for the table to update)
            Swal.fire({
              icon: "success",
              title: "Success",
              text: response.data.message,
              showConfirmButton: false,
              timer: 2000,
            });
          })
          .catch((error) => {
            Swal.fire({
              icon: "error",
              title: "Error",
              text: error.response.data.message,
              showConfirmButton: false,
              timer: 2000,
            });
          });
      }
    });
  };

  // Search data from the list
  const handleSearch = (e) => {
    setSearchInput(e.target.value);
    const searchTerm = searchInput.toLowerCase();
    // Match the search term with the student's name or class
    const filteredData = data.filter(
      (student) =>
        student.name.toLowerCase().includes(searchTerm) ||
        student.class.toLowerCase().includes(searchTerm)
    );
    // Update the filteredData state with the filtered results
    setFilteredData(filteredData);
  };

  // If searchInput is empty, use the original data array (It is used for looping below)
  const array = searchInput ? filteredData : data;

  return (
    <>
      <button onClick={toggleLang} className="btn btn-primary lang-btn">
        <i className="bx bx-globe"></i> {lang === "en" ? "ID" : "EN"}
      </button>
      <button onClick={toggleDarkMode} className="btn btn-primary lang-btn">
        <i className="bx bx-globe"></i> {isDarkMode ? "Light" : "Dark"}
      </button>
      <table className="student-table">
        <thead>
          <tr>
            <th colSpan={4}>
              <Link to={"/form/add"} className="btn btn-primary btn-right">
                <i className="bx bx-add-to-queue"></i>{" "}
                {lang === "en" ? "Add Student" : "Tambah Siswa"}
              </Link>
            </th>
          </tr>
          <tr>
            <th colSpan="4">
              <input
                type="text"
                className="search-input"
                placeholder={lang === "en" ? "Search" : "Cari"}
                value={searchInput}
                onChange={handleSearch}
              />
            </th>
          </tr>
          <tr>
            <th>No</th>
            <th>{lang === "en" ? "Name" : "Nama"}</th>
            <th>{lang === "en" ? "Class" : "Kelas"}</th>
            <th>{lang === "en" ? "Actions" : "Aksi"}</th>
          </tr>
        </thead>
        <tbody>
          {array.length === 0 ? (
            <tr>
              <td colSpan="4">
                {lang === "en" ? "No data available" : "Data tidak tersedia"}
              </td>
            </tr>
          ) : (
            array.map((student, index) => (
              <tr key={student.id}>
                <td>{index + 1}</td>
                <td>{student.name}</td>
                <td>{student.class}</td>
                <td>
                  <div className="btn-group">
                    <Link
                      to={`/student/${student.id}`}
                      className="btn btn-outline-primary"
                    >
                      <i className="bx bx-info-circle"></i>
                    </Link>
                    <Link
                      onClick={() => {setSelectedStudent(student)}}
                      to={`/form/edit/${student.id}`}
                      className="btn btn-outline-warning"
                    >
                      <i className="bx bx-edit"></i>
                    </Link>
                    <button
                      onClick={() => handleDelete(student.id)}
                      className="btn btn-outline-danger"
                    >
                      <i className="bx bx-trash"></i>
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </>
  );
};

StudentTable.propTypes = {
  setSelectedStudent: PropTypes.func.isRequired,
};
export default StudentTable;
