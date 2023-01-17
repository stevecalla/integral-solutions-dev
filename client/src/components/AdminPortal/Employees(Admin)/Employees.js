import React, { useState } from "react";

import { useQuery, useMutation } from "@apollo/client";
import { QUERY_ALL_EMPLOYEES } from "../../../utils/queries";
import { DELETE_EMPLOYEE } from "../../../utils/mutations";

import { Row, Col, Container, Form } from "react-bootstrap";
import Collapse from "react-bootstrap/Collapse";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../../../styles/Contact.css";
import "../../../styles/button-style.css";

function Employees() {
  // const [openDetails, setOpenDetails] = useState(false);
  const [openDetails, setOpenDetails] = useState(true);

  //SECTION GET ALL EMPLOYEES
  // eslint-disable-next-line
  const {
    loading: empLoad,
    data: emp,
    error: empError,
    refetch: empRefetch,
  } = useQuery(QUERY_ALL_EMPLOYEES);

  console.log(emp);

  // SECTION DELETE
  const [deleteEmployee] = useMutation(DELETE_EMPLOYEE);

  const handleDeleteEmployee = async (event) => {
    let employeeId = event.currentTarget.getAttribute("data-clientid");

    try {
      // eslint-disable-next-line
      await deleteEmployee({
        variables: {
          id: employeeId,
        },
      });

      // RELOAD employee
      empRefetch();
    } catch (err) {
      console.log(err);
    }
  };

  // SECTION HANDLE COLLAPSE
  const getElement = (event) => {
    let currentAvailTarget = event.currentTarget.getAttribute("data-target");
    let currentAvailTable = document.getElementById(currentAvailTarget);

    if (currentAvailTable.classList.contains("show")) {
      currentAvailTable.classList.remove("show");
      // setOpenDetails(false);
      setOpenDetails(true);
    } else {
      currentAvailTable.classList.add("show");
      // setOpenDetails(true);
      setOpenDetails(false);
    }
  };

  // SECTION ADMIN/LOCKED TOGGLE
  const [adminToggle, setAdminToggle] = useState("");
  const [lockedToggle, setLockedToggle] = useState("");

  const handleChange = async (event) => {
    // on load get and populate the current state
    console.log("event ", event);
    console.log("event ", event.target);
    console.log("event name ", event.target.name);
    console.log("event id ", event.target.id);
    console.log("event checked ", event.target.checked)

    // get event
    let clickedToggleName = event.target.name; // get name = admin or locked
    let clickedToggleId = event.target.id; // get clicked toggle id
    let toggles = document.querySelectorAll('input'); // get all input boxes
    // console.log(toggles[0].id);

    for (let i = 0; i < toggles.length; i++) {
      if (clickedToggleId.id === toggles.id) { // if the toggle clicked is equal to the toggle from the list of all toggles
        setAdminToggle(!adminToggle);
        document.getAttribute()
        // document.setAttribute('checked', ) // reset the state to the opposite of the current state
      }
    }

    // toggleState === "admin" ?
    //   setAdminToggle(!adminToggle) :
    //   setLockedToggle(!lockedToggle);

    // console.log(toggleState, adminToggle, lockedToggle)

    //set state of event; if true change to false; if false change to true

    //update the state of the toggle in the db
  };

  return (
    <Container>
      <Row style={{ display: "flex", justifyContent: "center" }}>
        {emp?.employees?.map((emp, index) => (
          <div id="accordion" key={index} style={{ width: "98%" }}>
            <div className="card p-2 mb-1">
              <div
                className="rounded directions-collapse"
                id="headingOne"
                style={{
                  color: "black",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <h5 className="mb-0 text-left">
                  <button
                    onClick={(event) => getElement(event)}
                    aria-controls={`#collapse-client-${index}`}
                    aria-expanded={openDetails}
                    className="btn btn-link pl-1"
                    data-target={`#collapse-client-${index}`}
                  >
                    {emp?.firstName} {emp?.lastName}
                  </button>
                </h5>
                <div className="d-flex mr-2">
                  <FontAwesomeIcon
                    icon="fa-trash"
                    className="p-2 fa-lg"
                    data-clientid={emp?._id}
                    onClick={(event) => {
                      handleDeleteEmployee(event);
                    }}
                  />
                </div>
              </div>
              <Collapse>
                <div id={`#collapse-client-${index}`}>
                  <Container fluid="md">
                    <Row>
                        {/* // section //fix */}
                        <h5>Admin: </h5>
                      <Col className="d-flex">
                        <Form.Check
                          type="switch"
                          name="admin" // used to set the toggle; must be unique
                          id={`admin-${emp._id}`} // controls & differentiates the toggle event from other toggle events
                          checked={adminToggle}
                          onChange={handleChange}
                          className="ml-4 custom-control"
                          style={{ transform: "scale(1.1)" }}
                        />
                      </Col>
                      <Col>
                        <a href={`mailto:${emp?.email}`}> {emp?.email}</a>
                      </Col>
                    </Row>
                    <Row>
                      <Col className="d-flex">
                        {/* // section //fix */}
                        <h5>Locked: </h5>
                        {/* <Form.Check
                          type="switch"
                          className="ml-4 custom-control"
                          style={{ transform: "scale(1.1)" }}
                          name="locked"
                          id={`locked-${emp._id}`}
                          checked={lockedToggle}
                          onChange={handleChange}
                        /> */}
                      </Col>
                      <Col>
                        <a href={`tel:+${emp?.phone}`}> {emp?.phone}</a>
                      </Col>
                    </Row>
                  </Container>
                </div>
              </Collapse>
            </div>
          </div>
        ))}
      </Row>
    </Container>
  );
}
export default Employees;

const isDisplayed = {
  display: "block",
};

const isNotDisplayed = {
  display: "none",
};
