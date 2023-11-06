// Deafult Groups
import { deafultGroups } from './index.data.js'
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

function getRandomPastelColor() {
  // Generate a random RGB value with a higher lightness
  const r = Math.floor(Math.random() * 128 + 127) // from 127 to 255
  const g = Math.floor(Math.random() * 128 + 127) // from 127 to 255
  const b = Math.floor(Math.random() * 128 + 127) // from 127 to 255

  // Convert the RGB values to a hex color string
  const color = `#${r.toString(16)}${g.toString(16)}${b.toString(16)}`

  return color
}

// Function to handle the 'Enter' key in addTaskFields
function handleAddTaskFieldEnter(event, group) {
  if (event.key === 'Enter') {
    const inputField = event.target
    const taskText = inputField.value.trim()
    const taskDate = getTodaysDateShortFormat()
    const taskState = 'pending'

    console.log(`TaskText ${taskText} group ${group}`)
    if (taskText && group)
      // Create and add the task
      createTaskUsingTemplate(taskText, group)

    // Clear the input field after adding the task
    inputField.value = ''
  }
}

// Remove Task
function deleteTask(event) {
  const task = event.target
  if (task.value.length === 0) {
    task.parentElement.remove()
  }
}

// Add task to group
export function createTaskUsingTemplate(text, group) {
  const containerElement = document.querySelector(group)
  const taskList = containerElement.querySelector('#listToDo')
  console.log(`containerElement ${containerElement}`)
  console.log(`taskList ${taskList}`)
  const template = document.querySelector('#taskTemplate')
  const domFragment = template.content.cloneNode(true)
  const field = domFragment.querySelector('.taskText')
  field.value = text
  // event listener to remove task
  field.addEventListener('keypress', function (event) {
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
  const tasksContainerId = `group-${groupID}`
  domFragment.querySelector('.tasksContainer').id = tasksContainerId
  domFragment.querySelector('.addTaskField').id = `addTaskField-${groupID}`
  const field = domFragment.querySelector('.addTaskField')
  field.addEventListener('keypress', (event) =>
    handleAddTaskFieldEnter(event, `#${tasksContainerId}`)
  )

  const deleteButton = domFragment.querySelector('.deleteGroupButton')
  deleteButton.addEventListener('click', () => deleteGroup(tasksContainerId))

  containerElement.appendChild(domFragment)
  const taskContainer = document.getElementById(tasksContainerId)
  if (color) {
    taskContainer.style.backgroundColor = color
  } else {
    taskContainer.style.backgroundColor = getRandomPastelColor()
  }

  groupID++
}
// Delete Group
function deleteGroup(groupId) {
  const groupElement = document.getElementById(groupId)
  if (groupElement) {
    groupElement.remove() // Removes the whole group container
  } else {
    console.error(`No element found with ID ${groupId}`)
  }
}

// Create initial deafult groups
window.addEventListener('load', (event) => {
  deafultGroups.forEach((element) => {
    createGroupUsingTemplate(element.groupName, element.backgroundColour)
  })
})

const newGroupButton = document.getElementById('createGroupButton')
newGroupButton.addEventListener('click', (event) => {
  createGroupUsingTemplate()
})

// Hide/show Sidebar

function toggleSidebar() {
  const sidebar = document.getElementById('sidebar') // Access the specific element
  sidebar.classList.toggle('hidden')
}

document.getElementById('sidebar').addEventListener('click', toggleSidebar)
