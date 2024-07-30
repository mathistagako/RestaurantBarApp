import React, { useEffect, useState } from 'react';
import { BsFillTrashFill } from 'react-icons/bs';
import CategoryButton from './CategoryButton';

const AddOrder = ({
	table,
	categories,
	handleGoBack,
	handleChange,
	handleDeleteOrder,
	handleSubmit,
}) => {
	const [selectedCategory, setSelectedCategory] = useState('');

	const createListCategories = (data) => {
		const array = data.map((category) => category.Category);
		const noDup = [...new Set(array)];
		return noDup;
	};

	const handleCategory = (name) => {
		setSelectedCategory(name);
	};

	return (
		<div className="ordering-container">
			<div className="buttons-section">
				<button className="trasmit-button" onClick={() => handleSubmit(table)}>
					Transmit
				</button>
				<span className="table-number">Table: {table.number}</span>
				<button className="go-back-button" onClick={handleGoBack}>
					Go back
				</button>
			</div>
			<div className="order-recap">
				<div className="table-header">
					<span>Products</span>
					<span>QTY</span>
					<span>Total</span>
				</div>
				<div className="table-order">
					{table.order.map((order, i) => (
						<>
							<span>{order.product}</span>
							<span>{order.quantity}</span>
							<span>
								{order.price} €
								<BsFillTrashFill
									style={{ float: 'right', marginTop: '2%' }}
									onClick={() => handleDeleteOrder(order.id, table.number)}
								/>
							</span>
						</>
					))}
				</div>
			</div>
			<div className="category-products">
				<span>
					{categories.map((category, i) =>
						selectedCategory === category.Category ? (
							<div
								key={i}
								onClick={() => handleChange(category.name, category.price)}
							>
								<span style={{ float: 'left' }}>{category.name}</span>
								<span style={{ float: 'right' }}>{category.price} €</span>
								<br />
							</div>
						) : null
					)}
				</span>
			</div>
			<div className="categories-section">
				{createListCategories(categories).map((category) => (
					<CategoryButton category={category} handleCategory={handleCategory} />
				))}
			</div>
		</div>
	);
};

export default AddOrder;
