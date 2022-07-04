import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import Clickable from '../../../../Clickable';
import Tooltip from '../../../../Tooltip';
import { SizedIcon } from '../../../../Icon';

export default function useRevealPassword() {
	const [revealed, setRevealed] = useState(false);
	const currentType = revealed ? 'text' : 'password';
	const { t } = useTranslation();
	const showMsg = t('FORM_PASSWORD_SHOW', { defaultValue: 'Show password' });
	const hideMsg = t('FORM_PASSWORD_HIDE', { defaultValue: 'Hide password' });

	function onReveal(event: React.MouseEvent<any>) {
		event.preventDefault();
		setRevealed(prevState => !prevState);
	}

	function onReset() {
		setRevealed(() => false);
	}

	function RevealPasswordButton(props: any) {
		return (
			<Tooltip title={revealed ? hideMsg : showMsg} placement="top">
				<Clickable
					className="reveal__button"
					onMouseDown={e => {
						onReveal(e);
						if (props.onClick) {
							props.onClick(e);
						}
					}}
					tabIndex={-1}
					aria-hidden
					data-testid="form.password.reveal"
					{...props}
				>
					<SizedIcon size="M" name={revealed ? 'eye-slash' : 'eye'} />
				</Clickable>
			</Tooltip>
		);
	}

	return { currentType, onReset, RevealPasswordButton };
}
