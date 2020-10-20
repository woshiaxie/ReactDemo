import React from 'react';
import ReactDOM from 'react-dom';
import Comment from './component/comment/index'
import './css/index.css';

class Root extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            now: new Date().toLocaleTimeString()
        }

    }

    componentDidMount() {

    }

    componentWillUnmount() {
        clearInterval(this.interval)
    }

    render() {
        let content = <div className='root'>
            <Comment/>
        </div>
        return content;
    }
}


ReactDOM.render(<Root/>, document.getElementById('root')
);
