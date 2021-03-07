import React, { Component } from 'react';

import withStyles  from '@material-ui/core/styles/withStyles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

export class requests extends Component {
    render() {
        dayjs.extend(relativeTime)
        return (
            
                <Card className="mg-b-2">
                    <CardContent>
                        <Typography  color="textSecondary" gutterBottom>
                        {this.props.request.status}
                        </Typography>
                        <Typography  color="textSecondary">
                        {dayjs(this.props.request.createdAt).fromNow() + ' (converted using dayjs library)'}
                        </Typography>
                        <Typography variant="h5" component="h2">
                        {this.props.request.type}
                        </Typography>
                        
                        <Typography variant="body2" component="p">
                        {this.props.request.description}
                        <br />
                        {'"a benevolent smile"'}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small">Learn More</Button>
                    </CardActions>
                    </Card>
            
        )
    }
}

export default requests
