import React, {useEffect, useState} from "react";
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

export default function CustomizedTables({data, activeType}) {

  const [finalData, setfinalData] = useState([]);

  useEffect(() => {
    const result = data.filter(val=> activeType === 'All' ? true : val.revenue_type.split('-')[1] === activeType);
    console.log(result.length)
    setfinalData(result);
  }, [data, activeType])
  

  return (
    <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>S No.</StyledTableCell>
            <StyledTableCell align="right">Line of Business</StyledTableCell>
            <StyledTableCell align="right">Revenue Type</StyledTableCell>
            <StyledTableCell align="right">Product</StyledTableCell>
            <StyledTableCell align="right">Year</StyledTableCell>
            <StyledTableCell align="right">Month</StyledTableCell>
            <StyledTableCell align="right">ACV</StyledTableCell>
            <StyledTableCell align="right">TCV</StyledTableCell>
            <StyledTableCell align="right">Revenue</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {finalData.map((row) => (
            <StyledTableRow key={row.S_no}>
              <StyledTableCell component="th" scope="row"> {row.S_no}</StyledTableCell>
              <StyledTableCell align="right">{row.line_of_business}</StyledTableCell>
              <StyledTableCell align="right">{row.revenue_type}</StyledTableCell>
              <StyledTableCell align="right">{row.product}</StyledTableCell>
              <StyledTableCell align="right">{row.year}</StyledTableCell>
              <StyledTableCell align="right">{row.month}</StyledTableCell>
              <StyledTableCell align="right">{row.acv}</StyledTableCell>
              <StyledTableCell align="right">{row.tcv}</StyledTableCell>
              <StyledTableCell align="right">${row.revenue}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}