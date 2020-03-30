/**
 * @author wb
 * @description 获得场景视频 h5 视频播放器
 */
import React from 'react';
import PropTypes from 'prop-types';
import appendQuery from 'append-query';
import PBUVIDEO from 'pbu-video-player'

const ccPlayerHost = 'https://p.bokecc.com/player'

class PBUVideoPlayer extends React.Component {
    player = {}
    intervalTime = null

    loadScript() {
        //先删掉之前的视频播放器节点
        if (this.refs[`domRef_${this.props.vid}`].hasChildNodes()) {
            this.refs[`domRef_${this.props.vid}`].removeChild(this.refs[`domRef_${this.props.vid}`].childNodes[0]);
        }

        const oScript = document.createElement('script');
        const scriptUrl = appendQuery(ccPlayerHost, {
            siteid: this.props.siteId,
            newversion: true,
        });
        oScript.type = 'text/javascript';
        oScript.async = true;
        oScript.src = scriptUrl;
        document.head.appendChild(oScript)

    }

    createVideo = () => {
        const config = {
            vid: this.props.vid,
            siteid: this.props.siteId,
            autoStart: this.props.autoStart,
            width: this.props.width,
            height: this.props.height,
            parentNode: this.refs[`domRef_${this.props.vid}`]
        }
        this.player = window.createCCH5Player(config)
    }

    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.vid !== this.props.vid;
    }

    componentDidUpdate() {
        this.loadScript();
    }

    componentDidMount() {
        this.loadScript()
        window.onCCH5PlayerLoaded = () => {
            console.log('onCCH5PlayerLoaded')
            this.createVideo();
        }
        window.on_CCH5player_play = () => {
            console.log('on_CCH5player_play')
            this.props.onStart()
            const totalDuration = this.player.getDuration();
            //计时器的频率：如果视频整个时长小于等于2分钟：总时长的20%；如果大于2分钟：固定2分钟；
            let intervalTime = 0;

            if (totalDuration > 120) {
                intervalTime = 120 * 1000;
            } else {
                intervalTime = totalDuration * 0.2 * 1000;
            }

            this.intervalTime = setInterval(() => {
                this.props.onCountFrequency(this.player.getPosition());
            }, intervalTime);
        }
        window.on_CCH5player_pause = () => {
            console.log('on_CCH5player_pause')
            this.props.onPause()
            window.clearInterval(this.intervalTime);
        }
        window.get_cc_verification_code =  (vid)=> {
            return this.props.onGetVerificationCode(vid);
        }
    }

    componentWillUnmount() {
        this.props.onPause()
        window.clearInterval(this.intervalTime);
    }
    render() {
        return <div ref={`domRef_${this.props.vid}`}></div>
    }
}


PBUVideoPlayer.propTypes = {
    /**
     * siteId
     */
    siteId: PropTypes.string.isRequired,

    /**
     * 视频唯一标识符
     */
    vid: PropTypes.string.isRequired,
    /**
     * 播放器宽度
     */
    width: PropTypes.number,
    /**
     * 播放器高度
     */
    height: PropTypes.number,
    /**
     * 是否自动播放，默认false
     */
    autoStart: PropTypes.bool,
    /**
     * 播放时按固定频率执行的回调
     * 计时器的频率：如果视频整个时长小于等于2分钟：总时长的20%；如果大于2分钟：固定2分钟；
     * @param currentPosition  当前播放的秒数
     */
    onCountFrequency: PropTypes.func,
    /**
     * 获取用于鉴权的验证码
     * @param {string} vid 视频id
     * @return {string}
     */
    onGetVerificationCode: PropTypes.func,
    /**
     * 视频开始
     * @return {string}
     */
    onStart: PropTypes.func,
    /**
     * 视频暂停
     * @return {string}
     */
    onPause: PropTypes.func,
}

PBUVideoPlayer.defaultProps = {
    vid: '',
    siteId: '',
    width: 600,
    height: 490,
    autoStart: false,
    onCountFrequency: (currentPosition) => {
        console.log('onCountFrequency ', currentPosition);
    },
    onGetVerificationCode: (vid) => {
        console.log('vid = ', vid);
        return vid;
    },
    onStart: () => { },
    onPause: () => { }

}

// export default PBUVideoPlayer
function Video (){
    return <div>1111</div>
}
export default Video