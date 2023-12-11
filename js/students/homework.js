function loadHomeworkStudent(){
    let homeworkContainer = `
    <div class="working container">
        <div class="working-header" display-5><h2>Estamos trabajando en la version Beta 2.0</h2></div>
        <div class="working-icon"><i class="fas fa-cogs"></i></div>
    </div>  
    `;
    document.getElementById("content-student").innerHTML = homeworkContainer;
}

document.getElementById('homework-student').addEventListener('click', loadHomeworkStudent); // Asegúrate de que 'profile-section' es el ID correcto de tu sección de perfil