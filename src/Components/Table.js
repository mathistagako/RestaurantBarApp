import React from 'react';
import tableOrange from './Images/table-orange.png';
import tableWhite from './Images/table-white.png';

const Table = ({ table, handleClick }) => {
	return (
		<div className="image-container">
			<img
				src={table.isOccupied ? tableOrange : tableWhite}
				alt="Table"
				width="64px"
				height="64px"
				onClick={() => handleClick(table.number)}
			/>
			<div className="text-over-image">{table.number}</div>
		</div>
	);
};

export default Table;
