import React, { useState } from 'react';
import Layout from '../components/Layout';
import child from '../Assets/images/child.png';
import totamt from '../Assets/images/totamt.png';
import penamt from '../Assets/images/penamt.png';
import { Card, CardBody, CardTitle, Row, Col, Button, Table, Input, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { FaUser, FaCog, FaBell, FaSearch,FaSignOutAlt } from 'react-icons/fa';
import './Style.scss';
import { MdAdd, MdOutlineRemove } from "react-icons/md";
import AdminExpandedView from '../components/AdminExpandedView';
import { dummyResponse } from "../utils/constants";
import { useNavigate } from "react-router-dom";

const HrDashboard = () => {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [expandedRow, setExpandedRow] = useState(null);
  const [expandedDetails, setExpandedDetails] = useState(null);

  const toggleDropdown = () => {
    setDropdownOpen(prevState => !prevState);
  };
  const handleRowClick = (rowId) => {
    setExpandedRow(expandedRow === rowId ? null : rowId);
    setExpandedDetails(null);
  };

  const handleDetailsClick = (detailId) => {
    setExpandedDetails(expandedDetails === detailId ? null : detailId);
    navigate('/Hrviewmore');
    console.log(dummyResponse[detailId]);

  };

  return (
    <Layout>
      {/* Header Section */}
      <div className="header-section mb-4">
        <Row className="align-items-center">
          <Col md="1">
            <Dropdown isOpen={dropdownOpen} toggle={toggleDropdown}>
              <DropdownToggle caret color="link">
                Dropdown
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem>Action 1</DropdownItem>
                <DropdownItem>Action 2</DropdownItem>
                <DropdownItem>Action 3</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </Col>
          <Col md="4">
          <div className="search-container">
              <Input type="search" placeholder="Type here ---" />
              <FaSearch className="search-icon" />
            </div>
          </Col>
          <Col md="7" className="text-right d-flex justify-content-end align-items-center">
          <span className="icon-circle">
            <FaUser size={15} />
          </span>
            <span className="mr-4 usertext">Welcome Username</span>
            <FaCog className="mr-4 cog-icon" size={26} />
            <span className="notification-icon">
      <span style={{marginRight:20}}><FaBell size={20} className="bell-icon" />
      <span className="notification-dot"></span></span>
      <span><FaSignOutAlt size={20} color='#444' /></span>
    </span>
            
          </Col>
        </Row>
      </div>

      {/* Existing Dashboard Content */}
      <Row>
      <Col md="12">
      <div class="page-header-title"><h5 class="m-b-10">Test Education Fees</h5></div>
      </Col>
      </Row>
      <Row>
        <Col md="4">
          <Card>
            <CardBody>
              <CardTitle>No of Children</CardTitle>
              <img
                src={child}
                alt="child"
                style={{
                  width: "60px",
                  height: "auto",
                }}   className='cardimage'
              />
              <h2>2</h2>
            </CardBody>
          </Card>
        </Col>
        <Col md="4">
          <Card>
            <CardBody>
              <CardTitle>Total Fee Reimbursed – Current Year</CardTitle>
              <img
                src={totamt}
                alt="totamt"
                style={{
                  width: "60px",
                  height: "auto",
                }}   className='cardimage'
              />
              <h2 className="text-success">5000</h2>
            </CardBody>
          </Card>
        </Col>
        <Col md="4">
          <Card>
            <CardBody>
              <CardTitle>Pending Fees to Reimburse – Current Year</CardTitle>
              <img
                src={penamt}
                alt="penamt"
                style={{
                  width: "60px",
                  height: "auto",
                }}
                className='cardimage'
              />
              <h2 className="text-danger">2000</h2>
            </CardBody>
          </Card>
        </Col>
      </Row>
  
      <Card className="mt-4">
        <CardBody>
          <div class="cardheader">
          <CardTitle>Request Details</CardTitle>
          <Button color="primary" className="mb-3"  onClick={() => navigate("/Eduform")}>Fee Reimbursement Request</Button></div>
          <Table responsive>
            <thead>
              <tr>
                <th></th>
                <th>Request Type</th>
                <th>Request</th>
                <th>Subject</th>
                <th>Address To</th>
                <th>Purpose</th>
                <th>Comments</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {dummyResponse.slice(0, 4).map((data, index) => (
                <React.Fragment key={index}>
                  <tr>
                    <td>
                      <input type="checkbox" />
                    </td>
                    <td>HR</td>
                    <td>Fee payment</td>
                    <td>Edu. Fee Payment</td>
                    <td>Dummy Text</td>
                    <td>Dummy Text</td>
                    <td>Dummy Text</td>
                    <td>Pending</td>
                    <td>
                      <Button
                        color="link"
                        style={{
                          textDecoration: "none",
                          fontSize: 15,
                          padding: 0,
                          marginBottom: 5,
                        }}
                        onClick={() => handleRowClick(index)}
                      >
                        {expandedRow === index ? (
                          <MdOutlineRemove size={20} />
                        ) : (
                          <MdAdd size={20} />
                        )}
                      </Button>
                    </td>
                  </tr>
                  {expandedRow === index && (
                    <AdminExpandedView
                      index={index}
                      handleDetailsClick={handleDetailsClick}
                      statusTitle={"This is a request for the Approval of Education Fee Reimbersement"}
                      childrenCount={2}
                      amount={15000}
                    />
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </Table>
        </CardBody>
      </Card>
    </Layout>
  );
};

export default HrDashboard;
