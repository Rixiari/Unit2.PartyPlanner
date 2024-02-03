// fetch events data from API
async function getEvents() {
  try {
    const response = await fetch(
      "https://fsa-crud-2aa9294fe819.herokuapp.com/api/2310-fsa-et-web-pt-sf-b-Lisa/events"
    );
    const jsonResponse = await response.json();
    const events = jsonResponse.data;
    console.log(events);
    return events;
  } catch (error) {
    console.error(error.message);
  }
}

//Post events to API
async function postEvents() {
  try {
    const input = document.getElementById("form");
    console.log(input.eventName.value);
    const response = await fetch(
      "https://fsa-crud-2aa9294fe819.herokuapp.com/api/2310-fsa-et-web-pt-sf-b-Lisa/events",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: input.eventName.value,
          description: input.description.value,
          date: new Date(input.date.value).toISOString(),
          location: input.location.value,
        }),
      }
    );
    const jsonResponse = await response.json();
    const events = jsonResponse.data;
    input.eventName.value = "";
    input.description.value = "";
    input.date.value = "";
    input.location.value = "";
    render();
  } catch (error) {
    console.error(error.message);
  }
}

// delete events data from API
async function deleteEvents(id) {
    try {
         await fetch(
        `https://fsa-crud-2aa9294fe819.herokuapp.com/api/2310-fsa-et-web-pt-sf-b-Lisa/events/${id}`,{
            method: "DELETE",
            // no body because id is in the path/url, no header because no authorization required
        }
      );
        render();
    } catch (error) {
      console.error(error.message);
    }
  }

function createElements(events) {
  const list = document.getElementById("events");
    list.innerHTML = "";
  events.forEach((event) => {
    const eventsListItem = document.createElement("li"); //make new list item
    eventsListItem.innerHTML = `<h2>${event.name}</h2><p>${event.location}</p><p>${event.date}</p><p>${event.description}</p> <button data-id="${event.id}" id="deleteButton">Delete</button>`; //add h2 tag
    list.appendChild(eventsListItem); //append list item in list that already exists in html
  });
}

async function render() {
  const events = await getEvents();
  createElements(events);
  const formButton = document.querySelector("#formButton");
  console.log(formButton);
  formButton.addEventListener("click", function (event) {
    event.preventDefault();
    postEvents();
  });
  const deleteButtons = document.querySelectorAll("#deleteButton");
  console.log(deleteButtons);
  deleteButtons.forEach((deleteButton)=>{
    deleteButton.addEventListener("click",async function(event){
        id = event.target.dataset.id;
        await deleteEvents(id);
    })
  })
}

render();

// async function getEvents() {
//     try {
//         const response = await fetch("https://fsa-crud-2aa9294fe819.herokuapp.com/api/2109-CPU-RM-WEB-PT/events");
//         if (!response.ok) {
//             throw new Error(`HTTP error! Status: ${response.status}`);
//         }
//         const data = await response.json();
//         console.log(data); // Log the received data for debugging
//         const events = data;
//         return events;
//     } catch (error) {
//         console.error(error.message);
//     }
// }

// getEvents()
//     .then(events => {
//         // Handle the received events here
//         console.log(events);
//     })
//     .catch(error => {
//         // Handle any errors that occurred during the fetching
//         console.error(error);
//     });
