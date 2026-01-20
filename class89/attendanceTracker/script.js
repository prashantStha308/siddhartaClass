const endpoint = "https://6967cbc9bbe157c088b309a3.mockapi.io/api/student";

// -------------------- HELPERS --------------------
function createElement(tag, classList) {
	const el = document.createElement(tag);
	if(classList) {
		if(Array.isArray(classList)){
			el.classList.add(...classList);
		}
		else{
			el.classList.add(classList);
		}
	}
	return el;
}

function today(isPresent) {
	const date = new Date().toISOString().split("T")[0];
	return { date: date, isPresent: isPresent };
}

function updateAttendance(oldAttendance, record) {

	if(Array.isArray(oldAttendance)){
		return [...oldAttendance, record]
	}else{
		return [record];
	}
}

// -------------------- API --------------------
async function fetchStudents() {
	const res = await fetch(endpoint);
	return await res.json();
}

async function saveStudent(id, data) {
	const res = await fetch(`${endpoint}/${id}`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify(data)
	});
	return await res.json();
}

async function registerStudent(event) {
	event.preventDefault();
	const target = event.target.elements;

	const student = {
		name: target.name.value,
		rollNo: target.rollNo.value,
		age: target.age.value,
		address: target.address.value,
		phone: target.phone.value
	};

	const res = await fetch(endpoint, {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify(student)
	});

	if(res.status === 201){
		console.log("success")
	}else{
		console.log("failed")
	}

	console.log(res);

	// renderStudents();
}

// -------------------- ATTENDANCE --------------------
async function togglePresent(student, btn) {
	const record = today(!student.isPresent);
	const updatedAttendance = updateAttendance(student.attendance, record);

	const updatedStudent = {
		...student,
		attendance: updatedAttendance,
		isPresent: !student.isPresent
	};

	await saveStudent(student.id, updatedStudent);
	btn.textContent = updatedStudent.isPresent ? "Student Present" : "Mark Present";
	renderStudents();
}

async function deleteStudent(student) {
	await fetch(`${endpoint}/${student.id}`, { method: "DELETE" });
	renderStudents();
}

// -------------------- UI --------------------
function createListItem(student) {
	const li = createElement("li", "student-list-item");

	const roll = createElement("span", "std-rollNo");
	roll.textContent = student.rollNo;

	const sect1 = createElement("div", "std-sect");
	const name = createElement("span", ["std-name", "text-big"]);
	name.textContent = student.name;
	const gender = createElement("span", ["std-gender", "text-medium", "text-faded"]);
	gender.textContent = student.gender;
	sect1.appendChild(name);
	sect1.appendChild(gender);

	const sect2 = createElement("div", "std-sect");
	const phone = createElement("span", ["std-phone", "text-medium"]);
	phone.textContent = "Phone: " + student.phone;
	const address = createElement("span", ["std-address", "text-medium", "text-faded"]);
	address.textContent = student.address;
	sect2.appendChild(phone);
	sect2.appendChild(address);


	let isPresentSpan;
	if(student.isPresent){
		isPresentSpan = createElement("span", ["std-ispresent", "text-medium", "text-green"]);
		isPresentSpan.textContent = "Is Present"
	}else{
		isPresentSpan = createElement("span", ["std-ispresent", "text-medium", "text-red"]);
		isPresentSpan.textContent = "Is Absent"
	}

	const btnContainer = createElement("div", "btn-container");
	const btn1 = createElement("button", ["std-action-btn", "text-small"]);
	btn1.textContent = student.isPresent ? "Student Present" : "Mark Present";
	btn1.addEventListener("click", () => togglePresent(student, btn1));

	const btn2 = createElement("button", ["std-rmv-btn", "text-small"]);
	btn2.textContent = "Remove Student";
	btn2.addEventListener("click", () => deleteStudent(student));

	btnContainer.appendChild(btn1);
	btnContainer.appendChild(btn2);

	li.appendChild(roll);
	li.appendChild(sect1);
	li.appendChild(sect2);
	li.appendChild(isPresentSpan);
	li.appendChild(btnContainer);

	return li;
}

async function renderStudents() {
	const list = document.getElementById("student-list");
	list.innerHTML = "";

	const students = await fetchStudents();
	students.sort((a, b) => a.rollNo - b.rollNo);

	for(let i = 0; i < students.length; i++){
		list.appendChild(createListItem(students[i]));
	}
}
