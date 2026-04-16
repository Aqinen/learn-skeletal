### 📄 Ortho Classification Database Guide (CSV Structure)

**File location:** `ortho_classifications.csv`
**Format:** UTF-8 CSV with Headers

#### 🛠 Column Definitions:
1.  **`Bone_Region`**: (String) Format: `"{Number} - {Region Name}"`
    *   *Example:* `1 - Humerus`, `2 - Radius / Ulna`, `3 - Femur`
    *   **CRITICAL:** Must start with a number and a dash (e.g., `1 - ...`) because the application uses this number for sorting and group identification.
2.  **`Classification_Name`**: (String) The official name of the medical classification.
    *   *Example:* `Neer Classification`, `Garden Classification`
3.  **`Type_Description`**: (String) Details of the classification system (Types/Stages).
    *   *Tip:* Use double quotes `"` if the text contains commas.
4.  **`Management`**: (String) Treatment guidelines or surgical indications for each type.

#### 📝 Guidelines for adding data:
- Ensure the `Bone_Region` follows the existing numbering convention if adding to current regions.
- If adding a new bone region, use a unique leading number (e.g., `13 - Spine (Cervical)`).
- Keep descriptions concise but medically accurate.
- If there are multiple classifications for the same bone region, simply add a new row with the same `Bone_Region` value.

#### 💡 Example of a New Entry for Claude:
```csv
Bone_Region,Classification_Name,Type_Description,Management
"13 - Spine (Cervical)","Anderson and D'Alonzo (Odontoid)","Type I: Tip; Type II: Base neck; Type III: Body of C2.","Type I & III: Hard collar; Type II: Halo or surgery (high non-union risk)."
```
