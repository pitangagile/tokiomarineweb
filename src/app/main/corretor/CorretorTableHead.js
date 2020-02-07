import { Checkbox, Icon, IconButton, ListItemIcon, ListItemText, Menu, MenuItem, MenuList, TableCell, TableHead, TableRow, TableSortLabel, Tooltip } from '@material-ui/core';
import React, { useState } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';

const rows = [
    {
        id: 'id',
        align: 'left',
        disablePadding: false,
        label: 'Código',
        sort: true
    },
    {
        id: 'nome',
        align: 'left',
        disablePadding: false,
        label: 'Nome',
        sort: true
    }
];

const useStyles = makeStyles(theme => ({
    actionsButtonWrapper: {
        background: theme.palette.background.paper
    }
}));

function CorretorTableHead(props) {
    const createSortHandler = property => event => {
        props.onRequestSort(event, property);
    };

    const classes = useStyles(props);
    const [selectedProductsMenu, setSelectedProductsMenu] = useState(null);

    function openSelectedProductsMenu(event) {
        setSelectedProductsMenu(event.currentTarget);
    }

    function closeSelectedProductsMenu() {
        setSelectedProductsMenu(null);
    }
    return (
        <TableHead>
            <TableRow className="h-28">
                <TableCell padding="checkbox" className="relative pl-4 sm:pl-12">
                    <Checkbox
                        indeterminate={props.numSelected > 0 && props.numSelected < props.rowCount}
                        checked={props.numSelected === props.rowCount}
                        onChange={props.onSelectAllClick}
                    />

                </TableCell>
                {rows.map(row => {
                    return (
                        <TableCell
                            key={row.id}
                            align={row.align}
                            padding={row.disablePadding ? 'none' : 'default'}
                            sortDirection={props.order.id === row.id ? props.order.direction : false}
                        >
                            {row.label}
                            {row.sort && (
                                <Tooltip
                                    title="Sort"
                                    placement={row.align === "right" ? 'bottom-end' : 'bottom-start'}
                                    enterDelay={300}
                                >
                                    <TableSortLabel
                                        active={props.order.id === row.id}
                                        direction={props.order.direction}
                                        onClick={createSortHandler(row.id)}
                                    >
                                    </TableSortLabel>
                                </Tooltip>
                            )}
                        </TableCell>
                    );
                }, this)}
            </TableRow>
        </TableHead>
    );
}

export default CorretorTableHead;
