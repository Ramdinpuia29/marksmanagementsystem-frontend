//ID Name Department Experience
import { useState, useEffect } from "react";
import axios from "axios";
import Container from "react-bootstrap/Container";
import BootstrapTable from "react-bootstrap-table-next";
import Button from "react-bootstrap/Button";
import { MdAddCircleOutline } from "react-icons/md";

import AddStaffModal from "./AddStaffModal";
import EditStaffModal from "./EditStaffModal";
import DeleteStaffModal from "./DeleteStaffModal";

import useWindowSize from "../assets/useWindowSize";
import "./StaffsTable.css";

// import { staffs } from "../assets/staffsDummyData";

const BooksTable = () => {
  const size = useWindowSize();

  const [modalShow, setModalShow] = useState(false);

  const [isRowSelected, setIsRowSelected] = useState(false);

  const [staffs, setStaffs] = useState([]);

  const [rowValues, setRowValues] = useState({
    userId: "",
    username: "",
    email: "",
    department: "",
    experience: "",
  });

  const [editModalShow, setEditModalShow] = useState(false);
  const [deleteModalShow, setDeleteModalShow] = useState(false);

  const isAuth = sessionStorage.getItem("user-info");
  const parsed = JSON.parse(isAuth);
  const isAdmin = parsed.role === "admin";

  const columns = [
    {
      dataField: "username",
      text: "Name",
      sort: true,
    },
    {
      dataField: "email",
      text: "Email",
      sort: true,
    },
    {
      dataField: "department",
      text: "Department",
      sort: true,
    },
    {
      dataField: "experience",
      text: "Experience",
      sort: true,
    },
  ];

  const selectRow = {
    mode: "radio",
    hideSelectColumn: true,
    bgColor: "grey",
    clickToSelect: true,
    onSelect: (row) => {
      console.log(`row`, row);
      setIsRowSelected(true);
      setRowValues({
        userId: row.user_id,
        username: row.username,
        email: row.email,
        department: row.department,
        experience: row.experience,
      });
    },
  };

  useEffect(() => {
    const axiosStaffs = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8081/LibraryManagementSystem/staffs"
        );
        setStaffs(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    axiosStaffs();
  }, [modalShow, editModalShow, deleteModalShow]);

  return (
    <>
      <div className="staffstable">
        <div className="btn-container">
          {isRowSelected && isAdmin ? (
            <div>
              <Button variant="warning" onClick={() => setEditModalShow(true)}>
                Edit
              </Button>
              <Button variant="danger" onClick={() => setDeleteModalShow(true)}>
                Delete
              </Button>
            </div>
          ) : isAdmin ? (
            <Button variant="success" onClick={() => setModalShow(true)}>
              {size.width > 767 ? (
                "Add Staff"
              ) : (
                <MdAddCircleOutline size={24} />
              )}
            </Button>
          ) : (
            ""
          )}
        </div>
        <Container fluid="sm">
          <BootstrapTable
            keyField="user_id"
            data={staffs}
            columns={columns}
            selectRow={selectRow}
          />
        </Container>
      </div>
      <AddStaffModal show={modalShow} onHide={() => setModalShow(false)} />
      <EditStaffModal
        show={editModalShow}
        onHide={() => setEditModalShow(false)}
        row={rowValues}
      />
      <DeleteStaffModal
        show={deleteModalShow}
        onHide={() => setDeleteModalShow(false)}
        row={rowValues}
      />
    </>
  );
};

export default BooksTable;
