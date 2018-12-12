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
        var target = e.target.value;
        if(this.props.validation === undefined || this.props.validation === true) {
            let currDate = new Date();
            let newDate = target.split("-");
            let newYear = parseInt(newDate[0]), newMonth = parseInt(newDate[1]), newDay = parseInt(newDate[2]);
            let maxYear = parseInt(currDate.getFullYear()), maxMonth = parseInt(currDate.getMonth()) + 1, maxDay = 31;
            if(newYear > maxYear)
                target = "2000-01-01";
            if(newYear === maxYear && newMonth > maxMonth)
                target = "2000-01-01";
            if(newYear === maxYear && newMonth === maxMonth && newDay > maxDay)
                target = "2000-01-01";
        }
        this.setState({ currSelected: target })
        this.props.onValidDOB(target);
    }

    render() {
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