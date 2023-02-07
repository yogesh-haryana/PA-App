import * as React from "react";
import {
  AppBar, Box, Toolbar, IconButton, Typography, Menu, Container, Avatar, Tooltip, MenuItem
} from "@mui/material";
import PropTypes from "prop-types";

function NavBar(props) {
  const { name, logOutUser } = props;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".25 rem",
              color: "inherit",
              textDecoration: "none"
            }}
          >
            PERFORMANCE APPRAISAL
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }} />
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Your Account">
              <IconButton onClick={handleClick} sx={{ p: 0 }}>
                <Avatar alt={name} src="" />
              </IconButton>
            </Tooltip>
          </Box>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button"
            }}
          >
            <MenuItem onClick={handleClose}>Profile</MenuItem>
            <MenuItem onClick={logOutUser}>Logout</MenuItem>
          </Menu>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

NavBar.propTypes = {
  name: PropTypes.string.isRequired,
  logOutUser: PropTypes.func.isRequired
};

export default NavBar;
