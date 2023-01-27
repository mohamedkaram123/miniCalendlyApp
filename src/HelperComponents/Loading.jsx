import React from 'react';
import {useSpring,animated} from 'react-spring';
import './style.css';
import { Urls } from '../helper';
export default function Loading({setLoading}) {
    
  const animation = useSpring({
    from: !setLoading?{transform: 'translateY(30px)' }:{transform: 'translateY(-200px)' },
      to: !setLoading?{transform: 'translateY(-200px)' }:{ transform: 'translateY(30px)' },

  });
    


    
    return (
        <div className='center_ovelay'>
         <animated.div className="ball " style={animation}>
             <img src={Urls.public + "img/loading.gif" } style={{width:"60%"}} alt='loading' />
        </animated.div>
        </div>
        );
}