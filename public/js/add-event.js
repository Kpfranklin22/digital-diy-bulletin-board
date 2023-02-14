
async function newFormHandler(event) {
  event.preventDefault();

  const title = document.querySelector('input[name="post-title"]').value;
  const description = document.querySelector('input[name="description"]').value;
  const venue = document.querySelector('input[name="venue"').value;
  const event_time = document.querySelector('input[name="event_time').value;
  const img_source = document.querySelector('input[name="img_source').value;




  const response = await fetch('/api/events', {
    method: "POST",
    body: JSON.stringify({
      title,
      description,
      venue,
      event_time,
      img_source
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    document.location.replace("/");
  } else {
    alert(response.statusText);
  }
}

document
  .querySelector("#new-post-form")
  .addEventListener("submit", newFormHandler);
