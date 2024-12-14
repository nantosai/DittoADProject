import React from "react";
import { ResponsivePie } from "@nivo/pie";
import { Box, Typography, useTheme } from "@mui/material";

import { useGetSalesQuery } from "../state/api";

// Breakdown Chart
const BreakdownChart = ({ isDashboard = false }) => {
  const { data, isLoading } = useGetSalesQuery();
  const theme = useTheme();

  // Loader
  if (!data || isLoading) {
    return (
      <Typography variant="h5" mt="20%" textAlign="center">
        Loading...
      </Typography>
    );
  }

  // theme colors
  const colors = ['#DC2A4B', '#941C32', '#A15DE4', '#D9863D'];

  // formatted data
  const formattedData = Object.entries(data.salesByCategory).map(
    ([category, sales], i) => ({
      id: category,
      label: category,
      value: sales,
      color: colors[i],
    })
  );

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height={isDashboard ? "400px" : "100%"}
      width="100%"
      minHeight={isDashboard ? "70%" : undefined}
      minWidth={isDashboard ? "70%" : undefined}
      position="relative"
    >
      {/* Pie chart */}
    <Box 
      height={isDashboard ? "325px" : "100%"}
      width={isDashboard ? "325px" : "100%"}
      >
      <ResponsivePie
        data={formattedData}
        theme={{
          axis: {
            domain: {
              line: {
                stroke: theme.palette.grey[1000],
              },
            },
            legend: {
              text: {
                fill: theme.palette.grey[1000],
              },
            },
            ticks: {
              line: {
                stroke: theme.palette.grey[1000],
                strokeWidth: 1,
              },
              text: {
                fill: theme.palette.grey[1000],
              },
            },
          },
          legends: {
            text: {
              fill: theme.palette.grey[1000],
            },
          },
          tooltip: {
            container: {
              color: theme.palette.grey[900],
            },
            text: {
              fill: theme.palette.grey[900],
            },
          },
        }}
        colors={{ datum: "data.color" }}
        margin={isDashboard ? { top: 40, right: 10, bottom: 40, left: 10 } 
                            : { top: 40, right: 80, bottom: 50, left: 80 }}
        sortByValue={true}
        innerRadius={0.45}
        activeOuterRadiusOffset={8}
        borderWidth={1}
        borderColor={{
          from: "color",
          modifiers: [["darker", 0.2]],
        }}
        enableArcLabels={!isDashboard}
        enableArcLinkLabels={false}
        arcLabelsSkipAngle={10}
        arcLabelsTextColor={theme.palette.grey[0] || "white"}       
      />
    </Box>

    {/* Legends in a separate box */}
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexWrap="wrap"
      mt={2}
      mb={2}
      gap={2}
      width="100%"
    >
      {formattedData.map((item) => (
        <Box key={item.id} display="flex" alignItems="center" gap={1}>
          <Box
            width="16px"
            height="16px"
            bgcolor={item.color}
            borderRadius="50%"
          />
          <Typography variant="body2" color={theme.palette.secondary.main}>
            {item.label}
          </Typography>
        </Box>
      ))}
    </Box>

      {/* Pie chart center */}
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        position="absolute"
        top={0}
        bottom={isDashboard ? 60 : 50}
        left={0}
        right={0}
        width={isDashboard ? "100%" : "100%"}
        height={isDashboard ? "80%" : "90%"}
        maxWidth="100px" // Adjust to match your text area
        maxHeight="50px"
        margin="auto"
        color={theme.palette.secondary.light}
        textAlign="center"
        pointerEvents="none"
        >
        <Typography variant="h6">
          {!isDashboard && "Total:"} ${data.yearlySalesTotal}
        </Typography>
      </Box>
    </Box>
  );
};

export default BreakdownChart;
