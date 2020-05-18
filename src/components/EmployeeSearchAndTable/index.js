import React, { Component } from "react";
import API from "../../utils/API";
import Row from "../Row";
import Col from "../Col";
import Container from "../Container";
import "./style.css"

class EmployeeSearchAndTable extends Component {
    state = {
        results: [],
        allResults: [],
        search: "",
    };

    //on page load call populateEmployees()
    componentDidMount() {
        this.populateEmployees(); 
    };

    //fired when search is entered 
    handleInputChange = event => {
        const name = event.target.name;
        const value = event.target.value;
        //update search 
        this.setState({
          [name]: value
        });
        //filter results array to reflect search 
        this.filterBySearch(value); 
    }

    //fired on form submit 
    handleFormSubmit = event => {
        event.preventDefault(); 
        
        //replace results with all results and clear search bar 
        this.setState({results: this.state.allResults, search: ""})
    }

    //fired when sort by name arrow is clocked 
    handleSortByName = event => {
        event.preventDefault(); 
        this.sortByName(); 
    }

    //calls on API to get random employees 
    populateEmployees = () => {
        API.getRandomEmployees()
            .then(res => {
                //update results and all results 
                this.setState({ results: res.data.results, allResults: res.data.results })
            })
            .catch(err => console.log(err));
    };

    //filters results based on input in search bar 
    filterBySearch = (search) => {
        const filteredRes = this.state.allResults.filter(function(result) {
            const nameStr = result.name.first + " " + result.name.last; 
            return nameStr.toLowerCase().includes(search.toLowerCase()); 
        })
        //update state 
        this.setState({results: filteredRes}); 
    }

    //function that sorts results by name alphabetically 
    sortByName = () => {
        let sortedResults = [...this.state.results]; 
        sortedResults.sort(function(a, b){
            if(a.name.first < b.name.first) { 
                return -1; 
            }
            else if(a.name.first > b.name.first) {
                return 1; 
            }
            else {
                if(a.name.last < b.name.last) {
                    return -1; 
                }
                else if(a.name.last < b.name.last) {
                    return 1; 
                }
            }
            return 0;
        })
        //update the state 
        this.setState({results: sortedResults}); 
    }

    //render elements on the page 
    render() {
        return (
            <Container>
                <Row>
                    <Col size="md-12">
                        {/* search bar */}
                        <form className="form-inline" onSubmit={this.handleFormSubmit}>   
                            <div className="form-group">
                                <input
                                onChange={this.handleInputChange}
                                name="search"
                                type="text"
                                value={this.state.search}
                                className="form-control"
                                placeholder="Search For an Employee"
                                id="search"
                                />
                            </div>
                            {/* clear button */}
                            <div className="form-group">
                                <button className="btn" id="clear-button" type="submit">Clear</button>  
                            </div>
                        </form>
                    </Col>
                </Row>
                <br/>
                <Row>
                    <Col size="md-12">
                        {/* table of employees */}
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th scope="col">Picture</th>
                                    <th scope="col">Name <button onClick={this.handleSortByName}><i className="fa fa-sort-down"></i></button></th>
                                    <th scope="col">Phone</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Date Of Birth</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* each result (employee) becomes an entry in the table */}
                                {/* as the results array is updated, so is the table */}
                                {this.state.results.map((result,index) => (<tr key={index}>
                                        <td>
                                            <img alt={result.name.first} src={result.picture.thumbnail} />
                                        </td>
                                        <td>{result.name.first} {result.name.last}</td>
                                        <td>{result.phone}</td>
                                        <td>{result.email}</td>
                                        <td>{(result.dob.date).substring(0,10)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default EmployeeSearchAndTable; 