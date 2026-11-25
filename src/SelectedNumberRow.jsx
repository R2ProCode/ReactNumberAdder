import React, { Component } from "react";

class SelectedNumberRow extends Component {
    render() {

        const { number, isLocked, onLockClick } = this.props;

        return <li className="list-group-item">
            {number}
            <button className="ms-5 btn btn-primary"
                onClick={onLockClick}>
                {isLocked ? "Unlock" : "Lock"}
            </button>
        </li>
    }
}

export default SelectedNumberRow;