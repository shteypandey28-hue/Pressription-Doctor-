import kagglehub
from kagglehub import KaggleDatasetAdapter
import pandas as pd
import json
import os

print("Downloading dataset...")
path = kagglehub.dataset_download("shudhanshusingh/az-medicine-dataset-of-india")

print("Path:", path)

# Find the csv file in the path
csv_file = None
for root, dirs, files in os.walk(path):
    for file in files:
        if file.endswith(".csv"):
            csv_file = os.path.join(root, file)
            break

if csv_file:
    print(f"Loading {csv_file}...")
    df = pd.read_csv(csv_file)
    
    # Selecting relevant columns if they exist, otherwise taking first few
    # Based on dataset name, likely has Name, Manufacturer, etc.
    print("Columns:", df.columns)
    
    # Convert to list of dicts
    # We need to map it to our app's expectations: name, type, dosage etc.
    # For now, let's dump a sample to analyze structure, or dump all with key mapping.
    
    output_path = "frontend/src/lib/medicines_dump.json"
    
    # Clean up column names ?
    # Let's just save it first.
    
    # df.to_json(output_path, orient="records") # Might be huge.
    
    # Let's save just the 'name' and maybe 'composition' if available
    # to match { id, name, type, defaultDosage }
    
    final_data = []
    
    # We will inspect columns first in a separate run or just guess?
    # Better to run a small script to check columns first.
    
else:
    print("No CSV found.")
