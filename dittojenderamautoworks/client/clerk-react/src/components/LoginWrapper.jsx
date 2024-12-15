import { SignIn, useUser} from "@clerk/clerk-react";
import { Box, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
import React, { useEffect } from 'react';
import { neobrutalism } from '@clerk/themes';
import logoImage from "../assets/JAAS.png";

export default function LoginWrapper() {
    const { isSignedIn } = useUser();
    const navigate = useNavigate();

    useEffect(() => {
        if (isSignedIn) {
            navigate("/dashboard");
        }
    }, [isSignedIn, navigate]); 

    return (
        <Container 
            maxWidth= {false} 
            sx={{ 
                height: '100vh', 
                width: '100vw',
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                backgroundColor: '#ebe4e4'
            }}
        >
            <Box>
                <SignIn
                    appearance={{
                        baseTheme: neobrutalism,
                        layout: {
                            logoImageUrl: logoImage, // Add your image path or URL here
                            logoPlacement: "inside", // Ensures the image is inside the card
                        },

                        variables: {
                            colorPrimary: '#bd212f',
                        },
                    }}
                /> 
            </Box>
        </Container>
    )
}