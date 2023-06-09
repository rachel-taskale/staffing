import { useState } from "react"
import { Box, Button } from '@chakra-ui/react'
export const CButton = (props) => {
    return(
        <Button border='1px solid #1D2127' backgroundColor='white' size='sm' key={props.buttonName}>
            <Box>{props.buttonName}</Box>
        </Button>
    )
}