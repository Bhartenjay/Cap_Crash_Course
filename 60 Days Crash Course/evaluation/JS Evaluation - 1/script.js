const baseUrl = 'https://dbioz2ek0e.execute-api.ap-south-1.amazonaws.com/mockapi/get-employees';
let currentPage = 1;

function fetchData(page = 1, limit = 10, filterBy = '', filterValue = '', sort = '', order = '') {
  let url = `${baseUrl}?page=${page}&limit=${limit}`;
  if (filterBy && filterValue) {
    url += `&filterBy=${filterBy}&filterValue=${filterValue}`;
  }
  if (sort && order) {
    url += `&sort=${sort}&order=${order}`;
  }

  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      displayData(data);
    })
    .catch(error => console.error('Error fetching data:', error));
}

function displayData(data) {
  const tableBody = document.getElementById('employeeData');
  tableBody.innerHTML = '';

  data.forEach((employee, index) => {
    const row = `<tr>
                  <td>${index + 1}</td>
                  <td>${employee.name}</td>
                  <td>${employee.gender}</td>
                  <td>${employee.department}</td>
                  <td>${employee.salary}</td>
                </tr>`;
    tableBody.innerHTML += row;
  });
}

document.getElementById('departmentFilter').addEventListener('change', (event) => {
  const department = event.target.value;
  fetchData(1, 10, 'department', department);
});

document.getElementById('genderFilter').addEventListener('change', (event) => {
  const gender = event.target.value;
  fetchData(1, 10, 'gender', gender);
});

document.getElementById('salarySort').addEventListener('change', (event) => {
  const order = event.target.value;
  fetchData(1, 10, '', '', 'salary', order);
});

// Initial data fetch
fetchData();
