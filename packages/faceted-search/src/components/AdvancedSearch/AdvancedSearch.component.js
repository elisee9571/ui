/* eslint-disable jsx-a11y/no-autofocus */
import { useState } from 'react';

import classnames from 'classnames';
import PropTypes from 'prop-types';

import { ButtonIcon, Icon } from '@talend/design-system';

import { USAGE_TRACKING_TAGS } from '../../constants';
import { useFacetedSearchContext } from '../context/facetedSearch.context';

import styles from './AdvancedSearch.module.scss';

const AdvancedSearchError = ({ id, label }) => (
	<p aria-live="assertive" className={styles['adv-search-error']} id={`${id}-error`} role="status">
		{label}
	</p>
);

AdvancedSearchError.propTypes = {
	label: PropTypes.string.isRequired,
	id: PropTypes.string.isRequired,
};

export function AdvancedSearch({
	initialQuery = '',
	placeholder,
	onCancel,
	onChange,
	onKeyDown,
	onSubmit,
}) {
	const [query, setQuery] = useState(initialQuery);
	const { id, inProgress, error, t } = useFacetedSearchContext();
	const formSubmit = event => {
		event.preventDefault();
		onSubmit(event, query);
	};

	const onKeyDownHandler = event => {
		if (onKeyDown) {
			onKeyDown(event, query);
		} else {
			switch (event.key) {
				case 'Enter':
					formSubmit(event);
					break;
				default:
					break;
			}
		}
	};

	const onChangeHandler = event => {
		if (onChange) {
			onChange(event, event.target.value);
		} else {
			setQuery(event.target.value);
		}
	};

	const onCancelHandler = () => {
		setQuery('');
		if (onCancel) {
			onCancel();
		}
	};
	const advSearchId = `${id}-adv-search`;
	return (
		<div id={advSearchId} className={styles['adv-search']}>
			<form id={`${advSearchId}-form`} role="search" onSubmit={formSubmit}>
				<Icon name="talend-filter" size="M" className={styles['adv-search-filter-icon']} />
				<input
					id={`${id}-form`}
					name="advanced-search-faceted"
					type="search"
					value={query}
					placeholder={placeholder || t('ADV_SEARCH_FACETED_PLACEHOLDER', 'Enter your query')}
					autoComplete="off"
					className={classnames(styles['adv-search-input'], { 'has-error': error })}
					aria-label={placeholder || t('ADV_SEARCH_FACETED_ARIA', 'Advanced Faceted Search')}
					autoFocus
					role="searchbox"
					onKeyDown={onKeyDownHandler}
					onChange={onChangeHandler}
				/>

				<div className={styles['adv-search-buttons']}>
					<ButtonIcon
						name="action-cancel-title"
						icon="cross-filled"
						size="S"
						isLoading={inProgress}
						onClick={onCancelHandler}
						data-feature={USAGE_TRACKING_TAGS.ADVANCED_CLEAR}
					>
						{t('CANCEL_TOOLTIP', 'Cancel')}
					</ButtonIcon>
					<ButtonIcon
						name="action-submit-title"
						icon="check-filled"
						size="S"
						isLoading={inProgress}
						type="submit"
						data-feature={USAGE_TRACKING_TAGS.ADVANCED_APPLY}
					>
						{t('SUBMIT_TOOLTIP', 'Submit')}
					</ButtonIcon>
				</div>
			</form>
			{error && <AdvancedSearchError id={advSearchId} label={error} />}
		</div>
	);
}

AdvancedSearch.propTypes = {
	initialQuery: PropTypes.string,
	onCancel: PropTypes.func,
	onChange: PropTypes.func,
	onKeyDown: PropTypes.func,
	onSubmit: PropTypes.func.isRequired,
	placeholder: PropTypes.string,
};
