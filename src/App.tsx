import { useState } from "react";
import QlikScriptEditorComplete from "./components/QlikScriptEditorComplete";

const SAMPLE_SCRIPT = `// Sample Qlik Sense Data Load Script
// This script demonstrates various Qlik features

// Set variables
SET vDataPath = 'lib://data/';
LET vCurrentYear = Year(Now());
LET vLastYear = $(vCurrentYear) - 1;

// Load sales data
LOAD
    OrderID,
    CustomerID,
    [Product Name],
    [Order Date],
    [Sales Amount],
    Quantity,
    Year([Order Date]) as OrderYear,
    Month([Order Date]) as OrderMonth,
    If([Sales Amount] > 1000, 'High', 'Low') as SalesCategory
FROM [$(vDataPath)/sales_data.xlsx]
(ooxml, embedded labels, table is Sheet1)
WHERE Year([Order Date]) >= $(vLastYear);

// Load customer data
LEFT JOIN (Sales)
LOAD
    CustomerID,
    [Customer Name],
    City,
    Country,
    Region
FROM [$(vDataPath)/customers.csv]
(txt, codepage is 1252, embedded labels, delimiter is ',', msq);

// Create a calendar table
LOAD
    Date,
    Year(Date) as Year,
    Month(Date) as Month,
    MonthName(Date) as MonthName,
    Quarter(Date) as Quarter,
    WeekDay(Date) as WeekDay,
    Week(Date) as Week
FROM [$(vDataPath)/calendar.qvd] (qvd);

// Drop temporary fields
DROP FIELD [Order Date];

// Store data model
STORE Sales INTO [lib://output/sales_model.qvd] (qvd);`;

const SAMPLE_VARIABLES = [
  "vDataPath",
  "vCurrentYear",
  "vLastYear",
  "vOutputPath",
  "vCompanyName",
  "vReportDate",
  "vCurrency",
];

function App() {
  const [selectedScript, setSelectedScript] = useState(SAMPLE_SCRIPT);

  const handleScriptChange = (newScript: string) => {
    setSelectedScript(newScript);
    console.log("Script changed:", newScript.length, "characters");
  };

  return (
    <div className="h-screen w-full p-4 bg-gray-100">
      <QlikScriptEditorComplete
        initialScript={selectedScript}
        variables={SAMPLE_VARIABLES}
        onScriptChange={handleScriptChange}
        title="Qlik Script Editor"
      />
    </div>
  );
}

export default App;
