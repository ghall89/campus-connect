import React, { useState } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import DoubleArrowIcon from '@material-ui/icons/DoubleArrow';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { useQuery } from '@apollo/client';
import { LOGIN_USER } from '../../utils/queries';
import { useAuthDispatch } from '../../utils/auth';

const useStyles = makeStyles((_theme) => ({
    container: {
        height: "100vh",
    },
    form: {
        maxWidth: 650,
        '@media (max-width:600px)': {
            width: 250,
            marginTop: '2rem',
            padding: 5,
        },
        '@media (min-width:1200px)': {
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            position: "absolute",
            maxWidth: 750,
        },
    },
    input: {
        color: "#003262",
        '@media (max-width:600px)': {
            fontSize: '1rem',
        },
    },
    button: {
        marginTop: "1rem",
        color: "#003262",
        borderColor: "grey",
    },
    field: {
        margin: "1rem 0rem",
    },

}));

const InputField = withStyles({
    root: {
        "& label.Mui-focused": {
            color: "grey",
        },
        "& label": {
            color: "#003262",
            '@media (max-width:600px)': {
                fontSize: '0.9rem',
            },
        },
        "& .MuiOutlinedInput-root": {
            "& fieldset": {
                borderColor: "grey",
            },
            "&:hover fieldset": {
                borderColor: "coffee",
            },
            "&.Mui-focused fieldset": {
                color: "whitesmoke",
                borderColor: "grey",
            },
        },
    },
})(TextField);

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const Login = () => {
    const classes = useStyles();
    const [variables, setVariables] = useState({
        email: '',
        password: '',
    })
    const [errors, setErrors] = useState({});
    const [alertMsg, setAlertMsg] = useState('');
    const [severity, setSeverity] = useState('');
    const [open, setOpen] = useState(false);

    const dispatch = useAuthDispatch();

    const { data, loading, error } = useQuery(LOGIN_USER);

    if (error) {
        console.log(`login error ${error}`);
        setErrors(error);
        setOpen(true);
        setAlertMsg(errors);
        setSeverity('error');
    }
    if (data) {
        dispatch({ type: 'LOGIN', payload: data.login })
        setOpen(true)
        setAlertMsg('Logged in');
        setSeverity('success')
        window.location.href = '/chat'
    }


    const handleFormSubmit = (e) => {
        e.preventDefault()

        data({ variables })
    }

    return (
        <Grid container justify="center">
            <Box component="form" className={classes.form} onSubmit={handleFormSubmit}>
                <InputField
                    fullWidth={true}
                    label="Email"
                    variant="outlined"
                    required
                    name='email'
                    type='email'
                    value={variables.email}
                    onChange={(e) =>
                        setVariables({ ...variables, email: e.target.value })
                    }
                    inputProps={{ className: classes.input }}
                    className={classes.field}
                />
                <InputField
                    fullWidth={true}
                    label="Password"
                    name='password'
                    required
                    variant="outlined"
                    value={variables.password}
                    onChange={(e) =>
                        setVariables({ ...variables, password: e.target.value })
                    }
                    inputProps={{ className: classes.input }}
                />
                <Button
                    variant="outlined"
                    fullWidth={true}
                    disabled={loading}
                    endIcon={<DoubleArrowIcon />}
                    type="submit"
                    className={classes.button}>
                    {loading ? 'loading..' : 'Login'}
                </Button>
                <Button
                    disabled={loading}
                    href="/signup"
                    className={classes.button}>
                    Singup Instead?
                </Button>
            </Box>
            <Snackbar open={open} autoHideDuration={6000} onClose={() => setOpen(false)} className={classes.alertbox}>
                <Alert onClose={() => setOpen(false)} severity={severity} className={classes.alertbox}>
                    {alertMsg}
                </Alert>
            </Snackbar>
        </Grid>
    )
};

export default Login