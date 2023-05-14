import {Text} from '@chakra-ui/react'

export const Title = (props) =>{
    return(
        <Text align='left' fontSize="xl" fontWeight='bold'>{props.name}</Text>
    )
}