import { Grid, GridCol, MantineProvider, PasswordInput, TextInput } from "@mantine/core";
import Button from "@mui/material/Button";
import { useDisclosure } from "@mantine/hooks";
import "@mantine/core/styles.css";
import { AiOutlineLogin } from "react-icons/ai"
import { useState } from "react";
import validator from 'validator';
import { useNavigate } from "react-router-dom";
import { useDispatch} from "react-redux";
import { login } from "../../State/Auth/Action";

const LoginForm = ({close,menuClose}) => {

    const [visible, { toggle }] = useDisclosure(false);
    const [errors, setErrors] = useState({});
    const navigate=useNavigate()
    const dispatch = useDispatch()

    const handleSubmit=(event)=>{
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const userData = {
            email: data.get("email"),
            password: data.get("password"),
        }

        const newErrors = {};
        if (!userData.password) {
            newErrors.password = "Password is required";
        }
        if (!userData.email) {
            newErrors.email = "Email is required";
        }else if (!validator.isEmail(userData.email)) {
            newErrors.email = "Invalid email address";
        }

        setErrors(newErrors);

        if (Object.keys(newErrors).length > 0) {
            return;
        }

        dispatch(login(userData))
        close()
        menuClose()
        navigate("/")
    }

        return (
            <>
                <div>
                    <form onSubmit={handleSubmit}>
                        <MantineProvider>
                            <Grid>
                                <GridCol span={12}>
                                    <TextInput
                                        withAsterisk
                                        label="Email"
                                        name="email"
                                        placeholder="exmaplese@gmail.com"
                                        error={errors.email}
                                    />
                                </GridCol>

                                <GridCol span={12}>
                                    <PasswordInput
                                        label="Password"
                                        name="password"
                                        visible={visible}
                                        onVisibilityChange={toggle}
                                        error={errors.password}
                                    />
                                </GridCol>
                            </Grid>

                            <Grid className=" mt-5 mb-2">
                                <GridCol
                                    span={7}
                                    className=" flex items-center"
                                >
                                    <p onClick={()=>navigate("/register")} className=" hover:underline secondaryText cursor-pointer">
                                        Don&apos;t have an account? Register
                                    </p>
                                </GridCol>

                                <GridCol className="flex justify-end items-end" span={5}>
                                    <Button
                                        className=" gap-2"
                                        type="submit"
                                        sx={{
                                            ":hover": {
                                                bgcolor: "#1fb356",
                                                color: "white",
                                            },
                                        }}
                                        variant="contained"
                                    >
                                        Login <AiOutlineLogin size={20} />
                                    </Button>
                                </GridCol>
                            </Grid>
                        </MantineProvider>
                    </form>
                </div>
            </>
        );
    };

    export default LoginForm;
