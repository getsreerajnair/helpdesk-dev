import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField'
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import axios from 'axios';

export class login extends Component {
    constructor(){
        super()
        this.state = {
            email:'',
            password:'',
            loading:false,
            companies:[],
            errors:{}
        }
    }
    componentDidMount(){
        let companiesRegistered = []
        axios.get('/companies')
        .then(res =>{
            console.log(res.data)
            res.data.forEach(company => {
                companiesRegistered.push(company);
            });
            this.setState({companies:companiesRegistered});
            console.log('companies');
            console.log(companiesRegistered);
            console.log(this.state.companies);
        })
    }
    handleChange = event =>{
        this.setState({
            [event.target.name] :event.target.value
        });
    }
    handleSubmit = event =>{
        event.preventDefault();
        this.setState({loading:true});
        const userData = {
            email:this.state.email,
            password:this.state.password,
            confirmPassword:this.state.confirmPassword,
            name:this.state.name,
            company:this.state.company
        }
        axios.post('/signup',userData)
        .then( res=>{
            console.log(res.data);
            localStorage.setItem('AuthIDToken', `Bearer ${res.data.token}`);
            this.setState({loading:false});
            this.props.history.push('/');
        })
        .catch(err=>{
            console.log(err);
            this.setState({
                errors:err.response.data,
                loading:false
            })
        })
    }
    render() {
        const {errors,loading} = this.state;
        return (
            <div className="login-wrapper">
               <h1>Sign Up</h1>
               <form noValidate onSubmit={this.handleSubmit}>
               <TextField className="form-control"  id="name" name="name" type="name" label="Name" value={this.state.name} onChange={this.handleChange} error={errors.name ? true : false} helperText={errors.name} fullWidth />
                <TextField className="form-control" id="email" name="email" type="email" label="Email" value={this.state.email} onChange={this.handleChange} helperText={errors.email} error={errors.email ? true : false} fullWidth/>
                <TextField className="form-control" id="password" name="password" type="password" label="Password" value={this.state.password} onChange={this.handleChange} error={errors.password ? true : false} helperText={errors.password} fullWidth />
                <TextField className="form-control" id="confirmPassword" name="confirmPassword" type="password" label="confirmPassword" value={this.state.confirmPassword} onChange={this.handleChange} error={errors.confirmPassword ? true : false} helperText={errors.confirmPassword} fullWidth />
                <InputLabel id="company-label">Company</InputLabel>

                <Select fullWidth
          labelId="company-label"
          id="company" name="company"
          value={this.state.company}
          onChange={this.handleChange}
        >
        {this.state.companies.map(company =>{
          return <MenuItem value={company}>{company}</MenuItem>  
        })}
          
        </Select>
                <Button className="login-btn" type="submit" variant="contained" color="primary">Submit</Button>
               </form>
            </div>
        )
    }
}

export default login
