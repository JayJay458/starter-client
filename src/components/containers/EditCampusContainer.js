import { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import EditCampusView from '../views/EditCampusView';
import { editCampusThunk, fetchCampusThunk } from '../../store/thunks';
import NewCampusView from '../views/NewCampusView';


class EditCampusContainer extends Component {
    constructor(props){
        super(props);
        this.state = {
          name: "", 
          description: "", 
          address: "",
          redirect: false, 
          redirectId: null
        };
    }
    // componentDidMount(){
    //     this.props.fetchCampus(this.props.match.params.id);
    // }
    handleChange = event => {
      this.setState({
        
        [event.target.name]: event.target.value
      });

    }

    handleSubmit = async (event,campuspassed) => {
        event.preventDefault();

        let campus = {
            name: this.state.name,
            description: this.state.description, 
            address: this.state.address, 
            id: this.props.match.params.id
        };
        if(campus.name==='')
        {
          campus.name=campuspassed.name;
        }
        if(campus.description==='')
        {
          campus.description=campuspassed.description;
        }
        if(campus.address==='')
        {

          campus.address=campuspassed.address;
        }

        let editCampus = await this.props.editCampus(campus);

        this.setState({
        name: "", 
        description: "", 
        address: "",
          redirect: true, 
          redirectId: campus.id
        });
    }

    componentWillUnmount() {
        this.setState({redirect: false, redirectId: null});
    }

    render() {
        if(this.state.redirect) {
          return (<Redirect to={`/campus/${this.state.redirectId}`}/>)
        }
        return (
          <EditCampusView 
            handleChange = {this.handleChange} 
            handleSubmit={this.handleSubmit}    
            campus={this.props.campus}  
          />
        );
    }
}
const mapState= (state) => {
    return {
        campus: state.campus,
    };
};
const mapDispatch = (dispatch) => {
    return({
        editCampus: (campus) => dispatch(editCampusThunk(campus)),
        // fetchCampus: (id) => dispatch(fetchCampusThunk(id))
    })
}

export default connect(mapState, mapDispatch)(EditCampusContainer);