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
    // another way: provide currentPage -1 or +1 
    // setPage = (currentPage ) => {
    //     const { limit } = this.state;
    //     const { employees} = this.props;
    //     const rightLimit = Math.ceil(employees.length / limit); 

    //     if (currentPage > 0 && currentPage < rightLimit + 1) {
    //         // this.setState(prevState => ({currentPage: prevState.currentPage + currentPage}))
    //         this.setState({currentPage: currentPage})
    //     }
    // }
    setPage = arrow => {
        const { limit, currentPage } = this.state;
        const { employees} = this.props;
        const rightLimit = Math.ceil(employees.length / limit); 

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
        const { employees, handleSortValue } = this.props;
        const { limit, currentPage } = this.state;

        const start = (currentPage - 1) * limit;
        const end = currentPage * limit;
        const paginationData = employees.slice(start, end);
        
        return (
            <div className="list">
                <div className="row header">
                    <div className="cell" onClick={() => handleSortValue("id")}>ID</div>
                    <div className="cell" onClick={() => handleSortValue("first_name")}>Fullname</div>
                    <div className="cell" onClick={() => handleSortValue("email")}>Email</div>
                    <div className="cell" onClick={() => handleSortValue("city")}>City</div>
                    <div className="cell" onClick={() => handleSortValue("state")}>State</div>
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
                        <div onClick={() => this.setPage('left')} className="arrow left-arrow" >Previos</div>
                    {
                        // In JavaScript, 0 is falsy
                        // console.log(30 % 15 == true)   so !(ind % limit) return true if the modulo is 0  
                        employees.filter((empl, ind) => !(ind % limit)).map((em, index) => {
                            const cname = index+1 === currentPage ? "page-numbers active": "page-numbers"
                            return <button onClick={() => this.setPage(index+1)} className={cname} key={em.id}>{index + 1}</button>
                        })
                    }
                        <div onClick={() => this.setPage('right')} className="arrow right-arrow" >Next</div>
                    </div>
                </div>
            </div>
        )
    }
}

export default List