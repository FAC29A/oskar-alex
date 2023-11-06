// Deafult Groups
import { deafultGroups } from "./index.data.js"
let groupID = 0

// Definition of functions and JS related with DOM manipulation

// Helper function to format today's date in short format
function getTodaysDateShortFormat() {
  const today = new Date()
  return today.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  })
}

// Function to handle the 'Enter' key in addTaskFields
function handleAddTaskFieldEnter(event, group) {
  if (event.key === 'Enter') {
    const inputField = event.target
    const taskText = inputField.value.trim()

      // Create and add the task
      createTaskUsingTemplate(taskText, group)

      // Clear the input field after adding the task
      inputField.value = ''
    }
  }

// Remove Task
 function deleteTask(event) {
  const task = event.target
  if (task.value.length === 0) {task.parentElement.remove()}
 } 

// Add task to group
export function createTaskUsingTemplate(text, group) {
  const containerElement = document.querySelector(group)
  const taskList = containerElement.querySelector('#listToDo');
  console.log(`containerElement ${containerElement}`)
  console.log(`taskList ${taskList}`)
  const template = document.querySelector('#taskTemplate')
  const domFragment = template.content.cloneNode(true)
  const field = domFragment.querySelector('.taskText')
  field.value = text
  // event listener to remove task
  field.addEventListener('keypress', function(event) {
    if (event.key === 'Enter' || event.code === 'Enter') {
      deleteTask(event)
    }
  })
  
  taskList.appendChild(domFragment)
}

// Add group
export function createGroupUsingTemplate(groupName, color) {
  const containerElement = document.querySelector('.groupsContainer')
  const template = document.querySelector('#groupTemplate')
  const domFragment = template.content.cloneNode(true)
  if (groupName) {

    //Change this
    domFragment.querySelector('.groupTitle').value = groupName
  }

  domFragment.querySelector('.tasksContainer').id = groupName
  // Assign an ID with a string prefix followed by the groupID
  const tasksContainerId = `group-${groupID}`;
  domFragment.querySelector('.tasksContainer').id = tasksContainerId;
  domFragment.querySelector('.addTaskField').id = `addTaskField-${groupID}`;
  const field = domFragment.querySelector('.addTaskField')
  field.addEventListener('keypress', (event) => handleAddTaskFieldEnter(event,`#${tasksContainerId}`));
  containerElement.appendChild(domFragment)
  const taskContainer = document.getElementById(tasksContainerId)
  if (color) {taskContainer.style.backgroundColor = color}
  groupID ++
}

// Create initial deafult groups
window.addEventListener('load', (event) => {
  deafultGroups.forEach(element => {
    createGroupUsingTemplate(element.groupName, element.backgroundColour)
  });
})

// Button for creating a new group
const newGroupButton = document.getElementById("createGroup")
newGroupButton.addEventListener('click', (event) => {createGroupUsingTemplate()})
