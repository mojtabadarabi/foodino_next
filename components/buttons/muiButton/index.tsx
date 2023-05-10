import * as React from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { DefaultTFuncReturn } from 'i18next';
import { LoadingButton } from '@mui/lab';

interface Props {
    background?: string,
    textColor?: string,
    children?: string | DefaultTFuncReturn,
    backgroundHover?: string,
    width?: string,
    type?: "button" | 'submit',
    loading?: boolean
}

const ColorButton = styled(LoadingButton)<Props>(({ textColor, background, backgroundHover, width }) => ({
    color: `${textColor} !important`,
    width: width || 'unset',
    'background-image': `${background} !important`,
    minHeight: '2.8em',
    textTransform: 'capitalize',
    '&:hover': {
        'background-image': `${backgroundHover} !important`,
    }
}));

export default function CustomizedMuiButton({ children, background, textColor, backgroundHover, width, type = 'button', loading = false }: Props) {
    return (
        <ColorButton
            type={type}
            variant="contained"
            width={width}
            loading={loading}
            disabled={loading}
            background={background || 'var(--mui-action-btn-background)' || '#000'}
            backgroundHover={backgroundHover || 'var(--mui-action-btn-background-hover' || '#000'}
            textColor={textColor || 'var(--mui-action-btn-text)' || '#fff'}
        >{!loading ? children || 'Button' : null}</ColorButton>
    );
}