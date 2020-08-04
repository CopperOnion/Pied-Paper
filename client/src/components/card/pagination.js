import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Pagination from '@material-ui/lab/Pagination';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > * + *': {
     
    },
    marginTop: '3vh',
    display:'flex',
    alignItems:'center',
    justifyContent: 'center'
  },
}));

export default function PaginationControlled({postsPerPage, totalPosts , paginate}) {
  const classes = useStyles();
  const pageTotal = Math.ceil(totalPosts/ postsPerPage)
  const [page, setPage] = React.useState(1);
  const handleChange = (event, value) => {
    setPage(value);
    paginate(value)
  };

  return (
    <div className={classes.root}>
      <Pagination showFirstButton showLastButton shape="rounded" size="small" count={pageTotal} page={page} onChange={handleChange} />
    </div>
  );
}