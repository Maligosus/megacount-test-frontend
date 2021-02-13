import React from 'react';
import "./TableField.css";

interface TableFieldProps{
    test?:string;
}

interface TableFieldState{
    isInvert:boolean;
}

class TableField extends React.Component<TableFieldProps,TableFieldState>{
    private tableRef:React.RefObject<HTMLDivElement>|null;
    constructor(props:TableFieldProps){
        super(props);
        this.tableRef=React.createRef<HTMLDivElement>();
        this.clickEvent=this.clickEvent.bind(this);
        this.state={
            isInvert: false
        }
    }
    componentDidMount():void{
        
    }
    clickEvent(evt:React.MouseEvent<HTMLTableElement,globalThis.MouseEvent>):void{
        const target=(evt.target as HTMLTableElement);
         // При нажатии на границы ячеек класс присваивается таблице и таблица ломается
        if (target.nodeName!== "TD")
            return;
        if (target.className ==="tableCell")
            target.className="tableCellBlack"
        else
            target.className="tableCell";
    }
    resetField():void{
        const { isInvert } = this.state;
        this.setState({
            isInvert: !isInvert
        });
    }
    render():React.ReactNode{
        const { isInvert } = this.state;
        return <div ref={this.tableRef} className="tableContainer" onMouseDown={this.clickEvent}>
            <table className={`${isInvert?'invert':''}`}>
                <tbody>
                    <tr>
                        <td className="tableCell"></td>
                        <td className="tableCell"></td>
                        <td className="tableCell"></td>
                        <td className="tableCell"></td>
                        <td className="tableCell"></td>
                    </tr>
                    <tr>
                        <td className="tableCell"></td>
                        <td className="tableCell"></td>
                        <td className="tableCell"></td>
                        <td className="tableCell"></td>
                        <td className="tableCell"></td>
                    </tr>
                    <tr>
                        <td className="tableCell"></td>
                        <td className="tableCell"></td>
                        <td className="tableCell"></td>
                        <td className="tableCell"></td>
                        <td className="tableCell"></td>
                    </tr>
                    <tr>
                        <td className="tableCell"></td>
                        <td className="tableCell"></td>
                        <td className="tableCell"></td>
                        <td className="tableCell"></td>
                        <td className="tableCell"></td>
                    </tr>
                    <tr>
                        <td className="tableCell"></td>
                        <td className="tableCell"></td>
                        <td className="tableCell"></td>
                        <td className="tableCell"></td>
                        <td className="tableCell"></td>
                    </tr>
                </tbody>
            </table>
            <button className="resetButton" onClick={()=>this.resetField()}>Сброс</button>
        </div>
    }
}

export default TableField;