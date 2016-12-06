import React, { PropTypes } from 'react';
import { Button } from 'react-bootstrap';
import Icon from '../../Icon';

const TITLE_MODE_TEXT = 'text';
const TITLE_MODE_INPUT = 'input';

const ESC_KEY = 27;
const ENTER_KEY = 13;

function renderButton({ id, value, className, item, onClick }) {
	const click = (event) => {
		event.stopPropagation();
		onClick(event, item);
	};

	return (
		<Button id={id} className={className} onClick={click} role="link" bsStyle="link">
			{value}
		</Button>
	);
}
renderButton.propTypes = {
	id: PropTypes.string,
	value: PropTypes.string,
	className: PropTypes.string,
	item: PropTypes.object, // eslint-disable-line react/forbid-prop-types
	onClick: PropTypes.func,
};

function renderText({ id, value, className }) {
	return (<span id={id} className={className}>{value}</span>);
}
renderText.propTypes = {
	id: PropTypes.string,
	value: PropTypes.string,
	className: PropTypes.string,
};

class TitleInput extends React.Component {
	constructor(props) {
		super(props);
		this.onKeyUp = this.onKeyUp.bind(this);
		this.submit = this.submit.bind(this);
	}

	componentDidMount() {
		this.titleInput.value = this.props.value;
	}

	onKeyUp(event) {
		switch (event.keyCode) {
		case ESC_KEY:
			this.cancel(event);
			break;
		case ENTER_KEY:
			this.submit(event);
			break;
		default:
			break;
		}
	}

	cancel(event) {
		return this.props.onEditCancel(event, this.props.item);
	}

	submit(event) {
		return this.props.onEditSubmit(event, {
			value: event.target.value,
			model: this.props.item,
		});
	}

	render() {
		return (<input
			id={this.props.id}
			ref={(input) => { this.titleInput = input; }}
			onKeyUp={this.onKeyUp}
			onBlur={this.submit}
			autoFocus
		/>);
	}
}
TitleInput.propTypes = {
	id: PropTypes.string,
	value: PropTypes.string,
	item: PropTypes.object, // eslint-disable-line react/forbid-prop-types
	onEditSubmit: PropTypes.func,
	onEditCancel: PropTypes.func,
};

/**
 * Item title component
 * @param {string} className the title class name
 * @param {object} item the item from list
 * @param {object} titleProps title configuration props
 * @example
const props = {
	className: 'my-title',
	item: item,
	titleProps: {
		key: 'name',                        // item.name is the title value
		iconKey: 'icon',                    // item.icon is the icon
		displayModeKey: 'display',          // item.display ('text' | 'input') set the display mode
		onClick: (event, item) => {},       // title click callback
		onEditSubmit: (event, item) => {},    // input mode validation callback
		onEditCancel: (event, item) => {},      // input mode cancellation callback
	}
}
<ItemTitle {...props} />
 */
function ItemTitle({ id, className, item, titleProps }) {
	const {
		key,
		iconKey,
		displayModeKey,
		onClick,
		onEditSubmit,
		onEditCancel,
	} = titleProps;
	const value = item[key];
	const displayMode = (displayModeKey && item[displayModeKey]) || TITLE_MODE_TEXT;
	const iconName = iconKey && item[iconKey];
	const icon = iconName ? <Icon className="tc-list-icon" name={iconName} /> : null;

	let titleElement = null;
	if (displayMode === TITLE_MODE_TEXT) {
		titleElement = onClick ?
			renderButton({ id, value, className, item, onClick }) :
			renderText({ id, value, className });
	} else if (displayMode === TITLE_MODE_INPUT) {
		const props = { id, value, item, onEditSubmit, onEditCancel };
		titleElement = <TitleInput {...props} />;
	}

	const style = { display: 'inline' };
	return (
		<div style={style}>
			{icon}
			{titleElement}
		</div>
	);
}

ItemTitle.propTypes = {
	id: PropTypes.string,
	className: PropTypes.string,
	item: PropTypes.object, // eslint-disable-line react/forbid-prop-types
	titleProps: PropTypes.shape({
		key: PropTypes.string,
		iconKey: PropTypes.string,
		displayModeKey: PropTypes.string,
		onClick: PropTypes.func,
		onEditSubmit: PropTypes.func,
		onEditCancel: PropTypes.func,
	}).isRequired,
};

export default ItemTitle;
