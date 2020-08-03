import React, { Component } from 'react'
import Card from '../card/card'
import Cardtwo from '../card/cardtwo'
import Cardthree from '../card/cardthree'
import Cardfour from '../card/cardfour'

import Opinion from '../card/opinion'


import './content.css'
import axios from "axios";

function parseDate(date) {
    const MM = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

    const xx = date.replace(
        /(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):\d{2}.\d{3}Z/,
        function ($0, $1, $2, $3, $4, $5, $6) {
            return "Published: " + MM[$2 - 1] + " " + $3 + ", " + $1 + " / " + $4 % 12 + ":" + $5 + (+$4 > 12 ? " PM" : " AM") + "  UTC"
        })

    return xx
}

export default class Content extends Component {
    constructor(props) {
        super(props)

        this.state = {
            news: ''
        }
    }

    componentDidMount() {

        //GET request to express server for the NEWS API users?
        axios
            .get("/api/news/users", {
                headers: { Accept: 'application/json' }
            }
            )
            .then(res => console.log(res.data)) // re-direct to login on successful register
            .catch(err => console.log(err))

        //GET request to express server for the NEWS API to return new articles
        axios
            .get("/api/news/retrieve", {
                headers: { Accept: 'application/json' }
            }
            )
            .then(res => {
                this.setState(
                    /*the news route now returns a list of objects with keys
                        res.data = [
                            {
                                articles: "foo bar"
                                truefalse: 0 or 1
                                category: NULL for now
                                publish_date
                            }
                            ... and so on
                        ]
                    */
                    { news: [...res.data] },
                    () => console.log(this.state)
                )
            })
            .catch(err => console.log(err))

       
    }

    clickHandler = () =>{
        console.log("kek")
    }
    render() {
        let cardlist
        let test
        if (this.state.news) {
            let news = this.state.news;
            console.log(news)

            cardlist =
                <ul>
                    {news.map((e) => (
                        <li  key={e.articles.title} style= {{    marginRight: '2vw'}}>
                            <Card  title={e.articles.title}
                                description={e.articles.description}
                                image={'https://1.bp.blogspot.com/-xrbmj2o-Vq8/XmH-CVY9mTI/AAAAAAAAAAs/J2LdsfRnhHchXuDuQyCcKLCqcSgFCwQNACLcBGAsYHQ/s1600/6.jpg'}
                                theme={this.props.theme}
                                onClickCard={()=>this.clickHandler()}
                                publishdate={parseDate(e.publish_date)} />
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
                    <Opinion
                        title={"Opinion"}
                        description={"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. "}
                        image={'https://1.bp.blogspot.com/-xrbmj2o-Vq8/XmH-CVY9mTI/AAAAAAAAAAs/J2LdsfRnhHchXuDuQyCcKLCqcSgFCwQNACLcBGAsYHQ/s1600/6.jpg'}
                        theme={this.props.theme}
                    />
                    <Opinion
                        title={"Opinion"}
                        description={"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. "}
                        image={'https://1.bp.blogspot.com/-xrbmj2o-Vq8/XmH-CVY9mTI/AAAAAAAAAAs/J2LdsfRnhHchXuDuQyCcKLCqcSgFCwQNACLcBGAsYHQ/s1600/6.jpg'}
                        theme={this.props.theme}
                    />
                    <Opinion
                        title={"Opinion"}
                        description={"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. "}
                        image={'https://1.bp.blogspot.com/-xrbmj2o-Vq8/XmH-CVY9mTI/AAAAAAAAAAs/J2LdsfRnhHchXuDuQyCcKLCqcSgFCwQNACLcBGAsYHQ/s1600/6.jpg'}
                        theme={this.props.theme}
                    />
                    <Opinion
                        title={"Opinion"}
                        description={"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. "}
                        image={'https://1.bp.blogspot.com/-xrbmj2o-Vq8/XmH-CVY9mTI/AAAAAAAAAAs/J2LdsfRnhHchXuDuQyCcKLCqcSgFCwQNACLcBGAsYHQ/s1600/6.jpg'}
                        theme={this.props.theme}
                    />
                    <Opinion
                        title={"Opinion"}
                        description={"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. "}
                        image={'https://1.bp.blogspot.com/-xrbmj2o-Vq8/XmH-CVY9mTI/AAAAAAAAAAs/J2LdsfRnhHchXuDuQyCcKLCqcSgFCwQNACLcBGAsYHQ/s1600/6.jpg'}
                        theme={this.props.theme}
                    />

                </div>
            </div>
        )
    }
}

