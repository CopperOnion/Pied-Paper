import React, { Component } from 'react'
import Card from '../card/card'
import './content.css'


export default class Content extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             
        }
    }
    
    render() {
        return (
            <div className="content">
                <div className="left">
                    <Card image={'https://1.bp.blogspot.com/-xrbmj2o-Vq8/XmH-CVY9mTI/AAAAAAAAAAs/J2LdsfRnhHchXuDuQyCcKLCqcSgFCwQNACLcBGAsYHQ/s1600/6.jpg'} theme={this.props.theme}> </Card>
                    <Card image={'https://1.bp.blogspot.com/-xrbmj2o-Vq8/XmH-CVY9mTI/AAAAAAAAAAs/J2LdsfRnhHchXuDuQyCcKLCqcSgFCwQNACLcBGAsYHQ/s1600/6.jpg'} theme={this.props.theme}> </Card>
                    <Card image={'https://1.bp.blogspot.com/-xrbmj2o-Vq8/XmH-CVY9mTI/AAAAAAAAAAs/J2LdsfRnhHchXuDuQyCcKLCqcSgFCwQNACLcBGAsYHQ/s1600/6.jpg'} theme={this.props.theme}> </Card>
                    <Card image={'https://1.bp.blogspot.com/-xrbmj2o-Vq8/XmH-CVY9mTI/AAAAAAAAAAs/J2LdsfRnhHchXuDuQyCcKLCqcSgFCwQNACLcBGAsYHQ/s1600/6.jpg'} theme={this.props.theme}> </Card>
                    <Card image={'https://1.bp.blogspot.com/-xrbmj2o-Vq8/XmH-CVY9mTI/AAAAAAAAAAs/J2LdsfRnhHchXuDuQyCcKLCqcSgFCwQNACLcBGAsYHQ/s1600/6.jpg'} theme={this.props.theme}> </Card>

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

