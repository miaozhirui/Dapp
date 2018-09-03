import React from 'react';

import {Route, BrowserRouter as Router} from 'react-router-dom';

const Index = require('pages/index').default;

export default () => (
    <Router>
        <Route path="/" component={Index}></Route>
    </Router>
)