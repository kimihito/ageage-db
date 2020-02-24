import React from 'react'
import { AppBar, Container, Typography, Toolbar } from '@material-ui/core'

const Header = () => {
    return (
        <AppBar position="static">
            <Container maxWidth="lg">
                <Toolbar>
                    <Typography variant="h6">Ageage-db</Typography>
                </Toolbar>
            </Container>
        </AppBar>
    )
}

export default Header