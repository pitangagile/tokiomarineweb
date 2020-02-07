import axios from 'axios';

export const GET_GRUPO = '[E-COMMERCE APP] GET GRUPO';
export const EDIT_GRUPO = '[E-COMMERCE APP] EDIT GRUPO';
export const CANCELAR_GRUPO = '[E-COMMERCE APP] CANCELAR GRUPO';
export const NEW_GRUPO = '[E-COMMERCE APP] NEW GRUPO';
export const SAVE_GRUPO = '[E-COMMERCE APP] SAVE GRUPO';
export const ATUALIZAR_GRUPO = '[E-COMMERCE APP] ATUALIZAR GRUPO';
export const MODIFICA_USUARIO = '[E-COMMERCE APP] MODIFICA USUARIO';
export const RESET_MESSAGE = '[E-COMMERCE APP] RESET MESSAGE';
export const ERROR_MESSAGE = '[E-COMMERCE APP] ERROR MESSAGE';
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

export function getGrupo(codigo) {
    const request = axios.get('http://localhost:3000/api/grupos/' + codigo);

    return (dispatch) =>
        request.then((response) => {
            const {
                data
            } = response.data;
            const result = { ...data, corretores: [] } // enquanto n tiver correto o retorno
            dispatch({
                type: GET_GRUPO,
                payload: { data: result, action: actionType.consulta }
            })
        }
        ).catch(error => {
            let message = '';
            if (error.response) {
                message = 'O grupo informado não existe na base de dados.'
            } else {
                message = 'Falha de comunicação com o servidor. Favor, tentar novamente.'
            }
            dispatch({
                type: ERROR_MESSAGE,
                payload: message
            });
        });

}

export function newGrupo() {

    const data = {
        id: '',
        nome: '',
        lidermanual: false,
        diretoria: '',
        sucursal: '',
        dtinclusao: new Date(),
        dtalteracao: new Date(),
        usuario: '',
        resgate: false,
        lider: '',
        tipo: tipo.DIRETO,
        aumentasinistralidade: false,
        corretores: []
    };

    return (dispatch) => dispatch({
        type: NEW_GRUPO,
        payload: { data, action: actionType.inclusao }
    })

}

export function atualizarGrupo(grupo) {

    return (dispatch) => dispatch({
        type: ATUALIZAR_GRUPO,
        payload: { data: grupo }
    })

}

export function editarGrupo(gupo) {

    return (dispatch) => dispatch({
        type: EDIT_GRUPO,
        payload: { action: actionType.edicao }
    })

}


export function cancelar() {


    const data = {
        id: '',
        nome: '',
        lidermanual: false,
        diretoria: '',
        sucursal: '',
        dtinclusao: new Date(),
        dtalteracao: new Date(),
        usuario: '',
        resgate: false,
        lider: '',
        tipo: tipo.DIRETO,
        aumentasinistralidade: false,
        corretores: []
    };

    return (dispatch) => dispatch({
        type: CANCELAR_GRUPO,
        payload: { data, action: actionType.inicial }
    })

}

export function salvarGrupo(grupo, action) {

    const request = action === actionType.inclusao ? axios.post('http://localhost:3000/api/grupos', grupo) : axios.put('http://localhost:3000/api/grupos', grupo);

    alert(action)

    return (dispatch) =>
        request.then((response) => {
            dispatch({
                type: SAVE_GRUPO,
                payload: { data: grupo, action: actionType.consulta }
            })
        }
        ).catch(error => {
            let message = '';
            if (error.response) {
                message = 'Erro ao salvar o grupo na base de dados.'
            } else {
                message = 'Falha de comunicação com o servidor. Favor, tentar novamente.'
            }
            dispatch({
                type: ERROR_MESSAGE,
                payload: message
            });
        });

}

export function resetMessage() {

    return (dispatch) => dispatch({
        type: RESET_MESSAGE
    })

    /*return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : GET_PRODUCTS,
                payload: response.data
            })
        );*/

}


