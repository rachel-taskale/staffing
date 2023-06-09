import React, { useEffect, useState } from "react";
import {Button, Box} from "@chakra-ui/react";
export const SelectButton = (props) => {
    const [active, setActive] = useState(false)
    return(
        <Box border='1px solid #1D2127' borderRadius={5} px='8px' py='2px' bgColor={active?  'gray.300' : 'white.100' } onClick={()=>setActive(!active)}>{props.name}</Box>
    )
}