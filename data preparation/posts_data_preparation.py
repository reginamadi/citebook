from datallm import DataLLM
import pandas as pd
datallm = DataLLM(api_key='zpka_3ab7d1a9ee204ec8929451e31773ddf8_7689a5d5', base_url='https://data.mostly.ai')
columns = {
    #"post_id": {"prompt": "Unique identifier for the academic paper", "dtype": "integer"},
    "users_id": {"prompt": "identifier for the user who posted the article between 1 and 11", "dtype": "integer"},
    "description": {"prompt": "Abstract of the academic paper", "dtype": "string"},
    "keywords": {"prompt": "Keywords associated with the paper separated by commas", "dtype": "string"},
    "authors": {"prompt": "Authors of the academic paper if there are more than one, the names separated by commas", "dtype": "string"},
    "view": {"prompt": "Is the paper viewable", "dtype": "boolean"},
    "google_scholar": {"prompt": "Is imported from google scholar", "dtype": "boolean"},  
    "title": {"prompt": "Title of the academic paper", "dtype": "string"},
    "likes": {"prompt": "Paper's number of likes", "dtype": "integer"}
}

# Generate the mock data
synthetic_data = datallm.mock(n=50, columns=columns, progress_bar=True)

# Save the synthetic data to a CSV file
file_path = "synthetic_academic_papers.csv"
synthetic_data.to_csv(file_path, index=False)

