import React ,{useState} from 'react';
import { Urls } from '../../../helper';
import Loading from '../../../HelperComponents/Loading';
import { encryptLocalStorage } from '../../../hash';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Login() {

  const [loading, setLoadung] = useState(false);
  const [loginInput, setloginInput] = useState({
    "email": "",
    "password": "",
  });

       const [loginInputValid, setloginInputValid] = useState({
    "email": "",
    "password": "",
      });
    let navigate = useNavigate();

  const changeData = (e) =>{
    setloginInput({...loginInput,[e.target.name]:e.target.value})
  }
  const setDataLogin = () => {


    
      setLoadung(true)

      axios.post(Urls.static + "login",loginInput)
        .then(res => {
        console.log({res});
              setLoadung(false) 

          if (res.data.status === 1) {
            encryptLocalStorage(res.data.data, "user")
       if (res.data.data.type === "admin") {
                                         navigate("/admin/");

               }else{
                                         navigate("/");

               }
          } else if (res.data.status === 0) {

                  
                    for (const [key] of Object.entries(loginInputValid)) {

                        setloginInputValid((prevState) => ({
                            ...prevState,
                            [key]: (key in res.data.data)?res.data.data[key][0]:""
                        }));

                    }
                    
                }
      })
      .catch(err => {
      
      })
  }



        return (
      <section className="vh-100" >
        <Loading  setLoading={loading} />
  <div className="container h-100">
    <div className="row d-flex justify-content-center align-items-center h-100">
      <div className="col-lg-12 col-xl-11">
        <div className="card text-black" style={{border:0}}>
          <div className="card-body p-md-5">
            <div className="row justify-content-center">
              <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">

                <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign in</p>

                <form className="mx-1 mx-md-4">

                  <div className="d-flex flex-row align-items-center mb-4">
                    <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                    <div className="form-outline flex-fill mb-0">
                      <label className="form-label" htmlFor="form3Example3c">Your Email</label>
                      <input type="email" id="form3Example3c" name="email" value={loginInput.email}  onChange={changeData} className="form-control" />
                       {loginInputValid.email !== "" ?
                              <small className="require_data">{loginInputValid.email}</small>
                              : null}
                    </div>
                  </div>

                  <div className="d-flex flex-row align-items-center mb-4">
                    <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                    <div className="form-outline flex-fill mb-0">
                      <label className="form-label" htmlFor="form3Example4c">Password</label>
                      <input type="password" id="form3Example4c" name="password" value={loginInput.password}  onChange={changeData} className="form-control" />
                      {loginInputValid.password !== "" ?
                              <small className="require_data">{loginInputValid.password}</small>
                              : null}
                    </div>
                  </div>


                  <div className="form-check d-flex justify-content-center mb-5">
                    <input
                      className="form-check-input me-2"
                      type="checkbox"
                      value=""
                            id="form2Example3c"
                            required={true}
                    />
                    <label className="form-check-label" htmlFor="form2Example3">
                      I agree all statements in <a href="#!">Terms of service</a>
                    </label>
                  </div>

                  <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                    <button onClick={setDataLogin} type="button" className="btn btn-primary btn-lg">Login</button>
                  </div>

                </form>

              </div>
              <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">

                <img src={Urls.public + 'imgs/3081783.jpg'} className="img-fluid" alt="Sample " />

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
  );
}
