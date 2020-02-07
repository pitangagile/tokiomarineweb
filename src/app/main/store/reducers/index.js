import { combineReducers } from 'redux';
import grupos from './grupos.reducer';
import corretores from './corretores.reducer';

const reducer = combineReducers({
    grupos,
    corretores
});

export default reducer;
