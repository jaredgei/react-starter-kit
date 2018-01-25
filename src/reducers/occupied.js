const occupied = (state = false, action) => {
    switch (action.type) {
    case 'ENTER_ROOM':
        return true;
    case 'LEAVE_ROOM':
        return false;
    default:
        return state;
    }
};

export default occupied;
