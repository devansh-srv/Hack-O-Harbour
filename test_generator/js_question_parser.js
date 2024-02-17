const fs = require('fs');

// Read the content from the file
const text = fs.readFileSync('Hack-O-Harbour\\test_generator\\Sample\\Sample ques4.txt', 'utf8');

// Split the text based on the delimiter "!@#ques"
const parts = text.split('!@#ques');

// Array to store the parsed questions
const Q_list = [];

// Iterate through each part
for (const part of parts) {
    const list_element = [];

    // Check if the part contains options
    if (part.includes('!@#opt')) {
        try {
            // Split the part into question and options
            const [part_q, part_opt] = part.split('!@#opt');

            // Extract question number and question text
            const [q_no, question] = part_q.split('\n', 2);
            list_element.push(parseInt(q_no));
            list_element.push(question.trim());

            // Split the options part into options and answer
            const [option_string, ans_string] = part_opt.split('!@#ans');

            // Split options into an array
            const option_list = option_string.split('\n');

            // Convert options to a dictionary
            const options_dict = {};
            for (const option of option_list) {
                if (option.length > 1) {
                    options_dict[option[0]] = option.slice(2);
                }
            }

            list_element.push(options_dict);

            // Store the answer as a string
            list_element.push(ans_string[1]);

            // Add the list element to Q_list
            Q_list.push(list_element);

            console.log(list_element);
        } catch (error) {
            console.error('Error parsing part:', part);
        }
    }
}

// Output the parsed questions
console.log(Q_list);
// Q_List structure [[qno,'ques',{option},{ans}]]
