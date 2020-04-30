import React, { Component } from 'react';
import './list.css'
class List extends Component {

    render(){
        const { employees } = this.props;
        return (
            <div className="list">
                <div className="row header">
                    <div className="cell sm">ID</div>
                    <div className="cell">Name</div>
                    <div className="cell">Last Name</div>
                    <div className="cell">Email</div>
                    <div className="cell">City</div>
                    <div className="cell">State</div>
                </div>
                <div className="content">
                    {
                        employees.map(employee => {
                            const { id, first_name, last_name, email, city, state } = employee;
                            return (
                            <div key={id} className="row">
                                <div className="cell sm">{id}</div>
                                <div className="cell">{first_name}</div>
                                <div className="cell">{last_name}</div>
                                <div className="cell">{email}</div>
                                <div className="cell">{city}</div>
                                <div className="cell">{state}</div>
                            </div>
                            )
                        })
                    }
                </div>
            </div>
        )
    }
}

export default List