import {combineReducers} from "redux";

import counter from 'reducers/counter';
import userInfo from 'reducers/userInfo';
import login from 'reducers/login';
import productlist from 'reducers/productlist';
import product from 'reducers/product';
import register from 'reducers/register';
import mycart from 'reducers/mycart';
import myaccount from 'reducers/myaccount';
import forgotpwd from 'reducers/forgotpwd';
import myorder from 'reducers/myorder';
import withdrawal from 'reducers/withdrawal';

export default combineReducers({
    counter,
    userInfo,
    login,
    productlist,
    product,
    register,
    mycart,
    myaccount,
    forgotpwd,
    myorder,
    withdrawal 
});