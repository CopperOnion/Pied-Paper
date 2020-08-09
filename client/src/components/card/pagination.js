import React, {forwardRef , useImperativeHandle } from 'react';
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

/* 
  Pagination is built using the help of 
  @Pagination from material-ui/lab
  @React useref hook. ( Allows parent components to execute functions in the child component)
*/
const PaginationControlled = forwardRef((props,ref) => {
  const classes = useStyles();
  const pageTotal = Math.ceil(props.totalPosts/ props.postsPerPage)
  const [page, setPage] = React.useState(1);
  const handleChange = (event, value) => {
    setPage(value);
    props.paginate(value);
    props.scrollup();
  };


  // The component instance will be extended
  // with whatever you return from the callback passed
  // as the second argument
  useImperativeHandle(ref, () => ({
    reset() {
      setPage(1);
    }
  }));


  return (
    <div className={classes.root}>
      <Pagination showFirstButton showLastButton shape="rounded" size="small" count={pageTotal} page={page} onChange={handleChange} />
    </div>
  );
})

export default PaginationControlled