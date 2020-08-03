import React, { Component } from 'react'
import Card from '../card/card'
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
    render() {
        let cardlist
        if (this.state.news) {
            let news = this.state.news;
            console.log(news)

            cardlist =
                <ul>
                    {news.map((e) => (
                        <li key={e.articles.source}>
                            <Card title={e.articles.title}
                                description={e.articles.description}
                                image={'https://1.bp.blogspot.com/-xrbmj2o-Vq8/XmH-CVY9mTI/AAAAAAAAAAs/J2LdsfRnhHchXuDuQyCcKLCqcSgFCwQNACLcBGAsYHQ/s1600/6.jpg'}
                                theme={this.props.theme}
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

