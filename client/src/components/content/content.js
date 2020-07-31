import React, { Component } from 'react'
import Card from '../card/card'
import './content.css'
import axios from "axios";

export default class Content extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             news : ''
        }
    }

    componentDidMount(){
        axios
        .get("/api/news/users",{
            headers: {Accept: 'application/json' }
            }
        )
        .then(res => console.log(res.data)) // re-direct to login on successful register
        .catch(err => console.log(err))
    
        axios
        .get("/api/news/retrieve",{
            headers: {Accept: 'application/json' }
            }
        )
        .then(res => {
            this.setState(
                { news:  [...res.data.articles] },
                () => console.log( this.state)
              )
        }) 
        .catch(err => console.log(err))

    }
    render() {
        let cardlist
        if (this.state.news){
            let news = this.state.news;
            console.log(news)

            cardlist = 
            <ul>
                {news.map((e)=>(
                    <li key={e.source}>
                    <Card title={e.title} 
                          description = {e.description}
                          image={'https://1.bp.blogspot.com/-xrbmj2o-Vq8/XmH-CVY9mTI/AAAAAAAAAAs/J2LdsfRnhHchXuDuQyCcKLCqcSgFCwQNACLcBGAsYHQ/s1600/6.jpg'} 
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

