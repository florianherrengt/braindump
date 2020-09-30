import '../../styles/index.scss';
import React from 'react';
import { Button } from './';
import { LineSpacer } from '../LineSpacer';
import { Color, Variant } from '../../config/theme';

export default {
    component: Button,
    title: 'Input/Button',
};

export const Default = () => (
    <div style={{ padding: 20 }}>
        <div>
            <Button ariaLabel='story' styles={{ marginRight: 20 }}>
                Default
            </Button>
            <Button
                ariaLabel='story'
                styles={{ marginRight: 20 }}
                variant={Variant.primary}
            >
                Next
            </Button>
            <Button
                ariaLabel='story'
                styles={{ marginRight: 20 }}
                variant={Variant.secondary}
            >
                Next
            </Button>
            <Button
                ariaLabel='story'
                styles={{ marginRight: 20 }}
                variant={Variant.tertiary}
            >
                Next
            </Button>
        </div>
        <LineSpacer />
        <div>
            <Button
                ariaLabel='story'
                color={Color.positive}
                styles={{ marginRight: 20 }}
            >
                Default
            </Button>
            <Button
                ariaLabel='story'
                color={Color.positive}
                styles={{ marginRight: 20 }}
                variant={Variant.primary}
            >
                Next
            </Button>
            <Button
                ariaLabel='story'
                color={Color.positive}
                styles={{ marginRight: 20 }}
                variant={Variant.secondary}
            >
                Next
            </Button>
            <Button
                ariaLabel='story'
                color={Color.positive}
                styles={{ marginRight: 20 }}
                variant={Variant.tertiary}
            >
                Next
            </Button>
        </div>
        <LineSpacer />
        <div>
            <Button
                ariaLabel='story'
                color={Color.negative}
                styles={{ marginRight: 20 }}
            >
                Default
            </Button>
            <Button
                ariaLabel='story'
                color={Color.negative}
                styles={{ marginRight: 20 }}
                variant={Variant.primary}
            >
                Next
            </Button>
            <Button
                ariaLabel='story'
                color={Color.negative}
                styles={{ marginRight: 20 }}
                variant={Variant.secondary}
            >
                Next
            </Button>
            <Button
                ariaLabel='story'
                color={Color.negative}
                styles={{ marginRight: 20 }}
                variant={Variant.tertiary}
            >
                Next
            </Button>
        </div>
        <LineSpacer />
    </div>
);
