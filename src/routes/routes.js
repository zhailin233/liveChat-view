import React, {
	Component
} from 'react';
import {
	BrowserRouter,
	Route,
	Switch
} from 'react-router-dom';
import Login from '../containers//login/login';
import Register from '../containers/register/register.js';
import BossInfo from '../containers/bossinfo/bossinfo.js';
import Authroute from '../containers/authroute/authroute.js';
import SeekerInfo from '../containers/seekerinfo/seekerinfo.js';
import DashBoard from '../containers/dashboard/dashboard.js';
import Chat from '../containers/chat/chat.js';

class Routes extends Component {


	render() {
		return (
			<BrowserRouter>
				<div>
					<Authroute></Authroute>
					<Switch>
						<Route path='/seekerinfo' component={SeekerInfo}></Route>
						<Route path='/bossinfo' component={BossInfo}></Route>
						<Route path='/login' component={Login}></Route>
						<Route path='/register' component={Register}></Route>
						<Route path='/chat/:user' component={Chat}></Route>
						<Route component={DashBoard}></Route>
					</Switch>
				</div>
			</BrowserRouter>
		)
	}
}

export default Routes