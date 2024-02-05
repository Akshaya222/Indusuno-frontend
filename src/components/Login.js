import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import { Button, Row, Col } from "antd";

function Login() {
  const {
    //isLoading,
    isAuthenticated,
    error,
    // user,
    loginWithRedirect,
    //logout,
    //getAccessTokenSilently,
  } = useAuth0();
  const navigate = useNavigate();

  // const handleGetToken = async () => {
  //   try {
  //     const accessToken = await getAccessTokenSilently();
  //     console.log("Access Token:", accessToken);

  //     // Now you can pass the accessToken to your backend
  //     // (e.g., send it in the Authorization header of API requests)
  //   } catch (error) {
  //     console.error("Error getting access token:", error);
  //   }
  // };

  // if (isLoading) {
  //   return <div>Loading...</div>;
  // }
  if (error) {
    return <div>Oops... {error.message}</div>;
  }

  if (isAuthenticated) {
    // return (
    //   <div>
    //     Hello {user.name}{" "}
    //     <button
    //       onClick={() =>
    //         logout({
    //           logoutParams: { returnTo: "https://www.youtube.com/" },
    //         })
    //       }
    //     >
    //       Log out
    //     </button>
    //     <button onClick={handleGetToken}>Get Access Token</button>
    //   </div>
    // );
    navigate("/home");
  } else {
    return (
      <Row justify="center" align="middle" style={{ height: "100vh" }}>
        <Col span={12}>
          <div style={{ textAlign: "center" }}>
            <Button
              type="primary"
              size="large"
              style={{ width: "200px", height: "50px", fontSize: "18px" }}
              onClick={() => loginWithRedirect()}
            >
              Login
            </Button>
          </div>
        </Col>
      </Row>
    );
  }
}

export default Login;
