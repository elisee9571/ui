import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import { Action } from '@talend/react-components/lib/Actions';
import ArrayItem from './ArrayItem.component';
import Message from '../../Message';
import { generateDescriptionId, generateErrorId } from '../../Message/generateId';
import { I18N_DOMAIN_FORMS } from '../../../constants';

import theme from './DefaultArrayTemplate.module.scss';

function DefaultArrayTemplate(props) {
	const { t } = useTranslation(I18N_DOMAIN_FORMS);
	const {
		canReorder,
		errorMessage,
		id,
		isValid,
		onAdd,
		onRemove,
		onReorder,
		renderItem,
		schema,
		value,
		valueIsUpdating,
		options = {},
		isCloseable,
	} = props;
	const descriptionId = generateDescriptionId(id);
	const errorId = generateErrorId(id);

	return (
		<fieldset
			className={classNames(theme['tf-array-fieldset'], 'tf-array-fieldset')}
			data-content={schema.title}
		>
			{schema.title && <legend className="sr-only">{schema.title}</legend>}
			{!schema.readOnly && (
				<Action
					id={`${id || 'tf-array'}-btn`}
					className={classNames(theme['tf-array-add'], 'tf-array-add')}
					bsStyle="info"
					onClick={onAdd}
					disabled={valueIsUpdating || schema.disabled}
					label={options.btnLabel || t('ARRAY_ADD_ELEMENT', { defaultValue: 'Add' })}
				/>
			)}
			<Message
				className={isValid ? undefined : 'has-error'}
				errorMessage={errorMessage}
				description={schema.description}
				isValid={isValid}
				descriptionId={descriptionId}
				errorId={errorId}
			/>
			{/* eslint-disable-next-line jsx-a11y/role-supports-aria-props */}
			<ol
				id={id}
				className={classNames(theme['tf-array'], 'tf-array')}
				aria-describedby={`${descriptionId} ${errorId}`}
				aria-invalid={isValid}
			>
				{value.map((itemValue, index) => (
					<li className={classNames(theme.item, 'item', `item-${index}`)} key={index}>
						<ArrayItem
							hasMoveDown={index < value.length - 1}
							hasMoveUp={index > 0}
							id={id && `${id}-control-${index}`}
							index={index}
							onRemove={onRemove}
							onReorder={canReorder ? onReorder : undefined}
							isClosed={itemValue.isClosed}
							valueIsUpdating={valueIsUpdating}
							renderItem={renderItem}
							isCloseable={isCloseable}
							disabled={schema.disabled}
							readOnly={schema.readOnly}
						/>
					</li>
				))}
			</ol>
		</fieldset>
	);
}

DefaultArrayTemplate.defaultProps = {
	isCloseable: false,
};
DefaultArrayTemplate.ArrayItem = ArrayItem;

if (process.env.NODE_ENV !== 'production') {
	DefaultArrayTemplate.propTypes = {
		canReorder: PropTypes.bool,
		errorMessage: PropTypes.string,
		id: PropTypes.string,
		isValid: PropTypes.bool,
		onAdd: PropTypes.func.isRequired,
		onRemove: PropTypes.func.isRequired,
		onReorder: PropTypes.func.isRequired,
		renderItem: PropTypes.func.isRequired,
		schema: PropTypes.object.isRequired,
		value: PropTypes.array.isRequired,
		valueIsUpdating: PropTypes.bool,
		options: PropTypes.shape({
			btnLabel: PropTypes.string,
		}),
		isCloseable: PropTypes.bool,
	};
}

export default DefaultArrayTemplate;
