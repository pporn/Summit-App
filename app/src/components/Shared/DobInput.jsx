import React, { Component } from 'react';

class DobInput extends Component {
    constructor(props) {
        super(props)
        this.state = {
            currSelected: (this.props.defaultDate) 
                            ? this.props.defaultDate 
                            : new Date().toJSON().slice(0,10).replace(/-/g,'-')
        }
        this.onChange = this.onChange.bind(this);
    }

    onChange(e) {
        // If you don't want date validation change a prop
        if(this.props.validation === null) {
            let currDate = new Date();
            let newDate = e.target.value.split("-");
            let newYear = parseInt(newDate[0]), newMonth = parseInt(newDate[1]), newDay = parseInt(newDate[2]);
            let maxYear = parseInt(currDate.getFullYear()), maxMonth = parseInt(currDate.getMonth()) + 1, maxDay = currDate.getDate();
            if(newYear > maxYear)
                return;
            if(newYear <= maxYear && newMonth > maxMonth)
                return;
            if(newYear <= maxYear && newMonth <= maxMonth && newDay > maxDay)
                return;
        }
        this.setState({ currSelected: e.target.value })
        this.props.onValidDOB(e.target.value);
    }

    render() {
        console.log('here');
        return(
            <div>
                <input 
                    max={new Date().toJSON().slice(0,10).replace(/-/g,'-')} 
                    value={this.state.currSelected} 
                    type="date" 
                    name="dobInputField" 
                    onChange={this.onChange}
                />
            </div>
        )
    }
}

export default DobInput;