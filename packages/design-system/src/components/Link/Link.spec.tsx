/* eslint-disable testing-library/prefer-screen-queries */
import React from 'react';
import { composeStories } from '@storybook/testing-react';

import Link from '.';
import * as Stories from './Link.stories';

const { Default, Disabled, WithIcon, External, TargetBlank } = composeStories(Stories);

context('<Link />', () => {
	it('should render', () => {
		cy.mount(<Default data-testid="my.link" />);
		cy.getByTestId('my.link').should('have.text', 'Link example');
	});

	it('should render icon before', () => {
		cy.mount(<WithIcon />);
		cy.getByTest('link.icon.before').should('be.visible');
	});

	it('should render external', () => {
		cy.mount(<External />);
		cy.getByTest('link.icon.external').should('be.visible');
	});

	it('should render disabled', () => {
		cy.mount(<Disabled data-testid="my.link" />);
		cy.getByTestId('my.link').should('have.attr', 'aria-disabled');
	});

	it('should deal with target blank', () => {
		cy.mount(<TargetBlank data-testid="my.link" />);
		cy.getByTestId('my.link')
			.should('have.attr', 'title', 'Open in a new tab')
			.should('have.attr', 'target', '_blank')
			.should('have.attr', 'rel', 'noreferrer noopener');
	});

	it('should deal with unknown target', () => {
		cy.mount(
			<Link data-testid="my.link" target="unknown">
				Unknown target
			</Link>,
		);
		cy.getByTestId('my.link')
			.should('have.attr', 'title', 'Open in a new tab')
			.should('have.attr', 'rel', 'noreferrer noopener');
	});

	it('should deal with target self', () => {
		cy.mount(
			<Link data-testid="my.link" target="_self">
				Self target
			</Link>,
		);
		cy.getByTestId('my.link').should('not.have.attr', 'title');
		cy.getByTestId('my.link').should('not.have.attr', 'rel');
	});

	it('should have data-feature', () => {
		cy.mount(<Default data-testid="my.link" data-feature="my.feature" />);
		cy.getByTestId('my.link').should('have.attr', 'data-feature', 'my.feature');
	});
});
