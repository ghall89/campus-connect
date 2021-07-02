import React from 'react'
import Box from "@material-ui/core/Box";
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import InstagramIcon from '@material-ui/icons/Instagram';
import InputAdornment from '@material-ui/core/InputAdornment';
import Button from "@material-ui/core/Button";
import { TextField, Grid, makeStyles, Typography } from '@material-ui/core';
// PART OF ONBOARDING 
//ASK USERS FOR SOCIAL PROFILES
//NEEDS LOGO SELECTION ABOVE
//MISSING AVATARS
const useStyles = makeStyles((theme) => ({


    contain: {
        marginTop: `5vh`,
        marginLeft: `2vw`,
        marginRight: `2vw`,
        width: `65vw`
    },
    header: {
        justifyContent: 'center',
        fontFamily: `Poppins`,
        margin: `1vh`,
        marginLeft: `1vw`,
        fontWeight: 800,
        fontSize: `1.5rem`,

    },
    subHeader: {
        fontSize: '1.2rem',
        fontFamily: `Poppins`,
        marginLeft: `1vw`,
        marginTop: `3vh`,
        marginBottom: `1vh`,
        weight: `600`
    },
    textDetail: {
        fontsize: '.9rem',
        fontfamily: 'Roboto',
        margin: `1vh`
    },

    connectButton: {
        fontFamily: `Poppins`,
        textdecoration: 'none',
        width: `230px`,
        borderRadius: `6px`,
        border: '1px solid #D9EDFF',
        color: `white`,
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)', // update later w real color scheme
        fontSize: '1.3rem',
        marginTop: `1vh`,
        marginLeft: `.5vw`,
        height: `56px`,
        textalign: 'center',
        lineheight: '50px',
        padding: '0 30px',
        webkittransition: 'all 0.3s',
        transition: 'all 0.3s',


    },
    field: {
        margin: `1vh`

    }
}));

const avatars = [];

const OnboardForm = () => {

    const classes = useStyles();

    return (
        <div>
            <Box className={classes.contain}>
                <Grid container >
                    <Typography component='h1' className={classes.header} > Get Connected</Typography>  </Grid>

                <Grid><Typography className={classes.subHeader}>Avatar Alter Egos</Typography></Grid>

                <Grid> <Typography className={classes.textDetail}>Pick a fave tech:</Typography></Grid>


                <Grid> <Typography className={classes.textDetail}>If you're gonna party, what's your vibe?</Typography></Grid>


                <Typography className={classes.subHeader}>Social Profiles</Typography>
                <Box className={classes.boxy}>
                    <form className={classes.root} noValidate autoComplete="off">
                        <Grid>

                            <TextField
                                className={classes.field} variant="outlined"
                                id="input-with-icon-textfield"
                                label="LinkedIn Profile"
                                placeholder="/in/LinkedInName"
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <LinkedInIcon />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </Grid><Grid>
                            <TextField
                                className={classes.field} variant="outlined"
                                id="input-with-icon-textfield"
                                label="Instragram Handle"
                                placeholder="@YourInstagram"
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <InstagramIcon />
                                        </InputAdornment>
                                    ),
                                }}
                            />

                        </Grid></form>

                </Box>
                <Grid><Button className={classes.connectButton}>Connect</Button></Grid>

            </Box>
        </div>
    )
}

export default OnboardForm