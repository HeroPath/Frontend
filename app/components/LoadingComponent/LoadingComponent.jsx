import * as React from "react";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";

const Loading = () => {
  return (
    <div className="loading-circle">
      <Stack sx={{ color: "grey.500" }} spacing={2} direction="row">
        <CircularProgress sx={{ color: "#ecd586" }} />
      </Stack>
    </div>
  );
};

export default Loading;
