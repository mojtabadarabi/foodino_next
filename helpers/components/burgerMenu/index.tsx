import {useAppDispatch, useAppSelector} from "@/hooks/redux";
// @ts-ignore
import {slide as Menu} from 'react-burger-menu'
import React from "react";
import {toggleMenu} from "@/mainSlice/slice";

export default function BurgerMenu({children}: { children: React.ReactNode }) {
    const state = useAppSelector(state => state.main)
    const dispatch = useAppDispatch()
    var styles = {
        bmBurgerButton: {
            display:'none'
        },
        // bmBurgerBars: {
        //     background: '#373a47'
        // },
        bmCrossButton: {
            height: '24px',
            width: '24px'
        },
        bmCross: {
            background: '#bdc3c7'
        },
        bmMenu: {
            background: '#dbeafe',
            padding: '1.5em .1em 0',
            fontSize: '1.15em'
        },
        bmMorphShape: {
            fill: '#373a47'
        },
        bmItem: {
            display: 'initial',
        },
        bmItemList: {
            color: '#000',
            padding: '0.1em'
        },
        bmOverlay: {
            background: 'rgba(0, 0, 0, 0.3)'
        }
    };
    return (
        <Menu right onOpen={()=>dispatch(toggleMenu())} onClose={()=>dispatch(toggleMenu())} isOpen={state.openMenu} styles={styles} width={280}>
            {children}
        </Menu>
    )
}