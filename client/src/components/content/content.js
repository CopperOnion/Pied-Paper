import React, { Component } from 'react'
import Card from '../card/card'
import Pagination from '../card/pagination'
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
            news: '',
            postsperpage: 20,
            currentpage: 1,
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
                /*the news route now returns a list of objects with keys
                        res.data = [
                            {
                                articles: "foo bar"
                                truefalse: 0 or 1
                                category: "general"
                                publish_date: ISO8601 format
                            }
                            ... and so on
                        ]
                    */
                this.setState(
                    { news: [...res.data] },
                    () => console.log(this.state)
                )
            })
            .catch(err => console.log(err))
    }

    clickHandler = (url) => {
        window.location = url
    }

    //Change page 
    paginate = (page) => {
        console.log(page)
        this.setState({
            currentpage: page
        })
    }

    //Scroll to the top 
    scrollup = ()=>{
        window.scrollTo(0, 0);

    }
    render() {
        let cardlist = <ul></ul>
        if (this.state.news) {
            let news = this.state.news;
            let indexLast = this.state.currentpage * this.state.postsperpage
            let indexFirst = indexLast - this.state.postsperpage
            news = news.slice(indexFirst, indexLast);
            cardlist =
                <ul>
                    {news.map((e) => (
                        <li key={e.articles.title} >
                            <a href={e.articles.url}>
                                <Card title={e.articles.title}
                                    publication={e.articles.source.name}
                                    description={e.articles.description}
                                    image={'https://1.bp.blogspot.com/-xrbmj2o-Vq8/XmH-CVY9mTI/AAAAAAAAAAs/J2LdsfRnhHchXuDuQyCcKLCqcSgFCwQNACLcBGAsYHQ/s1600/6.jpg'}
                                    theme={this.props.theme}
                                    publishdate={parseDate(e.publish_date)}
                                    category={e.category} 
                                />
                            </a>
                        </li>
                    ))}
                </ul>

        }

        return (
            <div className="content">
                <div className="left">
                  
                    {cardlist}    
                    <Pagination 
                        postsPerPage={this.state.postsperpage} 
                        totalPosts={this.state.news.length} 
                        paginate = {this.paginate}
                        scrollup = {this.scrollup}
                    />

                </div>

                <div className="right">
                    <Opinion
                        title={"Opinion"}
                        description={"Lorem ipsum dolor sit amet"}
                        image={'https://1.bp.blogspot.com/-xrbmj2o-Vq8/XmH-CVY9mTI/AAAAAAAAAAs/J2LdsfRnhHchXuDuQyCcKLCqcSgFCwQNACLcBGAsYHQ/s1600/6.jpg'}
                        theme={this.props.theme}
                    />
                    <Opinion
                        title={"Opinion"}
                        description={"Lorem ipsum dolor sit amet"}
                        image={'https://1.bp.blogspot.com/-xrbmj2o-Vq8/XmH-CVY9mTI/AAAAAAAAAAs/J2LdsfRnhHchXuDuQyCcKLCqcSgFCwQNACLcBGAsYHQ/s1600/6.jpg'}
                        theme={this.props.theme}
                    />

                    <Opinion
                        title={"Opinion"}
                        description={"Lorem ipsum dolor sit amet"}
                        image={'https://1.bp.blogspot.com/-xrbmj2o-Vq8/XmH-CVY9mTI/AAAAAAAAAAs/J2LdsfRnhHchXuDuQyCcKLCqcSgFCwQNACLcBGAsYHQ/s1600/6.jpg'}
                        theme={this.props.theme}
                    />  

                    <Opinion
                        title={"Opinion"}
                        description={"Lorem ipsum dolor sit amet"}
                        image={'https://1.bp.blogspot.com/-xrbmj2o-Vq8/XmH-CVY9mTI/AAAAAAAAAAs/J2LdsfRnhHchXuDuQyCcKLCqcSgFCwQNACLcBGAsYHQ/s1600/6.jpg'}
                        theme={this.props.theme}
                    />  
                </div>
            </div>
        )
    }
}

