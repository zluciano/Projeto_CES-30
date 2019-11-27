import React from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Table from './Table';
import { useState, useEffect } from "react";
import { get } from 'axios'


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      <Box p={3}>{children}</Box>
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: 840,
  },
}));

export default function FullWidthTabs() {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const [escolha, setEscolha] = React.useState('');
  
  console.log(escolha)

  const [values0, setValues0] = React.useState([[]]);
  const [names0, setNames0] = React.useState([]);
  const updateGet0 = (city) => {
    get(
      'http://localhost:3001/escolas/'+city
    )
      .then(res => {
        setValues0(res.data.rows);
        setNames0(res.data.metaData);
      });
  }
  const setEscolha0 = (event) => {
    updateGet0(event.target.value);
  }
  useEffect(() => {
    updateGet0('');
  }, []);

  const [values1, setValues1] = React.useState([[]]);
  const [names1, setNames1] = React.useState([]);

  const updateGet1 = (escola) => {
    get(
      'http://localhost:3001/escola/'+escola
    )
      .then(res => {
        setValues1(res.data.rows);
        setNames1(res.data.metaData);
      });
  }
  const setEscolha1 = (event) => {
    updateGet1(event.target.value);
  }
  useEffect(() => {
    updateGet1('');
  }, []);

  const [values2, setValues2] = React.useState([[]]);
  const [names2, setNames2] = React.useState([]);

  const updateGet2 = (ano) => {
    get(
      'http://localhost:3001/enem/ano/'+ano
    )
      .then(res => {
        setValues2(res.data.rows);
        setNames2(res.data.metaData);
      });
  }
  const setEscolha2 = (event) => {
    updateGet2(event.target.value);
  }
  useEffect(() => {
    updateGet2('');
  }, []);

  const [values3, setValues3] = React.useState([[]]);
  const [names3, setNames3] = React.useState([]);

  const updateGet3 = (escola) => {
    get(
      'http://localhost:3001/enem/escola/'+escola
    )
      .then(res => {
        setValues3(res.data.rows);
        setNames3(res.data.metaData);
      });
  }
  const setEscolha3 = (event) => {
    updateGet3(event.target.value);
  }
  useEffect(() => {
    updateGet3('');
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = index => {
    setValue(index);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          aria-label="full width tabs example"
          centered
        >
          <Tab label="Escolas por cidade" {...a11yProps(0)} />
          <Tab label="Cidade por escola" {...a11yProps(1)} />
          <Tab label="Resultados por ano" {...a11yProps(2)} />
          <Tab label="Resultados por escola" {...a11yProps(3)} />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
          <Table updateInput={setEscolha0} input_id={'prim'} values={values0} names={names0} />
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          <Table updateInput={setEscolha1} input_id={'sec'} values={values1} names={names1} />
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}>
          <Table updateInput={setEscolha2} input_id={'ter'} values={values2} names={names2} />
        </TabPanel>
        <TabPanel value={value} index={3} dir={theme.direction}>
          <Table updateInput={setEscolha3} input_id={'qua'} values={values3} names={names3} />
        </TabPanel>
      </SwipeableViews>
    </div>
  );
}
