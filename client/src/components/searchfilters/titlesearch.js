import React, {useEffect ,useState} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

//state management
import { connect } from 'react-redux';
import { setSearchValue } from '../../actions'
import { useDispatch } from 'react-redux'


/* 
Add serach function + change coloring based on discrepancy metric

add search function
gradient indicates discrepancy metric
add some sort of data visualization
*/
const useStyles = makeStyles((theme) => ({
    root: {
      display:"flex",
      
      justifyContent:"flex-end",
      flex: 1

    },
    textfield:{
        verticalAlign:"baseline"

    }
  }));

function TitleSearch() {
    const classes = useStyles();
    const [searchval, setSearchval] = useState("")
    const dispatch = useDispatch()

    const handleChange = (e) =>{
        setSearchval(e.target.value)
    }

    /*  
    Whenever search bar input changes, the search results change
    */


    useEffect(() => {
        dispatch(setSearchValue(searchval));
        return () => {
            
        }
    }, [searchval])

    return (
        <div className={classes.root}>
            <TextField 
                id="standard-basic" 
                label="Search title" 
                className={classes.textfield}
                onChange={handleChange}
            />
        
        </div>
    )
}

//brings the state into the component to be used as props
const mapStateToProps = state => ({
    search: state.topic.search
  })
  

//connects the component to the store and bridges the props importer as well
export default connect(
    mapStateToProps
  )(TitleSearch);