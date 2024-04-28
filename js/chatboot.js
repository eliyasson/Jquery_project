 // Define responses for keywords
 const responses = {
    "hi": "Hello! How can I assist you today?",
    "help": "Sure, I can help you. What do you need assistance with?",
    "bye": "Goodbye! Have a great day!",
    "thanks": "You're welcome!"
};

// Predefined random responses for complex messages
const randomResponses = [
    "I'm here to help! What would you like to know?",
    "Interesting! Can you tell me more?",
    "Let me think about that...",
    "That's a good point!",
    "Tell me more about it."
];

// Function to handle bot responses
function handleBotResponse(userMessage) {
    // Convert user message to lowercase for keyword comparison
    const normalizedMessage = userMessage.toLowerCase();

    // Check for predefined responses based on keywords
    for (const keyword in responses) {
        if (normalizedMessage.includes(keyword)) {
            // Return predefined response for found keyword
            return responses[keyword];
        }
    }

    // Return a random response for complex or unrecognized messages
    return getRandomResponse();
}

// Function to get a random response from predefined list
function getRandomResponse() {
    const randomIndex = Math.floor(Math.random() * randomResponses.length);
    return randomResponses[randomIndex];
}

// Render message to chat window
function renderMessageToScreen(args) {
    const displayDate = (args.time || getCurrentTimestamp()).toLocaleString('en-IN', {
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
    });
    const messagesContainer = $('.messages');

    // Create message element
    const message = $(`
        <li class="message ${args.message_side}">
            <div class="avatar"></div>
            <div class="text_wrapper">
                <div class="text">${args.text}</div>
                <div class="timestamp">${displayDate}</div>
            </div>
        </li>
    `);

    // Append message to chat
    messagesContainer.append(message);

    // Add animation
    setTimeout(() => {
        message.addClass('appeared');
    }, 0);
    messagesContainer.animate({ scrollTop: messagesContainer.prop('scrollHeight') }, 300);
}

// Get current timestamp
function getCurrentTimestamp() {
    return new Date();
}

// Show user message on the chat screen
function showUserMessage(message, datetime) {
    renderMessageToScreen({
        text: message,
        time: datetime,
        message_side: 'right',
    });
}

// Show bot message on the chat screen
function showBotMessage(message, datetime) {
    renderMessageToScreen({
        text: message,
        time: datetime,
        message_side: 'left',
    });
}

// Button click event for sending messages
$('#send_button').on('click', function () {
    // Get user message
    const userMessage = $('#msg_input').val();

    // Display user message
    showUserMessage(userMessage);
    $('#msg_input').val('');

    // Get bot response
    const botResponse = handleBotResponse(userMessage);

    // Display bot response
    setTimeout(() => {
        showBotMessage(botResponse);
    }, 300);
});

// Event listener for "Enter" key press to send messages
$('#msg_input').keydown((e) => {
    if (e.key === 'Enter') {
        e.preventDefault();
        $('#send_button').click();
    }
});

// Set initial bot message on page load
$(window).on('load', function () {
    showBotMessage('Hello there! Type in a message.');
});