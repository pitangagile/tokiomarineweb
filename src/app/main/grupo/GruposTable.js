import { FuseScrollbars } from '@fuse';
import _ from '@lodash';
import { IconButton, Table, TableBody, TableCell, TablePagination, TableRow } from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';
import DeleteIcon from '@material-ui/icons/Delete';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import GruposTableHead from './GruposTableHead';

function GruposTable(props) {
    const dispatch = useDispatch();
    const corretores = useSelector(({ eCommerceApp }) => eCommerceApp.grupos.data.corretores);

    const [selected, setSelected] = useState([]);
    const [data, setData] = useState(corretores);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [order, setOrder] = useState({
        direction: 'asc',
        id: null
    });

    useEffect(() => {
        setData(corretores)
    }, [corretores]);

    function handleRequestSort(event, property) {
        const id = property;
        let direction = 'desc';

        if (order.id === property && order.direction === 'desc') {
            direction = 'asc';
        }

        setOrder({
            direction,
            id
        });
    }

    function handleChangePage(event, page) {
        setPage(page);
    }

    function handleChangeRowsPerPage(event) {
        setRowsPerPage(event.target.value);
    }

    return (
        <div className="w-full flex flex-col">

            <FuseScrollbars className="flex-grow overflow-x-auto">

                <Table className="min-w-xs border-solid border-black border-1" aria-labelledby="tableTitle">

                    <GruposTableHead
                        numSelected={selected.length}
                        order={order}
                        onRequestSort={handleRequestSort}
                        rowCount={data.length}
                    />

                    <TableBody>
                        {_.orderBy(data, [
                            (o) => {
                                switch (order.id) {
                                    case 'categories':
                                        {
                                            return o.categories[0];
                                        }
                                    default:
                                        {
                                            return o[order.id];
                                        }
                                }
                            }
                        ], [order.direction])
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map(n => {
                                const isSelected = selected.indexOf(n.id) !== -1;
                                return (
                                    <TableRow
                                        className="h-28 cursor-pointer"
                                        hover
                                        role="checkbox"
                                        aria-checked={isSelected}
                                        tabIndex={-1}
                                        key={n.id}
                                        selected={isSelected}
                                    >

                                        <TableCell component="th" scope="row" className="truncate py-0">
                                            {n.id}
                                        </TableCell>

                                        <TableCell component="th" scope="row" className="truncate py-0">
                                            {n.nome}
                                        </TableCell>

                                        <TableCell className="truncate py-0" component="th" scope="row">

                                            <IconButton className="text-red" aria-label="delete">
                                                <DeleteIcon />
                                            </IconButton>


                                        </TableCell>

                                        <TableCell component="th" scope="row" align="right" className="truncate py-0">
                                            {n.lider ?
                                                (
                                                    <IconButton className="text-green" aria-label="delete">
                                                        <CheckIcon />
                                                    </IconButton>
                                                ) :
                                                (
                                                    <IconButton className="text-red" aria-label="delete">
                                                        <CheckIcon />
                                                    </IconButton>
                                                )
                                            }
                                        </TableCell>


                                    </TableRow>
                                );
                            })}
                    </TableBody>
                </Table>
            </FuseScrollbars>

            <TablePagination
                component="div"
                count={data.length}
                rowsPerPage={rowsPerPage}
                page={page}
                backIconButtonProps={{
                    'aria-label': 'Previous Page'
                }}
                nextIconButtonProps={{
                    'aria-label': 'Next Page'
                }}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />
        </div>
    );
}

export default withRouter(GruposTable);
