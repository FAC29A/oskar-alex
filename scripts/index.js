// Deafult Groups
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
    const taskDate = getTodaysDateShortFormat()
    const taskState = 'pending'

    console.log(`TaskText ${taskText} group ${group}`)
    if (taskText && group)

      // Create and add the task
      createTaskUsingTemplate(taskDate, taskText, taskState, group)

      // Clear the input field after adding the task
      inputField.value = ''
    }
  }

// Add task to group
export function createTaskUsingTemplate(date, text, state, group) {
  const containerElement = document.querySelector(group)
  const taskList = containerElement.querySelector('#listToDo');
  console.log(`containerElement ${containerElement}`)
  console.log(`taskList ${taskList}`)
  const template = document.querySelector('#taskTemplate')
  const domFragment = template.content.cloneNode(true)
  domFragment.querySelector('.taskDate').textContent = date
  domFragment.querySelector('.taskText').textContent = text
  domFragment.querySelector('.taskState').textContent = state
  taskList.appendChild(domFragment)
}

// Add group
export function createGroupUsingTemplate(groupName) {
  const containerElement = document.querySelector('.groupsContainer')
  const template = document.querySelector('#groupTemplate')
  const domFragment = template.content.cloneNode(true)
  domFragment.querySelector('h2').textContent = groupName
  domFragment.querySelector('.tasksContainer').id = groupName
  // Assign an ID with a string prefix followed by the groupID
  const tasksContainerId = `group-${groupID}`;

  domFragment.querySelector('.tasksContainer').id = tasksContainerId;
  domFragment.querySelector('.addTaskField').id = `addTaskField-${groupID}`;
  const field = domFragment.querySelector('.addTaskField')
  field.addEventListener('keypress', (event) => handleAddTaskFieldEnter(event,`#${tasksContainerId}`));
  containerElement.appendChild(domFragment)
  groupID ++
}

window.addEventListener('load', (event) => {
  createGroupUsingTemplate('First Group')
  createGroupUsingTemplate('Second Group')
})
