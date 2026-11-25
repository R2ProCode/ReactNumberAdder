import React, { Component } from "react";
import NumberRow from './NumberRow';
import { v4 as uuidv4 } from "uuid";
import { current, produce } from 'immer';
import SelectedNumberRow from "./SelectedNumberRow";

const randomBetween = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

class NumbersAdderTable extends Component {

    state = {
        numbers: [],
        selectedNumbers: []
    }

    onAddClick = () => {
        const nextState = produce(this.state, draft => {
            draft.numbers.push({ number: randomBetween(1, 1000), id: uuidv4() });
        })
        console.log(nextState);
        this.setState(nextState);
        // this.setState({
        //     numbers: [...this.state.numbers, {number: randomBetween(1, 1000), id: uuidv4() }]
        // });
    }

    onSelectClick = (number) => {
        const numberId = number.id;
        if (this.state.selectedNumbers.some(n => n.numberId === numberId)) {
            const filtered = this.state.selectedNumbers.filter(n => n.numberId !== numberId)
            this.setState({ selectedNumbers: filtered })
        }
        else {
            this.setState({
                selectedNumbers: [...this.state.selectedNumbers, { number: number.number, numberId, locked: false }],
            })
        }
    }

    onLockClick = (numberId) => {

        const nextState = produce(this.state, draft => {
            const selectedNum = draft.selectedNumbers.find(sn => sn.numberId === numberId)
            if (selectedNum) {
                selectedNum.locked = !selectedNum.locked
            }
        })
        this.setState(nextState)
    }

    render() {

        return <div className="container" style={{ marginTop: 60 }}>
            <div className='row'>
                <div className='col-md-12'>
                    {/* <pre className="bg-dark text-light p-3 rounded overflow-auto">
                        <code>
                            {JSON.stringify(this.state, null, 2)}
                        </code>
                    </pre> */}
                    <button className='btn btn-success btn-lg w-100' onClick={this.onAddClick}>Add</button>
                </div>
            </div>
            <div style={{ maxHeight: 500 }}>
                <table className='table table-hover table-striped table-bordered'>
                    <thead>
                        <tr>
                            <th style={{ width: '25%' }}>Number</th>
                            <th>Add/Remove</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.numbers.map(n => <NumberRow key={n.id}
                            onSelectedClick={() => this.onSelectClick(n)}
                            number={n}
                            isSelected={this.state.selectedNumbers.some(num => num.numberId === n.id)}
                            isLocked={this.state.selectedNumbers.some(sn => sn.numberId === n.id && sn.locked)}
                        />)}
                    </tbody>
                </table>

                {Boolean(this.state.selectedNumbers.length) && <div className="row p-5 rounded" style={{ backgroundColor: "rgb(233, 236, 239)" }}>
                    <div className="col-md-6 col-md-offset-3">
                        <h3>Selected Numbers </h3>
                        <ul className="list-group">
                            {this.state.selectedNumbers.map((sn) => <SelectedNumberRow key={sn.numberId}
                                number={sn.number}
                                isLocked={sn.locked}
                                onLockClick={() => this.onLockClick(sn.numberId)}
                            />)}
                        </ul>
                    </div>
                </div>}
            </div>
        </div>
    }
}

export default NumbersAdderTable;