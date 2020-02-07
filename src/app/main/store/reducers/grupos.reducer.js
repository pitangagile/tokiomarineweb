import * as Actions from '../actions';
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

const initialState = {
    data: {
        id: '',
        nome: '',
        lidermanual: false,
        diretoria: '',
        sucursal: '',
        dtinclusao: new Date(),
        dtalteracao: new Date(),
        usuario: '',
        resgate: false,
        lider: [],
        tipo: tipo.DIRETO,
        aumentasinistralidade: false,
        corretores: []
    },
    action: actionType.inicial,
    error: ''
};

const gruposReducer = function (state = initialState, action) {
    switch (action.type) {
        case Actions.GET_GRUPO:
            {
                return {
                    ...state,
                    data: action.payload.data,
                    action: action.payload.action,
                    error: ''
                };
            }
        case Actions.ATUALIZAR_GRUPO:
            {
                return {
                    ...state,
                    data: action.payload.data,
                    error: ''
                };
            }
        case Actions.CANCELAR_GRUPO:
        case Actions.NEW_GRUPO:
            {
                return {
                    ...state,
                    data: action.payload.data,
                    action: action.payload.action,
                    error: ''
                };
            }
        case Actions.EDIT_GRUPO:
            {
                return {
                    ...state,
                    action: action.payload.action,
                    error: ''
                };
            }
        case Actions.ERROR_MESSAGE:
            {
                return {
                    ...state,
                    error: action.payload
                };
            }
        case Actions.RESET_MESSAGE:
        case Actions.SAVE_GRUPO:
        default:
            {
                return {
                    ...state,
                    error: ''
                }
            }
    }
};

export default gruposReducer;
