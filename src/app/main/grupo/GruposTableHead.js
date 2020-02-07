import { TableCell, TableHead, TableRow, TableSortLabel, Tooltip } from '@material-ui/core';
import React from 'react';

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
    },
    {
        id: 'excluir',
        align: 'left',
        disablePadding: false,
        label: 'Excluir',
        sort: false
    },
    {
        id: 'lider',
        align: 'right',
        disablePadding: false,
        label: 'Lider',
        sort: false
    }
];

function GruposTableHead(props) {
    const createSortHandler = property => event => {
        props.onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow className="h-28">
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

export default GruposTableHead;
