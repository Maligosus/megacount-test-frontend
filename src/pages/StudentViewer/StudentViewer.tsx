import React from 'react';
import "./StudentViewer.css";
import Table from '../../components/Table';
import { Student } from '../../helpers/Student';
import Calendar from 'rc-calendar';



interface StudentViewerProps{

}

interface StudentViewerState{
    studentList:Student[];
    datePicked:string;
    route:string;
}

const cellHeads:string[]=["id","Имя","Фамилия","Отчество","Дата рождения","Курс","Факультет"];
const propNames:string[]=["id","firstName","lastName","patronymic","dateOfBirth","courseNumber","facultyName"];

class StudentViewer extends React.Component<StudentViewerProps,StudentViewerState>{
    constructor(props:StudentViewerProps){
        super(props);
        this.state={
            studentList:[],
            datePicked:new Date().toLocaleDateString(),
            route:"all"
        }
        this.onChange=this.onChange.bind(this);
        this.onDatePicked=this.onDatePicked.bind(this);
        this.onTextChanged=this.onTextChanged.bind(this);

    }
    async getAllStudents():Promise<Student[]>{
        const response = await fetch("/all",{
            method:"GET",
            headers:{
                'Content-Type' : 'application/json',
                'Accept': 'application/json'
            }
        });
        return response.json();
    }
    async getStudentsByCourseNumber(courseNumber:number):Promise<Student[]>{
        const response = await fetch(`/courseNumber/${courseNumber}`,{
            method:"GET",
            headers:{
                'Content-Type' : 'application/json',
                'Accept': 'application/json'
            }
        });
        return response.json();
    }
    async getStudentsByFacultyName(facultyName:string):Promise<Student[]>{
        const response = await fetch(`/facultyName/${encodeURIComponent(facultyName)}`,{
            method:"GET",
            headers:{
                'Content-Type' : 'application/json',
                'Accept': 'application/json'
            }
        });
        return response.json();
    }
    async getStudentsByBirthdayLater(dayOfBirth:string):Promise<Student[]>{
        const response = await fetch(`/dateOfBirth/${dayOfBirth}`,{
            method:"GET",
            headers:{
                'Content-Type' : 'application/json',
                'Accept': 'application/json'
            }
        });
        return response.json();
    }
    componentDidMount():void{
        this.getAllStudents().then(response=>{
            response.map(student=>{
                student.dateOfBirth = student.dateOfBirth.split("T")[0];
            })
            this.setState({studentList:response});
        });
    }
    componentDidUpdate(prevProps:StudentViewerProps,prevState:StudentViewerState){
        
    }
    onChange(evt:React.ChangeEvent<HTMLSelectElement>){
        console.log(evt.target.value);
        this.setState({
            route : evt.target.value
        })
    }
    onDatePicked(evt:React.ChangeEvent<HTMLInputElement>){
        console.log(evt.target.value);
        this.getStudentsByBirthdayLater(evt.target.value).then(response=>{
            response.map(student=>{
                student.dateOfBirth = student.dateOfBirth.split("T")[0];
            })
            this.setState({studentList:response});
        });
    }   
    onTextChanged(evt:React.ChangeEvent<HTMLInputElement>){
        const { route } =this.state;
        switch(route){
            case 'all':
            this.getAllStudents().then(response=>{
                response.map(student=>{
                    student.dateOfBirth = student.dateOfBirth.split("T")[0];
                })
                this.setState({studentList:response});
            });
            break;
            case 'courseNumber':
                this.getStudentsByCourseNumber(parseInt(evt.target.value)).then(response=>{
                    response.map(student=>{
                        student.dateOfBirth = student.dateOfBirth.split("T")[0];
                    })
                    this.setState({studentList:response});
                });
            break;
            case 'facultyName':
                this.getStudentsByFacultyName(evt.target.value).then(response=>{
                    response.map(student=>{
                        student.dateOfBirth = student.dateOfBirth.split("T")[0];
                    })
                    this.setState({studentList:response});
                })
            break;
        }
    }
    getPattern():string{
        const {route} = this.state;
        switch (route){
            case "dateOfBirth":
                return "[0-9]{4}-[0-9]{2}-[0-9]{2}";
            case "facultyName":
                    return "[A-Za-zА-Яа-яЁё]";
            case "courseNumber":
                return "[0-9]+";
            case "all":
                return '';
            default:
                return '';
        }
    }
    render():React.ReactNode{
        const { studentList } = this.state;
        return <div className="studentList"><Table tableData={studentList}
                                                    tableHeadCellNameList={cellHeads}
                                                    objectProps={propNames}/>
                <div className="valueWrapper">
                <select className="selector"  onChange={this.onChange}>
                    <option value="all">Все студенты</option>
                    <option value="courseNumber">По номеру курса</option>
                    <option value="facultyName">По названию факультета</option>
                </select>
                <label>Значение</label>
                {<input className="textBox" type="text" name="textInput" onChange={this.onTextChanged}/>}
                <label>Родившиеся после </label>
                {<input type="date" name="dateInput" onChange={this.onDatePicked}/>}
                </div>
              </div>;
    }
}

export default StudentViewer;