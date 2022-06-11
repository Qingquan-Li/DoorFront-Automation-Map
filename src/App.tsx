import React from "react";
import "./App.css";
import GoogleMap from "./GoogleMap";
import Navbar from "./Navbar";
import { Container, Grid, Paper, Stack, Typography } from "@mui/material";
import { googleMapConfig as defaultConfig } from "./GoogleMapConfig";
import { generateInfo } from "./GoogleMap/utils/streetViewTool";
import { debouncedStreetViewImageChange } from "./debounceFunc";

function App() {
  const [streetViewPov, setStreetViewPov] = React.useState<{
    pov: google.maps.StreetViewPov;
    zoom: number;
  }>({
    pov: {
      heading: 247,
      pitch: 8,
    },
    zoom: 1,
  });
  const [googleMapConfig, setGoogleMapConfig] = React.useState(defaultConfig);
  const [isNextPosition, setIsNextPosition] = React.useState(false);

  const onPovChanged = (
    result: ReturnType<typeof generateInfo>,
    map: google.maps.Map
  ) => {
    debouncedStreetViewImageChange(result, setStreetViewPov);
  };

  const onPositionChanged = (
    result: ReturnType<typeof generateInfo>,
    map: google.maps.Map
  ) => {
    // console.log("onPositionChanged -> ", result);
    debouncedStreetViewImageChange(result, setStreetViewPov);
    if (result.position && result.pov) {
      setIsNextPosition(false);
      setGoogleMapConfig({
        panoId: result.pano,
        position: result.position,
        povConfig: { ...result.pov, zoom: result.zoom },
        staticMapZoom: 18,
      });
    }
  };

  return (
    <div className="App">
      <Navbar position="static" isTransparent={false} />
      <Paper
        id="ExplorationContainer"
        sx={{
          minHeight: "calc(100vh - 74px)",
          backgroundColor: "rgba(225, 207, 185, 0.15)",
          minWidth: "1440px",
        }}
      >
        <Container maxWidth="xl">
          <Grid container sx={{ pt: 10 }}>
            <Grid item xs={8} sx={{ minHeight: "640px", minWidth: "890px" }}>
              <GoogleMap
                streetViewEvents={{ onPovChanged, onPositionChanged }}
                mapConfig={{
                  center: googleMapConfig.position,
                  zoom: googleMapConfig.staticMapZoom,
                }}
                streetViewConfig={{
                  pov: googleMapConfig.povConfig,
                  position: googleMapConfig.position,
                }}
                isNextPosition={isNextPosition}
                setIsNextPosition={setIsNextPosition}
              />
              <Stack direction="row" spacing={2}>
                <Typography variant="h6">
                  Heading: {Math.round(streetViewPov.pov.heading)}
                </Typography>
                <Typography variant="h6">
                  Pitch: {Math.round(streetViewPov.pov.pitch!)}
                </Typography>
                <Typography variant="h6">
                  Zoom: {Math.round(streetViewPov.zoom)}
                </Typography>
              </Stack>
            </Grid>
            <Grid item xs={4}>
              <div>Blank</div>
              {/* <BadgeShowcase />
              <UserCreditShowcase />
              <ActionPanel onNext={handleNextPosition} /> */}
            </Grid>
          </Grid>
        </Container>
      </Paper>
    </div>
  );
}

export default App;
