import React from 'react';
import "./GenomStringViewer.css";

interface GenomStringViewerProps{

};

interface GenomStringViewerState{
    resultText:string;
};


class GenomStringViewer extends React.Component<GenomStringViewerProps,GenomStringViewerState>{
    constructor(props:GenomStringViewerProps){
        super(props);
        this.onTextChanged=this.onTextChanged.bind(this);
        this.onKeyDown = this.onKeyDown.bind(this);
        this.state={
            resultText:''
        };
    }
    rewriteGenomString(inputString:string):string{
        let newString:string='';
        let symbolCount:number=1;
        for (let i=0;i<inputString.length;i++)
            if (i!==length-1 && inputString[i] === inputString[i+1])
                symbolCount++;
            else
            {
                newString+=inputString[i]+symbolCount;
                symbolCount=1;
            }      
        return newString;
    };
    onTextChanged(evt:React.ChangeEvent<HTMLInputElement>):void{
        const {value} =evt.target;
        this.setState({
            resultText: this.rewriteGenomString(value)
        });
    }
    onKeyDown(evt:React.KeyboardEvent<HTMLInputElement>):void{
        if (evt.key === " ")
            evt.preventDefault();
            console.log("SPACE");
    }
    render():React.ReactNode{
        const { resultText } = this.state;
        return <div className="inputBoxContainer">
            <div className="inputWrapper">
                <label>Исходная строка</label>
                <input className="textInput" 
                        type="text" 
                        onChange={this.onTextChanged}
                        onKeyDown={this.onKeyDown}/>
            </div>
            <div className="inputWrapper">
                <label>Результат</label>
                <input className="textInput" 
                       type="text" 
                       readOnly={true} 
                       value={resultText}/>
            </div>
        </div>;
    }
}

export default GenomStringViewer;