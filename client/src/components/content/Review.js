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
    
    render() {

        axios
            .get("/api/getList")
            .then(res => console.log(res)) // re-direct to login on successful register
            .catch(err => console.log(err))
            

        return (
            <div className="review">
                <div className="left">
                    <Card image={'https://1.bp.blogspot.com/-xrbmj2o-Vq8/XmH-CVY9mTI/AAAAAAAAAAs/J2LdsfRnhHchXuDuQyCcKLCqcSgFCwQNACLcBGAsYHQ/s1600/6.jpg'} theme={this.props.theme}> </Card>
                    <Card image={'https://1.bp.blogspot.com/-xrbmj2o-Vq8/XmH-CVY9mTI/AAAAAAAAAAs/J2LdsfRnhHchXuDuQyCcKLCqcSgFCwQNACLcBGAsYHQ/s1600/6.jpg'} theme={this.props.theme}> </Card>
        
                </div>

                <div className="right">
                    <h2>Opinions</h2>
                    <Card image={'https://i.kym-cdn.com/entries/icons/original/000/027/435/E59625D2-FF44-429D-B33F-2D4FFF318811.jpeg'} theme={this.props.theme}> </Card>

                </div>
            </div>
        )
    }
}

