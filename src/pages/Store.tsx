import React from "react";
import { Col, Row } from "react-bootstrap";
import StoreCard from "../components/Store";
import storeItems from "../data/items.json";

type Props = {};

const Store = (props: Props) => {
  return (
    <>
      <h1>Store</h1>
      <Row lg={3} md={2} xs={1} sm={1} className="g-3">
        {storeItems.map((item, index) => {
          return (
            <Col key={item.id}>
              <StoreCard {...item} />
            </Col>
          );
        })}
      </Row>
    </>
  );
};

export default Store;
