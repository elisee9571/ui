import { useEffect, useMemo, useRef, useState } from 'react';

import classnames from 'classnames';
import debounce from 'lodash/debounce';
import omit from 'lodash/omit';
import PropTypes from 'prop-types';

import Icon from '../../Icon';
import getDefaultT from '../../translate';
import DateTimeRange from '../DateTimeRange';
import { DateTimeRangeContext } from '../DateTimeRange/Context';
import InputDateTimePicker from '../InputDateTimePicker';

import theme from './InputDateTimeRangePicker.module.scss';

const PROPS_TO_OMIT_FOR_INPUT = [
	'id',
	'dateFormat',
	'onBlur',
	'onChange',
	'startDateTime',
	'endDateTime',
	'isDisabledChecker',
];

function InputDateTimeRangePicker(props) {
	const { id, dateFormat, useSeconds, onChange, onBlur, inline } = props;
	const inputProps = omit(props, PROPS_TO_OMIT_FOR_INPUT);

	const [vertical, setVertical] = useState(false);
	const containerRef = useRef();

	const isDisplayInline = !!inline;

	const className = classnames({
		'range-picker': !vertical,
		[theme['range-picker']]: !vertical,
		'range-picker-vertical': vertical && !isDisplayInline,
		[theme['range-picker-vertical']]: vertical && !isDisplayInline,
		'date-time-range-picker-inline': isDisplayInline,
		[theme['date-time-range-picker-inline']]: isDisplayInline,
	});

	const showHorizontalAndTest = useMemo(() => {
		return function showHorizontal() {
			if (vertical) {
				setVertical(false);
			}
			// delay for the display to update
			setTimeout(() => {
				const rangeContainer = containerRef.current;
				if (
					rangeContainer &&
					rangeContainer.scrollWidth > rangeContainer.offsetParent?.offsetWidth
				) {
					setVertical(true);
				}
			});
		};
	}, [vertical]);

	useEffect(() => {
		const resizeListener = window.addEventListener('resize', debounce(showHorizontalAndTest, 200));
		return () => window.removeEventListener('resize', resizeListener);
	}, [showHorizontalAndTest]);

	useEffect(() => {
		showHorizontalAndTest();
	}, []);

	return (
		<DateTimeRange.Manager
			startDateTime={props.startDateTime}
			endDateTime={props.endDateTime}
			onChange={onChange}
		>
			<DateTimeRangeContext.Consumer>
				{({ startDateTime, endDateTime, onStartChange, onEndChange }) => (
					<div className={className} ref={containerRef}>
						<div className="range-input" data-testid="range-start">
							<label htmlFor={props.id} className="control-label">
								{props.t('TC_DATE_PICKER_RANGE_FROM', { defaultValue: 'From' })}
							</label>
							<InputDateTimePicker
								{...inputProps}
								id={`${id}-start`}
								dateFormat={dateFormat}
								useSeconds={useSeconds}
								value={startDateTime}
								endDate={endDateTime}
								onChange={onStartChange}
								onBlur={onBlur}
								defaultTimeValue={props.defaultTimeStart}
							/>
						</div>
						<span className={classnames(theme.arrow, 'arrow')}>
							<Icon name="talend-arrow-right" className={classnames(theme.icon, 'icon')} />
						</span>
						<div className="range-input" data-testid="range-end">
							<label htmlFor={props.id} className="control-label">
								{props.t('TC_DATE_PICKER__RANGE_TO', { defaultValue: 'To' })}
							</label>
							<InputDateTimePicker
								{...inputProps}
								id={`${id}-end`}
								dateFormat={dateFormat}
								useSeconds={useSeconds}
								value={endDateTime}
								startDate={startDateTime}
								onChange={onEndChange}
								onBlur={onBlur}
								defaultTimeValue={props.defaultTimeEnd}
							/>
						</div>
					</div>
				)}
			</DateTimeRangeContext.Consumer>
		</DateTimeRange.Manager>
	);
}
InputDateTimeRangePicker.defaultProps = {
	dateFormat: 'YYYY-MM-DD',
	t: getDefaultT(),
};

InputDateTimeRangePicker.propTypes = {
	id: PropTypes.string.isRequired,
	dateFormat: PropTypes.string,
	useSeconds: PropTypes.bool,
	onChange: PropTypes.func,
	onBlur: PropTypes.func,
	defaultTimeStart: PropTypes.shape({
		hours: PropTypes.string.isRequired,
		minutes: PropTypes.string.isRequired,
		seconds: PropTypes.string,
	}),
	defaultTimeEnd: PropTypes.shape({
		hours: PropTypes.string.isRequired,
		minutes: PropTypes.string.isRequired,
		seconds: PropTypes.string,
	}),
	startDateTime: PropTypes.oneOfType([
		PropTypes.instanceOf(Date),
		PropTypes.number,
		PropTypes.string,
	]),
	endDateTime: PropTypes.oneOfType([
		PropTypes.instanceOf(Date),
		PropTypes.number,
		PropTypes.string,
	]),
	inline: PropTypes.string,
	t: PropTypes.func,
};

export default InputDateTimeRangePicker;
