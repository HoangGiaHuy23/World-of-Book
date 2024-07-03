import { useState } from 'react';

const useHoverEffect = () => {
  const [hoveredItem, setHoveredItem] = useState(null);

  const handleMouseEnter = (index) => {
    setHoveredItem(index);
  };

  const handleMouseLeave = () => {
    setHoveredItem(null);
  };

  return { hoveredItem, handleMouseEnter, handleMouseLeave };
};

export default useHoverEffect;
