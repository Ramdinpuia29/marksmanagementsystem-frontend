//ID Name Author Location
import { useState, useEffect } from "react";
import axios from "axios";
import Container from "react-bootstrap/Container";
import BootstrapTable from "react-bootstrap-table-next";
import Button from "react-bootstrap/Button";
import { MdAddCircleOutline } from "react-icons/md";

import AddBooksModal from "./AddBooksModal";
import EditBooksModal from "./EditBooksModal";
import DeleteBookModal from "./DeleteBookModal";

import useWindowSize from "../assets/useWindowSize";
import "./StudentsTable.css";

const MarksTable = () => {
  const size = useWindowSize();

  const [modalShow, setModalShow] = useState(false);

  const [isRowSelected, setIsRowSelected] = useState(false);

  const [students, setStudents] = useState([]);

  const isStudent = sessionStorage.getItem("role") === "student";

  const [rowValues, setRowValues] = useState({
    student_id: "",
    student_name: "",
    department: "",
    year1mark: "",
    year2mark: "",
    year3mark: "",
    year4mark: "",
    totalmark: "",
  });
  const [editModalShow, setEditModalShow] = useState(false);
  const [deleteModalShow, setDeleteModalShow] = useState(false);

  useEffect(() => {
    const axiosMarks = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8081/MarkManagementSystem/students"
        );
        setStudents(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    axiosMarks();
  }, [modalShow, editModalShow, deleteModalShow]);

  const columns = [
    {
      dataField: "student_name",
      text: "Name",
      sort: true,
    },
    {
      dataField: "department",
      text: "Department",
      sort: true,
    },
    {
      dataField: "year1mark",
      text: "Year 1 Mark",
      sort: true,
    },
    {
      dataField: "year2mark",
      text: "Year 2 Mark",
      sort: true,
    },
    {
      dataField: "year3mark",
      text: "Year 3 Mark",
      sort: true,
    },
    {
      dataField: "year4mark",
      text: "Year 4 Mark",
      sort: true,
    },
    {
      dataField: "totalmarks",
      text: "totalmark",
      sort: true,
    },
  ];

  const marksData = [
    {
      student_id: 1,
      student_name: "name1",
      department: "dept1",
      year1mark: "1",
      year2mark: "1",
      year3mark: "1",
      year4mark: "1",
      totalmark: "4",
    },
    {
      student_id: 2,
      student_name: "name2",
      department: "dept2",
      year1mark: "1",
      year2mark: "1",
      year3mark: "1",
      year4mark: "1",
      totalmark: "4",
    },
    {
      student_id: 3,
      student_name: "name3",
      department: "dept3",
      year1mark: "1",
      year2mark: "1",
      year3mark: "1",
      year4mark: "1",
      totalmark: "4",
    },
  ];

  const selectRow = {
    mode: "radio",
    hideSelectColumn: true,
    bgColor: "grey",
    clickToSelect: true,
    onSelect: (row) => {
      setIsRowSelected(true);
      setRowValues({
        student_id: row.student_id,
        student_name: row.student_name,
        department: row.department,
        year1mark: row.year1mark,
        year2mark: row.year2mark,
        year3mark: row.year3mark,
        year4mark: row.year4mark,
        totalmark: row.totalmark,
      });
    },
  };

  return (
    <>
      <div className="markstable">
        <div className="btn-container">
          {isRowSelected && !isStudent ? (
            <div>
              <Button variant="warning" onClick={() => setEditModalShow(true)}>
                Edit
              </Button>
              <Button variant="danger" onClick={() => setDeleteModalShow(true)}>
                Delete
              </Button>
            </div>
          ) : !isStudent ? (
            <Button variant="success" onClick={() => setModalShow(true)}>
              {size.width > 767 ? (
                "Add Books"
              ) : (
                <MdAddCircleOutline size={24} />
              )}
            </Button>
          ) : (
            ""
          )}
        </div>
        <Container>
          <BootstrapTable
            keyField="student_id"
            data={students}
            columns={columns}
            selectRow={selectRow}
          />
        </Container>
      </div>
      <AddBooksModal show={modalShow} onHide={() => setModalShow(false)} />
      <EditBooksModal
        show={editModalShow}
        onHide={() => setEditModalShow(false)}
        row={rowValues}
      />
      <DeleteBookModal
        show={deleteModalShow}
        onHide={() => setDeleteModalShow(false)}
        row={rowValues}
      />
    </>
  );
};

export default MarksTable;
