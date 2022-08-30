import { useQuery } from "@apollo/client";
import { gql } from "@apollo/client";
import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import Header from "../../Components/Header/Header";
import { Context } from "../../Context/Context";
import "./Food.css";

const FOODS_BY_ID = gql`
  query ($rst_id: ID!) {
    foods(restaurant_id: $rst_id) {
      id
      name
      price
      img_url
    }
  }
`;

export default function Food() {
  const { rstId } = useParams();

  const { data, loading, error } = useQuery(FOODS_BY_ID, {
    variables: { rst_id: rstId },
  });

  const { corzinka, setCorzinka } = useContext(Context);

  const addCorzinkaClick = (e) => {
    const foundObj = corzinka.find((element) => element.id === e.id);

    if (!foundObj) {
      alert("Corzinkaga qo'shildi");
      setCorzinka([...corzinka, e]);
    } else {
      alert("Bu Corzinkada bor");
    }
  };

  return (
    <>
      {data && (
        <>
          <Header />
          <div className="container">
            <h1 className="mt-4">
              <i>
                <b>Foods</b>
              </i>
            </h1>
            <div className="d-flex mt-5">
              {data?.foods &&
                data?.foods.map((element, index) => (
                  <div
                    key={index}
                    className="card mb-3"
                    style={{ maxWidth: "540px" }}
                  >
                    <div className="row g-0">
                      <div className="col-md-4">
                        <img
                          src={element.img_url}
                          className="img-fluid rounded-start"
                          alt="..."
                        />
                      </div>
                      <div className="col-md-8">
                        <div className="card-body">
                          <h5 className="card-title">{element.name}</h5>
                          <p className="card-text">{element.price} So'm</p>
                          <div className="d-flex align-items-center gap-3">
                            <button
                              className="d-flex gap-2 align-items-center buttons"
                              onClick={() => addCorzinkaClick(element)}
                            >
                              <i className="bi bi-cart-plus fs-3"></i>
                              Add Corzinka
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </>
      )}
      {loading && (
        <div
          style={{ width: "100%", height: "100vh" }}
          className="d-flex align-items-center justify-content-center"
        >
          <div
            style={{ width: "6rem", height: "6rem" }}
            className="spinner-border"
            role="status"
          >
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
      {error && (
        <div>
          <h1>INTERNAL SERVER ERROR :(</h1>
        </div>
      )}
    </>
  );
}
