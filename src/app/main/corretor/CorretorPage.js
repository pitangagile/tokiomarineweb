import { Card, CardContent, Typography } from '@material-ui/core';
import { darken } from '@material-ui/core/styles/colorManipulator';
import { makeStyles } from '@material-ui/styles';
import withReducer from 'app/store/withReducer';
import clsx from 'clsx';
import React from 'react';
import reducer from '../store/reducers';
import CorretorTable from './CorretorTable';

const useStyles = makeStyles(theme => ({
    root: {
        background: 'linear-gradient(to right, ' + theme.palette.primary.dark + ' 0%, ' + darken(theme.palette.primary.dark, 0.5) + ' 100%)',
        color: theme.palette.primary.contrastText
    }
}));

function CorretorPage(props) {
    const classes = useStyles();

    return (
        <div className={clsx(classes.root, "flex flex-col flex-auto flex-shrink-0 p-24 md:flex-row md:p-0")}>



            <Card className="w-full max-w-xl mx-auto m-16" square>

                <CardContent className="flex flex-col items-center justify-center p-32 md:p-48">

                    <Typography variant="h5" className="md:w-full mb-12 text-center">Programa Nosso Corretor</Typography>
                    <Typography variant="h6" className="md:w-full mb-32 text-center">Corretores</Typography>                

                        <CorretorTable />

                    
                </CardContent>
            </Card>

        </div>
    );
}

export default withReducer('eCommerceApp', reducer)(CorretorPage);
