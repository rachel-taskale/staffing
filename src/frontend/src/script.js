// what funcitonality is needed
// matching process
// filtering process

import React, { useEffect, useState } from "react";

import axios from "axios";
import { response } from "express";


function matching(){

}

export const handleSubmit = (data) => {
    axios({
        method: "POST",
        url: "http://localhost:5000/api/staff/",
        data: data,
      })
        .then((res) => {
          console.log(res);
          console.log("added staff member");
          
        })
        .catch((err) => {
          console.log(err);
        });
    };


export const HandleUseEffect = () =>{
    const [responseArr, setResponseArray] = useState([])
    useEffect(() => {
            fetch("http://localhost:5000/api")
            .then((res) => {
                setResponseArray([res[0], res[1], res[3]])
            })
            .catch((err) => {
                console.log(err);
            });
        }, []);
    console.log(responseArr)
    return responseArr
}