//Collection of tests to be performed
import { equal, notEqual, test } from './test-helpers.js';

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
