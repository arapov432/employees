import React, {Component} from 'react';
import List from './components/list/List';
import Search from './components/search/Search';
import './app.css'
import Footer from './components/footer/Footer';

class App extends Component {
    constructor(){
        super();
        this.state = {
            employees : [],
            isLoading: false,
            search:'',
            searchBy: '',
            sortBy: '',
            toggleOrder: false
        }
    }

    getApiData = () => {
        this.setState({isLoading:true})
        fetch('https://raw.githubusercontent.com/maratgaip/json/master/people.json')
        .then(json=>json.json())
        .then(employees=>this.setState({employees, isLoading:false}))
    }
    componentDidMount(){ this.getApiData() }

    getSearch = e => this.setState({search:e.target.value});

    getSearchBy = e => this.setState({searchBy: e.target.value});

    filter = () => {
        const {employees, search, searchBy} = this.state;
        return employees.filter(employee => {
            if(searchBy === '') {
                return  employee["first_name"] && employee["first_name"].toLowerCase().includes(search.toLowerCase())         
            } else {
                return employee[searchBy] && searchBy.length ? employee[searchBy].toLowerCase().includes(search.toLowerCase()) : true;
            }
        })
    }
    sortByFn = (value) => {
       this.setState({sortBy: value, toggleOrder: !this.state.toggleOrder})
    }
    handleSortvalue = (filteredEmployees) => {
        const { toggleOrder, sortBy } = this.state;
        
        filteredEmployees.sort((a,b) => {

            if (a[sortBy] > b[sortBy] ) {
              return 1
            } else if (a[sortBy] < b[sortBy] || b[sortBy] === null) {
              return -1
            } else {
                return 0
            }
        });
        // 2. option
        if (toggleOrder) {
            filteredEmployees.reverse();
        }
        return filteredEmployees;
    }
    deleteEmployee = (ID) => {
        const { employees } = this.state;
        const employeesExceptDeleted = employees.filter(em => em.id !== ID);
        this.setState({employees: employeesExceptDeleted})
    }
    render(){
        const { isLoading, search, searchBy} = this.state;
        // filter
        const filteredEmployees = this.filter();
        // sort
        let sortedEmployees = this.handleSortvalue(filteredEmployees)
        // loading animation
        const loader = <div className="lds-dual-ring"></div>;
        // check if data presents
        let content = isLoading ? loader : <List employees={sortedEmployees} sortByFn={this.sortByFn} deleteEmployee={this.deleteEmployee}/>
        // if no data found via search
        if(!isLoading && !filteredEmployees.length){
            content = <div className="not-found">Data Not Found</div>
        }
        return (
            <>
                <div className="container">
                    <Search value={search} 
                        getSearch={this.getSearch} 
                        getSearchBy={this.getSearchBy} 
                        searchBy={searchBy}
                    />
                    {content}
                </div>
                <Footer />
            </>
        )

    }
    
}

export default App;