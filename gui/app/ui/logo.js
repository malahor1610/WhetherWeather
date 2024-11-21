"use client";
import Image from "next/image";
import { Col, Row } from "reactstrap";

export function Logo() {
  return (
      <Row>
        <Image
          className="col-auto me-0 pe-0"
          src={`/logo.png`}
          alt="logo"
          width="64"
          height="64"
        />
        <Col className="text-center align-content-center ms-0 ps-0">
          <p className="text-dark fs-6 fw-bold fst-italic my-0 py-0 h-25">Whether</p>
          <p className="text-dark fs-6 fw-bold fst-italic my-0 py-0">Weather</p>
        </Col>
      </Row>
  );
}
