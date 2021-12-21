import PropTypes from "prop-types";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

import { Link } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
    textAlign: 'left',
    fontType: 'bold',
    fontFamily: 'Courier, sans-serif', 
    fontSize: '35px', 
    color: '#CDDC39'
  },
  appBar:{
    backgroundColor: '#11153e',
    shadows: ['none'],
  },
  greeting:{
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: 'white',
    width: "50%",
    margin: "auto",
  },
  links:{
    textDecoration: 'none',
  }

}));

const AllCampusesView = (props) => {
  const classes = useStyles();
  const {campuses, deleteCampus} = props;

  if (!props.allCampuses.length) {

    return(
    <div className={classes.root}>
    <AppBar position="static" elevation={0} className={classes.appBar}>
      <Toolbar>
      <Link className = {classes.title} to={'/'}>
          <Typography variant="h6" className={classes.title} color="inherit" >
            CRUD App
          </Typography>
          </Link>

        <Link className={classes.links} to={'/campuses'} >
          <Button variant="contained" color="primary" style={{marginRight: '10px'}}>
            All Campuses
          </Button>
        </Link>

        <Link className={classes.links} to={'/students'} >
          <Button variant="contained" color="primary">
            All Students
          </Button>
        </Link>
      </Toolbar>
    </AppBar>     <p>There are no campuses.</p>
    <Link to={`newcampus`}>
        <button>Add New Campus</button>
      </Link>
      </div>
    );
  }

  return (
    <div className={classes.root}>
      <AppBar position="static" elevation={0} className={classes.appBar}>
        <Toolbar>
        <Link className = {classes.title} to={'/'}>
          <Typography variant="h6" className={classes.title} color="inherit" >
            CRUD App
          </Typography>
          </Link>

          <Link className={classes.links} to={'/campuses'} >
            <Button variant="contained" color="primary" style={{marginRight: '10px'}}>
              All Campuses
            </Button>
          </Link>

          <Link className={classes.links} to={'/students'} >
            <Button variant="contained" color="primary">
              All Students
            </Button>
          </Link>
        </Toolbar>
      </AppBar>     
      <h1> Campuses: </h1> 
      {props.allCampuses.map((campus) => {
        return (
          <div> 
          <ul>
            <li key={campus.id} style={{display: 'inline-block'}}>
          <Link to={`/campus/${campus.id}`}>
            <h2>{campus.name}</h2>
          </Link>
          </li>
          {/* <li style={{display: 'inline-block'}}> &emsp;</li> */}
          <li key={campus.id + "t"}style={{display: 'inline-block'}}>
          &emsp;
          <button onClick={() => deleteCampus(campus.id)}>X</button> 
          </li>


          </ul>
          </div>
        );
      }
      // (
        // <div key={campus.id}>
        //   <Link to={`/campus/${campus.id}`}>
        //     <h1>{campus.name}</h1>
        //   </Link>
        //   <p>{campus.description}</p>
        // </div>
      // )
      )}   
      <div>
      <Link to={`/newcampus`}>
          <button>Add Campus</button>
        </Link>
      </div>  
    </div>
         

  );
};

AllCampusesView.propTypes = {
  allCampuses: PropTypes.array.isRequired,
};

export default AllCampusesView;