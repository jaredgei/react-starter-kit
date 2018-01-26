const { PubSub, withFilter } = require('graphql-subscriptions');

let status = {
    occupied: false,
    userid: ''
};

const messages = [{
    id: '0',
    text: 'hello',
    signature: 'John Doe'
}, {
    id: '1',
    text: 'hi John',
    signature: ''
}];
let nextId = 2;

const pubsub = new PubSub();
module.exports = {
    Query: {
        messages: () => {
            return messages;
        },
        message: (root, { id }) => {
            return messages.find(message => message.id === id);
        },
        status: () => {
            return status;
        }
    },
    Mutation: {
        addMessage: (root, args) => {
            const message = {
                id: nextId,
                text: args.text,
                signature: args.signature || ''
            };
            messages.push(message);
            nextId++;

            pubsub.publish('messageAdded', {messageAdded: message});
            return message;
        },
        enterRoom: (root, args) => {
            status = {
                occupied: true,
                userid: args.userid
            };

            setTimeout(() => {
                status = {
                    occupied: false,
                    userid: ''
                };
                pubsub.publish('statusChanged', {statusChanged: status});
            }, 5000);

            pubsub.publish('statusChanged', {statusChanged: status});
            return status;
        }
    },
    Subscription: {
        messageAdded: {
            subscribe: () => pubsub.asyncIterator(['messageAdded'])
        },
        statusChanged: {
            subscribe: () => pubsub.asyncIterator(['statusChanged'])
        }
    }
};
