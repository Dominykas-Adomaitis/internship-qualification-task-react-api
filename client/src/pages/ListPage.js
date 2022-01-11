import classes from "./ListPage.module.css";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";

function ListPage() {
  const url = `http://localhost:8080/api/posts`;

  const [post, setPost] = useState(null);

  let content = null;

  useEffect(() => {
    axios.get(url).then((response) => {
      setPost(response.data);
    });
  }, [url]);

  content = (
    <div className="App">
      <button className={classes.button}>
        <Link to={"/newForm"}>Add new post</Link>
      </button>
      <h1>API Posts</h1>
      <table className={classes.customers}>
        <tbody>
          <tr>
            <th>ID </th>
            <th>Title</th>
          </tr>
          {post &&
            post.map(({ id, title }) => (
              <tr key={id}>
                <td>{id}</td>
                <td>
                  <Link to={`/details/${id}`}>{title}</Link>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );

  return <div>{content}</div>;
}
export default ListPage;
