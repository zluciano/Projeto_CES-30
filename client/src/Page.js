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
      <Link color="inherit" href="https://material-ui.com/">
        Carlos Matheus, José Luciano, Igor Bragaia, Igor Mourão, Isabelle Ferreira, Guilherme Mattos, Gabriela Barroso.
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

export default function Page(props) {
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
          {'Aqui você pode pesquisar tabelas de acordo com os 4 tipo de pesquisa a seguir:'}
        </Typography>
        <Typography variant="body1">
            <div className={classes.body}>
                {/* <Table/> */}
                <Tabs/>
            </div>
            <div className={classes.body}>
                <Typography variant="h5" component="h2" gutterBottom>
                    {'Distribuição da quantidade de alunos que atingiu cada nota no enem.'}
                    {'Os resultados estão organizados de 5 em 5 pontos.'}
                </Typography>
                <Plot/>
            </div>
            <div className={classes.body}></div>
        </Typography>
        </div>
      </Container>
      <footer className={classes.footer}>
        <Container maxWidth="md">
          <Typography variant="body1">
            Projeto CES-30
          </Typography>
          <Copyright />
        </Container>
      </footer>
    </div>
  );
}
