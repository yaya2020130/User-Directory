import React from 'react'
import Header from "../../components/Header"
import Employee from "../../components/EmployeeSearchAndTable"

//home page is made of a header and the employee search and table 
function Home() {
    return (
        <div>
            <Header />
            <Employee />
        </div>
    )
}

export default Home; 
