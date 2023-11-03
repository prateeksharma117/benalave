import { Stepper, Button, Group, MantineProvider } from '@mantine/core';
import React, { useState } from "react";

const steps = [
    "Placed",
    "Confirmed",
    "Shipped",
    "Delivered",
];


const OrderTracker = ({ activeStep }) => {

    return (
        <>
            <div className="">
                <MantineProvider>
                    <Stepper color={`${activeStep===5?"red":activeStep===4?"green":"blue"}`} active={activeStep}>
                        {steps.map((stepName, i) => (
                            <Stepper.Step  key={i} label={stepName}/>
                        ))}
                    </Stepper>
                </MantineProvider>
            </div>
        </>
    );
};

export default OrderTracker;
