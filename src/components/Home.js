import React from 'react';
import PropTypes from 'prop-types';
import {
    compose,
    graphql
} from 'react-apollo';
import gql from 'graphql-tag';
import '../css/home.scss';

const getStatusQuery = gql`
    query statusQuery {
        status {
            occupied,
            userid
        }
    }
`;

const enterRoomMutation = gql`
    mutation enterRoom($userid: String!) {
        enterRoom(userid: $userid) {
            occupied,
            userid
        }
    }
`;

const statusSubscription = gql`
    subscription statusChanged {
        statusChanged {
            occupied,
            userid
        }
    }
`;

class Home extends React.Component {
    static propTypes = {
        data: PropTypes.shape({
            loading: PropTypes.bool,
            error: PropTypes.object,
            status: PropTypes.object
        }).isRequired,
        mutate: PropTypes.func.isRequired
    };

    componentDidMount() {
        const { mutate } = this.props;
        this.props.data.subscribeToMore({
            document: statusSubscription,
            updateQuery: (prev, {subscriptionData}) => {
                if (!subscriptionData.data) {
                    return prev;
                }

                return Object.assign({}, prev, {
                    status: subscriptionData.data.statusChanged
                });
            }
        });
        setTimeout(() => {
            mutate({
                variables: {userid: 'anon'}
            });
        }, 5000);
    }

    render() {
        const {
            loading,
            error,
            status
        } = this.props.data;

        let title;
        if (loading) {
            title = 'Loading...';
        } else if (error) {
            title = error.message;
        } else {
            title = status.occupied + '';
        }

        return (
            <div className="container home">
                <h1>Home {title}</h1>
                <img className='image' src={'/static/images/bathroom.svg'} />
            </div>
        );
    }
}

export default compose(
    graphql(getStatusQuery),
    graphql(enterRoomMutation)
)(Home);
