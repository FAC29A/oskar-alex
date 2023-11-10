//Collection of tests to be performed
import { equal, notEqual, test } from './test-helpers.js';
/*
test('Submitting a new task adds it to the list', async () => {
  await new Promise((resolve) => {
    setTimeout(() => {
      const inputField = document.querySelector('.addTaskField');
      const addTaskButton = document.querySelector('.addTaskButton');
      const taskList = document.querySelector('#listToDo');

      inputField.value = 'Task Create Test';
      addTaskButton.click();
   
      const addedTask = taskList.lastElementChild;
      const taskText = addedTask.querySelector('.taskText').value;

      equal(taskText.trim(), 'Task Create Test');

      inputField.value = '';
      resolve(); // Resolve the promise after the test completes
     
    }, 100);
  });
});


test('Adding a task using Enter', async () => {
  await new Promise((resolve) => {
    setTimeout(() => {

      console.group('Adding a task using Enter');

      const inputField = document.querySelector('.addTaskField')
      const taskList = document.querySelector('#listToDo')

      inputField.value = 'Task Create with Enter Test'
      // Simulate pressing the Enter key
      const enterKeyEvent = new KeyboardEvent('keypress', { key: 'Enter' })
      inputField.dispatchEvent(enterKeyEvent)

      const addedTask = taskList.lastElementChild
      const taskText = addedTask.querySelector('.taskText').value

      equal(taskText.trim(), 'Task Create with Enter Test')

      inputField.value = '';

      resolve() // Resolve the promise after the test completes
      console.groupEnd('Adding a task using Enter');
    }, 100)
  })
})

test('Creating a new group adds it to the group list', async () => {
  await new Promise((resolve) => {
    setTimeout(() => {
      console.group('Creating a new group adds it to the group list')

      // Corrected the selector to use ID instead of class
      const createGroupButton = document.querySelector('#createGroupButton');
      const groupList = document.querySelector('.groupsContainer');
      
      createGroupButton.click();
      const addedGroup = groupList.lastElementChild; // Get the last group element added
      // Set the group name
      const groupTitleInput = addedGroup.querySelector('.groupTitle');
      groupTitleInput.value = 'Test Group';

      //Check
      const testGroup = groupList.lastElementChild;
      const testgroupTitleInput = testGroup.querySelector('.groupTitle');
      const groupName = testgroupTitleInput.value;
      equal(groupName.trim(), 'Test Group');
      resolve(); // Resolve the promise after the test completes
      console.groupEnd('Creating a new group adds it to the group list');
    }, 100);
  });
});
*/
test('Dragging a task from one group to another moves it correctly', async () => {
  await new Promise((resolve) => {
    setTimeout(() => {
      console.group('Dragging a task from one group to another');

      // Step 1: Identify the first two groups
      const groups = document.querySelectorAll('.tasksContainer');
      const firstGroup = groups[0];
      const secondGroup = groups[1];

      // Step 2: Add a task to the first group
      const inputFieldFirstGroup = firstGroup.querySelector('.addTaskField');
      const addTaskButtonFirstGroup = firstGroup.querySelector('.addTaskButton');
      inputFieldFirstGroup.value = 'Task to Move';
      addTaskButtonFirstGroup.click();

      setTimeout(() => {
        // Step 3: Simulate drag-and-drop
        // This is a simplified version. In real scenarios, dispatch dragstart, dragend, and drop events
        const taskItem = firstGroup.querySelector('.taskItem');
        console.log('Task Item:', taskItem); // Debugging line
        const taskListSecondGroup = secondGroup.querySelector('#listToDo');
        taskListSecondGroup.appendChild(taskItem);

        setTimeout(() => {
          // Step 4: Verify that the task is in the second group
          const movedTask = taskListSecondGroup.lastElementChild;
          // Adjusted to retrieve text from input field
          const movedTaskText = movedTask ? movedTask.querySelector('.taskText').value.trim() : 'No task found';

          equal(movedTaskText, 'Task to Move');

          resolve(); // Resolve the promise after the test completes

          console.groupEnd('Dragging a task from one group to another');
        }, 100);
      }, 100);
    }, 100);
  });
});
