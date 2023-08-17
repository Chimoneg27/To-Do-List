import './style.css';

const taskContainer = document.getElementById('tasks');

const toDoArr = [
  {
    desc: 'I will clean my room',
    bool: 'true',
    index: 0,
  },
  {
    desc: 'I have to read a book',
    bool: 'true',
    index: 1,
  },
  {
    desc: 'Play fifa with Camavinga',
    bool: 'false',
    index: 2,
  },
];

const getTasks = () => {
  toDoArr.forEach((activity, index) => {
    taskContainer.innerHTML += `
      <li class="activity">
        <div class="checkBoxex">
          <input type="checkbox" name="action1" id="${index}"/>
          <label for="${index}">${activity.desc}</label><br>
        </div>
        <i class="fa-solid fa-ellipsis-vertical fs-3 "></i>
      </li>
    `;
  });
};

getTasks();