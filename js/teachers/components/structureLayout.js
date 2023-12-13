
// Función para la sección de búsqueda de estudiantes
function generateSearchSection(title) {
    return `
        <div class="container mt-4">
            <div class="text-center">
                <h1 class="display-5">${title}</h1>
            </div>
            <div class="row justify-content-center mt-4">
                <div class="col-12 col-md-6">
                    <div class="input-group">
                        <input type="text" class=" input form-control form-control-lg" id="search-student-input" placeholder="Search by first name, last name or email...">
                        <div class="input-group-append">
                            <button class="btn btn-secondary btn-lg" id="search-button" type="button">Search</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function generateButtonAddStudent(idmodal, idbutton, textbutton){
    return `
        <div class="d-flex justify-content-center mt-4">
            <button class="btn btn-primary btn-lg" data-bs-toggle="modal" data-bs-target=${idmodal} id=${idbutton} type="button">${textbutton}</button>
        </div>
    `;
}

function generateFiltersSection(){
    return `
        <div class="container mt-5">
            <div class="row">
                <div class="col-12 col-sm-6 col-md-4 mb-3">
                    <div class="input-group">
                        <div class="input-group-prepend">
                            <label class="input-group-text" for="filter-category">Category:</label>
                        </div>
                        <select class="input custom-select form-control" id="filter-category">
                            <option selected value="">Sort by category...</option>
                            <option value="Freshman">Freshman</option>
                            <option value="Junior">Junior</option>
                            <option value="Senior">Senior</option>
                        </select>
                    </div>
                </div>

                <div class="col-12 col-md-8">
                    <div class="row">
                        <div class="col-12 col-sm-6 col-md-4 mb-3">
                            <div class="input-group">
                                <div class="input-group-prepend">
                                    <span class="input-group-text" style="height: 100%;"><i class="fas fa-sort"></i></span>
                                </div>
                                <select class=" input custom-select form-control" id="filter-order" style="width: 150px;">
                                    <option selected value="">Sort by Lastname...</option>
                                    <option value="asc">Ascending</option>
                                    <option value="desc">Descending</option>
                                </select>
                            </div>
                        </div>
                        
                        <div class="col-12 col-sm-6 col-md-4 mb-3">
                            <div class="input-group">
                                <div class="input-group-prepend">
                                    <span class="input-group-text" style="height: 100%;"><i class="fas fa-filter"></i></span>
                                </div>
                                <select class="input custom-select form-control" id="filter-turn" style="width: 150px;">
                                    <option selected value="">Filter by Turn...</option>
                                    <option value="A.M">A.M</option>
                                    <option value="P.M">P.M</option>
                                </select>
                            </div>
                        </div>

                        <div class="col-12 col-sm-6 col-md-4 mb-3">
                            <div class="input-group">
                                <div class="input-group-prepend">
                                    <span class="input-group-text" style="height: 100%;"><i class="fas fa-filter"></i></span>
                                </div>
                                <select class="input custom-select form-control" id="filter-path" style="width: 150px;">
                                    <option selected value="">Filter by Path Learning...</option>
                                    <option value="JavaScript">JavaScript</option>
                                    <option value="Python">Python</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-12 text-center d-flex align-items-center justify-content-end mb-3">
                            <button class="btn btn-outline-danger form-control" style="width: 150px;" id="clear-filters"><i class="fas fa-times"></i> Clear Filters</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `;
}

function generateStudentTable(){
    return `
    <!-- Section of SHOW TABLE -->

            <div class="table-responsive">
                <table class="table mt-4">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Email</th>
                            <th scope="col">Lastname</th>
                            <th scope="col">Name</th>
                            <th scope="col">Turn</th>
                            <th scope="col">Path Learning</th>
                            <th scope="col">Category</th>
                            <th scope="col">Delete</th>
                            <th scope="col">Edit</th>
                        </tr>
                    </thead>
                    <tbody id="table-body" class="table-group-divider">
                            
                    </tbody>
                </table>
            </div>
    `
}


// Función para construir la página completa de estudiantes
function buildStudentPage() {
    const searchSection = generateSearchSection("Search Students");
    const buttonAddStudent = generateButtonAddStudent("#dataStudentModal", "add-student-button", "Add New Student");
    const filtersSection = generateFiltersSection();
    const studentTable = generateStudentTable();

    const fullHTML = `${searchSection} ${buttonAddStudent} ${filtersSection} ${studentTable}`;
    document.getElementById('content-teacher').innerHTML = fullHTML;
}





