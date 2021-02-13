import React from 'react';
import "./GeneratorViewer.css";

interface GeneratorViewerProps{

};

interface GeneratorViewerState{

};

function Generator(start?: number,step?: number):()=>number{
    let countGeneratorStart=start || 0;
    let countGeneratorStep=step || 1;
    return function(){
        return countGeneratorStart+=countGeneratorStep;
    }
}



class GeneratorViewer extends React.Component<GeneratorViewerProps,GeneratorViewerState>{
    private arrayOne:React.ReactNode[]=[];
    private arrayTwo:React.ReactNode[]=[];
    constructor(props:GeneratorViewerProps){
        super(props);
        const generator:()=>number=Generator(5,4);
        const generator2:()=>number=Generator(12,1);
        for (let i:number=0;i<6;i++)
            this.arrayOne.push(<td key={i}>{generator()}</td>);
        for (let i:number=0;i<6;i++){
            this.arrayTwo.push(<td key={i}>{generator2()}</td>)
        }
    }
    render():React.ReactNode{
        return <table className="tableGenContainer">
                    <tbody>
                        <tr>{this.arrayOne}</tr>
                        <tr>{this.arrayTwo}</tr>
                    </tbody>
               </table>
    }

}

export default GeneratorViewer;