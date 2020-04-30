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

    handleSortValue = sortBy => this.setState({sortBy, toggleOrder: !this.state.toggleOrder})

    getSearchBy = e => this.setState({searchBy: e.target.value});

    filter = () => {
        const {employees, search, searchBy } = this.state;
        return employees.filter(employee => {
            return employee[searchBy] && searchBy.length ? employee[searchBy].toLowerCase().includes(search.toLowerCase()): true     
        })
    }

    sortList = (filteredEmployees ) => {
        const {toggleOrder, sortBy } = this.state;

        filteredEmployees.sort((a, b) => {
            // ascending
            if (b[sortBy] > a[sortBy] && a[sortBy] != null && b[sortBy] != null) {
                return 1;
            }
            // descending. if value is null keep it last
            else if(b[sortBy] < a[sortBy] || a[sortBy] === null) {
                return -1;
            } else {
                // handle same values
                return 0;
            } 
        })
        if(toggleOrder) {
            filteredEmployees.reverse();
        } 
        return filteredEmployees;
    }
    render(){
        const { isLoading, search, searchBy } = this.state;

        // filter
        const filteredEmployees = this.filter();
        // sort 
        const sortedEmployees = this.sortList(filteredEmployees);
        // loading animation
        const loader = <div className="lds-dual-ring"></div>;
        // check if data presents
        let content = isLoading ? loader : <List employees={sortedEmployees} handleSortValue={this.handleSortValue}/>
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