import React from 'react'
import { Jumbotron } from 'react-bootstrap'
import Layout from '../../components/Layout';

/**
* @author
* @function Home
**/

const Home = (props) => {
    return (
        <Layout>
            <Jumbotron style={{ margin: '5rem', backgroundColor:'#fff' }} className="text-center">
                <h1>Welcome to Admin</h1>
                <p>Author: Anh Dũng</p>
            </Jumbotron>
        </Layout>
    )

}

export default Home