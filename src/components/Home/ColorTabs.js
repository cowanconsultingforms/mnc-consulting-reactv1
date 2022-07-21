import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import React from "react";


export default function ColorTabs() {
  const [value, setValue] = React.useState("forSale");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
          <Tabs
        centered
        value={value}
        onChange={handleChange}
        textColor="secondary"
        indicatorColor="secondary"
        aria-label="secondary tabs example"
      >
        <Tab value="forSale" label="Buy" />
        <Tab value="rentals" label="Rent" />
        <Tab value="sold" label="Sold" />
      </Tabs>
    </Box>
  );
}