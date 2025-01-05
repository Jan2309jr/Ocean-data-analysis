from flask import Flask, request, jsonify
import pickle
import pandas as pd
from sklearn.preprocessing import StandardScaler

app = Flask(__name__)

with open('ocean_model.pkl', 'rb') as f:
    model = pickle.load(f)

# Load scaler (you need to save it along with the model, or create a new one)
scaler = StandardScaler()

# Function to make predictions based on user query (ocean factors)
def predict_ocean_trend(input_data):
    # Assume input_data is a dictionary with the necessary features
    df = pd.DataFrame([input_data])  # Convert user input into a DataFrame
    df_scaled = scaler.transform(df)  # Scale the features
    prediction = model.predict(df_scaled)
    return prediction[0]

# Route to handle chatbot requests
@app.route('/chat', methods=['POST'])
def chat():
    user_input = request.json['message']
    
    # Example: If the user input mentions "temperature"
    if 'temperature' in user_input.lower():
        # Assume the user wants to predict temperature based on other factors
        input_data = {
            "sea_ice": 12,   # Dummy values (you can collect these dynamically from the frontend)
            "salinity": 34.7,
            "temperature": 2.8,
            "acidity": 8.2,
            "oxygen": 7.3,
            "currents": 2.3
        }
        prediction = predict_ocean_trend(input_data)
        response = f"The predicted future temperature is {prediction:.2f}°C."
    else:
        response = "Sorry, I didn't understand that. Can you ask about ocean data trends?"

    return jsonify({"response": response})

if __name__ == '__main__':
    app.run(debug=True,port=5500)
