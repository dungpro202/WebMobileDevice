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

        <Layout>
            <Container fluid>
                <Row>
                    <Col md={2} className="slidebar">
                        <ul>
                            <li><NavLink to={`/`}>Home</NavLink></li>
                            <li><NavLink to={`/products`}>Products</NavLink></li>
                            <li><NavLink to={`/orders`}>Orders</NavLink></li>
                        </ul>
                    </Col>
                    <Col md={10} style={{ marginLeft: 'auto' }}>Container</Col>
                </Row>
            </Container>
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