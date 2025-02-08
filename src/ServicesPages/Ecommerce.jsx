import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      <Box
        sx={{
          p: 3,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
        }}
      >
        {children}
      </Box>
    </div>
  );
}

TabPanel.propTypes = {
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

export default function Ecommerce() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const tabLabels = [
    "Shopify",
    "OpenCart",
    "Woocommerce",
    "Magento",
    "Prestashop",
  ];

  return (
    <>
      {/* Header Section */}
      <Box 
  justifyContent="center" 
  sx={{ 
    width: '100%', 
    display: 'flex', 
    borderBottom: '1px solid black', 
    flexDirection: 'column', 
    alignItems: 'center', 
    bgcolor: '#2F79C3',
    color: 'white',
  }}
>
  <h1 className="bold">E-Commerce</h1>
</Box>

      {/* Tab Navigation */}
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          p: 3,
        }}
      >
        <Box
          sx={{
            width: "100%",
            maxWidth: "800px", // Optional: limits tab width
            display: "flex",
            justifyContent: "center",
            borderBottom: 1,
            borderColor: "divider",
          }}
        >
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="ecommerce tabs"
            variant="scrollable"
            scrollButtons="auto"
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

        {/* Tab Content */}
        {tabLabels.map((label, index) => (
          <TabPanel key={index} value={value} index={index}>
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
          </TabPanel>
        ))}
      </Box>
    </>
  );
}
