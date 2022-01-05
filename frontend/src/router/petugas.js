import React  from 'react'
import Dashboard from '../templates/dashboard'

class petugas extends React.Component {
    render(){
        return(
            <div>
                <Dashboard {...this.props} title="petugas" />
            </div>
        )
    }
}

export default petugas