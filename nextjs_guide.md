# Next.js Developer Guide: Orthopedic Classifications Data

This guide explains how to use the generated `ortho_classifications.csv` file to build a modern, high-performance orthopedic reference website using Next.js.

## 1. CSV Structure Explanation
The data is organized into four columns designed for easy mapping to UI components:
- **Bone_Region**: Categorized numerically (1-12). This allows for easy sorting and grouping in the frontend (e.g., a Sidebar or Tabs).
- **Classification_Name**: The unique name of the system (e.g., "Schatzker", "Garden").
- **Type_Description**: A detailed breakdown of the types/grades within the system.
- **Management**: Concise clinical management strategies for the specific classification.

## 2. Parsing Guide (using PapaParse)
PapaParse is the industry standard for fast, robust CSV parsing in JavaScript. It handles edge cases like escaped quotes and varied line endings better than manual splitting.

### Installation
```bash
npm install papaparse
```

### Next.js Code Snippet
Use `getStaticProps` to parse the CSV at build time for maximum performance (SSG).

```tsx
// lib/orthoData.ts
import fs from 'fs';
import path from 'path';
import Papa from 'papaparse';

export async function getOrthoData() {
  const filePath = path.join(process.cwd(), 'ortho_classifications.csv');
  const fileContent = fs.readFileSync(filePath, 'utf8');
  
  return new Promise((resolve) => {
    Papa.parse(fileContent, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        resolve(results.data);
      }
    });
  });
}
```

## 3. Data Handling: Grouping by Bone_Region
To render the data sequentially (Humerus to Patella), group the flat CSV array into an object or a nested array.

```tsx
// components/ClassificationsList.tsx
import { useMemo } from 'react';

export default function ClassificationsList({ rawData }) {
  const groupedData = useMemo(() => {
    return rawData.reduce((acc, item) => {
      const region = item.Bone_Region;
      if (!acc[region]) acc[region] = [];
      acc[region].push(item);
      return acc;
    }, {});
  }, [rawData]);

  // Sort keys to ensure 1-12 order
  const sortedRegions = Object.keys(groupedData).sort((a, b) => {
    return parseInt(a) - parseInt(b);
  });

  return (
    <div>
      {sortedRegions.map(region => (
        <section key={region}>
          <h2>{region}</h2>
          {groupedData[region].map(cls => (
            <div key={cls.Classification_Name} className="card">
              <h3>{cls.Classification_Name}</h3>
              <p><strong>Types:</strong> {cls.Type_Description}</p>
              <p><strong>Management:</strong> {cls.Management}</p>
            </div>
          ))}
        </section>
      ))}
    </div>
  );
}
```

## 4. Error Prevention & Best Practices
1. **Unique Keys**: Always use `Classification_Name` or a generated ID as the `key` in React loops to prevent rendering bugs.
2. **Column Shifting**: Ensure your `Papa.parse` configuration uses `header: true`. This prevents data from being misaligned if columns are reordered in the CSV.
3. **Data Integrity**: Use TypeScript interfaces to enforce the data structure:
   ```typescript
   interface OrthoClassification {
     Bone_Region: string;
     Classification_Name: string;
     Type_Description: string;
     Management: string;
   }
   ```
4. **Encoding**: Ensure the CSV is read with `utf-8` to preserve any special medical symbols or characters.
