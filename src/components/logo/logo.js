import React from 'react';
import LogoImg from './logo.png'
import './logo.css'

class Logo extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className='logo-container'>
        <img src={LogoImg} />
      </div>
    )
  }
}
export default Logo