import { Box, Button, Grid, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { UserAddressCard } from "../../components";
import { useDispatch, useSelector } from "react-redux"
import { createOrder } from "../../../State/Order/Action";
import { useNavigate } from "react-router-dom";
import { getUser } from "../../../State/Auth/Action";
import { Loader } from "@mantine/core";

const DeliveryAddress = () => {

  const dispatch = useDispatch()
  const [buttonLoading, setButtonLoading] = useState(false)
  const navigate = useNavigate()
  const address = localStorage.getItem("jwt")
  const { auth } = useSelector((store) => store);


  const handleFormSubmit = (e) => {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const address = {
      firstName: data.get("firstName"),
      lastName: data.get("lastName"),
      streetAddress: data.get("address"),
      city: data.get("city"),
      state: data.get("state"),
      zipCode: data.get("zip"),
      mobile: data.get("phoneNumber"),
    }

    const orderData = {
      address, navigate
    }
    dispatch(createOrder(orderData))
  }

  useEffect(() => {
    dispatch(getUser(address))
  }, [address])


  return (
    <>
      {
        auth.loading === true ?
          (
            <Loader />
          ) :
          (
            <div >
              <Grid container>
                <Grid
                  xs={12}
                  sm={4}
                  className=" mx-5 border rounded-e-md shadow-md h-[30.5rem] overflow-y-scroll"
                >
                  <div className="mx-2 px-1 py-5 space-y-5 border-b cursor-pointer">
                    <UserAddressCard address={auth} />
                  </div>
                </Grid>

                <Grid item xs={12} sm={7}>
                  <Box className=" border rounded-s-md shadow-md p-5">
                    <form action="" onSubmit={handleFormSubmit}>
                      <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            required
                            id="firstName"
                            name="firstName"
                            label="First Name"
                            fullWidth
                            autoComplete="given-name"
                          />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                          <TextField
                            required
                            id="lastName"
                            name="lastName"
                            label="Last Name"
                            fullWidth
                            autoComplete="given-name"
                          />
                        </Grid>

                        <Grid item xs={12}>
                          <TextField
                            required
                            id="address"
                            name="address"
                            label="Street Address"
                            fullWidth
                            autoComplete="given-name"
                            multiline
                            rows={4}
                          />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                          <TextField
                            required
                            id="city"
                            name="city"
                            label="City"
                            fullWidth
                            autoComplete="given-name"
                          />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                          <TextField
                            required
                            id="state"
                            name="state"
                            label="State / provence / Region"
                            fullWidth
                            autoComplete="given-name"
                          />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                          <TextField
                            required
                            id="zip"
                            name="zip"
                            label="Zip / Postal code"
                            fullWidth
                            autoComplete="shipping postal-code"
                          />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                          <TextField
                            required
                            id="phoneNumber"
                            name="phoneNumber"
                            label="Phone Number"
                            fullWidth
                          />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                                <Button
                                  variant="outlined"
                                  onClick={() => setButtonLoading(true)}
                                  size="large"
                                  type="submit"
                                  sx={{
                                    px: "2rem",
                                    py: "0.5rem",
                                    "&:hover": {
                                      backgroundColor: "#1fb356",
                                      color: "#fff",
                                      borderColor: "#1fb356",
                                    },
                                  }}
                                >
                                  {buttonLoading ? "Loading..." : "Deliver Here"}
                                </Button>
                        </Grid>
                      </Grid>
                    </form>
                  </Box>
                </Grid>
              </Grid>
            </div>
          )
      }
    </>
  );
};

export default DeliveryAddress;
