import kagglehub
import pandas as pd
import os
import hashlib

def generate_sql():
    print("Downloading/Locating dataset...")
    # This handles caching
    path = kagglehub.dataset_download("shudhanshusingh/az-medicine-dataset-of-india")
    
    csv_file = None
    for root, dirs, files in os.walk(path):
        for file in files:
            if file.endswith(".csv"):
                csv_file = os.path.join(root, file)
                break
    
    if not csv_file:
        print("No CSV found.")
        return

    print("Reading CSV...")
    df = pd.read_csv(csv_file)
    
    # Columns: 'id', 'name', 'price(₹)', 'Is_discontinued', 'manufacturer_name', 'type', 'pack_size_label', 'short_composition1', 'short_composition2'
    
    # Map to Prisma Model:
    # model Medicine {
    #   id              String   @id @default(uuid())
    #   name            String
    #   genericName     String?
    #   type            String   @default("Tablet")
    #   defaultDosage   String? 
    #   defaultDuration String? 
    #   defaultFreq     String? 
    #   instruction     String? 
    # }

    print("Generating SQL...")
    
    # We'll batch inserts for performance
    batch_size = 1000
    sql_file = "seed_medicines.sql"
    
    with open(sql_file, "w") as f:
        f.write("BEGIN;\n")
        f.write('TRUNCATE TABLE "Medicine" CASCADE;\n') # Optional: Clean start
        count = 0
        
        # Taking top 20000 to keep file size manageable for now? 
        # Or all? All is 250k lines. Approx 50MB. Postgres can  handle it.
        # But `psql` command execution via `run_command` might be tricky if I don't have password or interactive.
        # I'll try to generate a script and ask user to run it OR try running if I find credentials.
        
        for index, row in df.iterrows():
            # if count > 50000: break # Limit for safety if needed
            
            # Sanitizing strings
            name = str(row['name']).replace("'", "''")
            generic = str(row['short_composition1']).replace("'", "''") if pd.notna(row['short_composition1']) else ""
            type_ = str(row['type']).capitalize().replace("'", "''") if pd.notna(row['type']) else "Tablet"
            
            # Simple Dosage extraction hack
            dosage = ""
            if "(" in generic and ")" in generic:
                 try:
                    start = generic.rfind("(") + 1
                    end = generic.rfind(")")
                    dosage = generic[start:end]
                 except: pass
            
            # Generate UUID (deterministic based on index to avoid duplicates on re-run)
            # Or just let Postgres generate it? But `COPY` needs values. `INSERT` works.
            # We can use gen_random_uuid() if PG extension enabled, or just pass a UUID.
            # I'll let PG generate it via DEFAULT, so I won't include ID column.
            
            values = f"'{name}', '{generic}', '{type_}', '{dosage}'"
            
            query = f'INSERT INTO "Medicine" ("id", "name", "genericName", "type", "defaultDosage", "defaultFreq", "defaultDuration", "instruction") VALUES (gen_random_uuid(), \'{name}\', \'{generic}\', \'{type_}\', \'{dosage}\', \'1-0-1\', \'5 days\', \'After Food\');\n'
            
            f.write(query)
            count += 1
            
            if count % 10000 == 0:
                print(f"Processed {count} rows...")

        f.write("COMMIT;\n")

    print(f"SQL seed file generated at {sql_file}. Rows: {count}")

if __name__ == "__main__":
    generate_sql()
