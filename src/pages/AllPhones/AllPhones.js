import React, { useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";
import Loader from "../../components/Loader/Loader";
import SmartPhone from "../../components/SmartPhone/SmartPhone";
const AllPhones = () => {
  const [phones, setPhones] = useState([]);
  //Load all phones
  useEffect(() => {
    const loadPhones = async () => {
      const response = await fetch(
        "https://guarded-hamlet-19613.herokuapp.com/phones"
      );
      const responseData = await response.json();
      setPhones(responseData);
    };
    loadPhones();
  }, []);
  return (
    <section className="smartphones my-5">
      <Container>
        <h2 className="section-heading">All Product</h2>
        {!phones.length && <Loader />}
        <Row className="gy-4">
          {phones.map((phone) => (
            <SmartPhone phone={phone} />
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default AllPhones;
