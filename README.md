# ConferenceNode

A Node app built with Angular. For demonstration purposes.

Node provides the API. Angular provides the frontend and accesses the API.


## Installation

1. Clone the repository: `git clone git@github.com:aprilpicture/ConferenceNode`
2. Install the application: `npm install`
3. Start the server: `node server.js`
4. View in browser at `http://localhost:8081`

## 
use the given url: https://registration.gputechconf.com/cubehenge/json.php/GTC.MobileGuestServices.getSessions/GTC%202015/true

Which returns json in the following format:

[
  {
    "id": "S0001",
    "lsoUID": "1",
    "description": "Our presentation this year will provide an update on the...",
    "length": "25",
    "level": "1",
    "pdfUrl": "http://on-demand.gputechconf.com/gtc/2015/presentation/my-preso.pdf",
    "title": "Big Data in Real Time: An Approach to Predictive Analytics for...",
    "sessionTopic1": "16",
    "sessionTopic2": "103",
    "sessionTopic3": "2",
    "sessionTopic4": "",
    "sessionTopic5": "",
    "type": "1",
    "videoUrl": "http://on-demand.gputechconf.com/gtc/2015/video/S0001.html",
    "speakerInfo": [
      {
        "name": "John Doe",
        "organization": "Doeboys Inc.",
        "email": "jdoe@email.com",
        "jobTitle": "Chief Baking Officer"
      },
      {
        "name": "Jane Doe",
        "organization": "MJ & Associates.",
        "email": "jane.doe@mj-associates.com",
        "jobTitle": "Consultant"
      }
    ]
  },
  ...
  {
    ...
  }
]
Using Node.js, please complete the following tasks:

Task 1 (Speaker Information):

Choose a data structure for the speakers. Organize the session data so that each speaker only appears once. The speaker should maintain all of its properties. The speaker should have an additional property to store the Session IDs (e.g., "id": "S001") for which the speaker has presented at.

Print the information in the following format:

John Doe has spoken at 1 session(s).
Jane Doe has spoken at 2 session(s).
...
Task 2 (Organization Information):

Choose a data structure for the organizations. Organize the speaker data from the previous task so that each organization only appears once. The organization should contain speakers which should maintain all of their properties. The organization should also contain sessions which should hold all of the sessions ID's in which speakers from the organization have spoken at.

Print the information in the following format:

NVIDIA had 2 employee(s) that spoke at 1 session(s).
...
Task 3 (Node backend & Angular SPA):

Using the Sessions URL and building off the previous tasks, create a Node.js backend to fetch the data and serve as an API endpoint for an angularjs app. Lay the data out cleanly in the angularjs app, and feel free to use bootstrap to pretty things up.

Task 4 (JSON to CSV):

Using the Sessions URL, write the json data to a csv file. You can remove the speakers from the output.
