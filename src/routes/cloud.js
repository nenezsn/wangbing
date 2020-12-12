import React from 'react';
import Js2WordCloud from 'js2wordcloud'
var echarts = require('echarts');
require('echarts-wordcloud');

function Index(props) {
    React.useEffect(() => {
        // var wc = new Js2WordCloud(document.getElementById('container'))
        // wc.setOption({
        //     tooltip: {
        //         show: true
        //     },
        //     list: [['谈笑风生', 80], ['谈笑风生', 80], ['谈笑风生', 70], ['谈笑风生', 70], ['谈笑风生', 60], ['谈笑风生', 60]],
        //     color: '#15a4fa'
        // })
        var chart = echarts.init(document.getElementById('container'));
        chart.setOption({
            series: [{
                type: 'wordCloud',
                shape: 'circle',
                left: 'center',
                top: 'center',
                width: '70%',
                height: '80%',
                right: null,
                bottom: null,
                sizeRange: [12, 60],
                rotationRange: [-90, 90],
                rotationStep: 45,
                gridSize: 8,
                drawOutOfBound: false,
                textStyle: {
                    normal: {
                        fontFamily: 'sans-serif',
                        fontWeight: 'bold',
                        color: function () {
                            return 'rgb(' + [
                                Math.round(Math.random() * 160),
                                Math.round(Math.random() * 160),
                                Math.round(Math.random() * 160)
                            ].join(',') + ')';
                        }
                    },
                    emphasis: {
                        shadowBlur: 10,
                        shadowColor: '#333'
                    }
                },
                data: [{
                    name: '哈哈1',
                    value: 22,
                    textStyle: {
                        normal: {},
                        emphasis: {}
                    }
                }, {
                    name: '哈哈2',
                    value: 22,
                    textStyle: {
                        normal: {},
                        emphasis: {}
                    }
                }, {
                    name: '哈哈3',
                    value: 44,
                    textStyle: {
                        normal: {},
                        emphasis: {}
                    }
                }, {
                    name: '哈哈4',
                    value: 22,
                    textStyle: {
                        normal: {},
                        emphasis: {}
                    }
                }, {
                    name: '哈哈5',
                    value: 22,
                    textStyle: {
                        normal: {},
                        emphasis: {}
                    }
                }, {
                    name: '哈哈6',
                    value: 22,
                    textStyle: {
                        normal: {},
                        emphasis: {}
                    }
                }, {
                    name: '哈哈7',
                    value: 22,
                    textStyle: {
                        normal: {},
                        emphasis: {}
                    }
                }]
            }]
        });
    }, [])
    return <div>
        <h3>首页</h3>
        <div id='container' style={{ width: 500, height: 500 }}></div>
    </div>
}
export default Index
