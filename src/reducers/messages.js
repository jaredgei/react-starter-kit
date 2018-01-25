const messages = (state = [], action) => {
    switch (action.type) {
    case 'POST_MESSAGE':
        return [action.message, ...state];
    default:
        return state;
    }
};

export default messages;
