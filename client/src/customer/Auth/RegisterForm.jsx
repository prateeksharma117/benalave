import {
    Checkbox,
    Grid,
    GridCol,
    MantineProvider,
    PasswordInput,
    TextInput,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import "@mantine/core/styles.css";
import { MdAccountCircle } from "react-icons/md";
import Button from "@mui/material/Button";
import { useState,useEffect } from "react";
import zxcvbn from 'zxcvbn';
import validator from 'validator';
import { useNavigate } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux"
import { getUser, register } from "../../State/Auth/Action";

const RegisterForm = ({close,menuClose}) => {
    const [visible, { toggle }] = useDisclosure(false);
    const [errors, setErrors] = useState({});
    const navigate=useNavigate()
    const dispatch=useDispatch()
    const jwt=localStorage.getItem("jwt")
    const auth = useSelector((store) => store?.auth);

    useEffect(() => {
        if (jwt) {
            dispatch(getUser(jwt))
        }
    }, [jwt,auth.jwt])
    

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const userData = {
            firstName: data.get("firstName"),
            lastName: data.get("lastName"),
            email: data.get("email"),
            password: data.get("password"),
            confirmPassword: data.get("confirmPassword"),
        };

        const newErrors = {};
        if (!userData.firstName) {
            newErrors.firstName = "First Name is required";
        }
        if (!userData.lastName) {
            newErrors.lastName = "Last Name is required";
        }
        if (!userData.email) {
            newErrors.email = "Email is required";
        }else if (!validator.isEmail(userData.email)) {
            newErrors.email = "Invalid email address";
        }
        if (!userData.password) {
            newErrors.password = "Password is required";
        }
        if (!userData.confirmPassword) {
            newErrors.confirmPassword = "Confirm Password is required";
        }
        if (userData.password !== userData.confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match";
        }

        const passwordStrength = zxcvbn(userData.password);
        if (passwordStrength.score < 4) {
            newErrors.password = "Password is too weak";
        }

        setErrors(newErrors);

        if (Object.keys(newErrors).length > 0) {
            return;
        }

        dispatch(register(userData))
        close();
        menuClose()
        navigate("/")
    };

    return (
        <>
            <div>
                <form onSubmit={handleSubmit}>
                    <MantineProvider>
                        <Grid>
                            <GridCol span={6}>
                                <TextInput
                                    name="firstName"
                                    withAsterisk
                                    label="First Name"
                                    placeholder="First Name"
                                    error={errors.firstName}
                                />
                            </GridCol>

                            <GridCol span={6}>
                                <TextInput
                                    name="lastName"
                                    withAsterisk
                                    label="Last Name"
                                    placeholder="Last Name"
                                    error={errors.lastName}
                                />
                            </GridCol>

                            <GridCol span={12}>
                                <TextInput
                                    name="email"
                                    withAsterisk
                                    label="Email"
                                    placeholder="exmaplese@gmail.com"
                                    error={errors.email}
                                />
                            </GridCol>

                            <GridCol span={12}>
                                <PasswordInput
                                    name="password"
                                    label="Password"
                                    visible={visible}
                                    onVisibilityChange={toggle}
                                    error={errors.password}
                                />
                            </GridCol>

                            <GridCol span={12}>
                                <PasswordInput
                                    name="confirmPassword"
                                    label="Confirm password"
                                    visible={visible}
                                    onVisibilityChange={toggle}
                                    error={errors.confirmPassword}
                                />
                            </GridCol>

                            <GridCol span={12}>
                                <Checkbox
                                    defaultChecked
                                    label="I agree to sell my soul and privacy to this corporation"
                                />
                            </GridCol>
                        </Grid>

                        <Grid className=" mt-5 mb-2">
                            <GridCol span={6} className=" flex items-center">
                                <p onClick={()=>navigate("/login")} className=" hover:underline secondaryText cursor-pointer">
                                    Have an account? Login
                                </p>
                            </GridCol>

                            <GridCol span={6} className="flex justify-end items-end">
                                <Button
                                    className=" gap-2"
                                    type="submit"
                                    sx={{
                                        ":hover": {
                                            bgcolor: "#1fb356", // theme.palette.primary.main
                                            color: "white",
                                        },
                                    }}
                                    variant="contained"
                                >
                                    Register <MdAccountCircle size={20} />
                                </Button>
                            </GridCol>
                        </Grid>
                    </MantineProvider>
                </form>
            </div>
        </>
    );
};

export default RegisterForm;
