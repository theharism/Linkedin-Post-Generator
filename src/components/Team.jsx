import "../style/Team.css";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Modal from "./Modal";
import GroupsIcon from "@mui/icons-material/Groups";
import Form from "react-bootstrap/Form";
import FormField from "./FormField";
import { Slider } from "@mui/material";
import { Button } from "react-bootstrap";
import { createTeam, getTeams, removeMember } from "../slices/TeamsSlice";
import Swal from "sweetalert2";

const Team = () => {
  const [showCreateTeamModal, setShowCreateTeamModal] = useState(false);
  const navigate = useNavigate();
  const { email } = useSelector((state) => state.User);
  const teams = useSelector((state) => state.Teams);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    displayName: "",
    noofMembers: 10,
  });

  useEffect(() => {
    dispatch(getTeams({ email }));
  }, [dispatch, email]);

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
          email,
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
      className="new-team-member"
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

  const handleLeaveTeam = ({ id }) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Leave",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(removeMember({ id, email, type: false }));
      }
    });
  };

  const DisplayTeam = ({ Team, isAdmin }) => (
    <div className="team-box">
      <p className="team-name">{Team.name}</p>
      {isAdmin ? (
        <Button
          onClick={() => handleDashboardClick(Team._id)}
          className="dashboard-button"
        >
          Dashboard
        </Button>
      ) : (
        <Button
          className="dashboard-button"
          onClick={() => handleLeaveTeam({ id: Team._id })}
        >
          Leave Team
        </Button>
      )}
    </div>
  );

  const handleDashboardClick = (id) => {
    console.log(id);
    navigate(`/teams/${id}`);
  };
  const filteredTeams = teams.filter((team) => team.isAdmin);

  return (
    <div className="teams-container">
      <div>
        <div className="my-teams">
          <h3>My Teams</h3>
          {filteredTeams.length > 0 && <CreateNewTeamButton />}
        </div>

        <hr />

        <div className="display-teams">
          {filteredTeams.length > 0 ? (
            <>
              {filteredTeams.map((Team) => (
                <DisplayTeam
                  Team={Team.team}
                  key={Team.team._id}
                  isAdmin={true}
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
          {teams.length > 0 ? (
            <>
              {teams
                .filter((team) => !team.isAdmin)
                .map((Team) => (
                  <DisplayTeam Team={Team.team} key={Team.team._id} />
                ))}
            </>
          ) : (
            <h5>You have n't joined any team yet</h5>
          )}
        </div>
      </div>

      {showCreateTeamModal && createNewTeamModal()}
    </div>
  );
};

export default Team;
