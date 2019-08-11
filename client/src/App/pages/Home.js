import React from 'react'
import {Link} from 'react-router-dom'
import Calendar from '../components/Calendar'

import '../App.css'

class Home extends React.PureComponent{
    render() {
        return (
            <div className="App">
                <h1>Project Home</h1>
                <Link to={'./list'}>
                    <button variant = "raised">
                        My List
                    </button>
                </Link>
                <main>
                    <Calendar />
                </main>
            </div>
        )
    }
}

export default Home