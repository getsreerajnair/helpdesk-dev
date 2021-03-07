import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button';
import axios from 'axios';

export class login extends Component {
    constructor(){
        super()
        this.state = {
            email:'sree@example.com',
            password:'s12345',
            loading:false,
            errors:{}
        }
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
            password:this.state.password
        }
        axios.post('/login',userData)
        .then( res=>{
            console.log(res.data);
            localStorage.setItem('AuthIDToken', `Bearer ${res.data.token}`);
            this.setState({loading:false});
            this.props.history.push('/');
        })
        .catch(err=>{
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
               <h1>Login</h1>
               <form noValidate onSubmit={this.handleSubmit}>
                <TextField id="email" name="email" type="email" label="Email" value={this.state.email} onChange={this.handleChange} helperText={errors.email} error={errors.email ? true : false} fullWidth/>
                <TextField id="password" name="password" type="password" label="Password" value={this.state.password} onChange={this.handleChange} error={errors.password ? true : false} helperText={errors.password} fullWidth />
                <Button className="login-btn" type="submit" variant="contained" color="primary">Submit</Button>
               </form>
            </div>
        )
    }
}

export default login
