import React from 'react';

const CategoryButton = ({ category, handleCategory }) => {
	return (
		<>
			<button
				className="category-button"
				name={category}
				onClick={() => handleCategory(category)}
			>
				{category}
			</button>
		</>
	);
};

export default CategoryButton;
