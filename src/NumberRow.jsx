import React, { Component } from "react";

class NumberRow extends Component {

    render() {
        const { number, onSelectedClick, onLockClick, isSelected, isLocked } = this.props;

        return <tr>
            <td>{number.number}</td>
            <td>
                <button className={isSelected ? "btn btn-danger" : "btn btn-primary"}
                    disabled={isLocked}
                    onClick={onSelectedClick}>
                    {isSelected ? "Remove from Selected" : "Add to Selected"}
                </button>
            </td>
        </tr>
    }
}

export default NumberRow;