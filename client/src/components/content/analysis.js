import React, { Component } from 'react'
import './analysis.css'
import { VictoryBar } from 'victory';

const data = [
    {quarter: 1, earnings: 13000},
    {quarter: 2, earnings: 16500},
    {quarter: 3, earnings: 14250},
    {quarter: 4, earnings: 19000}
  ];

export class Analysis extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             
        }
    }
    
    render() {

        return (
            <div className="analysis">
                
                <div className="text">
                    <h1>Analysis</h1>
                    <VictoryBar
                        data={data}
                        // data accessor for x values
                        x="quarter"
                        // data accessor for y values
                        y="earnings"
                    />
                </div>
            </div>
        )
    }
}

export default Analysis
