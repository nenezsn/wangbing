import React from 'react';
import { Table } from 'antd';
class Index extends React.Component {
    render() {
        const data = [
            {
                courseType: '张三',
                number: 1,
                courseCode: 'shde',
                courseName: '马克思',
                courseKind: '理论课',
                learnScore: '4',
                totalTime: '10',
                trainTime:'5',
                examType:"考试",
                commad:'1,2'
            },
            {
                courseType: '李四',
                number: 1,
                courseCode: 'shde',
                courseName: '马克思',
                courseKind: '理论课',
                learnScore: '4',
                totalTime: '10',
                trainTime:'5',
                examType:"考试",
                commad:'1,2'
            },
            {
                courseType: '王五',
                number: 1,
                courseCode: 'shde',
                courseName: '马克思',
                courseKind: '理论课',
                learnScore: '4',
                totalTime: '10',
                trainTime:'5',
                examType:"考试",
                commad:'1,2'
            },
            {
                courseType: '赵六',
                number: 1,
                courseCode: 'shde',
                courseName: '马克思',
                courseKind: '理论课',
                learnScore: '4',
                totalTime: '10',
                trainTime:'5',
                examType:"考试",
                commad:'1,2'
            },
            {
                total:111
            }
        ]
        const columns = [
            {
                title: '课程类型',
                dataIndex: 'courseType',
                colSpan:2,
                render:(text,record,index)=>{
                    const obj = {
                        children: index == 0 ?'公共必修' : '公共选修',
                        props: { },
                      };
                      if(index == 0){
                        obj.props.rowSpan = 4
                      }else{
                        obj.props.rowSpan = 0
                      }
                      if(index == 4){
                          obj.children = '小记'
                          obj.props.colSpan = 6
                          obj.props.rowSpan = 1
                      }
                      return obj
                }
            },
            {
                colSpan: 0,
                render:(text,record,index)=>{
                    const obj = {
                        children: index  ==  0 ?'公共基础课' : '专业群共享课',
                        props: {},
                      };
                      if(index %2 == 0){
                        obj.props.rowSpan = 2
                      }else{
                        obj.props.rowSpan = 0
                      }
                      if(index == 4){
                          obj.props.colSpan = 0
                      }
                      return obj
                }
            },
            {
                title: '序号',
                dataIndex: 'number',
                render:(text,record,index)=>{
                    const obj = {
                        props: {},
                      }; 
                      if(index == 4){
                        obj.props.colSpan = 0
                    }
                    return obj
                }
            },
            {
                title: '课程代码',
                dataIndex: 'courseCode',
                render:(text,record,index)=>{
                    const obj = {
                        props: {},
                      }; 
                      if(index == 4){
                        obj.props.colSpan = 0
                    }
                    return obj
                }
            },
            {
                title: '课程名称',
                dataIndex: 'courseName',
                render:(text,record,index)=>{
                    const obj = {
                        props: {},
                      }; 
                      if(index == 4){
                        obj.props.colSpan = 0
                    }
                    return obj
                }
            },
            {
                title: '课程类型',
                dataIndex: 'courseKind',
                render:(text,record,index)=>{
                    const obj = {
                        props: {},
                      }; 
                      if(index == 4){
                        obj.props.colSpan = 0
                    }
                    return obj
                }
            },
            {
                title: '学分',
                dataIndex: 'learnScore'
            },
            {
                title: '教学学时',
                children: [
                    {
                        title: '总学时',
                        dataIndex: 'totalTime'
                    },
                    {
                        title: '实践学时',
                        dataIndex: 'trainTime'
                    }
                ]
            },
            {
                title: '各学期教学课时分配（请填写此列）',
                children: [
                    { title: '1', children: [{ title: 7 }] },
                    { title: '2', children: [{ title: 8 }] },
                    { title: '3', children: [{ title: 9 }] },
                    { title: '4', children: [{ title: 10 }] },
                    { title: '5', children: [{ title: 11 }] },
                    { title: '6', children: [{ title: 12 }] },
                ]
            },
            {
                title: '考核方式',
                dataIndex: 'examType',
                render:(text,record,index)=>{
                    const obj = {
                        props: {},
                      }; 
                      if(index == 4){
                        obj.props.colSpan = 2
                    }
                    return obj
                }
            },
            {
                title: '推荐学期',
                dataIndex: 'commad',
                render:(text,record,index)=>{
                    const obj = {
                        props: {},
                      }; 
                      if(index == 4){
                        obj.props.colSpan = 0
                    }
                    return obj
                }
            },


        ]
        return <div style={{ width: 1100, margin: '0 auto' }}>
            <Table columns={columns} dataSource={data} bordered />
        </div>
    }
}
export default Index