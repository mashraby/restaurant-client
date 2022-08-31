import React from "react";
import { useContext } from "react";
import { Context } from "../../Context/Context";
import Header from "../../Components/Header/Header";
import { gql, useMutation } from "@apollo/client";
import { useState } from "react";
import "./Corzinka.css";
import { useNavigate } from "react-router-dom";

const CREATE_ORDER = gql`
  mutation (
    $client: String!
    $location: String!
    $phone: String!
    $purchase: String!
    $time: String!
  ) {
    createOrder(
      client: $client
      location: $location
      phone: $phone
      purchase: $purchase
      time: $time
    ) {
      client
      location
      phone
      purchase
      time
    }
  }
`;

export default function Corzinka() {
  const navigate = useNavigate();
  const { corzinka, setCorzinka } = useContext(Context);
  const { orders, setOrders } = useContext(Context);

  const [variables, setVariables] = useState({
    client: "",
    location: "",
    phone: "",
    purchase: "",
    time: "",
  });

  const deleteCorzinka = (id) => {
    setCorzinka((state) => state.filter((e) => e.id !== id));
  };

  const handleChange = (element, e) => {
    let obj = { ...e };
    const filterData = orders.filter((ord) => ord.id !== e.id);

    obj.count = element.target.value;

    setOrders([...filterData, obj]);
  };

  const [creatingOrder] = useMutation(CREATE_ORDER, {
    onError: (err) => console.log(err),
    onCompleted: (data) => console.log(data),
  });

  const sendUserData = (e) => {
    e.preventDefault();

    let purchase = "";
    for (let i = 0; i < orders.length; i++) {
      if (i === 0) {
        purchase += `${orders[i]?.count}ta ${orders[i]?.name}`;
      } else {
        purchase += ` , ${orders[i]?.count}ta ${orders[i]?.name}`;
      }
    }

    const date = new Date();

    let time = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}-${date.getFullYear()}-${date.getMonth()}-${date.getUTCDay()}`;

    variables.purchase = purchase;
    variables.time = time;

    creatingOrder({ variables });
    alert("Sizning malumotlaringiz muvafaqiyatli yuborildi");
    setOrders([]);
    setCorzinka([]);
    navigate("/");
  };

  return (
    <>
      <Header />
      {corzinka?.length === 0 ? (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div>
            <i style={{ fontSize: "400px" }} className="bi bi-cart-x"></i>
            <h1>Corzinka Bo'm Bo'sh</h1>
          </div>
        </div>
      ) : (
        <div className="container mt-5">
          <h1 className="mt-5">
            <i>
              <b>Corzinka</b>
            </i>
          </h1>
          <div className="d-flex justify-content-between gap-3">
            <div className="corzinka-div d-flex flex-column gap-3">
              {corzinka &&
                corzinka?.map((e, index) => (
                  <div key={index} className="card" style={{ width: "600px" }}>
                    <div className="row g-0">
                      <div className="col-md-4">
                        <img
                          width={207}
                          height={207}
                          src={e.img_url}
                          className="rounded-start"
                          alt="..."
                        />
                      </div>
                      <div className="col-md-8">
                        <div className="card-body">
                          <div className="d-flex align-items-center justify-content-between">
                            <h5 className="card-title">{e.name}</h5>
                            <button
                              onClick={(e) => deleteCorzinka(e.target.id)}
                              className="buttons"
                            >
                              <i
                                id={e.id}
                                className="bi bi-x-circle-fill text-danger fs-4"
                              ></i>
                            </button>
                          </div>
                          <p className="card-text">{e.price} So'm</p>
                          <div className="ml-3">
                            <div>
                              <div className="d-flex align-items-center gap-2">
                                <label
                                  htmlFor="exampleInputEmail1"
                                  className="form-label"
                                ></label>
                                <input
                                  onChange={(element) =>
                                    handleChange(element, e)
                                  }
                                  id={e.id}
                                  placeholder={`${e.name}ni sonini kiriting`}
                                  type="number"
                                  className="form-control w-100"
                                  aria-describedby="emailHelp"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
            <form
              onSubmit={(e) => sendUserData(e)}
              className="w-50 border rounded p-3"
            >
              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">
                  To'liq ism familya
                </label>
                <input
                  onChange={(e) =>
                    setVariables({ ...variables, client: e.target.value })
                  }
                  name="full_name"
                  type="text"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">
                  Aniq manzilingizni kiriting
                </label>
                <input
                  onChange={(e) =>
                    setVariables({ ...variables, location: e.target.value })
                  }
                  name="user_location"
                  type="text"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  required
                />
              </div>
              <div style={{ position: "relative" }} className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">
                  Telefon raqamingizni kiriting
                </label>
                <input
                  onChange={(e) =>
                    setVariables({
                      ...variables,
                      phone: "+998" + e.target.value,
                    })
                  }
                  name="phone_number"
                  style={{ paddingLeft: "50px" }}
                  type="number"
                  className="form-control"
                  id="exampleInputPassword1"
                  required
                />
                <span
                  style={{ position: "absolute", top: "55%", left: "10px" }}
                >
                  +998
                </span>
              </div>
              <button type="submit" className="btn btn-primary w-100">
                Buyurtma Berish
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
