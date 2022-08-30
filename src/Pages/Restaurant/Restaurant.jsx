import React from "react";
import { gql, useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import Header from "../../Components/Header/Header";

const RESTAURANTS_BY_ID = gql`
  query ($ctg_id: ID!) {
    restaurants(categorie_id: $ctg_id) {
      id
      name
      img_url
    }
  }
`;

export default function Restaurant() {
  const { ctgId } = useParams();

  const { data, loading, error } = useQuery(RESTAURANTS_BY_ID, {
    variables: { ctg_id: ctgId },
  });

  const changeRoute = (id) => {
    return (window.location.href = `/foods/${id}`);
  };

  return (
    <>
      {data && (
        <>
          <Header />
          <div className="container">
            <h1 className="mt-4">
              <i>
                <b>Restaurants</b>
              </i>
            </h1>
            <div className="d-flex gap-3 mt-5">
              {data?.restaurants &&
                data?.restaurants.map((e) => (
                  <div
                    className="card card-1"
                    style={{ width: "18rem" }}
                    onClick={(e) => changeRoute(e.target.id)}
                    key={e.id}
                  >
                    <img
                      width={286}
                      height={286}
                      id={e.id}
                      src={e.img_url}
                      className="card-img-top"
                      alt="..."
                    />
                    <div className="card-body">
                      <h5 className="card-title">{e.name}</h5>
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
