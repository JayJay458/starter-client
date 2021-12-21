import { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import EditStudentView from '../views/EditStudentView';
import { editStudentThunk, fetchStudentThunk } from '../../store/thunks';


class EditStudentContainer extends Component {
    constructor(props){
        super(props);
        this.state = {
          firstname: "", 
          lastname: "", 
          campusId: null,
          email: "",  
          redirect: false, 
          redirectId: null
        };
    }
    componentDidMount(){
        this.props.fetchStudent(this.props.match.params.id);
    }
    handleChange = event => {
      this.setState({
        [event.target.name]: event.target.value
      });
    }

    handleSubmit = async (event,studentpassed) => {
        event.preventDefault();

        let student = {
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            campusId: this.state.campusId, 
            email: this.state.email, 
            gpa: this.state.gpa, 
            id: this.props.match.params.id
        };
        if(student.firstname==='')
        {
          student.firstname=studentpassed.firstname;
        }
        if(student.lastname==='')
        {
          student.lastname=studentpassed.lastname;
        }        
        if(student.campusId===null)
        {
        
         
          student.campusId=studentpassed.campusId;
        }        
        if(student.email==='')
        {
          student.email=studentpassed.email;
        }        
        if(student.gpa==='')
        {
          student.gpa=studentpassed.gpa;
        }
        
        let editStudent = await this.props.editStudent(student);

        this.setState({
          firstname: "", 
          lastname: "", 
          campusId: null, 
          email:"",
          gpa:0.0, 
          redirect: true, 
          redirectId: student.id
        });
    }

    componentWillUnmount() {
        this.setState({redirect: false, redirectId: null});
    }

    render() {
        if(this.state.redirect) {
          return (<Redirect to={`/student/${this.state.redirectId}`}/>)
        }
        return (
          <EditStudentView 
            handleChange = {this.handleChange} 
            handleSubmit={this.handleSubmit}    
            student={this.props.student}  
          />
        );
    }
}
const mapState= (state) => {
    return {
        student: state.student,
    };
};
const mapDispatch = (dispatch) => {
    return({
        editStudent: (student) => dispatch(editStudentThunk(student)),
        fetchStudent: (id) => dispatch(fetchStudentThunk(id))
    })
}

export default connect(mapState, mapDispatch)(EditStudentContainer);