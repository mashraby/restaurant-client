import React from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../Context/Context";
import "../../index.css";

export default function Header() {
  const { corzinka } = useContext(Context);
  return (
    <header className="navbar navbar-expand-lg bg-light">
      <div className="container">
        <Link
          to={`/`}
          className="navbar-brand fs-1 d-flex gap-2 align-items-center"
        >
          <b>
            <i>
              <i className="bi bi-x-diamond-fill fs-1 text-danger"></i>
            </i>
          </b>{" "}
          <b>
            <i>Restaurant</i>
          </b>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0"></ul>
          <div className="d-flex align-items-center gap-3">
            <Link
              to={`/corzinka`}
              className="position-relative fs-1 bi bi-cart-plus"
            >
              <span
                style={{ fontSize: "15px" }}
                className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
              >
                {corzinka?.length}
                <span className="visually-hidden">unread messages</span>
              </span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
