import React, { Component } from 'react';
import './list.css'
class List extends Component {

        if (arrow === "right" && currentPage < rightLimit) {
            this.setState(prevState => ({currentPage: prevState.currentPage + 1}))
        }
        else if (arrow === "left" && currentPage > 1) {
        this.setState(prevState => ({currentPage: prevState.currentPage - 1}))
        } else if(typeof arrow === 'number') {
            this.setState({currentPage: arrow})
        }
        
    }
    render(){
        const { employees, sortByFn, deleteEmployee } = this.props;
        return (
            <div className="list">
                <div className="row header">
                    <div onClick={() => sortByFn("id")} className="cell sm">#</div>
                    <div onClick={() => sortByFn("id")} className="cell sm">ID</div>
                    <div onClick={() => sortByFn("first_name")} className="cell">Name</div>
                    <div onClick={() => sortByFn("last_name")} className="cell">Last Name</div>
                    <div onClick={() => sortByFn("email")} className="cell">Email</div>
                    <div onClick={() => sortByFn("city")} className="cell">City</div>
                    <div onClick={() => sortByFn("state")} className="cell">State</div>
                    <div className="cell">Delete</div>
                </div>
                <div className="content">
                    {
                        employees.map((employee, ind) => {
                            const { id, first_name, last_name, email, city, state } = employee;
                            return (
                            <div key={id} className="row">
                                <div className="cell sm">{ind}</div>
                                <div className="cell sm">{id}</div>
                                <div className="cell">{first_name}</div>
                                <div className="cell">{last_name}</div>
                                <div className="cell">{email}</div>
                                <div className="cell">{city}</div>
                                <div className="cell">{state}</div>
                                <div className="cell del" onClick={() => deleteEmployee(id)}>delete</div>
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