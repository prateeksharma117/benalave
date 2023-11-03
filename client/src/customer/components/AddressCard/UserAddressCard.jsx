import { useState, useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { MantineProvider, Checkbox } from "@mantine/core";
import { createOrder } from "../../../State/Order/Action";
import Button from "@mui/material/Button"; 

const AddressCard = ({ address }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [buttonLoading, setButtonLoading] = useState(false)

    const handleAddressClick = useCallback(
        (item) => {
            setSelectedAddress(item);
        },
        []
    );

    const handleSubmit = useCallback(
        (e) => {
            e.preventDefault();
            setButtonLoading(true);

            if (selectedAddress) {
                const orderData = {
                    address: {
                        firstName: selectedAddress?.firstName,
                        lastName: selectedAddress?.lastName,
                        streetAddress: selectedAddress?.streetAddress,
                        city: selectedAddress?.city,
                        state: selectedAddress?.state,
                        zipCode: selectedAddress?.zipCode,
                        mobile: selectedAddress?.mobile,
                    },
                    navigate,
                };

                dispatch(createOrder(orderData));
            }
        },
        [dispatch, navigate, selectedAddress]
    );

    return (
        <>
            {address?.jwt?.address.map((item, i) => (
                <div className="space-y-3 space-x-3 flex items-center" key={i}>
                    <MantineProvider>
                        <Checkbox
                            onChange={() => handleAddressClick(item)}
                            checked={selectedAddress === item}
                        />
                    </MantineProvider>
                    <div>
                        <p className="font-semibold">{`${item?.firstName} ${item?.lastName}`}</p>
                        <p>{`${item?.streetAddress} ${item?.city} ${item?.state}, ${item?.zipCode}`}</p>
                        <div className="space-y-1">
                            <p className="font-semibold">Phone Number</p>
                            <p>{`${item?.mobile}`}</p>
                        </div>
                    </div>
                </div>
            ))}
            <Button
                onClick={handleSubmit}
                variant="outlined"
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
                disabled={!selectedAddress}
            >
                {buttonLoading ? "Loading..." : "Deliver Here"}
            </Button>
        </>
    );
};

export default AddressCard;
