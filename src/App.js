import React, {
	Component
} from 'react';
import './App.css';
import { Provider } from 'react-redux';
import Routes from './routes/routes.js';
import configStore from './store/store'

const store = configStore();
class App extends Component {

	render() {
		return (
			<div className="App">
				<Provider store={store}>
					<Routes></Routes>            
				</Provider>
      </div>
		);  
	}
}

export default App;