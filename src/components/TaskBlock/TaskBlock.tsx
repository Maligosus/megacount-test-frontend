import React from 'react';
import "./TaskBlock.css";

interface TaskBlockProps{
    title:string;
    children?:React.ReactNode;
};


const  TaskBlock:React.FC<TaskBlockProps>=(props:TaskBlockProps)=>{
const {title,children} =props;
        return <div className="taskBlock">
            <div className="taskTittle">{title}</div>
            <div className="taskContent">{children}</div>
        </div>;
}

export default TaskBlock;