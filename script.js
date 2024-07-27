document.addEventListener("DOMContentLoaded", () => {
    fetch('https://gist.githubusercontent.com/harsh3195/b441881e0020817b84e34d27ba448418/raw/c4fde6f42310987a54ae1bc3d9b8bfbafac15617/demo-json-data.json')
        .then(response => response.json())
        .then(data => {
            studentData = data;
            renderTable(studentData);
        })
        .catch(error => console.error('Error fetching data:', error));
});

let studentData = [];

function renderTable(data) {
    const table = document.getElementById('student-table');
    table.innerHTML = '';
    data.forEach((student, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${index + 1}</td>
            <td><img src="${student.image}" alt="profile picture">${student.first_name} ${student.last_name}</td>
            <td>${student.gender}</td>
            <td>${student.class}</td>
            <td>${student.marks}</td>
            <td>${student.passing ? 'Passing' : 'Failed'}</td>
            <td>${student.email}</td>
        `;
        table.appendChild(row);
    });
}

function sortTable(criteria) {
    let sortedData;
    switch (criteria) {
        case 'az':
            sortedData = [...studentData].sort((a, b) => (a.first_name + a.last_name).localeCompare(b.first_name + b.last_name));
            break;
        case 'za':
            sortedData = [...studentData].sort((a, b) => (b.first_name + b.last_name).localeCompare(a.first_name + a.last_name));
            break;
        case 'marks':
            sortedData = [...studentData].sort((a, b) => a.marks - b.marks);
            break;
        case 'passing':
            sortedData = studentData.filter(student => student.passing);
            break;
        case 'class':
            sortedData = [...studentData].sort((a, b) => a.class - b.class);
            break;
        case 'gender':
            const maleStudents = studentData.filter(student => student.gender === 'Male');
            const femaleStudents = studentData.filter(student => student.gender === 'Female');
            renderTable(maleStudents);
            renderTable(femaleStudents, true);
            return;
    }
    renderTable(sortedData);
}

document.getElementById('search').addEventListener('input', (event) => {
    const query = event.target.value.toLowerCase();
    const filteredData = studentData.filter(student =>
        student.first_name.toLowerCase().includes(query) ||
        student.last_name.toLowerCase().includes(query) ||
        student.email.toLowerCase().includes(query)
    );
    renderTable(filteredData);
});
