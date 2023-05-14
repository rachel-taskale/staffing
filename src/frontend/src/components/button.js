import { useState } from "react"
import { Box, Button } from '@chakra-ui/react'
export const CButton = (props) => {
    return(
        <Button size='sm' key={props.buttonName}>
            <Box>{props.buttonName}</Box>
        </Button>
    )
}