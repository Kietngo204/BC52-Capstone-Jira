import { useQuery } from "@tanstack/react-query";
import React from "react";
import { getUser } from "../../../apis/userAPI";
import Loading from "../../../components/Loading";
import {
  Avatar,
  Box,
  Button,
  Chip,
  Fab,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Tooltip,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import {
  StyledTableCell,
  StyledTableRow,
} from "../../../components/styled/styledTable";

import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { TablePaginationActions } from "../../../components/TablePaginationActions/TablePaginationActions";

export default function UserManageMentDesktop() {
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [page, setPage] = React.useState(0);

  const { data: users = [], isLoading } = useQuery({
    queryKey: ["getUserManagementDesktop"],
    queryFn: getUser,
  });

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - users.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  console.log(users);
  if (isLoading) {
    return <Loading />;
  }
  return (
    <>
      <Box height={10} />
      <Box display={"flex"} justifyContent={"right"} mb={2}>
        <Box
          sx={{
            width: 500,
            maxWidth: "100%",
            marginRight: "16px",
            display: "flex",
          }}
          component="form"
          noValidate
          autoComplete="off"
          //   onSubmit={handleSubmit}
        >
          <TextField
            fullWidth
            label="Search Name"
            color="secondary"
            // value={searchQuery}
            // onChange={handleChangeValue}
          />
          <Button variant="contained" color="info" type="submit">
            <SearchIcon />
          </Button>
        </Box>
        <Button variant="contained" color="secondary">
          Create User
        </Button>
      </Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
          <TableHead>
            <StyledTableRow>
              <StyledTableCell
                component="th"
                scope="row"
                sx={{
                  width: "20%",
                  cursor: "pointer",
                  transition: "all 0.5s",
                  "&:hover": { backgroundColor: "#000000c0 !important" },
                }}
              >
                User Name
              </StyledTableCell>
              <StyledTableCell component="th" scope="row" sx={{ width: "20%" }}>
                Email
              </StyledTableCell>
              <StyledTableCell component="th" scope="row" sx={{ width: "20%" }}>
                User Id
              </StyledTableCell>
              <StyledTableCell component="th" scope="row" sx={{ width: "20%" }}>
                Phone Number
              </StyledTableCell>
              <StyledTableCell component="th" scope="row" sx={{ width: "20%" }}>
                Action
              </StyledTableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? users.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
              : users
            ).map((user) => (
              <StyledTableRow key={user.userId}>
                <StyledTableCell>{user.name}</StyledTableCell>
                <StyledTableCell>{user.email}</StyledTableCell>
                <StyledTableCell>{user.userId}</StyledTableCell>
                <StyledTableCell>{user.phoneNumber}</StyledTableCell>
                <StyledTableCell>
                  <Box>
                    <IconButton aria-label="update" size="large">
                      <EditOutlinedIcon fontSize="inherit" color="primary" />
                    </IconButton>
                    <IconButton aria-label="delete" size="large">
                      <DeleteOutlineOutlinedIcon
                        fontSize="inherit"
                        color="error"
                      />
                    </IconButton>
                  </Box>
                </StyledTableCell>
              </StyledTableRow>
            ))}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <StyledTableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                colSpan={6}
                count={users.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: {
                    "aria-label": "rows per page",
                  },
                  native: true,
                }}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </>
  );
}
