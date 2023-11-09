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

      setTimeout(() => {
        const addedTask = taskList.lastElementChild;
        const taskText = addedTask.querySelector('.taskText').value;

        equal(taskText.trim(), 'Task Create Test');

        inputField.value = '';
        resolve(); // Resolve the promise after the test completes
      }, 100);
    }, 100);
  });
});

//Check things off my list so that I can see what I’ve done
test('Checking an entry marks it as complete', () => {
  // test goes here
});

//Delete things from the list if I don’t need to do them anymore
test('Deleting an entry removes it from the list', () => {
  // test goes here
});

//Strech
//This one doesnt apply to use, so we need to rethink it.
//Filter out completed to-dos from my list so that I can focus on what’s left to do
test('Toggling the filter hides completed tasks from the list', () => {
  // test goes here
});