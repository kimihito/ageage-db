import React from 'react'
import { RestaurantWithEpisode } from './entities'
import MaterialTable from 'material-table'
import { Container, Typography, Box, Link,  Grid } from '@material-ui/core'

interface Props {
    restaurants: RestaurantWithEpisode[]
}

const tableTitle = (): JSX.Element => {
    return (
    <Typography>
        <Link href="https://www.otv.co.jp/ageage/" target="_blank" rel="noopener">
            アゲアゲ飯
        </Link>
        で紹介されたお店をテーマごとに検索します
    </Typography>

    )
}

const RestaurantList = (props: Props) => {
    return (
        <Box m={1}>
            <Container maxWidth="lg">
                <Grid xs={12}>
                    <MaterialTable
                        columns={[
                            {title: 'テーマ', field: 'episode.theme'},
                            {title: '店名', field: 'name'},
                            {title: '住所', field: 'address'},
                            {title: '営業時間', field: 'open'},
                            {title: '定休日', field: 'close'},
                        ]}
                        data={props.restaurants}
                        title={
                            <Typography>
                            <Link href="https://www.otv.co.jp/ageage/" target="_blank" rel="noopener">
                                アゲアゲ飯
                            </Link>
                            で紹介されたお店をテーマごとに検索します
                            </Typography>
                        }
                    >

                    </MaterialTable>
                </Grid>
            </Container>
        </Box>
    )
}

export default RestaurantList