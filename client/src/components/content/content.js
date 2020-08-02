import React, { Component } from 'react'
import Card from '../card/card'
import './content.css'
import axios from "axios";

export default class Content extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             news : ["kek"]
        }
    }

    componentDidMount(){
        /* 
        Fetches the users ( currently serves no purpose)
        
        */
        axios
        .get("/api/news/users",{
            headers: {Accept: 'application/json' }
            }
        )
        .then(res => console.log(res.data)) // re-direct to login on successful register
        .catch(err => console.log(err))
    

        /* 
        Fetches the news using axios
        
        */

        /* axios
        .get("/api/news/retrieve",{
            headers: {Accept: 'application/json' }
            }
        )
        .then(res => {
            this.setState(
                { news:  [...res.data.articles] }
              )
        }) 
        .catch(err => console.log(err)) */

    }

    handleClick = () =>{
        axios
        .post("/api/news/insert",{
            headers: {Accept: 'application/json' }
            }
        )
        .then(res => {

        }) 
        .catch(err => console.log(err))

    }
    render() {
        let cardlist

        /* 
        Maps the news that were retrieved into a list
        
        */
        if (this.state.news){
            let news = this.state.news;
            cardlist = 
            <ul>
                {news.map((e,i)=>(
                    <li key={i}>
                    <Card 
                          key={i}
                          title={"test"} 
                          description = {"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation "}
                          image={'https://static.independent.co.uk/s3fs-public/thumbnails/image/2015/11/05/11/tnol8.jpg?w968h681'} 
                          theme={this.props.theme}/> 
                    </li>
                ))}
            </ul>
        }
        
        return (
            <div className="content">
                <div className="left">
                    {cardlist}

                </div>

                <div className="right">
                    <h2>Opinions</h2>
                    <Card image={'https://i.kym-cdn.com/entries/icons/original/000/027/435/E59625D2-FF44-429D-B33F-2D4FFF318811.jpeg'} theme={this.props.theme}> </Card>
                    <Card image={'https://i.kym-cdn.com/entries/icons/original/000/027/435/E59625D2-FF44-429D-B33F-2D4FFF318811.jpeg'} theme={this.props.theme}> </Card>
                    <Card image={'https://i.kym-cdn.com/entries/icons/original/000/027/435/E59625D2-FF44-429D-B33F-2D4FFF318811.jpeg'} theme={this.props.theme}> </Card>
                    <Card image={'https://i.kym-cdn.com/entries/icons/original/000/027/435/E59625D2-FF44-429D-B33F-2D4FFF318811.jpeg'} theme={this.props.theme}> </Card>

                </div>
            </div>
        )
    }
}

