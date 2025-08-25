import React from 'react';
import styles from './Button.module.css';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'medium', 
  onClick, 
  disabled = false,
  type = 'button',
  ...props 
}) => {
  // Convert variant and size to camelCase class names
  const variantClass = `btn${variant.charAt(0).toUpperCase() + variant.slice(1)}`;
  const sizeClass = `btn${size.charAt(0).toUpperCase() + size.slice(1)}`;
  
  const buttonClasses = [
    styles.btn,
    styles[variantClass],
    styles[sizeClass]
  ].filter(Boolean).join(' ');

  return (
    <button
      type={type}
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;