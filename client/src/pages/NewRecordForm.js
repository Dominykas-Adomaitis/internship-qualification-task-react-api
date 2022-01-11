import classes from "./NewRecordForm.module.css";
import Axios from "axios";

function NewRecordForm() {
  function signMeUp(e) {
    e.preventDefault();
    let userId = document.getElementById("userId")?.value;
    let id = document.getElementById("id")?.value;
    let title = document.getElementById("title")?.value;
    let body = document.getElementById("body")?.value;

    let data = {
      userId: document.getElementById("userId")?.value,
      id: document.getElementById("id")?.value,
      title: document.getElementById("title")?.value,
      body: document.getElementById("body")?.value,
    };

    Axios({
      method: "POST",
      url: "http://localhost:8080/api/posts",
      data,
    }).then((res) => {
      console.log(res.data.post);
    });

    console.log(userId, id, title, body);
  }

  return (
    <div>
      <form
        className={classes.form}
        onSubmit={(e) => {
          signMeUp(e);
        }}
      >
        <div className={classes.control}>
          <label htmlFor="userId">User ID</label>
          <input type="text" id="userId" />
        </div>
        <div className={classes.control}>
          <label htmlFor="id">ID</label>
          <input type="text" id="id" />
        </div>
        <div className={classes.control}>
          <label htmlFor="title">Title</label>
          <input type="text" id="title" />
        </div>
        <div className={classes.control}>
          <label htmlFor="body">Description</label>
          <input type="text" id="body" />
        </div>
        <div className={classes.action}>
          <button type="submit">Add post</button>
        </div>
      </form>
    </div>
  );
}
export default NewRecordForm;
