import React, {useState, useEffect} from "react";
import { useNavigate, useParams } from "react-router-dom";
import apiService from "../utils/api/api";
import Swal from "sweetalert2";

const StudentDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [student, setStudent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // I used data from apiService. This function will be called when id is changed
  useEffect(() => {
    apiService
      .getStudentDetail(id)
      .then((res) => {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: res.data.message,
          showConfirmButton: false,
          timer: 2000, 
        });
        setStudent(res.data.data);
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: err.response.data.message,
          showConfirmButton: false, 
          timer: 2000, 
        }).then(() => {
            navigate("/");
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [id]);
  

  // If data is not yet loaded, display loading message, this make sure the data is not empty (empty data(student) make an error)
  if (isLoading) {
    return (
      <div className="loading">
          Loading...
      </div>
    )
  }


  return (
    <div className="form-container">
      <div className="back-btn-container">
        <button className="btn btn-primary" onClick={() => navigate(-1)}>
          Back
        </button>
      </div>
      <div className="card">
        <table className="student-detail-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{student.id}</td>
            </tr>
            <tr>
              <th>NIM</th>
              <td>{student.nim}</td>
            </tr>
            <tr>
              <th>Name</th>
              <td>{student.name}</td>
            </tr>
            <tr>
              <th>Class</th>
              <td>{student.class}</td>
            </tr>
            <tr>
              <th>Year</th>
              <td>{student.year}</td>
            </tr>
            <tr>
              <th>Guardian Name</th>
              <td>{student.guardian_name}</td>
            </tr>
            <tr>
              <th>Birth Date</th>
              <td>{student.birthDate}</td>
            </tr>
            <tr>
              <th>Address</th>
              <td>{student.address}</td>
            </tr>
            <tr>
              <th>Gender</th>
              <td>{student.gender}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentDetail;
