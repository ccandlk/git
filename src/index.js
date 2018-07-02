import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { Router, Route, browserHistory } from 'react-router';
import Goodmanage from './component/goodmanage/spulist';
import 'antd/dist/antd.css';  // or 'antd/dist/antd.less'

ReactDOM.render( <Router history = {browserHistory} >
    <Route exact path ="/" component={App} >
      <Route path='/ordermanage/orderlist' component={Goodmanage}/>
      <Route path='/goodmanage/spulist' component={Goodmanage}/>
    </Route>
    
</Router>, document.getElementById('root'));
registerServiceWorker();
