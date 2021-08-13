import React from 'react'
import { Col, Container, Jumbotron, Row } from 'react-bootstrap'
import { authConstants } from '../../actions/constants';
import Layout from '../../components/Layout';
import './style.css'
import { NavLink } from 'react-router-dom'

/**
* @author
* @function Home
**/

const Home = (props) => {

    return (
        <Layout sidebar>
            
        </Layout>


        // <Layout>
        //     <Jumbotron style={{ margin: '5rem', backgroundColor:'#fff' }} className="text-center">
        //         <h1>Welcome to Admin</h1>
        //         <p>Author: Anh Dũng</p>
        //     </Jumbotron>
        // </Layout>
    )

}

export default Home