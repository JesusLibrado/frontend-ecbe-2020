import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Grid,
  makeStyles
} from '@material-ui/core';
import axios from 'axios';
import { Pagination } from '@material-ui/lab';
import Page from 'src/components/Page';
import Toolbar from './Toolbar';
import VehicleCard from './VehicleCard';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
  VehicleCard: {
    height: '100%'
  }
}));

const VehicleGrid = () => {
  const classes = useStyles();
  const [vehicles, setVehicles] = useState([]);

  const fetch = async () => {
    const res = await axios.get('http://localhost:4000/vehicle');
    setVehicles(res.data);
  };

  useEffect(() => {
    fetch();
  });

  return (
    <Page
      className={classes.root}
      title="Products"
    >
      <Container maxWidth={false}>
        <Toolbar />
        <Box mt={3}>
          <Grid
            container
            spacing={3}
          >
            {vehicles.map((vehicle) => (
              <Grid
                item
                key={vehicle.id}
                lg={4}
                md={6}
                xs={12}
              >
                <VehicleCard
                  className={classes.VehicleCard}
                  vehicle={vehicle}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
        <Box
          mt={3}
          display="flex"
          justifyContent="center"
        >
          <Pagination
            color="primary"
            count={3}
            size="small"
          />
        </Box>
      </Container>
    </Page>
  );
};

export default VehicleGrid;
