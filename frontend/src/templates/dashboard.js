import React from "react";
import Drawer from '../components/drawer'
import MainContentDashboard from '../components/mainContentDashboard'
import MainContentBarang from '../components/mainContentBarang'
import MainContentLelang from '../components/mainContentLelang'
import MainContentPetugas from '../components/mainContentPetugas'
import MainContentHistory from "../components/mainContentHistory";
import {Box} from '@mui/material'

class dashboard extends React.Component {
    render(){

        return(
            <Box sx={{display: 'flex'}}>
                <Drawer history={this.props.history} />
                {this.props.title === "dashboard" && <MainContentDashboard />}
                {this.props.title === "barang" && <MainContentBarang />}
                {this.props.title === "lelang" && <MainContentLelang />}
                {this.props.title === "petugas" && <MainContentPetugas />}
                {this.props.title === "history" && <MainContentHistory />}
            </Box>
        )
    }
}
export default dashboard