import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';


const useStyles = makeStyles((theme) => ({
  root: {
    '& > * + *': {
     
    },
    marginTop: '3vh',
    marginBottom: '3vh',
    display:'flex',
    alignItems:'center',
    justifyContent: 'center'
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 150,
  },
  selector:{
    marginRight:'1vw'
  }
}));

export default function PaginationControlled({postsPerPage, totalPosts , paginate, scrollup}) {
  const classes = useStyles();
  const pageTotal = Math.ceil(totalPosts/ postsPerPage)
  const [page, setPage] = React.useState(1);
  const handleChange = (event, value) => {
    setPage(value);
    paginate(value);
    scrollup();
  };

  return (
    <div className={classes.root}>

      {/* <div>
        <select classname={classes.selector} name="cars" id="cars">
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="20">20</option>
        </select>

        articles per page
      </div> */}

      <Pagination showFirstButton showLastButton shape="rounded" size="small" count={pageTotal} page={page} onChange={handleChange} />

      
      
    </div>
  );
}