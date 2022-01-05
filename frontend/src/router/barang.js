import React  from 'react'
import Dashboard from '../templates/dashboard'

class barang extends React.Component {
    render(){
        return(
            <div>
                <Dashboard {...this.props} title="barang" />
            </div>
        )
    }
}

export default barang