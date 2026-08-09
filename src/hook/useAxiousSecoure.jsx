import axios from "axios";

const axiousSecoure = axios.create({
    baseURL : 'http://localhost:3000'
})

import React from 'react'

export const useAxiousSecoure = () => {
  return axiousSecoure ;
}
