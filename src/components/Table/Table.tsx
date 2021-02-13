import React from 'react';
import "./Table.css";


interface TableProps{
    tableData:any[];
    tableHeadCellNameList:string[];
    objectProps:string[];
}

//Табличка взята из старого проекта
const Table:React.FC<TableProps> = (props:TableProps)=>{
        const { tableData,tableHeadCellNameList,objectProps } = props;
        return <table className="dataTableContainer">
                <thead>
                    <tr>
                        {tableHeadCellNameList.map((cellName,index)=>{
                                return <th key={index}>{cellName}</th>
                        })}
                    </tr>
                </thead>
                <tbody>
                {tableData.map((data,index)=>{
                  return <tr key={data[index]}>
                        {objectProps.map((property,offset)=>{
                                return <td key={offset}>{data[property]}</td>
                        })}
                    </tr>
                })}
                </tbody>
        </table>
}

export default Table;



