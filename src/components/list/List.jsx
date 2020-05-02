import React, { Component } from 'react';
import './list.css'
class List extends Component {
        constructor(props) {
            super(props);
            this.state = {
                currentPage: 1,
                limit: 15
                
            }
        }

    setPage = (arrow) => {
        const { currentPage, limit } = this.state;
        const { employees } = this.props;
        const rightLimit = Math.ceil(employees.length / limit);

        if(arrow === 'prev' && currentPage > 1) {
            this.setState(prevState => ({currentPage: prevState.currentPage - 1}))
        }
        else if (arrow === 'next' && currentPage < rightLimit) {
            this.setState(prevState => ({currentPage: prevState.currentPage + 1}))
        }

    }
    render(){
        const { currentPage, limit } = this.state;
        
        const { employees, sortByFn, deleteEmployee } = this.props;
        // logic
        const start = (currentPage - 1)*limit;
        let end = currentPage*limit;
        const paginationData = employees.slice(start, end);
        // end > employees.length ? end = employees.length: end = end;
        if (end > employees.length) {
            end = employees.length
        }
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
                        paginationData.map((employee, ind) => {
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
                <div className="pagination">
                    <div onClick={() => this.setPage('prev')} className="prev arrow">Prev</div>
                    <div className="start arrow">{start+1}</div>  
                    <div className="arrow line"> - </div> 
                    <div className="end arrow">{end}</div>
                    <div onClick={() => this.setPage('next')} className="next arrow">Next</div>
                </div>

            </div>
        )
    }
}

export default List