import { useState } from 'react';
import CommentList from './comment-list';
import NewComment from './new-comment';
import classes from './comments.module.css';

function Comments(props) {
  const { eventId } = props;
  const [loadedComments, setLoadedComments] = useState([]);
  const [showComments, setShowComments] = useState(false);


  const loadComments = async () => {
    fetch('/api/comment/' + eventId)
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data);
        setLoadedComments(data.comments);
      })
  };
  function toggleCommentsHandler() {
    setShowComments((prevStatus) => !prevStatus);
    if (!showComments) {
      loadComments();
    }

  }

  const addCommentHandler = async (commentData) => {
    commentData.eventId = props.eventId;

    fetch('/api/comment/' + props.eventId, {
      method: 'POST',
      body: JSON.stringify(commentData),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        if (!response.ok) {
          return response.json().then(err => {
            throw new Error(`Error: ${err.message || response.statusText}`);
          });
        }
        return response.json();
      })
      .then(data => console.log(data))
      .catch(error => {
        console.error('Request failed:', error.message);
        console.error('Error details:', error);
      });


  }







  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? 'Hide' : 'Show'} Comments
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {loadedComments && loadedComments.length > 0 && <CommentList items={loadedComments} />}
    </section>
  );
}

export default Comments;
