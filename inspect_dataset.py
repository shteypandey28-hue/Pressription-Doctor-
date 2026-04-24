import kagglehub
import pandas as pd
import os
import json

def fetch_and_process():
    print("Downloading dataset...")
    # This handles caching automatically
    path = kagglehub.dataset_download("shudhanshusingh/az-medicine-dataset-of-india")
    print(f"Dataset downloaded to: {path}")

    csv_file = None
    for root, dirs, files in os.walk(path):
        for file in files:
            if file.endswith(".csv"):
                csv_file = os.path.join(root, file)
                break
    
    if not csv_file:
        print("No CSV file found.")
        return

    print(f"Reading {csv_file}...")
    df = pd.read_csv(csv_file)
    print("Columns found:", df.columns.tolist())
    print(f"Total rows: {len(df)}")
    
    # Sample first 5 rows
    print("Sample data:", df.head().to_dict(orient='records'))

if __name__ == "__main__":
    fetch_and_process()
