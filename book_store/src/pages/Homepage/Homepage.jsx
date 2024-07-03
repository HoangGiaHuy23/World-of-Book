import React from 'react'
import SliderComponent from '../../components/SliderComponent/SliderComponent'
import ShoppingTrendsComponent from '../../components/ShoppingTrendComponent/ShoppingTrendComponent'
import FlashSalesComponent from '../../components/FlashSalesComponent/FlashSalesComponent'
import slider1 from '../../assets/images/slider1.jpg'
import slider2 from '../../assets/images/slider2.jpg'
import slider3 from '../../assets/images/slider3.jpg'

function HomePage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column',gap: '30px' }}>
      <SliderComponent arrImages={[slider1, slider2, slider3]} />
      <FlashSalesComponent />
      <ShoppingTrendsComponent />
    </div>
  )
}

export default HomePage