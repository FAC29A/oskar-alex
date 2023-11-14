// Deafult Groups
import { deafultGroups } from './index.data.js'

// Unique Id Counters
let groupId = 1
let taskId = 1

function getRandomPastelColor() {
	// Generate a random RGB value with a higher lightness
	const r = Math.floor(Math.random() * 128 + 127) // from 127 to 255
	const g = Math.floor(Math.random() * 128 + 127) // from 127 to 255
	const b = Math.floor(Math.random() * 128 + 127) // from 127 to 255

	// Convert the RGB values to a hex color string
	const color = `#${r.toString(16)}${g.toString(16)}${b.toString(16)}`
	return color
}

function generateUniqueTaskID() {
	const uniqueTaskID = `task-${taskId}`
	taskId++
	return uniqueTaskID
}

function generateUniqueGroupID() {
	const uniqueGroupID = `group-${groupId}`
	groupId++
	return uniqueGroupID
}

// Function to handle the 'Enter' key in addTaskFields
function handleAddTaskFieldEnter(event, group) {
	if (event.key === 'Enter') {
		const inputField = event.target
		const taskText = inputField.value.trim()

		if (taskText && group) {
			// Create and add the task
			createTaskUsingTemplate(taskText, group)
		}

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

// Function to add a task to the group
export function addTaskToGroup(taskText, groupId) {
	if (taskText && groupId) {
		// Create and add the task
		createTaskUsingTemplate(taskText, groupId)
	}
}

// Create task
export function createTaskUsingTemplate(text, group) {
	const containerElement = document.querySelector(group)
	const taskList = containerElement.querySelector('#listToDo')

	const template = document.querySelector('#taskTemplate')
	const domFragment = template.content.cloneNode(true)
	const field = domFragment.querySelector('.taskText')
	const taskItem = domFragment.querySelector('.taskItem')

	field.value = text
	taskItem.draggable = true
	taskItem.id = generateUniqueTaskID()

	// Add drag event listener
	taskItem.addEventListener('dragstart', handleDragStart)

	// event listener to remove task when the taskText is empty
	field.addEventListener('keypress', function (event) {
		if (event.key === 'Enter' || event.code === 'Enter') {
			deleteTask(event)
		}
	})

	// Add 'Enter', 'Delete', 'Backspace', 'ArrowLeft', and 'ArrowRight' key event listener
	taskItem.addEventListener('keydown', function (event) {
		switch (event.key) {
			case 'Enter':
				handleMoveToCompleted(event)
				break
			case 'Delete':
			case 'Backspace':
				deleteTaskItem(taskItem)
				break
			case 'ArrowLeft':
				moveTaskToAdjacentGroup(taskItem, 'previous')
				break
			case 'ArrowRight':
				moveTaskToAdjacentGroup(taskItem, 'next')
				break
		}
	})

	taskList.appendChild(domFragment)
}

// Function to move a task item to the adjacent group
function moveTaskToAdjacentGroup(taskItem, direction) {
	const currentGroup = taskItem.closest('.tasksContainer')
	let targetGroup

	if (direction === 'previous') {
		targetGroup =
			currentGroup.previousElementSibling ||
			document.querySelector('.tasksContainer:last-child')
	} else {
		targetGroup =
			currentGroup.nextElementSibling ||
			document.querySelector('.tasksContainer:first-child')
	}

	if (targetGroup) {
		const targetList = targetGroup.querySelector('#listToDo')
		targetList.appendChild(taskItem)
    taskItem.focus()
	}
}

// Function to delete a task item
function deleteTaskItem(taskItem) {
	if (taskItem) {
		taskItem.remove()
	}
}

// Handle move to completed logic
function handleMoveToCompleted(event) {
	// Retrieve the task text from the input field
	const taskItem = event.target.closest('.taskItem')
	const taskText = taskItem.querySelector('.taskText').value

	// Create a new list item for the completed list
	const completedTask = document.createElement('li')
	completedTask.textContent = taskText // Set the text of the completed task

	// Select the completed list and append the new list item
	const completedList = document.getElementById('completedList')
	completedList.appendChild(completedTask)

	// Remove the task item from its current list
	taskItem.remove()
}

// Add group
export function createGroupUsingTemplate(groupName, color) {
	const containerElement = document.querySelector('.groupsContainer')
	const template = document.querySelector('#groupTemplate')
	const domFragment = template.content.cloneNode(true)

	// Define the group title
	const groupTitle = domFragment.querySelector('.groupTitle')
	const uniqueId = generateUniqueGroupID()

	if (groupName) {
		groupTitle.value = groupName
		groupTitle.setAttribute('tabindex', uniqueId.toString())
	}

	// Delete Button
	const deleteButton = domFragment.querySelector('.deleteGroupButton')
	deleteButton.addEventListener('click', () => deleteGroup(uniqueId))

	// Assign an ID
	domFragment.querySelector('.tasksContainer').id = uniqueId
	domFragment.querySelector('.addTaskField').id = `addTaskField-${uniqueId}`
	const field = domFragment.querySelector('.addTaskField')
	field.addEventListener('keypress', (event) =>
		handleAddTaskFieldEnter(event, `#${uniqueId}`)
	)

	// Find the addTaskField and addTaskButton inside the domFragment
	const addTaskField = domFragment.querySelector('.addTaskField')
	const addTaskButton = domFragment.querySelector('.addTaskButton')

	// Add event listener to the addTaskButton
	addTaskButton.addEventListener('click', () => {
		// Call the function to add the task to the group
		addTaskToGroup(addTaskField.value.trim(), `#${uniqueId}`)
		addTaskField.value = '' // Clear the input field after adding the task
	})

	containerElement.appendChild(domFragment)

	// After appending, set the focus on the group title
	// Using requestAnimationFrame to ensure the focus occurs after any reflows or repaints
	requestAnimationFrame(() => {
		groupTitle.focus()
	})

	// Set group colors
	const taskContainer = document.getElementById(uniqueId)

	if (color) {
		taskContainer.style.backgroundColor = color
	} else {
		taskContainer.style.backgroundColor = getRandomPastelColor()
	}

	// Listen for Enter key on the group title input
	groupTitle.addEventListener('keydown', function (event) {
		if (event.key === 'Enter' || event.code === 'Enter') {
			event.preventDefault() // Prevent form submission or other default behavior
			focusNextElement(event.target) // Move focus to the next element
		}
	})

	// Attach dragover and drop event listeners to the tasks container
	if (taskContainer) {
		taskContainer.addEventListener('dragover', handleDragOver)
		taskContainer.addEventListener('drop', handleDrop)
	}
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

// Create initial default groups
window.addEventListener('load', (event) => {
  deafultGroups.forEach((element, index) => {
      // Create the group
      createGroupUsingTemplate(element.groupName, element.backgroundColour);

      // Construct the group ID based on the current group count
      const uniqueGroupId = `group-${index + 1}`; // groupId starts from 1

      // Check if there are tasks to be added to this group
      if (element.Tasks && element.Tasks.length > 0) {
          element.Tasks.forEach(task => {
              // Add each task to the group
              addTaskToGroup(task, `#${uniqueGroupId}`);
          });
      }
  });
});


// Add new group button
const newGroupButton = document.getElementById('createGroupButton')
newGroupButton.addEventListener('click', (event) => {
	createGroupUsingTemplate()
})

// Hide/show Sidebar
// Assuming the sidebar starts out as expanded
const sidebar = document.getElementById('sidebar')

// The toggle button
const toggleBtn = document.getElementById('toggleSidebar')

// Event listener for the toggle button
toggleBtn.addEventListener('click', function () {
	// Toggle the 'hidden' class on sidebar
	sidebar.classList.toggle('hidden')
})

// Sidebar clear tasks button
const clearTasksButton = document.getElementById('clearTasksButton')

// Function to handle clearing tasks
function clearTasks() {
	// Get the completed tasks list
	const completedList = document.getElementById('completedList')

	// Remove all tasks from the completed tasks list
	completedList.innerHTML = ''
}

clearTasksButton.addEventListener('click', clearTasks)

//Enter works like "tab"
function focusNextElement(element) {
	// Get all focusable elements
	const focusableElements = Array.from(
		document.querySelectorAll(
			'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
		)
	)

	const index = focusableElements.indexOf(element)

	if (index > -1) {
		// Focus the next focusable element; if there's no next element, focus the first one
		const nextElement = focusableElements[index + 1] || focusableElements[0]
		nextElement.focus()
	}
}

// Task Drag and Drop functions
function handleDragStart(event) {
	event.dataTransfer.setData('text/plain', event.target.id)
}

function handleDragOver(event) {
	event.preventDefault()
}

function handleDropOnGroup(event) {
	event.preventDefault()
	const taskId = event.dataTransfer.getData('text/plain')
	const draggedTask = document.getElementById(taskId)
	const targetGroup = event.target.closest('.tasksContainer')

	if (targetGroup && draggedTask) {
		const listToDo = targetGroup.querySelector('#listToDo')
		listToDo.appendChild(draggedTask)
	}
}

function handleDropOnCompleted(event) {
	event.preventDefault()
	const taskId = event.dataTransfer.getData('text/plain')
	const draggedTask = document.getElementById(taskId)
	if (draggedTask) {
		// Transform the task for the Completed sidepanel
		const taskText = draggedTask.querySelector('.taskText').value
		const completedTask = document.createElement('li')
		completedTask.textContent = taskText
		// Append to the completed list
		const completedList = document.getElementById('completedList')
		completedList.appendChild(completedTask)
		// Remove from the original list
		draggedTask.remove()
	}
}

function handleDrop(event) {
	const targetIsCompletedPanel =
		event.target.id === 'sidebar' || event.target.closest('#sidebar')
	if (targetIsCompletedPanel) {
		handleDropOnCompleted(event)
	} else {
		handleDropOnGroup(event)
	}
}

// Get the reference to the Completed sidepanel
const completedSidepanel = document.getElementById('sidebar')

// Allow the drop action by preventing the default handling of the 'dragover' event
completedSidepanel.addEventListener('dragover', function (event) {
	event.preventDefault() // This is necessary to allow the drop
	event.dataTransfer.dropEffect = 'move' // Optional: this gives visual feedback during drag
})

// Handle the drop action with the 'drop' event
completedSidepanel.addEventListener('drop', handleDrop)

// Update the event listeners for the Completed sidepanel
const completedList = document.getElementById('completedList')
completedList.addEventListener('dragover', handleDragOver)
completedList.addEventListener('drop', handleDrop)
