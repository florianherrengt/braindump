import '../../styles/index.scss';
import React from 'react';
import { TopBar } from './';

export default {
    component: TopBar,
    title: 'TopBar',
};

export const Default = () => <TopBar location='/notes' />;
