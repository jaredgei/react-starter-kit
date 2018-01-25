import React, {Component} from 'react';
import { Link } from 'react-router-dom';

import '../css/header.scss';

export default class Header extends Component {
    render() {
        return (
            <header><nav><ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/about">About</Link></li>
            </ul></nav></header>
        );
    }
}
