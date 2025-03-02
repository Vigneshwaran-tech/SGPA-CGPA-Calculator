//Adding extra subjects

function addsubject() {
    
    let tbody = document.getElementById("subjects"); //
    let row = document.createElement("tr");
    row.innerHTML = ` 
        <td> <input type= "text" class="subject" placeholder="Subject Name"></td>
        <td>
            <select class="grade">
                <option value="10">O</option>
                <option value="9">A+</option>
                <option value="8">A</option>
                <option value="7">B+</option>
                <option value="6">B</option>
                <option value="5">C+</option>
                <option value="4">C</option>
                <option value="0">U</option>
            </select>
        </td>
        <td><input type="number" class="credit" min="1" placeholder="Credits"></td>
        <td><button class="delete-btn" onclick="deleteRow(this)">Delete</button></td> 
        `;
        tbody.appendChild(row); 
}

//To calculate SGPA
function calculateSGPA() {
    let grade = document.querySelectorAll(".grade");
    let credits = document.querySelectorAll(".credit");
    let totalCredits = 0, weightedSum = 0;

    grade.forEach((grade,index) => {
        let credit = parseFloat(credits[index].value) || 0;
        let gradeValue = parseFloat(grade.value);
        weightedSum += gradeValue * credit;
        totalCredits += credit;
        
    });
    let sgpa = totalCredits ? (weightedSum / totalCredits).toFixed(2) : 0;
    document.getElementById("sgpaResult").textContent = `SGPA: ${sgpa}`;

}


//Adding semester()
function addsemester(){ 
    let tbody = document.getElementById("cgpaTable");
    let row = document.createElement("tr");
    row.innerHTML =`
    <td>Semester ${tbody.children.length + 1}</td>
    <td><input type="number" class="semesterSGPA" step="0.01" min="0" max="10"></td>
    <td><input type="number" class="semesterCredits" min="1"></td>
    <td><button class="delete-btn" onclick="deleteRow(this)">Delete</button></td>
    `;
    tbody.appendChild(row);
}


function calculateCGPA(){
    let sgpa = document.querySelectorAll(".semesterSGPA");
    let credits = document.querySelectorAll(".semesterCredits");
    let totalCredits = 0,weightedSum = 0;

    sgpa.forEach((sgpa,index) =>{
        let credit = parseFloat(credits[index].value) || 0;
        let sgpaValue = parseFloat(sgpa.value) || 0;
        weightedSum += sgpaValue * credit;
        totalCredits += credit;
    });
    let cgpa = totalCredits ? (weightedSum / totalCredits).toFixed(2):0;
    document.getElementById("cgpaResult").textContent = `CGPA: ${cgpa}`;
}

function deleteRow(button) {
    let row = button.parentElement.parentElement;
    row.remove();
}


function downloadCGPA() {
    const { jsPDF } = window.jspdf;
    let doc = new jsPDF();
    let cgpa = document.getElementById("cgpaResult").textContent;
    doc.text("Your CGPA Report", 10, 10);
    doc.text(cgpa, 10, 20);
    doc.save("CGPA_Report.pdf");
}