import { AppBar, Toolbar, Button } from "@mui/material";

export default function Navbar() {
  const logout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <h3 style={{ flexGrow: 1 }}>
          Campus Notifications
        </h3>

        <Button
          color="inherit"
          onClick={logout}
        >
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
}