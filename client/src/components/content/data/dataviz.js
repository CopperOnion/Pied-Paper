import React , {useRef ,useEffect,useState} from 'react'
import Chart from "chart.js";
import axios from "axios";
// Load the core build.
var _ = require('lodash');

function Dataviz() {
    const refContainer = useRef(null);
    const [news, setNews] = useState([{source:"", truefalse:""}])
    useEffect(() => {
        axios
            .get(`/api/news/retrieve_all`, {
                headers: { Accept: 'application/json' }
            })
        .then(res=> _
            .chain([...res.data])
            .groupBy(e=> e.articles.source.id)
            .map((e,i) => [i,_.meanBy(e, p => parseFloat(p.truefalse) ),e.length])    
            .sortBy(e=> e[1])
            .value()     
        )
        .then(
            res=> {
                setNews(res)
            }
        )
        .catch(err => console.log(err))

        
        return () => {
            
        }
    }, [])


    useEffect(() => {

        const myChartRef = refContainer.current.getContext("2d");
        new Chart(myChartRef, {
            type: "line",
            data: {
                //Bring in data
                labels: _.map(news, e => e[0] ),
                datasets: [
                    {
                        label: "Pytorch metric (Based on source) 0 being the most truthful",
                        data: _.map(news, e => e[1] ),
                    }
                ]
            },
            options: {
                //Customize chart options
            }
        });

        return () => {
            
        }
    }, [news])

    return (
        <div id="my_dataviz" style={{  padding: "20vh 0"  }}>
            <canvas
                id="myChart"
                ref={refContainer}
            />
            This is a simple visualization of our data from the model. This will work in conjunction
            with the voting feature to display a sort of a loyalty metric: the discrepancy between 
            the ML truth and human opinions. 
        </div>
    )
}

export default Dataviz
