import React, { useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";
import Loader from "../Loader/Loader";
import SmartPhone from "../SmartPhone/SmartPhone";
const SmartPhones = () => {
  const [phones, setPhones] = useState([]);
  //Load first 6 phones
  useEffect(() => {
    const loadPhones = async () => {
      const response = await fetch(
        "https://guarded-hamlet-19613.herokuapp.com/phones"
      );
      const responseData = await response.json();
      const featuredPhones = responseData.slice(0, 6);
      setPhones(featuredPhones);
    };
    loadPhones();
  }, []);
  return (
    <section className="smartphones my-5">
      <Container>
        <h2 className="section-heading">Featured Product</h2>
        {!phones.length && <Loader />}

        <Row className="gy-4">
          {phones.map((phone) => (
            <SmartPhone phone={phone} key={phone._id} />
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default SmartPhones;
