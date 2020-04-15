// Internal and External Dependencies

const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const render = require("./lib/htmlRenderer");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

// Path for creating Output folder and HTML file

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// User prompts for general empoyee info

const empoyeeQuestions = [
    {
        type: "employeeInfo",
        name: "name",
        message: "Name:"
    },
    {
        type: "employeeInfo",
        name: "id",
        message: "ID:"
    },
    {
        type: "employeeInfo",
        name: "email",
        message: "Email:"
    }
];

// User prompts for manager subclass info

const managerQuestions = [
    {
        type: "employeeInfo",
        name: "officeNumber",
        message: "Office Number:"
    }
];

// User prompts for engineer subclass info

const engineerQuestions = [
    {
        type: "employeeInfo",
        name: "github",
        message: "Github Username:"
    }
];

// User prompts for intern subclass info

const internQuestions = [
    {
        type: "employeeInfo",
        name: "school",
        message: "School Attending:"
    }
];

// User prompts for intern subclass info

const nextTeamMember = [
    {
        type: "list",
        message: "What team member would you like to add next?",
        name: "next",
        choices: ["Engineer", "Intern", "No more team members"]
    }
];

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

async function createTeam() {
    
    // Variable holding tema members
    const team = [];
    
    // Always with Manager
    let role = "Manager";
    
    // While loop for until user selects no more team members
    while (role != "No more team members") {
        
        // Prompt user for employee info
        const employeeInfo = await inquirer.prompt(empoyeeQuestions);
        
        // Prompt user for Manager, Engineer, or Intern specific info and create new team member with constructor function of selected subclass
        let specificInfo;
        let newTeamMember;

        switch (role) {

            case "Manager":
                specificInfo = await inquirer.prompt(managerQuestions);
                newTeamMember = new Manager(employeeInfo.name, employeeInfo.id, employeeInfo.email, employeeInfo.officeNumber);
                break;
            case "Engineer":
                specificInfo = await inquirer.prompt(engineerQuestions);
                newTeamMember = new Engineer(employeeInfo.name, employeeInfo.id, employeeInfo.email, employeeInfo.github);
                break;
            case "Intern":
                specificInfo = await inquirer.prompt(internQuestions);
                newTeamMember = new Engineer(employeeInfo.name, employeeInfo.id, employeeInfo.email, employeeInfo.school);
                break;
            default:
                console.log("Error, something went wrong")    
        }

        // Add new team member to team
        team.push(newTeamMember);

        // Prompt for next team member role
        const answer = await inquirer.prompt(nextTeamMember);
        role = answer.next
    }

    // Render HTML
    const html = render(team);

    // Create HTML file
    fs.writeFile(outputPath, html, err => {
        if (err) throw err;
        console.log(`File ${path.basename(outputPath)} has been created!`)
    });
};

createTeam();

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.



// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.



// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
