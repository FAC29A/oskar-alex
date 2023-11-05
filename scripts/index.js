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
function handleAddTaskFieldEnter(event) {
  if (event.key === 'Enter') {
    const inputField = event.target
    const taskText = inputField.value.trim()
    const taskDate = getTodaysDateShortFormat()
    const taskState = 'pending'

    if (taskText) {
      // Determine the group based on the id of the input field
      let group
      switch (inputField.id) {
        case 'addToDo':
          group = '#listToDo'
          break
        case 'addInProgress':
          group = '#listInProgress'
          break
        case 'addCompleted':
          group = '#listCompleted'
          break
        default:
          return // Exit if the group is not recognized
      }

      // Create and add the task
      createTaskUsingTemplate(taskDate, taskText, taskState, group)

      // Clear the input field after adding the task
      inputField.value = ''
    }
  }
}

// Attach the event listener to all addTaskFields
document.querySelectorAll('.addTaskField').forEach((field) => {
  field.addEventListener('keypress', handleAddTaskFieldEnter)
})

// Modify the createTaskUsingTemplate function to use correct selectors
export function createTaskUsingTemplate(date, text, state, group) {
  const containerElement = document.querySelector(group)
  const template = document.querySelector('#taskTemplate')
  const domFragment = template.content.cloneNode(true)
  domFragment.querySelector('.taskDate').textContent = date // Fix the selectors here
  domFragment.querySelector('.taskText').textContent = text
  domFragment.querySelector('.taskState').textContent = state
  containerElement.appendChild(domFragment)
}

export function addTask(group, task) {}

export function deleteTask(task) {}

export function moveTask(origin, end, task) {}
