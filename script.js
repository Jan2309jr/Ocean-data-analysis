const chatbotBtn = document.getElementById("chatbot-btn");
const chatbotPopup = document.getElementById("chatbot-popup");
const closeChatbot = document.getElementById("close-chatbot");
const suggestionContainer = document.getElementById("suggestion-container");  
chatbotBtn.addEventListener("click", () => {
    chatbotPopup.style.display = "block";
    showSuggestions();  
});
closeChatbot.addEventListener("click", () => {
    chatbotPopup.style.display = "none";
    suggestionContainer.innerHTML = ''; 
});
document.getElementById("send-btn").addEventListener("click", () => {
    const userInput = document.getElementById("user-input").value;
    const chatDisplay = document.getElementById("chat-display");
    if (userInput.trim()) {
        chatDisplay.innerHTML += `<p><strong>You:</strong> ${userInput}</p>`;
        const botResponse = getBotResponse(userInput);
        chatDisplay.innerHTML += `<p><strong>Bot:</strong> ${botResponse}</p>`;
        document.getElementById("user-input").value = '';
        chatDisplay.scrollTop = chatDisplay.scrollHeight; 
    }
});
function getBotResponse(userInput) {
    const normalizedInput = userInput.toLowerCase().trim();
    if (normalizedInput.includes("hey")) {
        return "Hello!";
    } else if (normalizedInput.includes("current sea temperature")) {
        return "The current sea temperature is 3°C.";
    } else if (normalizedInput.includes("salinity level") || normalizedInput.includes("ocean salinity")) {
        return "The current salinity level is 34.9 PSU.";
    } else if (normalizedInput.includes("predict future temperature trends")) {
        return "I can predict the temperature trend based on past data. Based on current trends, I predict that the temperature will rise by 0.2°C in the next 24 hours.";
    } else if (normalizedInput.includes("oxygen level") || normalizedInput.includes("ocean oxygen")) {
        return "The current oxygen level is 7.2 mg/L. Oxygen levels can vary by depth and location.";
    } else if (normalizedInput.includes("ocean acidity") || normalizedInput.includes("how acidity affects marine life")) {
        return "Ocean acidity has a significant impact on marine life, particularly on coral reefs and shellfish. As acidity increases, the ability of organisms to build shells and skeletons is weakened.";
    } else if (normalizedInput.includes("sea ice conditions")) {
        return "The current sea ice coverage is at 12%, which is slightly below average for this time of year.";
    } else if (normalizedInput.includes("current speed") || normalizedInput.includes("pacific ocean currents")) {
        return "The current speed in the Pacific Ocean is around 2.5 knots.";
    } else if (normalizedInput.includes("reduce ocean acidity") || normalizedInput.includes("reduce acidity")) {
        return "Reducing carbon emissions and mitigating climate change are key strategies to lower ocean acidity. Efforts to limit CO2 emissions will help in maintaining the pH balance of the ocean.";
    } else if (normalizedInput.includes("ocean currents navigation")) {
        return "Ocean currents play a major role in navigation by either aiding or slowing down ships. The current speed in the Atlantic is 3.2 knots, which is generally favorable for shipping routes.";
    } else if (normalizedInput.includes("go to analysis")) {
        window.location.href = "/analysis.html";  // Redirect to analysis page
        return "Redirecting you to the Analysis page...";
    } else if (normalizedInput.includes("go to visualisation")) {
        window.location.href = "/simulations.html";  // Redirect to visualisation page
        return "Redirecting you to the Visualisation page...";
    } else if (normalizedInput.includes("sea ice trend")) {
        return "The trend shows a gradual decrease in sea ice coverage in the Arctic this year. The ice is expected to decline further by the end of the season.";
    }else if (normalizedInput.includes("ocean currents weather")) {
        return "Yes, ocean currents significantly influence global weather patterns by redistributing heat around the planet. For example, the Gulf Stream warms North America and Western Europe.";
    } else if (normalizedInput.includes("ocean acidity increase")) {
        return "Yes, the ocean has become more acidic over the past century due to increased CO2 absorption. This has major implications for marine ecosystems.";
    } else if (normalizedInput.includes("temperature rise in ocean")) {
        return "The areas around the equator and near the Arctic are experiencing the highest temperature rise. This phenomenon is contributing to coral bleaching and sea level rise.";
    } else if (normalizedInput.includes("causes of ocean currents")) {
        return "Ocean currents are primarily caused by wind, the Earth's rotation, and differences in water temperature and salinity. These factors together create large-scale ocean circulation patterns. ";
    } else {
        return "I'm sorry, I didn't understand that. Could you please rephrase your question?";
    }
}
function showSuggestions() {
    suggestionContainer.innerHTML = `
        <button class="suggestion-btn" onclick="sendSuggestedQuestion('What is the current sea temperature?')">What is the current sea temperature?</button>
        <button class="suggestion-btn" onclick="sendSuggestedQuestion('How is the salinity level in the ocean today?')">How is the salinity level in the ocean today?</button>
        <button class="suggestion-btn" onclick="sendSuggestedQuestion('Can you predict future temperature trends?')">Can you predict future temperature trends?</button>
        <button class="suggestion-btn" onclick="sendSuggestedQuestion('What are the causes of ocean currents?')">What are the causes of ocean currents?</button>
    `;
}
function sendSuggestedQuestion(question) {
    const chatDisplay = document.getElementById("chat-display");
    chatDisplay.innerHTML += `<p><strong>You:</strong> ${question}</p>`;
    const botResponse = getBotResponse(question);
    chatDisplay.innerHTML += `<p><strong>Bot:</strong> ${botResponse}</p>`;
    chatDisplay.scrollTop = chatDisplay.scrollHeight;
}
