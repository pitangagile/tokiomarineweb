import axios from 'axios';

export const GET_CORRETORES = '[E-COMMERCE APP] GET CORRETORES';
export const ERROR_MESSAGE_CORRETOR = '[E-COMMERCE APP] ERROR MESSAGE CORRETOR';

export function getCorretores() {
    const request = axios.get('http://localhost:3000/api/corretores');

    return (dispatch) =>
        request.then((response) => {
            const {
                data
            } = response.data;
            dispatch({
                type: GET_CORRETORES,
                payload: { data: data }
            })
        }
        ).catch(error => {
            let message = '';
            if (error.response) {
                message = 'Os dados recebidos estão corrompidos. Favor solicitar verificação ao administrador.'
            } else {
                message = 'Falha de comunicação com o servidor. Favor, tentar novamente.'
            }
            dispatch({
                type: ERROR_MESSAGE_CORRETOR,
                payload: message
            });
        });

}
