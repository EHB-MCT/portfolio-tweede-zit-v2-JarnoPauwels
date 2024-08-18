import React from "react";
import {
  Grid,
  Paper,
  Box,
  Typography,
  IconButton,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Chip,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { red } from "@mui/material/colors";
import { getRoleColor, getRoleIcon } from "../../utils/roleUtils";

const UserList = ({ users, handleDeleteUser }) => {
  const adminCount = users.filter((user) => user.role === "admin").length;

  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1-content"
        id="panel1-header"
      >
        <Typography variant="h5" component="h2">
          User List
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        {/* Admins */}
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="admins-content"
            id="admins-header"
          >
            Admins
          </AccordionSummary>
          <AccordionDetails>
            <Grid container spacing={2}>
              {users
                .filter((user) => user.role === "admin")
                .map((user) => (
                  <Grid item xs={12} key={user.id}>
                    <Paper
                      sx={{
                        p: 2,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <Box>
                        <Typography variant="h6">
                          <span style={{ color: getRoleColor(user.role) }}>
                            {user.firstName} {user.lastName}
                          </span>{" "}
                          ({user.email}){" "}
                          <Chip
                            icon={getRoleIcon(user.role)}
                            label={user.role}
                            color={getRoleColor(user.role)}
                          />
                        </Typography>
                      </Box>
                      <IconButton
                        edge="end"
                        aria-label="delete"
                        onClick={() => handleDeleteUser(`user-${user.id}`)}
                        disabled={adminCount === 1}
                        sx={{
                          "&:hover": { color: red[500] },
                          color: adminCount === 1 ? "gray" : "gray",
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Paper>
                  </Grid>
                ))}
            </Grid>
          </AccordionDetails>
        </Accordion>

        {/* Teachers */}
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="teachers-content"
            id="teachers-header"
          >
            Teachers
          </AccordionSummary>
          <AccordionDetails>
            <Grid container spacing={2}>
              {users
                .filter((user) => user.role === "teacher")
                .map((user) => (
                  <Grid item xs={12} key={user.id}>
                    <Paper
                      sx={{
                        p: 2,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <Box>
                        <Typography variant="h6">
                          <span style={{ color: getRoleColor(user.role) }}>
                            {user.firstName} {user.lastName}
                          </span>{" "}
                          ({user.email}){" "}
                          <Chip
                            icon={getRoleIcon(user.role)}
                            label={user.role}
                            color={getRoleColor(user.role)}
                          />
                        </Typography>
                      </Box>
                      <IconButton
                        edge="end"
                        aria-label="delete"
                        onClick={() => handleDeleteUser(`user-${user.id}`)}
                        sx={{ "&:hover": { color: red[500] } }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Paper>
                  </Grid>
                ))}
            </Grid>
          </AccordionDetails>
        </Accordion>

        {/* Students */}
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="students-content"
            id="students-header"
          >
            Students
          </AccordionSummary>
          <AccordionDetails>
            <Grid container spacing={2}>
              {users
                .filter((user) => user.role === "student")
                .map((user) => (
                  <Grid item xs={12} key={user.id}>
                    <Paper
                      sx={{
                        p: 2,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <Box>
                        <Typography variant="h6">
                          <span style={{ color: getRoleColor(user.role) }}>
                            {user.firstName} {user.lastName}
                          </span>{" "}
                          ({user.email}){" "}
                          <Chip
                            icon={getRoleIcon(user.role)}
                            label={user.role}
                            color={getRoleColor(user.role)}
                          />
                        </Typography>
                      </Box>
                      <IconButton
                        edge="end"
                        aria-label="delete"
                        onClick={() => handleDeleteUser(`user-${user.id}`)}
                        sx={{ "&:hover": { color: red[500] } }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Paper>
                  </Grid>
                ))}
            </Grid>
          </AccordionDetails>
        </Accordion>
      </AccordionDetails>
    </Accordion>
  );
};

export default UserList;
