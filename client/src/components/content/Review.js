import React, { Component } from 'react'
import Card from '../card/card'

import axios from "axios";

import './review.css'


export default class Review extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             
        }
    }
    
    
    componentDidMount(){
       
    }
    render() {
        return (
            <div className="review">
                 
                <div className="left">
                    <h1>Review</h1>
                </div>

                <div className="right">
         
                </div>
            </div>
        )
    }
}

