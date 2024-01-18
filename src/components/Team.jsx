import "../style/Team.css";
import GroupsIcon from "@mui/icons-material/Groups";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Modal from "./Modal";
import Form from "react-bootstrap/Form";
import FormField from "./FormField";
import { Slider } from "@mui/material";
import { Button } from "react-bootstrap";
import { createTeam, getTeams } from "../slices/TeamsSlice";

const Team = () => {
  const [showCreateTeamModal, setShowCreateTeamModal] = useState(false);

  const { username } = useSelector((state) => state.User);
  const teams = useSelector((state) => state.Teams);
  console.log(teams);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTeams({ username }));
  }, [dispatch, username]);

  const [formData, setFormData] = useState({
    displayName: "",
    noofMembers: 10,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const onClose = () => {
    setShowCreateTeamModal(false);
  };

  const handleCreateNewTeam = (event) => {
    event.preventDefault();
    if (formData.displayName && formData.noofMembers) {
      dispatch(
        createTeam({
          name: formData.displayName,
          teamSize: formData.noofMembers,
          username,
        })
      );
      onClose();
    }
  };

  const createNewTeamModal = () => (
    <Modal
      heading={"Create a new Team"}
      subheading={"Add members to your team for collaboration"}
      onClose={onClose}
    >
      <Form className="FormPage">
        <FormField
          label={"Team Display Name"}
          onChange={handleChange}
          placeholder={"Enter your team name"}
          value={formData.displayName}
          name={"displayName"}
        />
      </Form>

      <div className="slider">
        <span>No of Members</span>
        <Slider
          style={{ width: "50%" }}
          value={formData.noofMembers}
          min={1}
          max={500}
          name="noofMembers"
          onChange={handleChange}
        />
        <span>{formData.noofMembers} Members</span>
      </div>

      <div style={{ margin: 15 }}>
        <span>Team Cost</span>
        <span style={{ fontSize: 25 }}>${formData.noofMembers * 10} 💸</span>
      </div>

      <Button
        variant="primary"
        className="submit w-100"
        onClick={handleCreateNewTeam}
      >
        Create
      </Button>
    </Modal>
  );

  const CreateNewTeamButton = () => (
    <Link
      style={{ textDecoration: "none", color: "white" }}
      className="FormLinks"
    >
      <button
        style={{ position: "relative", width: 260 }}
        onClick={() => setShowCreateTeamModal(true)}
      >
        Create a New Team
        <GroupsIcon className="groupsIcon" sx={{ fontSize: 40 }} />
      </button>
    </Link>
  );

  const DisplayTeam = ({ adminTeam }) => (
    <div key={adminTeam.id} className="team-box">
      <p className="team-name">{adminTeam.name}</p>
      <Button className="dashboard-button">Dashboard</Button>
    </div>
  );

  return (
    <div className="teams-container">
      <div>
        <div className="my-teams">
          <h3>My Teams</h3>
          {teams.length > 0 && <CreateNewTeamButton />}
        </div>

        <hr />

        <div className="display-teams">
          {teams.length > 0 ? (
            <>
              {teams
                .filter((team) => team.isAdmin)
                .map((adminTeam) => (
                  <DisplayTeam
                    adminTeam={adminTeam.team}
                    key={adminTeam.team._id}
                  />
                ))}
            </>
          ) : (
            <CreateNewTeamButton />
          )}
        </div>
      </div>

      <div>
        <div className="joined-teams">
          <h3>Joined Teams</h3>
        </div>

        <hr />

        <div className="display-teams">
          {teams.length < 0 ? <></> : <h5>You have n't joined any team yet</h5>}
        </div>
      </div>

      {/* {teams.length > 0 ? (
        <div> </div>
      ) : (
        <div className="empty-teams">
          <Link
            style={{ textDecoration: "none", color: "white" }}
            className="FormLinks"
          >
            <button
              style={{ position: "relative", width: 260 }}
              onClick={() => setShowCreateTeamModal(true)}
            >
              Create a New Team
              <GroupsIcon className="groupsIcon" sx={{ fontSize: 40 }} />
            </button>
          </Link>
        </div>
      )} */}
      {showCreateTeamModal && createNewTeamModal()}
    </div>
  );
};

export default Team;
