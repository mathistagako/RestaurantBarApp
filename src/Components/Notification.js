import React, { useEffect } from 'react';
import loading from './Images/loading.gif';

const Alert = ({
	handleConfirm,
	handleDeny,
	isNotificationOpen,
	table,
	handleTransmitting,
	isTransmitting,
}) => {
	const countOrder = table.order.length;

	useEffect(() => {
		if (isTransmitting) {
			handleTransmitting();
		}
	}, [isTransmitting]);

	return (
		<div className="pop-up-container">
			{!isTransmitting ? (
				<>
					<h1 className="pop-up-title">Transmit order?</h1>
					<div className="pop-up-order">Order: {countOrder}</div>
					<button className="pop-up-deny" onClick={handleDeny}>
						No
					</button>
					<button
						className="pop-up-confirm"
						onClick={() => handleConfirm(table)}
					>
						Yes
					</button>
				</>
			) : (
				<>
					<h1
						className="pop-up-title"
						style={{ fontSize: '20px', marginBottom: '2px' }}
					>
						Transmitting...
					</h1>
					<img
						className="loading"
						src={loading}
						alt="loading..."
						width={50}
						height={50}
					/>
				</>
			)}
		</div>
	);
};

export default Alert;
