// components/molecules/BackButton.js

import React from 'react';
import SquareButton from '../atoms/SquareButton';

const backButtonStyles = {
    container: {
        backgroundColor: 'pink',
        color: 'black',
    },
};

const BackButton = ({ onPress }) => {
    return (
        <SquareButton
            text={'Back'}
            onPress={onPress}
            style={{ ...backButtonStyles.container }}
        />
    );
};

export default BackButton;
