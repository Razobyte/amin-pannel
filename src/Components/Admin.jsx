import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import HomeIcon from "@mui/icons-material/Home";
import DesignServicesIcon from "@mui/icons-material/DesignServices";
import FactoryIcon from "@mui/icons-material/Factory";
import { Link } from "react-router-dom";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useState } from "react";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import logo from "../Images/image.jpg";
import Profile from "../ProfilePage/Profile";
import Groups3Icon from "@mui/icons-material/Groups3";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import Slide from "@mui/material/Slide";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function Admin() {
  const theme = useTheme();
  const [homeAnchorEl, setHomeAnchorEl] = useState(null);
  const [servicesAnchorEl, setServicesAnchorEl] = useState(null); // New state for Services dropdown

  const handleHomeMenuClick = (event) => {
    setHomeAnchorEl(event.currentTarget);
  };

  const handleHomeMenuClose = () => {
    setHomeAnchorEl(null);
  };

  const handleServicesMenuClick = (event) => {
    setServicesAnchorEl(event.currentTarget); // Open Services menu
  };

  const handleServicesMenuClose = () => {
    setServicesAnchorEl(null); // Close Services menu
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ bgcolor: "white", color: "black" }}>
        <Toolbar>
          <Box sx={{ flexGrow: 2, display: "column" }}>
            <img
              src={logo}
              alt="logo"
              style={{ width: "190px", height: "50px" }}
            />
          </Box>
          <Profile />
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open>
        <DrawerHeader>
          <IconButton>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          <ListItem key="Dashboard" disablePadding>
            <ListItemButton>
              <ListItemIcon sx={{ color: "black" }}>
                <MenuOpenIcon />
              </ListItemIcon>
              <ListItemText sx={{ color: "black" }} primary="Dashboard" />
            </ListItemButton>
          </ListItem>

          {/* Home Dropdown */}
          <ListItem key="Home" disablePadding>
            <ListItemButton onClick={handleHomeMenuClick}>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary="Home" />
              <ArrowDropDownIcon />
            </ListItemButton>
          </ListItem>

          <Menu
            anchorEl={homeAnchorEl}
            open={Boolean(homeAnchorEl)}
            onClose={handleHomeMenuClose}
            TransitionComponent={Slide}
            TransitionProps={{
              direction: "down", // Sliding down effect
              timeout: 300, // Duration of animation
            }}
            sx={{
              "& .MuiPaper-root": {
                backgroundColor: "#ffffff", // White background for clarity
                color: "#333", // Text color
                boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.15)", // Softer shadow for depth
                borderRadius: "8px", // Rounded corners
                transformOrigin: "top center", // Set the origin for scale animation
                animation: "scaleIn 0.3s ease-out", // Scale effect
              },
              "& .MuiMenuItem-root": {
                padding: "10px 16px", // Adjust spacing
                "&:hover": {
                  backgroundColor: "#f0f0f0", // Hover effect
                  color: "#1976d2", // Highlighted text color
                },
              },
              "@keyframes scaleIn": {
                from: {
                  opacity: 0,
                  transform: "scale(0.8)", // Start smaller
                },
                to: {
                  opacity: 1,
                  transform: "scale(1)", // Scale to full size
                },
              },
            }}
          >
            <MenuItem
              component={Link}
              to="/banner"
              onClick={handleHomeMenuClose}
            >
              BannerPage
            </MenuItem>
            <Divider />
            <MenuItem
              component={Link}
              to="/enquery"
              onClick={handleHomeMenuClose}
            >
              Customer Enquiry
            </MenuItem>
            <MenuItem
              component={Link}
              to="/videos"
              onClick={handleHomeMenuClose}
            >
              Videos Page
            </MenuItem>
            <MenuItem
              component={Link}
              to="/client"
              onClick={handleHomeMenuClose}
            >
              Our Clients
            </MenuItem>
            <MenuItem
              component={Link}
              to="/portfolio"
              onClick={handleHomeMenuClose}
            >
              Portfolio
            </MenuItem>
            <MenuItem
              component={Link}
              to="/blogs"
              onClick={handleHomeMenuClose}
            >
              Blogs
            </MenuItem>
          </Menu>

          {/* Services Dropdown */}
          <ListItem key="Services" disablePadding>
            <ListItemButton onClick={handleServicesMenuClick}>
              <ListItemIcon>
                <DesignServicesIcon />
              </ListItemIcon>
              <ListItemText sx={{ color: "black" }} primary="Services" />
              <ArrowDropDownIcon />
            </ListItemButton>
          </ListItem>

          <Menu
            anchorEl={servicesAnchorEl}
            open={Boolean(servicesAnchorEl)}
            onClose={handleServicesMenuClose}
            TransitionComponent={Slide}
            TransitionProps={{
              direction: "down", // Dropdown slides down
              timeout: 300, // Smooth animation duration
            }}
            sx={{
              "& .MuiPaper-root": {
                backgroundColor: "#f5f5f5", // Light gray background
                color: "#333", // Dark text
                boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.15)", // Softer shadow for depth
                borderRadius: "10px", // Rounded corners
                padding: "8px 0", // Menu padding
                transformOrigin: "top center", // Origin for scaling
                animation: "scaleIn 0.3s ease-out", // Add scale animation
              },
              "& .MuiMenuItem-root": {
                padding: "12px 20px", // Larger padding for better spacing
                "&:hover": {
                  backgroundColor: "#e0e0e0", // Light hover effect
                  color: "#1976d2", // Highlighted text color
                },
              },
              "@keyframes scaleIn": {
                from: {
                  opacity: 0,
                  transform: "scale(0.8)", // Start smaller
                },
                to: {
                  opacity: 1,
                  transform: "scale(1)", // Full size
                },
              },
            }}
          >
            <MenuItem
              component={Link}
              to="/services/design"
              onClick={handleServicesMenuClose}
            >
              Design
            </MenuItem>
            <MenuItem
              component={Link}
              to="/services/development"
              onClick={handleServicesMenuClose}
            >
              Development
            </MenuItem>

            <MenuItem
              component={Link}
              to="/services/marketing"
              onClick={handleServicesMenuClose}
            >
              Digital Marketing
            </MenuItem>

            <MenuItem
              component={Link}
              to="/services/gamedevelopment"
              onClick={handleServicesMenuClose}
            >
              Game Development
            </MenuItem>
            <MenuItem
              component={Link}
              to="/services/mobileapps"
              onClick={handleServicesMenuClose}
            >
              Mobile Applications
            </MenuItem>

            <MenuItem
              component={Link}
              to="/services/support"
              onClick={handleServicesMenuClose}
            >
              Maintenance & Support
            </MenuItem>
            <MenuItem
              component={Link}
              to="/services/e-commerce"
              onClick={handleServicesMenuClose}
            >
             Ecommerce Solutions
            </MenuItem>
          </Menu>

          {/* Testimonials Link */}
          <Box>
            <Link to={"/Testlmonials"} style={{ textDecoration: "none" }}>
              <ListItem key="Testlmonials" disablePadding>
                <ListItemButton>
                  <ListItemIcon sx={{ color: "black" }}>
                    <Groups3Icon />
                  </ListItemIcon>
                  <ListItemText
                    sx={{ color: "black" }}
                    primary="Testimonials"
                  />
                </ListItemButton>
              </ListItem>
            </Link>
          </Box>
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        Admin Content Goes Here
        {/* <Typography>MainRoute Component can be used here</Typography> */}
      </Box>
    </Box>
  );
}
