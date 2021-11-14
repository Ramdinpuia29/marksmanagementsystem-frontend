//ID Name Author Location
import { useState, useEffect } from "react";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";

const ActionHistory = () => {
  const [logs, setLogs] = useState([]);

  // const isAdmin = sessionStorage.getItem("role");

  useEffect(() => {
    const axiosLogs = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8081/LibraryManagementSystem/log"
        );
        setLogs(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    axiosLogs();
  }, []);

  return (
    <>
      <Container>
        <Table>
          <thead>
            <tr>
              <th>Action History</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log) => {
              return (
                <tr key={log.loggedData}>
                  <td> {log.loggedData} </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Container>
    </>
  );
};

export default ActionHistory;
