import React from 'react';
import { connect } from 'react-redux';
import { enterRoom } from '../actions/occupied';

import '../css/home.scss';

const mapStateToProps = store => {
    return {
        occupied: store.occupied
    };
};

const mapDispatchToProps = dispatch => {
    return {
        enterRoom: () => dispatch(enterRoom())
    };
};

class Home extends React.Component {
    componentDidMount() {
        setTimeout(() => {
            this.props.enterRoom();
        }, 5000);
    }

    render() {
        return (
            <div className="container home">
                <h1>Home {this.props.occupied + ''}</h1>
                <img className='image' src={'/static/images/bathroom.svg'} />
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home);
