import React from 'react'
import { Button } from 'antd'
var Draggable = require('Draggable');
import styles from './drag.less'
import Sortable from 'sortablejs'
class Task extends React.Component {
  instance = null
  setPosition = () => {
    this.instance.set(100, 100)
  }
  componentDidMount() {
    var element = document.getElementById('box');
    var options = {
      grid: 1,
      onDrag: () => { },
      onDragStart: () => {

      },
      onDragEnd: () => {

      },
    };
    this.instance = new Draggable(element, options);
  }
  render() {
    return (
      <div>
        <Button onClick={this.setPosition}>点击</Button>
        <div
          id='box'
          style={{ width: 100, height: 100, border: '1px solid black' }}>
        </div>
      </div>
    )
  }
}

class Task2 extends React.Component{
  componentDidMount(){
    const dom = document.getElementById('list')
    new Sortable(dom, {
      group: 'shared',
      animation: 150,
      draggable:'.item',
      sort:false,
      onChoose:()=>{
        console.log(1)
      }
    });
    const dom2 = document.getElementById('list2')
    new Sortable(dom2, {
      group: 'shared',
      animation: 150,
      onChoose:()=>{
        console.log(2)
      }
    });
  }
  render(){
    return <div className={styles.box}>
      <ul className={styles.list} id='list'>
        <li className='item'>1</li>
        <li className='item'>2</li>
        <li >3</li>
        <li className='item'>4</li>
        <li className='item'>5</li>
      </ul>
      <ul className={styles.list} id='list2'>
        <li>6</li>
        <li>7</li>
        <li>8</li>
        <li>9</li>
        <li>10</li>
      </ul>
    </div>
  }
}

export default Task2