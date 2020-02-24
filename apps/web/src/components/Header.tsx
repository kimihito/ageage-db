import React, { Component } from 'react'
import { AppBar, Container, Typography, Toolbar } from '@material-ui/core'

class Header extends Component {
    render() {
        return(
            <AppBar position="static">
                <Container maxWidth="lg">
                    <Toolbar>
                        <Typography variant="h6">Ageage-db</Typography>
                    </Toolbar>
                </Container>
            </AppBar>
        )
    }

}

export default Header