document.getElementById("heading").innerText = `Welcome, ${localStorage.getItem(
  "username"
)}`;
let counter = 1;
let tasks = {};
document.querySelector(".btn").addEventListener("click", render);

function render() {
  const task = document.querySelector(".search").value;
  document.querySelector(".search").value = "";

  if (task && counter <= 7) {
    lDiv = document.createElement("div");
    lDiv.setAttribute("class", "lDiv");
    lDiv.setAttribute("id", `task${counter}`);

    rDiv = document.createElement("div");
    rDiv.setAttribute("class", "rDiv");

    delDiv = document.createElement("div");
    delDiv.setAttribute("class", "delete");

    doneDiv = document.createElement("div");
    doneDiv.setAttribute("class", "done");

    outerDiv = document.createElement("div");
    outerDiv.setAttribute("class", "outer");
    outerDiv.setAttribute("id", `outer${counter}`);

    done = document.createElement("button");
    done.innerText = "Done";
    done.setAttribute("id", "done");
    done.setAttribute("class", `done${counter}`);
    done.addEventListener("click", function (e) {
      const cls = e.currentTarget.className;
      doneTask(cls);
    });

    del = document.createElement("button");
    del.innerText = "Delete";
    del.setAttribute("id", "delete");
    del.setAttribute("class", `del${counter}`);
    del.addEventListener("click", function (e) {
      const cls = e.currentTarget.className;
      deleteTask(cls);
    });

    lDiv.innerText = task;
    delDiv.appendChild(del);
    doneDiv.appendChild(done);
    rDiv.appendChild(delDiv);
    rDiv.appendChild(doneDiv);
    outerDiv.appendChild(lDiv);
    outerDiv.appendChild(rDiv);
    document.querySelector(".right").appendChild(outerDiv);
    counter++;
  } else if (counter > 7) {
    alert("You can't add more tasks");
  } else {
    alert("Please specify a task");
  }
}
function doneTask(cls) {
  const val = cls[4];
  const id = "#task" + val;
  console.log(id);
  const task = document.querySelector(id).innerText;
  document.querySelector(id).innerText = "";
  document.querySelector(id).innerHTML = `<i style="opacity:20%">${task}</i>`;
}
function deleteTask(cls) {
  const val = cls[3];
  const id = "#outer" + val;
  document.querySelector(id).remove();
  counter -= 1;
}
