import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Input from './Input';

const useStyles = makeStyles({
  root: {
    width: '100%',
    overflowX: 'auto',
  },
  table: {
    minWidth: 650,
  },
});

function createData(name) {
  return { name };
}

/*
const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];*/

export default function SimpleTable(props) {
  const defau = createData('');
  const classes = useStyles();
  const rows = props.values ? props.values : [[''],[''],['']];
  const titles = props.names[0] !== undefined ? props.names : [defau, defau];
  return (
      <div>
          <Input nome={props.input_id} change_input={props.updateInput}/>
            <Paper className={classes.root}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                <TableRow>
                    {titles.map(title => (
                      <TableCell>{title.name}</TableCell>
                    ))}
                </TableRow>
                </TableHead>
                <TableBody>
                {rows.map(row => (
                    <TableRow key={row[0]}>
                    
                    {row.map(col => (
                      <TableCell align="left">{col}</TableCell>
                    ))}
                    {
                      /*<TableCell align="right">{row[0]}</TableCell>
                    <TableCell align="right">{row[1]}</TableCell>
                    <TableCell align="right">{row[2]}</TableCell>*/
                    }
                    {
                      //<TableCell align="right">{row.protein}</TableCell>
                    }
                    </TableRow>
                ))}
                </TableBody>
            </Table>
            </Paper>
      </div>
  );
}
