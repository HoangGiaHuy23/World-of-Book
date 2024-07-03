import React from 'react'
import ProductDetailsComponent from '../../components/ProductDetailsComponent/ProductDetailsComponent'
import { useParams } from 'react-router-dom'

const ProductDetailsPage = () => {
  const {id} = useParams()
  return (
    <div style={{ height: '1000px', 'background-color': 'rgb(243, 251, 255)' }}>
      <ProductDetailsComponent idProduct={id}/>
    </div>
  )
}

export default ProductDetailsPage
