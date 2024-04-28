const baseURL = 'https://dbioz2ek0e.execute-api.ap-south-1.amazonaws.com/mockapi/get-employees';
let currentPage = 1;

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('departmentFilter').addEventListener('change', fetchDataIfAllSelected);
    document.getElementById('genderFilter').addEventListener('change', fetchDataIfAllSelected);
    document.getElementById('sortOrder').addEventListener('change', fetchDataIfAllSelected);
    document.getElementById('prevBtn').addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            fetchDataIfAllSelected();
        }
    });
    document.getElementById('nextBtn').addEventListener('click', () => {
        currentPage++;
        fetchDataIfAllSelected();
    });
});

async function fetchDataIfAllSelected() {
    const department = document.getElementById('departmentFilter').value;
    const gender = document.getElementById('genderFilter').value;
    const sortOrder = document.getElementById('sortOrder').value;

    if (department && gender && sortOrder) {
        await fetchData(department, gender, sortOrder);
    }
}

async function fetchData(department, gender, sortOrder) {
    try {
      const response = await fetch(`${baseURL}?page=${currentPage}&limit=10&filterBy=department&filterValue=${department}&filterBy=gender&filterValue=${gender}&sort=salary&order=${sortOrder}`);

        const responseData = await response.json();

        if (responseData && responseData.data && responseData.totalPages) {
            renderTable(responseData.data);
            renderPagination(responseData.totalPages);
        } else {
            console.error('Invalid response data:', responseData);
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}


function renderTable(employees) {
    const tableBody = document.getElementById('employeeData');
    tableBody.innerHTML = '';

    employees.forEach((employee, index) => {
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

function renderPagination(totalPages) {
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    if (currentPage === 1) {
        prevBtn.disabled = true;
    } else {
        prevBtn.disabled = false;
    }

    if (currentPage === totalPages) {
        nextBtn.disabled = true;
    } else {
        nextBtn.disabled = false;
    }
}