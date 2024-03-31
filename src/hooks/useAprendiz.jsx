import React, { useContext } from 'react'
import AprendizContext from '../context/AprendizProvider'

export default function useAprendiz() {
  return useContext(AprendizContext)
}
