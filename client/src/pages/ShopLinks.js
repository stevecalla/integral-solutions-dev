import Footer from "../components/Home/Footer"
import Card from 'react-bootstrap/Card';
import steelcase from '../assets/images/steelcase.jpg'
import { Row, Col } from "react-bootstrap";
import officescapes from '../assets/images/officescapes.jpeg'
import officestogo from '../assets/images/officestogo.jpg'
import hermanmiller from '../assets/images/hermanmiller.jpg'
import '../styles/shopLinks.css'



function ShopLinks () {

    return(

<div className="bk-img">      
    <div className="head">
        <h1>Needing The Best Office Furniture with Competitive Pricing? </h1>
        <h2 style={{fontStyle:'italic'}}>We Work Directly with these Suppliers!</h2>
        </div>
        <Row>
            <Col>
        <Card className='company'>
            <Card.Link href="https://www.steelcase.com/" target={"_blank"}>
      <Card.Img variant="top" src= {steelcase} />
      </Card.Link>
   
    </Card>
    </Col>
    <Col>
    <Card className='company' >
    <Card.Link href="https://www.officescapes.com/"target={"_blank"}>
      <Card.Img variant="top" src= {officescapes} />
      </Card.Link>

    </Card>
    </Col>
  
        <Col>
    <Card className='company'>
    <Card.Link href="https://www.hermanmiller.com/"target={"_blank"}>
      <Card.Img variant="top" src= {hermanmiller} />
      </Card.Link>
   
    </Card>
    </Col>
 
    <Col>
    <Card className='company'>
    <Card.Link href="https://www.officestogo.com/"target={"_blank"}>
      <Card.Img variant="top" src= {officestogo} />
      </Card.Link>
   
    </Card>
    </Col>
    </Row>
    <Footer/>
</div>
    )
}
export default ShopLinks