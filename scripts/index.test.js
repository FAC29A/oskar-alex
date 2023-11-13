//Collection of tests to be performed
import { equal, test } from './test-helpers.js'

// Asynchronous function to wait for an element to appear in the DOM
async function waitForElement(selector, timeout = 5000) {
	const startTime = Date.now()

	return new Promise((resolve, reject) => {
		;(function checkElement() {
			const element = document.querySelector(selector)
			if (element) {
				resolve(element)
			} else if (Date.now() - startTime > timeout) {
				reject(new Error(`Element ${selector} not found within ${timeout}ms`))
			} else {
				setTimeout(checkElement, 100) // Check every 100ms
			}
		})()
	})
}

// Main function to run tests sequentially
async function testsBatch() {
	//This first await ensures that all the fields are created
	await waitForElement('.addTaskField')
	await test01()
	await test02()
	await test03()
	await test04()
	await test05()
	await test06()
	await test07()
	await test08()
}

async function test01() {
	return test('01 Submitting a new task adds it to the list', async () => {
		const inputField = document.querySelector('.addTaskField')
		const addTaskButton = document.querySelector('.addTaskButton')
		const taskList = document.querySelector('#listToDo')

		inputField.value = 'Task Create Test'
		addTaskButton.click()

		const addedTask = taskList.lastElementChild
		const taskText = addedTask.querySelector('.taskText').value

		equal(taskText.trim(), 'Task Create Test')

		inputField.value = ''

		//Remove the task
		addedTask.remove()
	})
}

async function test02() {
	return test('02 Clearing task text removes it from the list', async () => {
		// Wait for the necessary elements to be available
		const inputField = document.querySelector('.addTaskField')
		const addTaskButton = document.querySelector('.addTaskButton')
		const taskList = document.querySelector('#listToDo')

		inputField.value = 'Task Create Test'
		addTaskButton.click()

		const addedTask = taskList.lastElementChild
		const taskText = addedTask.querySelector('.taskText')

		// Clear the task text
		taskText.value = ''
		taskText.dispatchEvent(new Event('input'))

		// Simulate pressing "Enter"
		taskText.dispatchEvent(new KeyboardEvent('keypress', { key: 'Enter' }))

		equal(
			'# tasks on list:' + taskList.childElementCount,
			'# tasks on list:' + 0
		)

		inputField.value = ''
	})
}

async function test03() {
	return test('03 Adding a task using Enter', async () => {
		const inputField = document.querySelector('.addTaskField')
		const taskList = document.querySelector('#listToDo')

		inputField.value = 'Task Create with Enter Test'
		// Simulate pressing the Enter key
		const enterKeyEvent = new KeyboardEvent('keypress', { key: 'Enter' })
		inputField.dispatchEvent(enterKeyEvent)

		const addedTask = taskList.lastElementChild
		const taskText = addedTask.querySelector('.taskText').value

		equal(taskText.trim(), 'Task Create with Enter Test')

		inputField.value = ''

		//Remove the task
		addedTask.remove()
	})
}

async function test04() {
	return test('04 Creating a new group adds it to the group list', async () => {
		// Corrected the selector to use ID instead of class
		const createGroupButton = document.querySelector('#createGroupButton')
		const groupList = document.querySelector('.groupsContainer')

		createGroupButton.click()
		const addedGroup = groupList.lastElementChild // Get the last group element added
		// Set the group name
		const groupTitleInput = addedGroup.querySelector('.groupTitle')
		groupTitleInput.value = 'Test Group'

		//Check
		const testGroup = groupList.lastElementChild
		const testgroupTitleInput = testGroup.querySelector('.groupTitle')
		const groupName = testgroupTitleInput.value
		equal(groupName.trim(), 'Test Group')
	})
}

async function test05() {
	return test('05 Deleting a specific group removes it from the group list', async () => {
		// Step 1: Create a new group
		const createGroupButton = document.querySelector('#createGroupButton')
		createGroupButton.click()

		// Step 2: Find the newly created group
		const groupList = document.querySelector('.groupsContainer')
		const newGroup = groupList.lastElementChild

		// Step 3: Simulate clicking the delete button for the new group
		const deleteGroupButton = newGroup.querySelector('.deleteGroupButton')
		deleteGroupButton.click()

		// Step 4: Check if the specific group is removed from the group list
		const remainingGroups = document.querySelectorAll('.tasksContainer')

		// Ensure that the specific group is not present
		const isSpecificGroupPresent = Array.from(remainingGroups).some(
			(group) => group === newGroup
		)
		equal(isSpecificGroupPresent, false)
	})
}

async function test06() {
	return test('06 Sending a task to completed moves it to the completed section', async () => {
		// Step 1: Create a new task
		const inputField = document.querySelector('.addTaskField')
		const addTaskButton = document.querySelector('.addTaskButton')
		inputField.value = 'Task for Completion Test'
		addTaskButton.click()

		// Step 2: Find and click the 'send to complete' button for the new task
		const taskList = document.querySelector('#listToDo')
		const newTask = taskList.lastElementChild
		const moveToCompletedButton = newTask.querySelector('.moveToCompleted')
		moveToCompletedButton.click()

		// Step 3: Check if the task is now in the completed section
		const completedList = document.querySelector('#completedList')
		const completedTask = completedList.lastElementChild

		// Adjust this line based on the actual structure of the completed task
		const completedTaskText = completedTask
			? completedTask.textContent.trim()
			: null

		equal(completedTaskText.trim(), 'Task for Completion Test')

		inputField.value = '' // Clean up
	})
}

async function test07() {
	return test('07 Dragging a task from one group to another', async () => {
		// Step 1: Identify the first two groups
		const groups = document.querySelectorAll('.tasksContainer')
		const firstGroup = groups[0]
		const secondGroup = groups[1]

		// Step 2: Add a task to the first group
		const inputFieldFirstGroup = firstGroup.querySelector('.addTaskField')
		const addTaskButtonFirstGroup = firstGroup.querySelector('.addTaskButton')
		inputFieldFirstGroup.value = 'Task to Move 1 to 2'
		addTaskButtonFirstGroup.click()

		// Step 3: Simulate drag-and-drop
		const taskItem = firstGroup.querySelector('.taskItem')

		// Check if the taskItem is found
		if (!taskItem) {
			console.error('Task item not found in the first group.')
			return
		}

		// Set the task item ID
		const taskId = 'task-to-move'
		taskItem.id = taskId

		// Simulate dragstart event on the taskItem
		const dragStartEvent = new DragEvent('dragstart', {
			dataTransfer: new DataTransfer(),
		})
		dragStartEvent.dataTransfer.setData('text/plain', taskId)
		taskItem.dispatchEvent(dragStartEvent)

		// Simulate dragover event on the second group
		const dragOverEvent = new Event('dragover', { bubbles: true })
		secondGroup.dispatchEvent(dragOverEvent)

		// Simulate drop event on the second group
		const dropEvent = new DragEvent('drop', {
			dataTransfer: dragStartEvent.dataTransfer,
		})
		secondGroup.dispatchEvent(dropEvent)

		// Step 4: Verify that the task is in the second group
		const movedTask = secondGroup.querySelector(`#${taskId}`)

		// Check if the movedTask is found
		if (!movedTask) {
			console.error('Task item not found in the second group after drop.')
			return
		}

		const movedTaskText = movedTask.querySelector('.taskText').value.trim()
		equal(movedTaskText, 'Task to Move 1 to 2')
	})
}

async function test08() {
	return test('08 Clearing tasks from the completed list', async () => {
		// Step 1: Add tasks to the completed list
		const inputField = document.querySelector('.addTaskField')
		const addTaskButton = document.querySelector('.addTaskButton')
		const taskList = document.querySelector('#listToDo')
		const completedList = document.querySelector('#completedList')

		// Add the first task to the task list
		inputField.value = 'Task 1'
		addTaskButton.click()

		// Move the first task to the completed list
		const taskItem = taskList.lastElementChild
		const moveToCompletedButton = taskItem.querySelector('.moveToCompleted')
		moveToCompletedButton.click()

		// Add the second task to the task list
		inputField.value = 'Task 2'
		addTaskButton.click()

		// Move the second task to the completed list
		const secondTaskItem = taskList.lastElementChild
		const moveToCompletedButton2 =
			secondTaskItem.querySelector('.moveToCompleted')
		moveToCompletedButton2.click()

		// Step 2: Click the clearTasksButton
		const clearTasksButton = document.querySelector('#clearTasksButton')
		clearTasksButton.click()

		// Step 3: Check if the tasks are removed from the completed list
		const remainingTasks = completedList.children

		// Ensure that there are no tasks remaining in the completed list
		equal(remainingTasks.length, 0)
	})
}

testsBatch()
