import React  from 'react'
import Dashboard from '../templates/dashboard'

class lelang extends React.Component {
    render(){
        return(
            <div>
                <Dashboard {...this.props} title="lelang" />
            </div>
        )
    }
}

export default lelang