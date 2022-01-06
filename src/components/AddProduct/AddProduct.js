import React from "react";
import { Col, Container, FloatingLabel, Form, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router";
const AddNewProduct = () => {
  const history = useHistory();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  //Form submit handler
  const onSubmit = async (data) => {
    const response = await fetch(
      "https://guarded-hamlet-19613.herokuapp.com/phones",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    await response.json();
    history.push("/dashboard/manage-products");
  };
  //Add new Smartphone
  return (
    <section className="addNewService">
      <Container>
        <h2 className="section-heading">Add a new product</h2>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Row>
            <Col md={6}>
              <FloatingLabel label="Smartphone Name" className="label mb-3">
                <Form.Control
                  placeholder="Smartphone Name"
                  className="input"
                  {...register("name", { required: true })}
                />
                {errors.name && (
                  <small className="error">*Smartphone Name is required!</small>
                )}
              </FloatingLabel>
              <FloatingLabel
                label="Smartphone Description"
                className="label mb-3"
              >
                <Form.Control
                  placeholder="Smartphone Description"
                  className="textArea"
                  as="textarea"
                  rows={3}
                  {...register("description", { required: true })}
                />
                {errors.description && (
                  <small className="error">
                    *Smartphone Description is required!
                  </small>
                )}
              </FloatingLabel>
              <FloatingLabel label="Processor" className="label mb-3">
                <Form.Control
                  placeholder="Processor"
                  className="input"
                  {...register("processor", { required: true })}
                />
                {errors.processor && (
                  <small className="error">*Processor is required!</small>
                )}
              </FloatingLabel>

              <FloatingLabel label="Screen Size" className="label mb-3">
                <Form.Control
                  placeholder="ScreenSize"
                  className="input"
                  type="number"
                  min="0"
                  step="any"
                  {...register("screenSize", { required: true })}
                />
                {errors.screenSize && (
                  <small className="error">*Screen Size is required!</small>
                )}
              </FloatingLabel>

              <FloatingLabel label="Battery" className="label mb-3">
                <Form.Control
                  type="number"
                  placeholder="Battery"
                  className="input"
                  min="0"
                  {...register("battery", { required: true })}
                />
                {errors.battery && (
                  <small className="error">*Battery is required!</small>
                )}
              </FloatingLabel>
            </Col>
            <Col md={6}>
              <FloatingLabel label="Smartphone Image" className="label mb-3">
                <Form.Control
                  placeholder="Smartphone Image"
                  className="input"
                  {...register("imageCover", { required: true })}
                />
                {errors.imageCover && (
                  <small className="error">
                    *Smartphone Image Link is required!
                  </small>
                )}
              </FloatingLabel>
              <FloatingLabel label="Price" className="label mb-3">
                <Form.Control
                  type="number"
                  min="0"
                  placeholder="Price"
                  className="input"
                  {...register("price", { required: true })}
                />
                {errors.price && (
                  <small className="error">
                    *Smartphone Price is required!
                  </small>
                )}
              </FloatingLabel>
              <FloatingLabel label="Ram" className="label mb-3">
                <Form.Control
                  type="number"
                  min="0"
                  placeholder="Ram"
                  className="input"
                  {...register("ram", { required: true })}
                />
                {errors.ram && (
                  <small className="error">*Smartphone Ram is required!</small>
                )}
              </FloatingLabel>
              <FloatingLabel label="Rom" className="label mb-3">
                <Form.Control
                  type="number"
                  min="0"
                  placeholder="Rom"
                  className="input"
                  {...register("rom", { required: true })}
                />
                {errors.rom && (
                  <small className="error">*Smartphone Rom is required!</small>
                )}
              </FloatingLabel>
              <FloatingLabel label="Rating" className="label mb-3">
                <Form.Control
                  type="number"
                  min="0"
                  max="5"
                  step="any"
                  placeholder="Rating"
                  className="input"
                  {...register("ratingsAverage", { required: true })}
                />
                {errors.ratingsAverage && (
                  <small className="error">
                    *Smartphone Rating is required!
                  </small>
                )}
              </FloatingLabel>
              <FloatingLabel label="Product In Stock" className="label mb-3">
                <Form.Control
                  type="number"
                  min="0"
                  placeholder="Product In Stock"
                  className="input"
                  {...register("inStock", { required: true })}
                />
                {errors.inStock && (
                  <small className="error">
                    *Smartphone In Stock is required!
                  </small>
                )}
              </FloatingLabel>
            </Col>
          </Row>
          <Row>
            <Col lg={6} md={8} sm={10} className="mx-auto mt-3">
              <button
                type="submit"
                className="btn-style btn-style-primary w-100"
              >
                Add Product
              </button>
            </Col>
          </Row>
        </Form>
      </Container>
    </section>
  );
};

export default AddNewProduct;
