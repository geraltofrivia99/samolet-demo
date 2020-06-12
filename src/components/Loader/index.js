import React from 'react';
import { Wrapepr } from './styled';
import { Spin } from 'antd';

export const Loader = () => (
    <Wrapepr>
        <Spin />
    </Wrapepr>
);