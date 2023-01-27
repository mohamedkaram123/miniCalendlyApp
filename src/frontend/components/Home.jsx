import React from 'react';
import { isAuth } from '../../helper';
export default function Home() {
    console.log({isAuth:isAuth()});
    return <div>
      <h1>Home</h1>
  </div>;
}
