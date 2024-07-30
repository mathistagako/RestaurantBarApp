import React, { useContext, useState } from 'react';
import AddOrder from './Components/AddOrder';
import Header from './Components/Header';
import ListTables from './Components/ListTables';
import { AppContext, AppProvider } from './Context/AppContext';

const App = () => {
	return (
		<AppProvider>
			<div className="container">
				<Header header="Numero uno" />
				<ListTables />
			</div>
		</AppProvider>
	);
};

export default App;
