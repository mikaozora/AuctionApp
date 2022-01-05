import React  from 'react'
import Dashboard from '../templates/dashboard'

class dashboard extends React.Component {
    render(){
        return(
            <div>
                <Dashboard {...this.props} title="dashboard" />
            </div>
        )
    }
}

export default dashboard