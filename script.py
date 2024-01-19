import pandas as pd
import matplotlib.pyplot as plt
import json

# Load the JSON file
with open('all_historical_funding.json', 'r') as f:
    data = json.load(f)

# Convert JSON to DataFrame
df = pd.DataFrame(data['historicalFunding'])

# Convert 'effectiveAt' to datetime format
df['effectiveAt'] = pd.to_datetime(df['effectiveAt'])

# Convert 'rate' to float
df['rate'] = df['rate'].astype(float)

# Plot
plt.figure(figsize=(16, 8))
plt.plot(df['effectiveAt'], df['rate'], label='Funding Rate')
plt.xlabel('Time')
plt.ylabel('Funding Rate')
plt.title('Funding Rate Over Time')
plt.legend()
plt.show()