import { SignIn, useUser} from "@clerk/clerk-react";
import { Box, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
import React, { useEffect } from 'react';


export default function LoginWrapper() {
    const { isSignedIn } = useUser();
    const navigate = useNavigate();

    useEffect(() => {
        if (isSignedIn) {
            navigate("/dashboard");
        }
    }, [isSignedIn, navigate]);

    return (
        <Container maxWidth="sm" sx={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Box>
                <SignIn />
            </Box>
        </Container>
    )
}