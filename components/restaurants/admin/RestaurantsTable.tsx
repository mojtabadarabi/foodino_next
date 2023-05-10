import { restaurantType } from "@/app/types/food";
import { appRoutes } from "@/configs/routes";
import { useAppDispatch } from "@/hooks/redux";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { IconButton, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { useTranslation } from "next-i18next";
import Link from "next/link";
import { useLazyDeleteRestaurantQuery } from '../restaurantsServices';
import { deleteRestaurants } from "../restaurantsSlice";

export default function RestaurantTable({ restaurants }: { restaurants: restaurantType[] }) {
    const { t } = useTranslation('restaurant')
    const { t: tCommon } = useTranslation('common')
    const [deleteRestaurant, { isFetching }] = useLazyDeleteRestaurantQuery()
    const dispatch = useAppDispatch()

    const onDeleteRestaurant = (_id: string) => {
        deleteRestaurant(_id).unwrap().then(() => {
            dispatch(deleteRestaurants(_id))
        })
    }

    return (
        <Table sx={{ width: '100%' }}>
            <TableHead sx={{ background: 'var(--background)', width: '100%' }}>
                <TableRow>
                    <TableCell align="center" width={'5%'} sx={{ color: 'white', fontWeight: 'bold', fontSize: '1.1em' }}>
                        {tCommon('number')}
                    </TableCell>
                    <TableCell align="center" width={'20%'} sx={{ color: 'white', fontWeight: 'bold', fontSize: '1.1em' }}>
                        {t('restaurant_name')}
                    </TableCell>
                    <TableCell align="center" width={'30%'} sx={{ color: 'white', fontWeight: 'bold', fontSize: '1.1em' }}>
                        {tCommon('description')}
                    </TableCell>
                    <TableCell align="center" width={'5%'} sx={{ color: 'white', fontWeight: 'bold', fontSize: '1.1em' }}>
                        {tCommon('score')}
                    </TableCell>
                    <TableCell align="center" width={'20%'} sx={{ color: 'white', fontWeight: 'bold', fontSize: '1.1em' }}>
                        {t('admin_user_name')}
                    </TableCell>
                    <TableCell align="center" width={'5%'} sx={{ color: 'white', fontWeight: 'bold', fontSize: '1.1em' }}>
                        {tCommon('update')}
                    </TableCell>
                    <TableCell align="center" width={'5%'} sx={{ color: 'white', fontWeight: 'bold', fontSize: '1.1em' }}>
                        {tCommon('delete')}
                    </TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {
                    restaurants.map(({ _id, name, description, score, adminUserName }: restaurantType, index: number) => (
                        <TableRow key={_id}>
                            <TableCell align="center">
                                {index + 1}
                            </TableCell>
                            <TableCell align="center">
                                {name}
                            </TableCell>
                            <TableCell align="center">
                                {description}
                            </TableCell>
                            <TableCell align="center">
                                {score}
                            </TableCell>
                            <TableCell align="center">
                                {adminUserName}
                            </TableCell>
                            <TableCell align="center">
                                <Link href={appRoutes.createRestaurant.href + '/' + _id}><IconButton><EditIcon /></IconButton></Link>
                            </TableCell>
                            <TableCell align="center" onClick={() => onDeleteRestaurant(_id)}>
                                <IconButton><DeleteIcon /></IconButton>
                            </TableCell>
                        </TableRow>
                    ))
                }
            </TableBody>
        </Table>
    )
}