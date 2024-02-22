// Initialize an empty array to store leads
let myLeads = [];

// Get references to DOM elements
const inputEl = document.getElementById("input-el");
const inputBtn = document.getElementById("input-btn");
const ulEl = document.getElementById("ul-el");
const deleteBtn = document.getElementById("delete-btn");
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads")); // Retrieve leads from local storage
const tabBtn = document.getElementById("tab-btn");

// Check if leads exist in local storage
if (leadsFromLocalStorage) {
  myLeads = leadsFromLocalStorage; // If yes, assign them to myLeads array
  render(myLeads); // Render the leads on the UI
}

// Event listener for tab button click
tabBtn.addEventListener("click", function () {
  // Query active tab from Chrome
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    // Push the URL of the active tab to myLeads array
    myLeads.push(tabs[0].title);
    // Save myLeads array to local storage
    localStorage.setItem("myLeads", JSON.stringify(myLeads));
    // Render the updated leads on the UI
    render(myLeads);
  });
});

// Function to render leads on the UI
function render(leads) {
  let listItems = "";
  // Iterate through leads array to generate list items
  for (let i = 0; i < leads.length; i++) {
    listItems += `
          <li>
          <a target='_blank' href='${leads[i]}'> 
              ${leads[i]}
          </a>
          <i class="fas fa-trash delete-icon" data-index="${i}"></i>
      </li>`;
  }
  ulEl.innerHTML = listItems; // Set innerHTML of ul element with generated list items

  // Add event listener for delete icons
  const deleteIcons = document.querySelectorAll(".delete-icon");
  deleteIcons.forEach((icon) => {
    icon.addEventListener("click", function () {
      const index = icon.getAttribute("data-index");
      if (index !== null) {
        // Remove the lead at the specified index from myLeads array
        myLeads.splice(index, 1);
        // Update myLeads array in local storage
        localStorage.setItem("myLeads", JSON.stringify(myLeads));
        // Render the updated leads on the UI
        render(myLeads);
      }
    });
  });
}

// Event listener for delete button double click
deleteBtn.addEventListener("dblclick", function () {
  // Clear local storage
  localStorage.clear();
  // Clear myLeads array
  myLeads = [];
  // Render empty leads on the UI
  render(myLeads);
});

// Event listener for input button click
inputBtn.addEventListener("click", function () {
  // Check if input value is not empty
  if (inputEl.value.length === 0) return;
  // Push the input value to myLeads array
  myLeads.push(inputEl.value);
  // Clear input value
  inputEl.value = "";
  // Update myLeads array in local storage
  localStorage.setItem("myLeads", JSON.stringify(myLeads));
  // Render the updated leads on the UI
  render(myLeads);
});
