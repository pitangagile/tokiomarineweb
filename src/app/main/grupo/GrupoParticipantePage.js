import { Button, Card, CardContent, Checkbox, FormControl, FormControlLabel, TextField, Typography } from '@material-ui/core';
import InputLabel from '@material-ui/core/InputLabel';
import NativeSelect from '@material-ui/core/NativeSelect';
import { darken } from '@material-ui/core/styles/colorManipulator';
import { makeStyles } from '@material-ui/styles';
import withReducer from 'app/store/withReducer';
import clsx from 'clsx';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Actions from '../store/actions';
import reducer from '../store/reducers';
import GruposTable from './GruposTable';

const tipo = {
    DIRETO: 'direto',
    INDIRETO: 'indireto'
}

const actionType = {
    inicial: 'inicial',
    consulta: 'consulta',
    pesquisa: 'pesquisa',
    inclusao: 'inclusao',
    edicao: 'edicao'
}

const useStyles = makeStyles(theme => ({
    root: {
        background: 'linear-gradient(to right, ' + theme.palette.primary.dark + ' 0%, ' + darken(theme.palette.primary.dark, 0.5) + ' 100%)',
        color: theme.palette.primary.contrastText
    }
}));

function GrupoParticipantePage(props) {
    const dispatch = useDispatch();
    const grupo = useSelector(({ eCommerceApp }) => eCommerceApp.grupos.data);
    const action = useSelector(({ eCommerceApp }) => eCommerceApp.grupos.action);
    const error = useSelector(({ eCommerceApp }) => eCommerceApp.grupos.error);
    const [data, setData] = useState(grupo);
    const classes = useStyles();

    useEffect(() => {
        setData(grupo);
    }, [grupo, action]);


    function handleClick() {
        dispatch(Actions.atualizarGrupo(data));
        props.history.push('/corretores');
    }

    function handleConsultaClick() {
        dispatch(Actions.getGrupo(data.id));
    }

    function handleIncluirClick() {
        dispatch(Actions.newGrupo());
    }

    function handleSalvarClick() {
        dispatch(Actions.salvarGrupo(data, action));
    }

    function handleCancelarClick() {
        dispatch(Actions.cancelar());
    }

    function handleAlterarClick() {
        dispatch(Actions.editarGrupo());
    }

    const handleEventChange = (e) => setData({
        ...data,
        [e.target.name]: e.target.value
    });

    const handleCheckChange = (e) =>
        setData({
            ...data,
            [e.target.name]: e.target.checked
        });

    function handleSubmit(ev) {
        ev.preventDefault();
    }

    return (
        <div className={clsx(classes.root, "flex flex-col flex-auto flex-shrink-0 p-24 md:flex-row md:p-0")}>



            <Card className="w-full max-w-xl mx-auto m-16" square>

                <CardContent className="flex flex-col items-center justify-center p-32 md:p-48">

                    <Typography variant="h5" className="md:w-full mb-12 text-center">Programa Nosso Corretor</Typography>
                    <Typography variant="h6" className="md:w-full mb-32 text-center">Grupo Participante</Typography>

                    <form
                        name="registerForm"
                        noValidate
                        className="flex flex-col justify-center w-full"
                        onSubmit={handleSubmit}
                    >

                        <div className={"flex flex-row justify-between flex-wrap"}>

                            <TextField
                                className="mb-16"
                                label="Código"
                                autoFocus
                                type="id"
                                name="id"
                                value={data.id}
                                onChange={handleEventChange}
                                variant="outlined"
                                required
                            />

                            <TextField
                                className="mb-16 flex-grow mx-3"
                                label="Nome"
                                type="nome"
                                name="nome"
                                value={data.nome}
                                onChange={handleEventChange}
                                variant="outlined"
                                disabled={(action === actionType.consulta) || (action === actionType.pesquisa)}
                                required
                            />

                            <FormControl className="items-left mb-16">
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            name="lidermanual"
                                            checked={data.lidermanual}
                                            disabled={(action === actionType.consulta) || (action === actionType.pesquisa)}
                                            onChange={handleCheckChange} />
                                    }
                                    label="Define líder mundial"
                                />
                            </FormControl>
                        </div>


                        <div className={"flex flex-row justify-between flex-wrap"}>
                            <TextField
                                className="mb-16 flex-grow mr-3"
                                label="Diretoria"
                                type="diretoria"
                                name="diretoria"
                                value={data.diretoria}
                                disabled={(action === actionType.consulta) || (action === actionType.pesquisa)}
                                onChange={handleEventChange}
                                variant="outlined"
                                required
                            />

                            <TextField
                                className="mb-16 flex-grow"
                                label="Sucursal"
                                type="sucursal"
                                name="sucursal"
                                value={data.sucursal}
                                disabled={(action === actionType.consulta) || (action === actionType.pesquisa)}
                                onChange={handleEventChange}
                                variant="outlined"
                                required
                            />
                        </div>

                        <div className={"flex flex-row justify-between flex-wrap"}>

                            <TextField
                                className="mb-16"
                                label="Data inclusão"
                                type="dtinclusao"
                                name="dtinclusao"
                                value={moment(data.dtinclusao).format('DD/MM/YYYY')}
                                onChange={handleEventChange}
                                variant="outlined"
                                InputProps={{
                                    readOnly: true,
                                }}
                            />

                            <TextField
                                className="mb-16 mx-3"
                                label="Data alteração"
                                type="dtalteracao"
                                name="dtalteracao"
                                value={moment(data.dtalteracao).format('DD/MM/YYYY')}
                                onChange={handleEventChange}
                                variant="outlined"
                                InputProps={{
                                    readOnly: true,
                                }}
                            />

                            <TextField
                                className="mb-16 flex-grow mr-3"
                                label="Usuário"
                                type="usuario"
                                name="usuario"
                                value={data.usuario}
                                onChange={handleEventChange}
                                variant="outlined"
                                disabled={(action === actionType.consulta) || (action === actionType.pesquisa)}
                            />

                            <FormControl className="items-left">
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            name="resgate"
                                            checked={data.resgate}
                                            disabled={(action === actionType.consulta) || (action === actionType.pesquisa)}
                                            onChange={handleCheckChange} />
                                    }
                                    label="Somente resgate"
                                />
                            </FormControl>
                        </div>

                        <div className={"flex flex-row justify-between flex-wrap"}>

                            <TextField
                                className="mb-16 flex-grow mr-3"
                                label="Líder"
                                type="lider"
                                name="lider"
                                value={data.lider}
                                onChange={handleEventChange}
                                InputProps={{
                                    readOnly: true
                                }}
                                variant="outlined"
                                required
                            />

                            <FormControl className={classes.formControl}>
                                <InputLabel shrink htmlFor="tipo-native-label-placeholder">
                                    Tipo
                            </InputLabel>
                                <NativeSelect
                                    value={data.tipo}
                                    onChange={handleEventChange}
                                    disabled={(action === actionType.consulta) || (action === actionType.pesquisa)}
                                    inputProps={{
                                        name: 'tipo',
                                        id: 'tipo-native-label-placeholder'
                                    }}
                                >
                                    <option value={tipo.DIRETO}>{tipo.DIRETO}</option>
                                    <option value={tipo.INDIRETO}>{tipo.INDIRETO}</option>
                                </NativeSelect>
                            </FormControl>

                            <FormControl className="items-left ml-3">
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            name="aumentasinistralidade"
                                            disabled={(action === actionType.consulta) || (action === actionType.pesquisa)}
                                            checked={data.aumentasinistralidade}
                                            onChange={handleCheckChange} />
                                    }
                                    label="Aumenta sinistralidade"
                                />
                            </FormControl>
                        </div>

                        <GruposTable />

                        <div className="flex self-end flex-wrap">
                            <Button
                                variant="contained"
                                color="primary"
                                className="mx-auto min-w-128"
                                aria-label="Consulta"
                                type="submit"
                                disabled={action === actionType.consulta || action === actionType.pesquisa}
                                onClick={event => handleClick()}
                            >
                                Adicionar Corretores
                            </Button>
                        </div>

                        <div className={"flex flex-row justify-between flex-wrap p-24 "}>
                            <Button
                                variant="contained"
                                color="primary"
                                className="mx-auto mt-16 min-w-128"
                                aria-label="Consulta"
                                disabled={data.id === '' || data.id === undefined || data.id <= 0 || action === actionType.inclusao || action === actionType.edicao}
                                onClick={handleConsultaClick}
                                type="submit"
                            >
                                Consulta
                            </Button>
                            <Button
                                variant="contained"
                                color="primary"
                                className="mx-auto mt-16 min-w-128"
                                aria-label="Pesquisa"
                                onClick={handleConsultaClick}
                                disabled={data.id === '' || data.id === undefined || data.id <= 0 || action === actionType.inclusao || action === actionType.edicao}
                                type="submit"
                            >
                                Pesquisa
                            </Button>
                            <Button
                                variant="contained"
                                color="primary"
                                className="mx-auto mt-16 min-w-128"
                                aria-label="Incluir"
                                disabled={action === actionType.inclusao || action === actionType.edicao}
                                onClick={handleIncluirClick}
                                type="submit"
                            >
                                Incluir
                            </Button>
                            <Button
                                variant="contained"
                                color="primary"
                                className="mx-auto mt-16 min-w-128"
                                aria-label="Alterar"
                                disabled={action === actionType.inclusao || action === actionType.edicao  || action === actionType.inicial}
                                onClick={handleAlterarClick}
                                type="submit"
                            >
                                Alterar
                            </Button>
                            <Button
                                variant="contained"
                                color="primary"
                                className="mx-auto mt-16 min-w-128"
                                aria-label="Salvar"
                                disabled={action === actionType.consulta || action === actionType.pesquisa  || action === actionType.inicial}
                                type="submit"
                                onClick={handleSalvarClick}
                            >
                                Salvar
                            </Button>
                            <Button
                                variant="contained"
                                color="primary"
                                className="mx-auto mt-16 min-w-128"
                                aria-label="Cancelar"
                                disabled={action === actionType.consulta || action === actionType.pesquisa || action === actionType.inicial}
                                type="submit"
                                onClick={handleCancelarClick}
                            >
                                Cancelar
                            </Button>
                        </div>
                    </form>
                    {error && (
                        <div className="text-red-700">{error}</div>
                    )}
                </CardContent>
            </Card>

        </div>
    );
}

export default withReducer('eCommerceApp', reducer)(GrupoParticipantePage);
