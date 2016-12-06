import React from 'react';
import invariant from 'invariant';
import classnames from 'classnames';
import theme from './Icon.scss';

/**
 * SVG implementation is inspired by
 * http://svgicons.sparkk.fr/
 * @param {object} props react props
 * @example
<Icon name="fa-bars"></Icon>
 */
function Icon({ className, name, title }) {
	const accessibility = {
		'aria-hidden': 'true',
		title: title || null,
	};
	if (name.startsWith('fa-')) {
		const classes = classnames(
			'fa',
			name,
			className,
		);
		return (<i className={classes} {...accessibility} />);
	}
	if (name.startsWith('fa fa-') || name.startsWith('icon-')) {
		const classes = classnames(
			name,
			className,
		);
		return (<i className={classes} {...accessibility} />);
	}
	if (name) {
		const classname = classnames(
			theme['svg-icon'],
			'tc-svg-icon',
			className,
		);
		return (
			<svg className={classname} {...accessibility}>
				<use xlinkHref={`#${name}`} />
			</svg>
		);
	}
	invariant(true, 'no name provided');
}

Icon.propTypes = {
	className: React.PropTypes.string,
	name: React.PropTypes.string.isRequired,
	title: React.PropTypes.string,
};

export default Icon;
