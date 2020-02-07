import { FuseScrollbars } from '@fuse';
import _ from '@lodash';
import { Checkbox, Table, TableBody, TableCell, TablePagination, TableRow, Button } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as Actions from '../store/actions';
import CorretorTableHead from './CorretorTableHead';

function CorretorTable(props) {
    const dispatch = useDispatch();
    const corretores = useSelector(({ eCommerceApp }) => eCommerceApp.corretores.data);
    const grupo = useSelector(({ eCommerceApp }) => eCommerceApp.grupos.data);
    const error = useSelector(({ eCommerceApp }) => eCommerceApp.corretores.error);

    const [selected, setSelected] = useState([]);
    const [data, setData] = useState(corretores);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [order, setOrder] = useState({
        direction: 'asc',
        id: null
    });

    useEffect(() => {
        dispatch(Actions.getCorretores());
    }, [dispatch]);

    useEffect(() => {
        setData(corretores)
    }, [corretores, grupo]);

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

    function handleCheck(event, id) {
        const selectedIndex = selected.indexOf(id);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
        }
        else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        }
        else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        }
        else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1)
            );
        }

        setSelected(newSelected);
    }

    function isFormValid() {
        return (
            selected.length > 0
        );
    }

    function handleSelectAllClick(event) {
        if (event.target.checked) {
            setSelected(data.map(n => n.id));
            return;
        }
        setSelected([]);
    }

    function handleClick() {
        props.history.goBack();
    }

    function handleSalvarClick() {
        const selecteds = corretores.filter(item => selected.indexOf(item.id) !== -1);
        grupo.corretores = selecteds;
        dispatch(Actions.atualizarGrupo(grupo));
        props.history.goBack();
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

                    <CorretorTableHead
                        numSelected={selected.length}
                        order={order}
                        onSelectAllClick={handleSelectAllClick}
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
                                        <TableCell className="w-48 px-4 sm:px-12" padding="checkbox">
                                            <Checkbox
                                                checked={isSelected}
                                                onClick={event => event.stopPropagation()}
                                                onChange={event => handleCheck(event, n.id)}
                                            />
                                        </TableCell>

                                        <TableCell component="th" scope="row" className="truncate py-0">
                                            {n.id}
                                        </TableCell>

                                        <TableCell component="th" scope="row" className="truncate py-0">
                                            {n.nome}
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
            <div className={"flex self-end flex-wrap"}>
                <Button
                    variant="contained"
                    color="primary"
                    className="mx-auto mr-16 mt-16 min-w-128"
                    aria-label="Salvar"
                    disabled={!isFormValid()}
                    onClick={event => handleSalvarClick()}
                    type="submit"
                >
                    Salvar
                            </Button>
                <Button
                    variant="contained"
                    color="primary"
                    className="mx-auto mt-16 min-w-128"
                    aria-label="Voltar"
                    type="button"
                    onClick={event => handleClick()}
                >
                    Voltar
                            </Button>
            </div>
            {error && (
                <div className="text-red-700 text-center mt-10">{error}</div>
            )}
        </div>
    );
}

export default withRouter(CorretorTable);
