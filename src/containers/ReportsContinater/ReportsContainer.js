import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import TableReport from '../../components/TableReport/TableReport';
import './ReportsContainer.css'
const ReportsContainer = ({ Reports, clearReports }) => {
    if (!Reports) { return null }


    const getMostContactedListingsPerMonth = () => {
        return Reports.topMostContactedListingsPerMonth.reports.map(
            report => {

                return <TableReport report={report.report} reportName={report.date} />
            }
        )
    }
    return <Container fluid>

        <Row className=" mb-3 justify-content-md-center">
            <Col xs={12} md={4}>

                <TableReport report={Reports.averageListingSellingPrice} reportName="Average Listing Selling Price per Seller Type" />
                <TableReport report={Reports.averagePriceOfTheMostContactedListings} reportName="Average price of the 30% most contacted listings" />
                <TableReport report={Reports.percentualDistributionByMake} reportName="Percentual distribution of available cars by Make" />
            </Col>

            <Col xs={12} md={8} className="d-flex flex-column">
                <div className="ListingPerMonthContainer">
                    <h6>The Top 5 most contacted listings per Month</h6>
                    <div className="scrollDiv">

                        {getMostContactedListingsPerMonth()}
                    </div>
                </div>
            </Col>
        </Row>
        <Row className="justify-content-md-center">

            <input type="button" className="btn btn-danger" onClick={clearReports} value="Clear Reports" />
        </Row>
    </Container>
}

export default ReportsContainer;