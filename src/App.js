import React, {
	Component
} from 'react';
import './App.css';
import Routes from './routes/routes.js';



class App extends Component {

	render() {
		return (
			<div className="App">
				<Routes></Routes>            
      </div>
		);
	}
}

export default App;