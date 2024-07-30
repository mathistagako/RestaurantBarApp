import update from 'immutability-helper';
import React, { createContext, useReducer } from 'react';
import Data from '../Components/Data';

const initialState = Data;

const AppReducer = (state, action) => {
	switch (action.type) {
		case 'ADD_PRODUCT':
			return update(state, {
				tables: {
					[action.tableNumber - 1]: {
						order: { $push: [action.order] },
					},
				},
			});

		case 'DELETE_PRODUCT':
			const array = state.tables[action.tableNumber - 1].order.filter(
				(order) => order.id !== action.id
			);

			return update(state, {
				tables: {
					[action.tableNumber - 1]: {
						order: { $set: array },
					},
				},
			});

		case 'SET_TABLE_OCCUPIED':
			return update(state, {
				tables: {
					[action.tableNumber - 1]: {
						isOccupied: { $set: action.state },
					},
				},
			});

		case 'RESET_ORDER':
			return update(state, {
				tables: {
					[action.tableNumber - 1]: {
						order: { $set: [] },
					},
				},
			});

		case 'SET_TABLES':
			return update(state, {
				tables: { $set: action.tables },
			});

		default:
			return state;
	}
};

export const AppContext = createContext();

export const AppProvider = (props) => {
	const [state, dispatch] = useReducer(AppReducer, initialState);

	return (
		<AppContext.Provider
			value={{
				tables: state.tables,
				categories: state.categories,
				dispatch,
			}}
		>
			{props.children}
		</AppContext.Provider>
	);
};
