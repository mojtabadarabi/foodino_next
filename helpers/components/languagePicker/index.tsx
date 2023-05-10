import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import {TfiWorld} from 'react-icons/tfi'
import Link from "next/link";
import {useRouter} from "next/router";
import {i18n} from "next-i18next";

export default function LanguagePicker() {
    const router = useRouter()
    return (
        <FormControl >
            {/*<InputLabel id="demo-simple-select-label">Age</InputLabel>*/}
            <Select
                value={i18n?.language}
                label="Age"
                sx={{
                    width:'fitContent',
                    '& div': {display: 'flex', alignItems: 'center', gap: '2',direction:'ltr'},
                    boxShadow: 'none',
                    '.MuiOutlinedInput-notchedOutline': {border: 0, display: 'none !important'}
                }}
            >
                <MenuItem value={'fa'} sx={{
                    padding: '0', width: '100%', '& a': {
                        width: '100%', display: 'flex', justifyContent: "end", padding: '' +
                            '.5em 1em'
                    }, '& a div': {width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}
                }}><Link
                    href={router.asPath} locale="fa" dir='ltr'>
                    <div style={{display: 'flex !important', alignItems: 'center', width: '100% !important'}}><TfiWorld/><span
                        className='mx-2'>fa</span></div>
                </Link></MenuItem>
                <MenuItem value={'en'} sx={{
                    padding: '0', width: '100%', '& a': {
                        width: '100%', display: 'flex', justifyContent: "end", padding: '' +
                            '.5em 1em'
                    }, '& a div': {width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}
                }}><Link
                    href={router.asPath} locale="en" dir='ltr'>
                    <div style={{display: 'flex !important', alignItems: 'center', width: '100% !important'}}><TfiWorld/><span
                        className='mx-2'>en</span></div>
                </Link></MenuItem>
            </Select>
        </FormControl>
    );
}