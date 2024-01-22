import "../style/TeamDetails.css";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import Modal from "./Modal";
import GroupsIcon from "@mui/icons-material/Groups";
import { Button, Dropdown, Form } from "react-bootstrap";
import FormField from "./FormField";
import { isEmail } from "../constants/helper.js";
import {
  addMember,
  add_remove_Admins,
  removeMember,
} from "../slices/TeamsSlice.js";
import Swal from "sweetalert2";

const TeamDetails = () => {
  const { id } = useParams();
  const [showAddNewMemberModal, setShowAddNewMemberModal] = useState(false);
  const dispatch = useDispatch();
  const teamDetails = useSelector(
    (state) => state.Teams.find((obj) => obj.team._id === id)?.team
  );
  console.log(teamDetails);
  const { email } = useSelector((state) => state.User);

  const [formData, setFormData] = useState({
    emails: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const onClose = () => {
    setShowAddNewMemberModal(false);
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

  const AddNewMemberButton = () => (
    <Link
      style={{ textDecoration: "none", color: "white" }}
      className="new-team-member"
    >
      <button
        style={{ position: "relative", width: 260 }}
        onClick={() => setShowAddNewMemberModal(true)}
      >
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
            <Dropdown.Item>Resend Invite</Dropdown.Item>
            <Dropdown.Item>Remove</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      )}
    </div>
  );

  return (
    <div className="teams-details-container">
      <div className="teams-details-header">
        <div className="center-info">
          <h1>{teamDetails && teamDetails.name}</h1>
        </div>
        {/* <div className="left-info">
          <div>Team Size: {teamDetails.teamSize}</div>
          <div>No. of Members: {teamDetails.members.length}</div>
        </div> */}
      </div>

      <div>
        <div className="members">
          <h3>Members</h3>
          {teamDetails?.members?.length >= 1 && <AddNewMemberButton />}
        </div>

        <hr />

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
      </div>
      {showAddNewMemberModal && AddNewMemberModal()}
    </div>
  );
};

export default TeamDetails;
