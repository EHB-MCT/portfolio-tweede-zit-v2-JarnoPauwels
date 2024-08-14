import { AccountCircle, School, Security } from "@mui/icons-material";

export const getRoleColor = (role) => {
  switch (role) {
    case "student":
      return "primary";
    case "teacher":
      return "success";
    case "admin":
      return "error";
    default:
      return "inherit";
  }
};

export const getRoleIcon = (role) => {
  switch (role) {
    case "student":
      return <AccountCircle />;
    case "teacher":
      return <School />;
    case "admin":
      return <Security />;
    default:
      return null;
  }
};
