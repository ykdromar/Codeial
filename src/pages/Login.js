import { useState } from "react";
import styles from "../styles/login.module.css";
import { useToasts } from "react-toast-notifications";
import { useAuth } from "../hooks";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  const [loggingIn, setLoggingIn] = useState(false);
  const { addToast } = useToasts();
  const auth = useAuth();

  const handelSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      return addToast("Please enter both email and password", {
        appearance: "error",
      });
    }
    setLoggingIn(true);
    const response = await auth.login(email, password);
    if (response.success) {
      setLoggingIn(false);

      return addToast("Logged In Successfully", {
        appearance: "success",
      });
    } else {
      setLoggingIn(false);

      return addToast("Invalid email/Password", {
        appearance: "error",
      });
    }
  };
  // useEffect(() => {
  //   if (auth.user !== null) {
  //     return Navigate("/");
  //   }
  // }, [auth]);

  return (
    <form className={styles.loginForm} onSubmit={handelSubmit}>
      <span className={styles.loginSignupHeader}>Log In</span>
      <div className={styles.field}>
        <input
          type="email"
          placeholder="Email"
          required
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        ></input>
      </div>
      <div className={styles.field}>
        <input
          type="password"
          placeholder="Password"
          required
          onChange={(e) => {
            setpassword(e.target.value);
          }}
        ></input>
      </div>
      <div className={styles.field}>
        <button disabled={loggingIn}>
          {loggingIn ? "Logging In..." : "Log In"}
        </button>
      </div>
    </form>
  );
};

export default Login;
