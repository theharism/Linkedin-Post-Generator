import "../style/TeamDetails.css";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import Modal from "./Modal";
import GroupsIcon from "@mui/icons-material/Groups";
import Chart from "chart.js/auto";
import { Button, Col, Dropdown, Form } from "react-bootstrap";
import FormField from "./FormField";
import {
  calculateDiscountForTeam,
  createTeamCheckoutSession,
  isEmail,
} from "../constants/helper.js";
import {
  addMember,
  add_remove_Admins,
  cancelSubscription,
  deleteTeam,
  extendTeam,
  getTeams,
  removeMember,
} from "../slices/TeamsSlice.js";
import Swal from "sweetalert2";
import { Slider } from "@mui/material";

const TeamDetails = () => {
  const { id } = useParams();
  const [showAddNewMemberModal, setShowAddNewMemberModal] = useState(false);
  const [showActivateteamModal, setShowActivateModal] = useState(false);
  const [selectedOption, setSelectedOption] = useState(1); //2 for members, 1 for analytics, 3 for settings
  const [totalPostsGenerated, setTotalPostsGenerated] = useState(0);
  const chartRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const teamDetails = useSelector(
    (state) => state.Teams.find((obj) => obj.team._id === id)?.team
  );
  const { email } = useSelector((state) => state.User);

  useEffect(() => {
    dispatch(getTeams({ email }));
  }, [dispatch, email]);

  const [formData, setFormData] = useState({
    emails: "",
    noofMembers: teamDetails?.teamSize,
  });

  useEffect(() => {
    if (teamDetails?.members && selectedOption) {
      const newChartData = [];
      const newChartLabels = [];
      const newTotalPostsGenerated = teamDetails.members.reduce(
        (total, member) => {
          const posts = member.posts;
          newChartData.push(posts);
          newChartLabels.push(member.email);
          return total + posts;
        },
        0
      );
      const ctx = document.getElementById("postsGenerated");
      chartRef.current = new Chart(ctx, {
        type: "bar",
        data: {
          labels: newChartLabels,
          datasets: [
            {
              label: "Posts Generated By Each User",
              data: newChartData,
            },
          ],
        },
      });

      setTotalPostsGenerated(newTotalPostsGenerated);

      return () => {
        if (chartRef.current) {
          chartRef.current.destroy();
        }
      };
    }
  }, [teamDetails, selectedOption]);

  if (!teamDetails) {
    return null;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const onClose = () => {
    setShowAddNewMemberModal(false);
    if (showActivateteamModal) {
      dispatch(getTeams({ email }));
      setShowActivateModal(false);
    }
  };

  const handleAddNewMembers = (e) => {
    e.preventDefault();

    // Split the input into an array of email addresses
    const emails = formData.emails
      .split(/[,\s\n]+/)
      .filter((email) => email.trim() !== "" && isEmail(email));

    dispatch(addMember({ id, emails, adminEmail: email }));

    setFormData({
      ...formData,
      emails: "",
    });

    onClose();
  };

  const AddNewMemberModal = () => (
    <Modal
      heading={"Add a New Member"}
      subheading={"Add new members to team to work in collaboration"}
      onClose={onClose}
    >
      <Form>
        <FormField
          label={"Add Users (comma, space, or newline separated):"}
          onChange={handleChange}
          placeholder={"Enter new member email(s)"}
          value={formData.emails}
          name={"emails"}
          as={"textarea"}
        />

        <Button
          onClick={handleAddNewMembers}
          variant="primary"
          className="submit w-100"
        >
          Add Users
        </Button>
      </Form>
    </Modal>
  );

  const ActivateTeamModal = () => (
    <Modal
      heading={"Activate Your Team"}
      subheading={"Activating your team would allow you to add members"}
      onClose={onClose}
    >
      <Col className="row d-flex flex-row justify-content-evenly w-100">
        <div style={{ height: "50px" }} />
        <div className="col-12 col-md-6 col-lg-6 ">
          <div
            className="card p-3"
            style={{
              textAlign: "left",
            }}
          >
            <h4>Pro Package</h4>
            <p style={{ color: "#6B7280" }}>To help you grow</p>

            <h3>
              {(
                parseInt(teamDetails.teamSize) *
                (49.99 - 49.99 * calculateDiscountForTeam(teamDetails.teamSize))
              ).toFixed(2)}
              <span style={{ color: "#6B7280" }}>/month</span>
            </h3>
            <h3>
              <span
                style={{
                  color: "#d40000",
                  marginLeft: 0,
                  textDecoration: "line-through",
                }}
              >
                {(parseInt(teamDetails.teamSize) * 49.99).toFixed(2)}
              </span>
            </h3>
            <button
              onClick={() =>
                createTeamCheckoutSession(
                  teamDetails._id,
                  "price_1OLuufJOtdUfVp0DIveFknLZ",
                  onClose
                )
              }
              className="btn btn-primary plan"
            >
              Choose Plan
            </button>
          </div>
        </div>
        <div className="col-12 col-md-6 col-lg-6 ">
          <div
            className="card p-3"
            style={{
              textAlign: "left",
            }}
          >
            <h4>Pro Package</h4>
            <p style={{ color: "#6B7280" }}>To help you grow</p>
            <h3>
              {(
                parseInt(teamDetails.teamSize) *
                (499.99 -
                  499.99 * calculateDiscountForTeam(teamDetails.teamSize))
              ).toFixed(2)}
              <span style={{ color: "#6B7280" }}>/year</span>
            </h3>
            <h4>
              <span
                style={{
                  color: "#d40000",
                  marginLeft: 0,
                  textDecoration: "line-through",
                }}
              >
                {(parseInt(teamDetails.teamSize) * 499.99).toFixed(2)}
              </span>
            </h4>
            <button
              onClick={() =>
                createTeamCheckoutSession(
                  teamDetails._id,
                  "price_1OLuv2JOtdUfVp0DepUXJohp",
                  onClose
                )
              }
              className="btn btn-primary plan"
            >
              Choose Plan
            </button>
          </div>
        </div>
        <div style={{ height: "50px" }} />
      </Col>
    </Modal>
  );

  function ShowModal() {
    if (teamDetails.status === "inactive") {
      setShowActivateModal(true);
    } else setShowAddNewMemberModal(true);
  }

  const AddNewMemberButton = () => (
    <Link
      style={{ textDecoration: "none", color: "white" }}
      className="new-team-member"
    >
      <button style={{ position: "relative", width: 260 }} onClick={ShowModal}>
        Add New Member
        <GroupsIcon className="groupsIcon" sx={{ fontSize: 40 }} />
      </button>
    </Link>
  );

  const handleMemberFunctions = ({ email, type }) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText:
        type === 2 ? "Make Admin" : type === 1 ? "Remove Admin" : "Remove",
    }).then((result) => {
      if (result.isConfirmed) {
        switch (type) {
          case 1:
            dispatch(add_remove_Admins({ id, email, type: 1 }));
            break;
          case 2:
            dispatch(add_remove_Admins({ id, email, type: 2 }));
            break;
          case 3:
            dispatch(removeMember({ id, email, type: true }));
            break;

          default:
            break;
        }
      }
    });
  };

  const handleResendInvite = ({ email }) => {
    setFormData({ email });
    handleAddNewMembers();
  };

  const DisplayPersons = ({ Person, isAdmin, type, owner }) => (
    //type= => true for member, false for pending member
    <div className="team-box">
      <div className="team-box-left">
        {Person.fullName ? (
          <>
            <p className="team-name">
              {Person.fullName}
              <span className="member-properties">
                {isAdmin && "Admin"}
                {"         "}
                {Person.email === owner && "Owner"}
              </span>
            </p>
            <p className="team-email">{Person.email}</p>
          </>
        ) : (
          <div className="pending-members">
            <p className="team-name">{Person.email}</p>
            {type && <p className="member-properties">Invite Sent</p>}
          </div>
        )}
      </div>

      {Person.email === email ||
      Person.email === owner ? null : Person.fullName ? (
        <Dropdown>
          <Dropdown.Toggle id="dropdown-basic" />
          <Dropdown.Menu>
            {isAdmin ? (
              <Dropdown.Item
                onClick={() =>
                  handleMemberFunctions({ email: Person.email, type: 1 })
                }
              >
                Remove Admin
              </Dropdown.Item>
            ) : (
              <Dropdown.Item
                onClick={() =>
                  handleMemberFunctions({ email: Person.email, type: 2 })
                }
              >
                Make Admin
              </Dropdown.Item>
            )}
            <Dropdown.Item
              onClick={() =>
                handleMemberFunctions({ email: Person.email, type: 3 })
              }
            >
              Remove
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      ) : (
        <Dropdown>
          <Dropdown.Toggle id="dropdown-basic" />
          <Dropdown.Menu>
            <Dropdown.Item
              onClick={() => {
                handleResendInvite({ email: Person.email });
              }}
            >
              Resend Invite
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() =>
                handleMemberFunctions({ email: Person.email, type: 3 })
              }
            >
              Remove
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      )}
    </div>
  );

  const handleExtendTeam = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will be charged after activation on analytics tab",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirm",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(
          extendTeam({
            id,
            newMembers: formData.noofMembers - teamDetails.teamSize,
          })
        );
      }
    });
  };

  const handleDeleteTeam = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Delete Team",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteTeam({ id: teamDetails._id }));
        navigate("/teams");
      }
    });
  };

  const handleCancelTeamSubscription = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to add new members yet you can generate posts until subscription expires",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Cancel Subscription",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(cancelSubscription({ id: teamDetails._id }));
      }
    });
  };

  return (
    <div className="teams-details-container">
      <div className="teams-details-header">
        <div className="center-info">
          <h1>{teamDetails && teamDetails.name}</h1>
        </div>
      </div>

      <div>
        <div className="members">
          <div className="memberButtons">
            <h3
              style={{
                marginRight: "1rem",
                borderBottom: selectedOption === 1 ? "2px solid red" : "none",
              }}
              className="h3Buttons"
              onClick={() => setSelectedOption(1)}
            >
              Analytics
            </h3>

            <h3
              className="h3Buttons"
              style={{
                marginRight: "1rem",
                borderBottom: selectedOption === 2 ? "2px solid red" : "none",
              }}
              onClick={() => setSelectedOption(2)}
            >
              Members
            </h3>
            {teamDetails?.owner === email && (
              <h3
                className="h3Buttons"
                style={{
                  borderBottom: selectedOption === 3 ? "2px solid red" : "none",
                }}
                onClick={() => setSelectedOption(3)}
              >
                Settings
              </h3>
            )}
          </div>
          {teamDetails?.members?.length >= 1 && selectedOption === 2 && (
            <AddNewMemberButton />
          )}
        </div>

        {selectedOption === 1 ? (
          <div style={{ height: 300, width: "100%" }}>
            <h5>
              Team Status:{" "}
              <span style={{ color: "red" }}>{teamDetails?.status}</span>{" "}
              {teamDetails?.status === "inactive" && (
                <span>
                  <Button
                    style={{ marginLeft: 5 }}
                    onClick={() => setShowActivateModal(true)}
                  >
                    Activate
                  </Button>
                </span>
              )}
            </h5>
            <h5>Team Size: {teamDetails?.teamSize}</h5>
            <h5>Current Members: {teamDetails?.members.length}</h5>
            <h5>Total Posts Generated by Team: {totalPostsGenerated}</h5>
            <canvas
              style={{ height: "100%", width: "100%" }}
              id="postsGenerated"
            />
          </div>
        ) : selectedOption === 2 ? (
          <div className="display-teams">
            <>
              {teamDetails?.members?.map((member) => (
                <DisplayPersons
                  owner={teamDetails.owner}
                  Person={member}
                  key={member._id}
                  isAdmin={teamDetails.admins.some(
                    (obj) => obj.email === member.email
                  )}
                />
              ))}

              {teamDetails?.pendingMembers?.map((member) => (
                <DisplayPersons
                  owner={teamDetails.owner}
                  Person={member}
                  key={member._id}
                  type={true}
                />
              ))}
            </>
          </div>
        ) : (
          <div style={{ height: 300, width: "100%" }}>
            <div
              className="slider"
              style={{ alignItems: "center", width: "70%" }}
            >
              <h5 style={{ margin: 0 }}>Extend Team Size</h5>

              <Slider
                style={{ width: "50%" }}
                value={formData.noofMembers}
                min={10}
                max={1000}
                name="noofMembers"
                onChange={handleChange}
              />
              <span>{formData.noofMembers} Members</span>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "row",
                marginTop: 30,
                marginBottom: 10,
                alignItems: "center",
                justifyContent: "space-around",
              }}
            >
              <div>
                <h5>
                  {(
                    parseInt(formData.noofMembers) *
                    (49.99 -
                      49.99 * calculateDiscountForTeam(formData.noofMembers))
                  ).toFixed(2)}
                  <span style={{ color: "#6B7280" }}>/month</span>
                </h5>

                <h5>
                  {(
                    parseInt(formData.noofMembers) *
                    (499.99 -
                      499.99 * calculateDiscountForTeam(formData.noofMembers))
                  ).toFixed(2)}
                  <span style={{ color: "#6B7280" }}>/year</span>
                </h5>
              </div>
              <div>
                <h5>
                  {(
                    49.99 -
                    49.99 * calculateDiscountForTeam(formData.noofMembers)
                  ).toFixed(2)}
                  <span style={{ color: "#6B7280" }}>/per member</span>
                </h5>

                <h5>
                  {(
                    499.99 -
                    499.99 * calculateDiscountForTeam(formData.noofMembers)
                  ).toFixed(2)}
                  <span style={{ color: "#6B7280" }}>/per member</span>
                </h5>
              </div>
              <h5 style={{ color: "red" }}>
                {calculateDiscountForTeam(formData.noofMembers) * 100}% Discount
              </h5>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginTop: 30,
                width: "20%",
              }}
            >
              <Button
                style={{ margin: 10, width: "50%" }}
                onClick={handleExtendTeam}
              >
                Save
              </Button>

              {teamDetails?.status === "active" && (
                <Button
                  style={{
                    margin: 10,
                    color: "black",
                    backgroundColor: "lightgray",
                    border: "none",
                    marginTop: "1.5rem",
                  }}
                  onClick={handleCancelTeamSubscription}
                >
                  Cancel Subscription
                </Button>
              )}
              <Button
                style={{
                  margin: 10,
                  color: "white",
                  backgroundColor: "red",
                  border: "none",
                  marginTop: "0.2rem",
                }}
                onClick={handleDeleteTeam}
              >
                Delete Team
              </Button>
            </div>
          </div>
        )}
      </div>
      {showAddNewMemberModal && AddNewMemberModal()}
      {showActivateteamModal && ActivateTeamModal()}
    </div>
  );
};

export default TeamDetails;
