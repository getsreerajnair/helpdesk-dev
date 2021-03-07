import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid';
import axios from 'axios';

import withStyles  from '@material-ui/core/styles/withStyles';


import Requests from '../components/requests'

export class home extends Component {
    state = {
        requests:null
    }
    componentDidMount(){
        axios.get('/requests')
        .then(res =>{
            console.log(res.data.requestId);
            this.setState({requests:res.data})
        })
    }
    render() {
        console.log(this.state.requests)
        let requestsToRender = this.state.requests ? (
            this.state.requests.map((request) => <Requests  request={request} />))
        : (
            <p>...Loading</p>
        )
        return (
            <div>
                <h2>My Requests</h2>
            <Grid container>
                
                <Grid item sm={8} xs={12}>
                {requestsToRender}
                </Grid>
                <Grid item sm={4} xs={12}>
                    
                </Grid>
            </Grid>
            </div>
        )
    }
}

export default home
