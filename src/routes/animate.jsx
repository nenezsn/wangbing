import React from 'react'
import { Button } from 'antd'
import Tween from 'rc-tween-one'
import RcAnimate from 'rc-animate';
import QueueAnim from 'rc-queue-anim';
import Texty from 'rc-texty';
import styles from './animate.less'
import $ from 'jquery'


export default class Animate extends React.Component {
    state={
        classname:''
    }
    move=()=>{
        $('#item1').css({
            color: 'green',
        }).animate({
            left: 30,
            fontSize: '16px'
        })
    }
    keyframe=()=>{
        this.setState({
            classname:styles.item2
        })
        setTimeout(() => {
            this.setState({
                classname:''
            })
        }, 2000);
    }
    render() {
        return <div>
            <Button onClick={this.move}>jquery.animate</Button>
            <Button onClick={this.keyframe}>keyframe</Button>
            <div className={styles.box}>
                <div id='item1' className={styles.item1}></div>
                <div  className={this.state.classname}></div>
                <div  className={styles.item3}></div>
            </div>
        </div>
    }
}