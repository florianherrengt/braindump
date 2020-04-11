import React from 'react';
import '../../styles/index.scss';
import { TopBar } from './';

export default {
    component: TopBar,
    title: 'TopBar',
};

export const Default = () => <TopBar location='/notes' />;
