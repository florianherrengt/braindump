import '../../styles/index.scss';
import React from 'react';
import { AutoComplete } from '.';
import { LineSpacer } from '../LineSpacer';
import { Color, Variant } from '../../config/theme';

export default {
    component: AutoComplete,
    title: 'Input/AutoComplete',
};

const data = [
    {
        id: '1',
        label: 'First item',
    },
    {
        id: '2',
        label: 'Not the first',
    },
    {
        id: '3',
        label: 'Second item',
    },
];

export const Default = () => (
    <div style={{ padding: 20 }}>
        <AutoComplete
            data={data}
            placeholder='Enter your text here'
            ariaLabel='test'
        >
            Default
        </AutoComplete>
    </div>
);

export const Searched = () => (
    <div style={{ padding: 20, maxWidth: 600, overflow: 'scroll' }}>
        <AutoComplete
            data={data}
            value='first'
            placeholder='Enter your text here'
            ariaLabel='test'
        >
            Default
        </AutoComplete>
    </div>
);
