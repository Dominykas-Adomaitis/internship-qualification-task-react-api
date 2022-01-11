import classes from "./DetailsPage.module.css";
import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";

function DetailsPage() {
  const { id } = useParams();
  const url = `http://localhost:8080/api/posts/${id}`;

  const [post, setPost] = useState(null);

  let content = null;

  useEffect(() => {
    axios.get(url).then((response) => {
      setPost(response.data);
    });
  }, [url]);

  if (post) {
    content = (
      <div className="App">
        <h1>API Post Details</h1>
        <table className={classes.customers}>
          <tbody>
            <tr>
              <th>User ID </th>
              <th>ID</th>
              <th>Title</th>
              <th>Description</th>
            </tr>
            <tr>
              <td>{post.userId}</td>
              <td>{post.id}</td>
              <td>{post.title}</td>
              <td>{post.body}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }

  return <div>{content}</div>;
}
export default DetailsPage;
