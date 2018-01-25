import { combineReducers } from 'redux';

import Messages from './messages';
import Occupied from './occupied';

export default combineReducers({
    occupied: Occupied,
    messages: Messages
});
