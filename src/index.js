import React from 'react';
import ReactDom from 'react-dom';
import Router from './router/router';
import './common/less/public.less';



ReactDom.render(
    <Router></Router>,
    document.getElementById('app') 
    )


