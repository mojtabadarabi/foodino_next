import { foodType, restaurantType } from "@/app/types/food";
import { useLazyDeleteFoodQuery } from "../foodsServices";
import { deleteFood } from "../foodsSlice";
import { appRoutes } from "@/configs/routes";
import { useAppDispatch } from "@/hooks/redux";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { IconButton, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { useTranslation } from "next-i18next";
import Link from "next/link";

export default function FoodsTable({ foods }: { foods: foodType[] }) {
    const { t } = useTranslation('food')
    const { t: tCommon } = useTranslation('common')
    const [deleteRestaurant, { isFetching }] = useLazyDeleteFoodQuery()
    const dispatch = useAppDispatch()

    const onDeleteRestaurant = (_id: string) => {
        deleteRestaurant(_id).unwrap().then(() => {
            dispatch(deleteFood(_id))
        })
    }
    console.log(foods)
    return (
        <Table sx={{ width: '100%' }}>
            <TableHead sx={{ background: 'var(--background)', width: '100%' }}>
                <TableRow>
                    <TableCell align="center" width={'5%'} sx={{ color: 'white', fontWeight: 'bold', fontSize: '1.1em' }}>
                        {tCommon('number')}
                    </TableCell>
                    <TableCell align="center" width={'20%'} sx={{ color: 'white', fontWeight: 'bold', fontSize: '1.1em' }}>
                        {t('food_name')}
                    </TableCell>
                    <TableCell align="center" width={'30%'} sx={{ color: 'white', fontWeight: 'bold', fontSize: '1.1em' }}>
                        {tCommon('description')}
                    </TableCell>
                    <TableCell align="center" width={'30%'} sx={{ color: 'white', fontWeight: 'bold', fontSize: '1.1em' }}>
                        {tCommon('price')}
                    </TableCell>
                    <TableCell align="center" width={'5%'} sx={{ color: 'white', fontWeight: 'bold', fontSize: '1.1em' }}>
                        {tCommon('score')}
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
                    foods.map(({ _id, name, description, score, price }: foodType, index: number) => (
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
                                {price}
                            </TableCell>
                            <TableCell align="center">
                                {score}
                            </TableCell>
                            <TableCell align="center">
                                <Link href={appRoutes.createFood.href + '/' + _id}><IconButton><EditIcon /></IconButton></Link>
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