import React ,{ Component } from 'react';

export default class Loading extends Component {

    constructor(props){

        super(props);
    }

    render() {

        return (
            <div className="dialog loading-dialog">
                <span className="icon"></span>
                <p>请不要离开此页面，否则充值失败</p>
            </div>
            )
    }
}