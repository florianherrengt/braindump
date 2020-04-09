import React from 'react';
import { render } from '@testing-library/react';
import { Button } from './Button';
import { Variant, Color } from '../../config/theme';

describe('Components/Button', () => {
    it('<Button />', () => {
        const { container } = render(<Button />);
        expect(container.querySelector('.Button')?.className).toContain(
            'Button--primary',
        );
    });

    it('should add .Button--primary class', () => {
        const variant = Variant.primary;
        const { container } = render(<Button variant={variant} />);
        expect(container.querySelector('.Button')?.className).toContain(
            'Button--primary',
        );
    });

    it('should add .Button--primary class and .Button--positive', () => {
        const { container } = render(
            <Button variant={Variant.primary} color={Color.positive} />,
        );
        expect(container.querySelector('.Button')?.className).toContain(
            'Button--primary',
        );
        expect(container.querySelector('.Button')?.className).toContain(
            'Button--positive',
        );
    });

    it('should add .Button--primary class and .Button--negative', () => {
        const { container } = render(
            <Button variant={Variant.primary} color={Color.negative} />,
        );
        expect(container.querySelector('.Button')?.className).toContain(
            'Button--primary',
        );
        expect(container.querySelector('.Button')?.className).toContain(
            'Button--negative',
        );
    });

    it('should add .Button--secondary class and .Button--positive', () => {
        const { container } = render(
            <Button variant={Variant.secondary} color={Color.positive} />,
        );
        expect(container.querySelector('.Button')?.className).toContain(
            'Button--secondary',
        );
        expect(container.querySelector('.Button')?.className).toContain(
            'Button--positive',
        );
    });

    it('should add .Button--secondary class and .Button--negative', () => {
        const { container } = render(
            <Button variant={Variant.secondary} color={Color.negative} />,
        );
        expect(container.querySelector('.Button')?.className).toContain(
            'Button--secondary',
        );
        expect(container.querySelector('.Button')?.className).toContain(
            'Button--negative',
        );
    });

    it('should add .Button--tertiary class and .Button--positive', () => {
        const { container } = render(
            <Button variant={Variant.tertiary} color={Color.positive} />,
        );
        expect(container.querySelector('.Button')?.className).toContain(
            'Button--tertiary',
        );
        expect(container.querySelector('.Button')?.className).toContain(
            'Button--positive',
        );
    });

    it('should add .Button--tertiary class and .Button--negative', () => {
        const { container } = render(
            <Button variant={Variant.tertiary} color={Color.negative} />,
        );
        expect(container.querySelector('.Button')?.className).toContain(
            'Button--tertiary',
        );
        expect(container.querySelector('.Button')?.className).toContain(
            'Button--negative',
        );
    });
});
