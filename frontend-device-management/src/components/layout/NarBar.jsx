import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

function NarBar() {
  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("access_token");
  };
  return (
    <Navbar expand="lg" className="navbar navbar-dark bg-dark">
      <Container>
        <Navbar.Brand href="/">Quản lý thiết bị văn phòng</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/devices">Thiết bị</Nav.Link>
            <Nav.Link href="/employees">Nhân viên</Nav.Link>
            <Nav.Link href="/device-usages">Sử dụng thiết bị</Nav.Link>
          </Nav>
          <Nav.Link href="/login">
            <button onClick={handleLogout} className="btn btn-danger">
              Đăng xuất
            </button>
          </Nav.Link>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NarBar;
