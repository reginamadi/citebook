from datallm import DataLLM
import pandas as pd
datallm = DataLLM(api_key='zpka_3ab7d1a9ee204ec8929451e31773ddf8_7689a5d5', base_url='https://data.mostly.ai')
columns = {
    "fname": {"prompt": "Users first name", "dtype": "string"},
    "lname": {"prompt": "Users last name", "dtype": "string"},
    "affiliations": " ",
    "email": {"prompt": "Users unique email", "dtype": "string"},
    "email_verified_at": {"prompt": "Date and time of email verification", "dtype": "datetime"},
    "password": {"prompt": "Users password", "dtype": "string"},
    "interests": {"prompt": "Users academic paper topics interests, separated by commas", "dtype": "string"},
    "file_path": "",
    "remember_token": ""
}

# Generate the mock data
synthetic_data = datallm.mock(n=10, columns=columns, progress_bar=False)

# Save the synthetic data to a CSV file
file_path = "synthetic_users_data2.csv"
synthetic_data.to_csv(file_path, index=False)

