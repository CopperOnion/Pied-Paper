import React, { Component } from 'react'

/* 
Importing components

*/
import Card from '../card/card'
import Pagination from '../card/pagination'
import Opinion from '../card/opinion'

/* 
Redux related stuff

*/
import { withRouter } from "react-router";
import { connect } from "react-redux";


/* 
Data fetching stuff

*/
import './content.css'
import axios from "axios";

/* 
time menu
*/
import TimeMenu from "../searchfilters/timefilter"
import SortMenu from "../searchfilters/sortfilter"



/* 
Date parser

*/

function parseDate(date) {
    const MM = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

    const xx = date.replace(
        /(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):\d{2}.\d{3}Z/,
        function ($0, $1, $2, $3, $4, $5, $6) {
            return "Published: " + MM[$2 - 1] + " " + $3 + ", " + $1 + " / " + $4 % 12 + ":" + $5 + (+$4 > 12 ? " PM" : " AM") + "  UTC"
        })

    return xx
}


class Content extends Component {
    constructor(props) {
        super(props)
        this.child = React.createRef();

        this.state = {
            news: '',
            postsperpage: 20,
            currentpage: 1,
        }


    }

    componentDidMount() {

        //GET request to express server for the NEWS API to return new articles
        axios
            .get("/api/news/retrieveall", {
                headers: { Accept: 'application/json' }
            }
            )
            .then(res => {
                this.setState(
                    /*the news route returns an array of objects with keys	
                        res.data = [	
                            {	
                                articles: {"foo bar"},
                                truefalse: 0 or 1,
                                category: "general",
                                publish_date: ISO8601 format,
                                url: "http://foo.bar",
                                user_true: 12345,
                                user_false: 12345
                            }	
                            ... and so on	
                        ]	
                    */
                    { news: [...res.data] },
                    () => console.log(this.state)
                )
            })
            .catch(err => console.log(err))

        /* 
            Testing the API connection to the model
            check console log to see the data
        */

        axios
            .post("/api/news/runmodel", {
                headers: { Accept: 'application/json' }
            }
            )
            .then(res => console.log(res.data))
            .catch(err => console.log(err))
    }

    componentWillReceiveProps(nprops) {
        console.log(this)

        if (nprops.topic) {
            //GET request to express server for the NEWS API to return new articles
            //FIXME: NO longer a POST request, but a GET request with query params
            axios
                .get(`/api/news/retrieve`, {
                    headers: { Accept: 'application/json' },
                    params: {
                        category: nprops.topic.topic,
                        range: nprops.topic.range,
                        sort: nprops.topic.order
                    }
                }
                )
                .then(res => {
                    this.setState(
                        {
                            news: [...res.data],
                            currentpage: 1
                        },
                        () => {
                            this.child.current.reset()
                            console.log(this.state);
                            window.scrollTo(0, 0);
                        }
                    )
                })
                .catch(err => console.log(err))
        }
    }

    showmore = (index) => {
        var element = document.getElementsByClassName(index);
        element[0].classList.remove("notdisplayed");
        element[0].classList.add("displayed");
    }

    showless = (index) => {
        var element = document.getElementsByClassName(index);
        element[0].classList.remove("displayed");
        element[0].classList.add("notdisplayed");
    }

    //handler for user voting on articles
    uservote = (votetype, url) => {
        axios
            .post('/api/news/uservote', {
                headers: { Accept: 'application/json' },
                params: {
                    url: url,
                    type: votetype
                }
            })
            .then(res => {
                /*
                    res = {
                        user_true: 123,
                        user_false: 123
                    }
                */
                console.log(res)
            })
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
                    {news.map((e, i) => (
                        <li onMouseOver={() => this.showmore("attached" + i)} onMouseOut={() => this.showless("attached" + i)} key={i} >
                            <a href={e.articles.url} target="_blank">
                                <Card title={e.articles.title}
                                    description={e.articles.description}
                                    image={'https://assets-jpcust.jwpsrv.com/thumbnails/rytmbwxn-720.jpg'}
                                    theme={this.props.theme}
                                />
                            </a>
                            <div className={`attached` + i + ' notdisplayed'}>
                                <h6>{parseDate(e.publish_date)}</h6>
                                <h6>Do you think this article was True or False?</h6>
                                <button onClick={this.uservote("user_true", e.url)}>True</button>
                                <button onClick={this.uservote("user_false", e.url)}>False</button>
                                {/*                             
                                Don't know if we need these anymore
                                <h4 onMouseOver={() => this.showmore("source" + i)} >Hover to see source</h4>
                                <h4 className={`source` + i + ' notdisplayed'}>{e.articles.source.name}</h4> 
                            
                                */}
                            </div>
                        </li>
                    ))}
                </ul>
        }

        /* 
        TODO: Add a meta analysis factor: 
        Do users agree with the take of the ML? display the results
        
        TODO: Add a label at the top of cardlist : ALL news, TECHNOLOGY NEWS ... etc
        */
        return (
            <div className="content">
                <div className="left">
                    <div className='optionselector'>
                        <TimeMenu />
                        <SortMenu />

                    </div>
                    {cardlist}
                    <Pagination
                        ref={this.child}
                        postsPerPage={this.state.postsperpage}
                        totalPosts={this.state.news.length}
                        paginate={(page) => { this.setState({ currentpage: page }) }}
                        scrollup={() => { window.scrollTo(0, 0); }}
                    />

                </div>

           
            </div>
        )
    }
}


const mapStateToProps = state => ({
    topic: state.topic,
    order: state.order,
    range: state.range
})

export default connect(
    mapStateToProps,
    {}
)(withRouter(Content));

