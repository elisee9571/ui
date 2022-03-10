import React, { forwardRef, ReactNode, ReactNodeArray, Ref } from 'react';
import classnames from 'classnames';
import { Clickable as ReakitClickable, ClickableProps as ReakitClickableProps } from 'reakit';

import styles from './Clickable.module.scss';

export type ClickableProps = Omit<ReakitClickableProps, 'style'> & {
	type?: 'button' | 'submit' | 'reset';
	children: ReactNode | ReactNodeArray;
	onClick: (event: React.MouseEvent<HTMLButtonElement> | KeyboardEvent) => void;
};

const Clickable = forwardRef(
	// Ref<any>: Clickable is polymorphic. Could be any HTML element
	({ type = 'button', className, ...props }: ClickableProps, ref: Ref<any>) => {
		return (
			<ReakitClickable
				{...props}
				className={classnames(styles.clickable, className)}
				type={type}
				ref={ref}
			/>
		);
	},
);

export default Clickable;
