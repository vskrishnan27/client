import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Navbar, Nav, NavDropdown } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import "./Navbar.css";
const NavbarComponenet = () => {
  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      bg="dark"
      variant="dark"
      className="navbar-container"
    >
      <Container>
        <Navbar.Brand as={NavLink} to="/" style={{ fontWeight: "100" }}>
          KVS AGRO SERVICES
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="billing">
              Billing
            </Nav.Link>
            <Nav.Link as={NavLink} to="list">
              List
            </Nav.Link>
            <Nav.Link as={NavLink} to="updatestock">
              Update Product
            </Nav.Link>
            <Nav.Link as={NavLink} to="checkbill">
              Find sales bill
            </Nav.Link>

            <NavDropdown
              title="Product Updated Details"
              id="basic-nav-dropdown"
            >
              <NavDropdown.Item as={NavLink} to="addbill">
                Add bill
              </NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to="retrivebill">
                Retrive bill
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav>
            <Nav.Link as={NavLink} to="gstBill">
              GST Bill
            </Nav.Link>
            <Nav.Link eventKey={2} as={NavLink} to="addproduct">
              Add Product
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComponenet;
