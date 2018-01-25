export function postMessage(message) {
    return {
        type: 'POST_MESSAGE',
        message
    };
}
