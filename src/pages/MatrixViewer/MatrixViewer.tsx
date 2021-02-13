import React from 'react';
import "./MatrixViewer.css";

interface MatrixViewerProps{

};


interface MatrixViewerState{
    size:number;
    matrix:number[][];
};




class MatrixViewer extends React.Component<MatrixViewerProps,MatrixViewerState>{
    constructor(props:any){
        super(props);
        this.valueChanged = this.valueChanged.bind(this);
        this.state={
            size:0,
            matrix:[]
        };
    }
    componentDidMount():void{

    }
    valueChanged(evt:React.ChangeEvent<HTMLInputElement>):void{
        const { value } =evt.target;
        const matrixLen:number=parseInt(value);
        const newMatrix:number[][]= new Array<number[]>(matrixLen);
        for (let i:number=0;i<matrixLen;i++){
            newMatrix[i]=new Array<number>(matrixLen);
            for (let j:number=0;j<matrixLen;j++)
                newMatrix[i][j]=0;
        }
        const maxValue:number=Math.pow(matrixLen,2);
        let rowOffset:number=0;
        let columnOffset:number=1;
        let rowIndex:number=0;
        let columnIndex:number=0;
        for (let i:number=0;i<maxValue;i++)
        {
            newMatrix[rowIndex][columnIndex] = i + 1;
            let offsetSize:number = columnOffset ? columnIndex + columnOffset : rowIndex + rowOffset;
            if (offsetSize<0 || offsetSize === matrixLen 
                || newMatrix[rowIndex+rowOffset][columnIndex + columnOffset])
                [columnOffset,rowOffset] = [-rowOffset,columnOffset];
            columnIndex+=columnOffset;
            rowIndex+=rowOffset;
        }
        this.setState({
            matrix: newMatrix
        });
    }
    render():React.ReactNode{
        const { matrix, size } = this.state;
        matrix.map(array=>array.map(elem=>console.log(elem)));
        return <div className="container">
            <input type="number" className="numericUpDown" defaultValue={2} 
                                                            contentEditable={false} 
                                                            min={2} max={6} 
                                                            onChange={this.valueChanged}/>
            < div className="matrixWrapper">
                    {matrix.map((array,rowIndex)=>{
                        return <div key={rowIndex} className="matrixRow">{
                            array.map((cell,columnIndex)=>{
                               return <div key={columnIndex} className="matrixCell">{cell}</div>
                            })
                        }</div>
                    })}
            </div>
        </div>;
    }
}

export default MatrixViewer;