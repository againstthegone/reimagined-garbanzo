import React from 'react';
import { render, screen } from '@testing-library/react';
import { Node } from './Node';
import { LowerTierLocalAuthorityAreaName } from '../CoronovirusDataGovUkApi/LowerTierLocalAuthorityAreaName';

describe('Node', () => {
    it('passes in the background colour to the top graphic as the border bottom color', () => {
        render(<Node backgroundColor='red' />);
        expect(screen.getByTestId('node-top')).toHaveAttribute('style', expect.stringContaining('border-bottom-color: red;'));
    });

    it('passes in the background colour to the bottom graphic as the border top color', () => {
        render(<Node backgroundColor='green' />);
        expect(screen.getByTestId('node-bottom')).toHaveAttribute('style', expect.stringContaining('border-top-color: green;'));
    });

    it('renders the area name', () => {
        render(<Node area={LowerTierLocalAuthorityAreaName.Trafford} />);
        expect(screen.getByText(LowerTierLocalAuthorityAreaName.Trafford)).toBeInTheDocument();
    });
});