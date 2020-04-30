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

    sortByFn = sortBy => this.setState({sortBy})

    setSearchBy = e => this.setState({searchBy: e.target.value});

    filter = () => {
        const {employees, search, searchBy} = this.state;
        return employees.filter(employee => {
            return employee[searchBy] && searchBy.length ? employee[searchBy].toLowerCase().includes(search.toLowerCase()) : true;
        })
    }

    render(){
        const { isLoading, search, searchBy } = this.state;
        // filter
        const filteredEmployees = this.filter();

        // loading animation
        const loader = <div className="lds-dual-ring"></div>;
        // check if data presents
        let content = isLoading ? loader : <List employees={filteredEmployees}/>
        // if no data found via search
        if(!isLoading && !filteredEmployees.length){
            content = <div className="not-found">Data Not Found</div>
        }
        return (
            <>
                <div className="container">
                    <Search value={search} 
                        getSearch={this.getSearch} 
                        setSearchBy={this.setSearchBy} 
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