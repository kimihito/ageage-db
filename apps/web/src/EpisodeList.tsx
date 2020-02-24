import React from 'react'
import { Episode } from './entities'
import { Container, Typography, Box, Link, Table, TableBody, Grid, TableContainer, TableHead, TableRow, TableCell } from '@material-ui/core'

interface Props {
    episodes: Episode[]
}

interface State {}

export default class EpisodeList extends React.Component<Props, State> {
    render() {
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
                                            エピソード名
                                        </TableCell>
                                        <TableCell align="right">
                                            オンエア日
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {this.props.episodes.map(e => (
                                        <TableRow key={e.id}>
                                            <TableCell component="th" scope="row">
                                                {e.theme}
                                            </TableCell>
                                            <TableCell align="right">
                                                {e.onAirDate}
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
}