import React from 'react';
import LogoNumeroUno from './Images/Cocktail-icon.png';

const Header = (props) => {
	return (
		<div className="image-container" id="icon-header">
			<img
				src={LogoNumeroUno}
				alt="LogoNumeroUno"
				height="100px"
				width="100px"
			/>
			<div className="text-over-image-right-down">
				<span
					style={{
						fontSize: '3.6vh',
						fontWeight: '600',
						color: 'rgb(255, 146, 146)',
						fontFamily: 'sans-serif',
					}}
				>
					Numero Uno
				</span>
			</div>
		</div>
	);
};

export default Header;
