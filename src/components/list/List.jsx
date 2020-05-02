import React, { Component } from 'react';
import './list.css'
import Pagination from "react-js-pagination";
// import 'bootstrap/dist/css/bootstrap.css';

class List extends Component {
        constructor(props) {
            super(props);
            this.state = {
                activePage: 1,
                limit: 15,       
            }
        }

    handlePageChange = (pageNumber) => {
        this.setState({activePage: pageNumber});
    }

    render(){
        const { activePage, limit } = this.state;
        const { employees, sortByFn, deleteEmployee } = this.props;

        const start = (activePage - 1)*limit;
        const end = activePage*limit
        const pgData = employees.slice(start, end);

        return (
            <div className="list">
                <div className="row header">
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
                        pgData.map((employee, ind) => {
                            const { id, first_name, last_name, email, city, state } = employee;
                            return (
                            <div key={id} className="row">
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
                <Pagination
                    hideFirstLastPages
                    pageRangeDisplayed={5}
                    activePage={activePage}
                    itemsCountPerPage={limit}
                    totalItemsCount={employees.length}
                    onChange={this.handlePageChange}
                    itemClass="page-item"
                    linkClass="page-link"
                    />
            </div>
        )
    }
}

export default List