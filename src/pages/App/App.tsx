import React from 'react';
import TaskBlock from '../../components/TaskBlock';
import "./App.css";
import FirstTask from '../GenomStringViewer';
import SecondTask from '../MatrixViewer';
import ThirdTask from '../TableField';
import FourthTask from '../GeneratorViewer';
import FiveTask from '../StudentViewer'

interface AppProps{

};

interface AppState{

};

class App extends React.Component<AppProps,AppState>{
    constructor(props:AppProps){
        super(props);
    }
    render():React.ReactNode{
        return <div className="mainApp">
            <TaskBlock title="Задание 1"><FirstTask/></TaskBlock>
            <TaskBlock title="Задание 2"><SecondTask/></TaskBlock>
            <TaskBlock title="Задание 3"><ThirdTask/></TaskBlock>
            <TaskBlock title="Задание 4"><FourthTask/></TaskBlock>
            <TaskBlock title="Задание 5"><FiveTask/></TaskBlock>
        </div>;
    }
}

export default App;