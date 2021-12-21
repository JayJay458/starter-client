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
const StudentView = (props) => {
  const classes = useStyles();
  const { student } = props;
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

      <h1>{student.firstname + " " + student.lastname}</h1>
      {student.campus != null ?
      <Link to={`/campus/${student.campus.id}`}>
      <h3>{student.campus.name}</h3>
    </Link>
      // <h3>Campus: {student.campus.name}</h3>
      : 
      <h2> This student is not enrolled in a campus currently</h2>
      }
      <h3>{student.email}</h3>
      <img src={student.imageUrl} alt = ""/>
      {student.gpa != null ?
      <h3> GPA: {student.gpa} </h3> 
      : 
      <br></br>
      }
      <div>
      <Link to={`/editstudent/${student.id}`}>
          <button>Edit Student</button>
        </Link>
      </div>  
    </div>
  );

};

export default StudentView;
