import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import Plot from './Plot';
import Table from './Table';
import Tabs from './Tabs';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
  main: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(2),
  },
  body: {
    marginTop: '3vh',
  },
  footer: {
    padding: theme.spacing(3, 2),
    marginTop: 'auto',
    backgroundColor:
      theme.palette.type === 'dark' ? theme.palette.grey[800] : theme.palette.grey[200],
  },
}));

export default function Page() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Container component="main" className={classes.main} maxWidth="md">
          <div>
        <Typography variant="h2" component="h1" gutterBottom>
          Projeto CES-30
        </Typography>
        <Typography variant="h5" component="h2" gutterBottom>
          {'Gráfico do ENEM a respeito das escolas participantes.'}
          {' É também verificado a distribuição por municípios'}
        </Typography>
        <Typography variant="body1">
            <div className={classes.body}>
                {/* <Table/> */}
                <Tabs/>
            </div>
            <div className={classes.body}>
                <Typography variant="h5" component="h2" gutterBottom>
                    {'Gráfico do ENEM.'}
                </Typography>
                <Plot/>
            </div>
        </Typography>
        </div>
      </Container>
      <footer className={classes.footer}>
        <Container maxWidth="md">
          <Typography variant="body1">
              My sticky footer can be found here.
          </Typography>
          <Copyright />
        </Container>
      </footer>
    </div>
  );
}
