import React from 'react';
import moment from 'moment';
import './index.css';

class Countdown extends React.Component {
    state = {
        days: undefined,
        hours: undefined,
        minutes: undefined,
        seconds: undefined
    };
    componentDidMount() {
        this.interval = setInterval(() => {
            const { timeTillDate, timeFormat } = this.props.data;
            const then = moment(timeTillDate);
            const now = moment();
            const countdown = moment(then - now);
            countdown.subtract(1,'days');
            countdown.subtract(5.5,'hours');

            const days = countdown.format('D');
            const hours = countdown.format('HH');
            const minutes = countdown.format('mm');
            const seconds = countdown.format('ss');
            this.setState({ days, hours, minutes, seconds });
        }, 1000);
    }
    componentWillUnmount() {
        if (this.interval) {
            clearInterval(this.interval);
        }
    }
    render(){
        
        const { days, hours, minutes, seconds } = this.state;

        return(
            <div>
                <div className="countdown-wrapper">
                    <span className="countdown-item">
                        {days}
                        <span>days</span>
                    </span>
                    <span className="countdown-item">
                        {hours}
                        <span>hrs</span>
                    </span>
                    <span className="countdown-item">
                        {minutes}
                        <span>min</span>
                    </span>
                    <span className="countdown-item">
                        {seconds}
                        <span>sec</span>
                    </span>
                </div>
            </div>
        )
    }
    
}

export default Countdown