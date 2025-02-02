/* eslint-disable jsx-a11y/label-has-associated-control, jsx-a11y/no-autofocus */
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { extractDataAttributes } from '../../utils/properties';

export default function SimpleCheckBox({
	describedby,
	disabled,
	id,
	isValid,
	label,
	onChange,
	onFinish,
	schema,
	value,
	index,
}) {
	const { autoFocus } = schema;
	const isDisabled = disabled || schema.disabled;

	function getDataFeature() {
		const dataFeature = schema['data-feature'];
		return dataFeature ? `${dataFeature}.${value ? 'uncheck' : 'check'}` : undefined;
	}

	function getDataChecked() {
		if (value) {
			return 2;
		}
		return 0;
	}

	return (
		<div className={classnames('checkbox', { disabled: isDisabled })}>
			<label data-feature={getDataFeature()}>
				<input
					id={`${id}${index !== undefined ? `-${index}` : ''}`}
					autoFocus={autoFocus}
					disabled={isDisabled}
					onChange={event => {
						const isChecked = event.target.checked;
						onChange(event, { schema, value: isChecked });
						onFinish(event, { schema, value: isChecked });
					}}
					type="checkbox"
					checked={value}
					data-checked={getDataChecked()}
					// eslint-disable-next-line jsx-a11y/aria-proptypes
					aria-invalid={!isValid}
					aria-describedby={describedby}
					{...extractDataAttributes(schema, index)}
				/>
				<span className="control-label" htmlFor={id}>
					{label}
				</span>
			</label>
		</div>
	);
}

if (process.env.NODE_ENV !== 'production') {
	SimpleCheckBox.propTypes = {
		describedby: PropTypes.string.isRequired,
		disabled: PropTypes.bool,
		id: PropTypes.string,
		isValid: PropTypes.bool,
		label: PropTypes.string,
		onChange: PropTypes.func.isRequired,
		onFinish: PropTypes.func.isRequired,
		schema: PropTypes.shape({
			'data-feature': PropTypes.string,
			autoFocus: PropTypes.bool,
			disabled: PropTypes.bool,
		}),
		value: PropTypes.bool,
		index: PropTypes.number,
	};
}

SimpleCheckBox.defaultProps = {
	schema: {},
	value: false,
};
