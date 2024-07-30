import { nanoid } from 'nanoid';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { AppContext } from '../Context/AppContext';
import AddOrder from './AddOrder';
import Alert from './Notification';
import Table from './Table';

const ListTables = () => {
	const { tables } = useContext(AppContext);
	const { categories } = useContext(AppContext);
	const { dispatch } = useContext(AppContext);

	const [isOrdering, setIsOrdering] = useState(false);
	const [tableNumber, setTableNumber] = useState(0);
	const [selectedTable, setSelectedTable] = useState({});
	const [isNotificationOpen, setNotificationOpen] = useState(false);
	const [allTables, setAllTables] = useState(tables);
	const [isTransmitting, setIsTransmitting] = useState(false);
	const [preBackState, setPreBackState] = useState([]);

	useEffect(() => {
		setSelectedTable(tables[tableNumber - 1]);
		setAllTables(tables);
		setPreBackState(tables);
	}, [tables, tableNumber]);

	const handleSubmit = () => {
		setNotificationOpen(true);
	};

	const handleConfirm = (table) => {
		if (table.order.length > 0) {
			dispatch({
				type: 'SET_TABLE_OCCUPIED',
				tableNumber: tableNumber,
				state: true,
			});
		} else {
			dispatch({
				type: 'SET_TABLE_OCCUPIED',
				tableNumber: tableNumber,
				state: false,
			});
		}
		setIsTransmitting(true);
	};

	const handleTransmitting = () => {
		setTimeout(function () {
			setIsTransmitting(false);
			setIsOrdering(false);
			setNotificationOpen(false);
			setPreBackState(tables);
		}, 1000);

		// let totalPrice = 0;
		// console.log('Table: ', selectedTable.number);
		// selectedTable.order.map((order) =>
		// 	console.log(order.product, order.price, 1)((totalPrice += order.price))
		// );
		// console.log('Total price: ', totalPrice);
	};

	const handleDeny = () => {
		setNotificationOpen(false);
	};

	const handleClick = (number) => {
		setTableNumber(number);
		setIsOrdering(true);
		setSelectedTable(tables[number - 1]);
	};

	const handleChange = (product, price) => {
		const order = {
			id: nanoid(),
			product: product,
			price: price,
			quantity: 1,
		};

		dispatch({
			type: 'ADD_PRODUCT',
			tableNumber: tableNumber,
			order: order,
		});
	};

	const handleDeleteOrder = (id, table) => {
		dispatch({
			type: 'DELETE_PRODUCT',
			tableNumber: table,
			id: id,
		});
	};

	const handleGoBack = () => {
		setIsOrdering(false);
		const sessionStorageTables = preBackState;

		dispatch({
			type: 'SET_TABLES',
			tables: sessionStorageTables,
		});
	};

	return (
		<div>
			{!isOrdering ? (
				<div className="table-list">
					{tables.map((table) => (
						<Table table={table} handleClick={handleClick} />
					))}
				</div>
			) : (
				<>
					<AddOrder
						table={selectedTable}
						categories={categories}
						handleGoBack={handleGoBack}
						handleChange={handleChange}
						handleDeleteOrder={handleDeleteOrder}
						handleSubmit={handleSubmit}
					/>
					{isNotificationOpen ? (
						<Alert
							handleConfirm={handleConfirm}
							handleDeny={handleDeny}
							isNotificationOpen={isNotificationOpen}
							table={selectedTable}
							handleTransmitting={handleTransmitting}
							isTransmitting={isTransmitting}
						/>
					) : null}
				</>
			)}
		</div>
	);
};

export default ListTables;
