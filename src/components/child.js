import React from 'react';
import Context from '../context'
export default function Index (){
   return <Context.Consumer>
    {values => <div>{values.age}</div>}
  </Context.Consumer>
}