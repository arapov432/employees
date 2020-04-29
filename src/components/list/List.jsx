import React, { Component } from 'react';
import './list.css'
class List extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPage: 1,
            limit: 15,
        }
    }
    setPage = currentPage =>  {
        const { limit } = this.state;
        const { employees } = this.props;
        // console.log((Math.ceil(employees.length / limit)));
        // console.log(currentPage)
        if(currentPage > 0  && currentPage < Math.ceil(employees.length / limit) + 1) {
            this.setState({currentPage})  
        } 
    }

    render(){
        const { employees } = this.props;
        const { limit, currentPage } = this.state;
        const start = (currentPage - 1)*limit;
        const paginationData = employees.slice(start, start+limit);
        console.log(paginationData)
        return (
            <div className="list">
                <div className="row header">
                    <div className="cell">ID</div>
                    <div className="cell" onClick={() => this.props.sortByFn("first_name")}>Fullname</div>
                    <div className="cell" onClick={() => this.props.sortByFn("email")}>Email</div>
                    <div className="cell" onClick={() => this.props.sortByFn("city")}>City</div>
                    <div className="cell" onClick={() => this.props.sortByFn("state")}>State</div>
                </div>
                <div className="content">
                    {
                        paginationData.map(employee => {
                            const { id, first_name, last_name, email, city, state } = employee;
                            return (
                            <div key={id} className="row">
                                <div className="cell">{id}</div>
                                <div className="cell">{first_name} {last_name}</div>
                                <div className="cell">{email}</div>
                                <div className="cell">{city}</div>
                                <div className="cell">{state}</div>
                            </div>
                            )
                        })
                    }
                    <div className="pagination">
                        <div onClick={() => this.setPage(currentPage - 1)} className="arrow left-arrow" >Previos</div>
                        {
                         employees.filter((empl, ind) => !(ind % limit)).map((el, ind) => {
                             const cname = currentPage === ind + 1 ? "active page-numbers": "page-numbers"
                             return (
                                <button key={ind} onClick={() => this.setPage(ind+1)} className={cname}>{ind + 1}</button>
                             )
                         })   
                        }
                        <div onClick={() => this.setPage(currentPage+1)} className="arrow right-arrow" >Next</div>
                    </div>
                </div>
            </div>
        )
    }
}

export default List