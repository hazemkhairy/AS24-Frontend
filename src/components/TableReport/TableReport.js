import React from 'react';
import Table from 'react-bootstrap/Table'
import './TableReport.css'
const TableReport = ({ report, reportName }) => {
    const getHeaders = () => {
        return <tr>
            {report.headers.map((header) => <th key={`${header}`}>{header}</th>)}
        </tr>
    }
    const getCells = () => {
        return report.report.map((row, rowIndex) => {
            return <tr key={`${reportName}-${rowIndex}`}>
                {report.headers.map(header => <td key={`${header}-${rowIndex}`}>
                    {row[header]}
                </td>
                )}
            </tr>
        })
        // console.log(report.data);
    }
    return <div className="p-2 m-1 mb-3 tableReportContainer" >
        <h6>{reportName}</h6>
        <Table bordered hover>
            <thead>
                {getHeaders()}
            </thead>
            <tbody>
                {getCells()}
            </tbody>
        </Table>
    </div>

}

export default TableReport;