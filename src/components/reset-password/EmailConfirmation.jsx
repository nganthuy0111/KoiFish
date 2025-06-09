
import { Button } from "antd";
import { useHistory } from "react-router-dom";

const EmailConfirmation = () => {
  const history = useHistory();

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h2>Check Your Email</h2>
      <p>We sent a password reset link to your email address.</p>
      <Button type="primary" onClick={() => history.push("/login")}>
        Back to Login
      </Button>
    </div>
  );
};

export default EmailConfirmation;
