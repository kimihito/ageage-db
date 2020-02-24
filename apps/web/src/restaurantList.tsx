import React from 'react'
import { RestaurantWithEpisode } from './entities'
import { Container, Typography, Box, Link, Table, TableBody, Grid, TableContainer, TableHead, TableRow, TableCell } from '@material-ui/core'

interface Props {
    restaurants: RestaurantWithEpisode[]
}

const RestaurantList = (props: Props) => {
    return (
        <Box m={1}>
            <Container maxWidth="lg">
                <Grid xs={12}>
                    <Typography>
                        <Link href="https://www.otv.co.jp/ageage/" target="_blank" rel="noopener">
                            アゲアゲ飯
                        </Link>
                        で紹介されたお店をテーマごとに検索します
                    </Typography>
                    <TableContainer >
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>
                                        店名
                                    </TableCell>
                                    <TableCell>
                                        住所
                                    </TableCell>
                                    <TableCell>
                                        営業時間
                                    </TableCell>
                                    <TableCell>
                                        定休日
                                    </TableCell>
                                    <TableCell>
                                        エピソード名
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {props.restaurants.map(r => (
                                    <TableRow key={r.id}>
                                        <TableCell component="th" scope="row">
                                            {r.name}
                                        </TableCell>
                                        <TableCell component="th" scope="row">
                                            {r.address}
                                        </TableCell>
                                        <TableCell component="th" scope="row">
                                            {r.open}
                                        </TableCell>
                                        <TableCell component="th" scope="row">
                                            {r.close}
                                        </TableCell>
                                        <TableCell component="th" scope="row">
                                            {r.episode.theme}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Container>
        </Box>
    )
}

export default RestaurantList