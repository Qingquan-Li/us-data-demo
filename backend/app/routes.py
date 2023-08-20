import os

from flask import request, jsonify
import pandas as pd

from app import app

# Read the CSV file into a pandas DataFrame
# `./`` means "the current directory". This can lead to issues if running
# the script or application from a different directory because the path
# will be relative to that new directory, and the file might not be found.
# df = pd.read_csv('./data/us-500.csv')

# Determine the absolute path to the directory where the current file (routes.py) is located.
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
# Build the path to the CSV file based on the location of the current file.
us_500_csv_path = os.path.join(BASE_DIR, 'data', 'us-500.csv')
# Read the CSV file into a pandas DataFrame
df = pd.read_csv(us_500_csv_path)

@app.route('/api/data', methods=['GET'])
def get_data():
    # Convert the DataFrame to a dictionary and then to a JSON response.
    # `orient='records'` converts the DataFrame to a list of dictionaries,
    # where each dictionary represents a row (or record) in the DataFrame.
    # The keys in each dictionary are the column names of the DataFrame.
    # For example:
    # [
    #     {
    #         "first_name": "James",
    #         "last_name": "Butt",
    #         ...
    #     },
    #     { ... },
    #     ...
    # ]
    return jsonify(df.to_dict(orient='records'))

@app.route('/api/search', methods=['POST'])
def search_data():
    # Extract 'search_field' and 'target_value' from the incoming JSON request
    # For example:
    # {
    #     "search_field": "state",
    #     "target_value": "NY"
    # }
    search_field = request.json['search_field']
    target_value = request.json['target_value']
    # Filter the DataFrame by the given 'search_field' and 'target_value'
    filtered_df = df[df[search_field] == target_value]
    # Return the filtered DataFrame as a JSON response
    return jsonify(filtered_df.to_dict(orient='records'))

@app.route('/api/num-of-people-per-state', methods=['GET'])
def get_num_of_people_per_state():
    # Show summary statistics: the number of people per state.
    # Count the number of occurrences of each state in the DataFrame
    # and convert it to a dictionary and then to a JSON response
    return jsonify(df['state'].value_counts().to_dict())
