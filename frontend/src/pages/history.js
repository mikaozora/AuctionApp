import React  from 'react'
import Dashboard from '../templates/dashboard'

class history extends React.Component {
    render(){
        return(
            <div>
                <Dashboard {...this.props} title="history" />
            </div>
        )
    }
}

export default history