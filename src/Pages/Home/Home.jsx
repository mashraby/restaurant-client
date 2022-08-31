import React from "react";
import { gql, useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import Header from "../../Components/Header/Header";
import "./Home.css";

const getCategories = gql`
  query {
    categories {
      id
      name
      img_url
    }
  }
`;

export default function Home() {
  const { data, loading, error } = useQuery(getCategories);

  return (
    <>
      {data && (
        <>
          <Header />
          <div className="container">
            <div className="d-flex justify-content-between flex-wrap gap-5 mt-5">
              {data?.categories &&
                data?.categories.map((e) => {
                  return (
                    <Link
                      to={`/restaurants/${e.id}`}
                      key={e.id}
                      className="card card-1"
                      style={{ width: "620px" }}
                    >
                      <img
                        src={e.img_url}
                        className="card-img-top"
                        width="100%"
                        height={500}
                        alt="..."
                      />
                      <div className="card-body ctg-title">
                        <h1 className="card-title fs-1">{e.name}</h1>
                      </div>
                      <div className="hover"></div>
                    </Link>
                  );
                })}
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
