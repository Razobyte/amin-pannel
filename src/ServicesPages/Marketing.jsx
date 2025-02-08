import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

// Tab Panel Component
function MarketingTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

MarketingTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

// Main Component
export default function MarketingTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const tabLabels = [
    "Search Engine Optimization",
    "Search Engine Marketing",
    "Social Media Optimization",
    "Social Media Marketing",
    "Email Marketing",
    "Performance Marketing",
  ];

  return (
    <>
      <Box
        justifyContent="center"
        sx={{
          width: "100%",
          display: "flex",
          borderBottom: "1px solid black",
          flexDirection: "column",
          alignItems: "center",
          bgcolor: "#2F79C3",
          color: "white",
        }}
      >
        <h1 className="bold">Digital Marketing</h1>
      </Box>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          p: 3,
        }}
      >
        <Box sx={{ borderBottom: 1, borderColor: "divider", width: "80%" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="marketing tabs"
            variant="scrollable"
            scrollButtons="auto"
            centered
          >
            {tabLabels.map((label, index) => (
              <Tab
                key={index}
                label={label}
                {...a11yProps(index)}
                sx={{ fontWeight: "bold" }}
              />
            ))}
          </Tabs>
        </Box>

        {tabLabels.map((label, index) => (
          <MarketingTabPanel key={index} value={value} index={index}>
            <Box
              sx={{
                textAlign: "center",
                fontSize: "18px",
                fontWeight: "500",
                color: "#333",
              }}
            >
              Content for {label}
            </Box>
          </MarketingTabPanel>
        ))}
      </Box>
    </>
  );
}
